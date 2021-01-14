import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SystemConnectionStatus } from '@kognifai/galore-client';
import { ConfirmationService } from 'primeng/api';
import { AppConstants, FormType, SectionStatus } from 'src/app/app.constants';
import { Section } from 'src/app/models/ISection';
import { FromBuilderService } from 'src/app/services/from-builder-service';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss']
})
export class SectionsComponent implements OnInit {

  isDataLoading = true;
  formValues: any = null;
  formType = FormType;
  formData: FormGroup;
  config = {
    formList: []
  };
  sections: Section[] = [];

  clonedSections: { [s: string]: Section; } = {};
  sectionStatus = SectionStatus;
  sectionRow: any;
  sectionStatusSelceted: any = { key: 0,
    name: 'Active'};
  public statusList = [
    {
      key: 0,
      name: 'Active'

    },
    {
      key: 1,
      name: 'Obsloute'
    }
  ];
  public fileTypes = Object.values(SectionStatus);

  PRIMENG_CONSTANTS = AppConstants.PRIMENG_CONSTANTS;

  cols = [
    { field: 'Section', header: 'Section' },
    { field: 'SubSection', header: 'Sub-Section' },
    { field: 'Status', header: 'Status' },
    { field: 'Action', header: 'Action' }

  ];

  constructor(private formBuliderService: FromBuilderService,
              private confirmationService: ConfirmationService,
              public fb: FormBuilder) { }

  ngOnInit() {
    this. constructForm();
    this.formData = this.formBuliderService.buildForm(this.config);
    this.isDataLoading = false;
    this.sections = [
      {
        id: 1,
        name: 'PortFront',
        status: SectionStatus.Active,
        selected: false,
        subSections: [
          {
            id: 1,
            sectionId: 1,
            name: 'A',
            status: SectionStatus.Active
          },
          {
            id: 2,
            sectionId: 1,
            name: 'B',
            status: SectionStatus.Active
          },
          {
            id: 3,
            sectionId: 1,
            name: 'C',
            status: SectionStatus.Active
          }

        ]
      },
      {
        id: 2,
        name: 'PortMid',
        status: SectionStatus.Active,
        selected: false,
        subSections: [
          {
            id: 1,
            sectionId: 2,
            name: 'A',
            status: SectionStatus.Active
          },
          {
            id: 2,
            sectionId: 2,
            name: 'A',
            status: SectionStatus.Active
          },
          {
            id: 3,
            sectionId: 2,
            name: 'A',
            status: SectionStatus.Obsolete
          }
        ]
      }
    ];
  }

  onRowEditInit(section: Section) {
    section.selected = true;
    this.clonedSections[section.id] = section;
  }
  saveSection(){
    
  }


  onRowEditSave(section: Section) {

    delete this.clonedSections[section.id];
    section.selected = false;

  }

  onRowEditCancel(section: Section) {
    let currentSection = this.sections.find((o) => o.id === section.id);
    currentSection = this.clonedSections[section.id];
    delete this.clonedSections[section.id];
    section.selected = false;

  }

  onSectionStatusChange(section: Section, status: any) {

    section.status = status.key;
  }

  constructForm(): void {
    this.config.formList = [

      {
        type: FormType.text,
        label: 'Section Name',
        value: '',
        key: 'SectionName',
        validators: ['required'],
        disabled: false
      },
      {
        type: FormType.dropdown,
        label: 'Status',
        options: this.statusList,
         value: 'Active',
        key: 'SectionStatus',
        validators: ['required'],
        optionLabel: 'name',
        disabled: false
      }
    ];
  }

  formSubmitted(formData: any): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
       console.log(formData);
      }
    });
  }

  formOnchangeEvent(changedItem: any): void {
    console.log(changedItem.formItem);
    console.log(changedItem.formValue);
  }

  onSubmit(): void {

    if (this.formData.valid) {
      console.log('form submitted');
    }
  }
}
