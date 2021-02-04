import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { take } from 'rxjs/operators';
import { FormType } from 'src/app/app.constants';
import { Section, SectionStatus, SubSection, VesselSection } from 'src/app/models/Section';
import { FromBuilderService } from 'src/app/services/from-builder-service';
import { SectionService } from 'src/app/services/section.service';

@Component({
  selector: 'app-update-fouling-state',
  templateUrl: './update-fouling-state.component.html',
  styleUrls: ['./update-fouling-state.component.scss']
})
export class UpdateFoulingStateComponent implements OnInit {
  @Output() foulingStateUpdated: EventEmitter<any> = new EventEmitter<any>();
  @Output() foulingStateCancelled: EventEmitter<any> = new EventEmitter<any>();

  subSection: SubSection;
  // section: Section;

  sections: VesselSection[] = [];
  subSections: SubSection[] = [];
  isDataLoading = true;
  // editMode: boolean = false;
  formValues: any = null;
  formType = FormType;
  formData: FormGroup;
  config = {
    formList: []
  };

  sectionStatus: SectionStatus[] = [];
  foulingStates: IFoulingState[] = [];

  constructor(
    private sectionService: SectionService,
    private formBuliderService: FromBuilderService,
    public fb: FormBuilder, public messageService: MessageService
  ) { }

  ngOnInit() {

    this.sectionService.getFoulingStates().pipe(take(1)).subscribe((data) => {
      console.log(data);
      this.foulingStates = data;
      this.isDataLoading = false;

      this.sectionService.getSections().pipe(take(1)).subscribe((data) => {
        console.log(data);
        this.sections = data;
        this.isDataLoading = false;

        this.constructForm();
        this.formData = this.formBuliderService.buildForm(this.config);
        this.isDataLoading = false;
      });
    });

    // this.sectionService.getSections().pipe(take(1)).subscribe((data) => {
    //   console.log(data);
    //   this.sections = data;
    //   this.isDataLoading = false;
    // });
  }

  constructForm(): void {
    this.config.formList = [
      {
        type: FormType.dropdown,
        label: 'Section',
        options: this.sections,
        // value: this.sections[0],
        key: 'sectionName',
        validators: [Validators.required],
        optionLabel: 'name',
        disabled: false
      },
      {
        type: FormType.dropdown,
        label: 'Sub Section',
        options: this.subSections,
        // value: this.foulingStates[0],
        key: 'subSectionName',
        validators: [Validators.required],
        optionLabel: 'name',
        disabled: false
      },
      {
        type: FormType.dropdown,
        label: 'Fouling State',
        options: this.foulingStates,
        value: this.foulingStates[0],
        key: 'foulingState',
        validators: [Validators.required],
        optionLabel: 'State',
        disabled: false
      }
    ];
  }

  formOnchangeEvent(changedItem: any): void {
    console.log(changedItem);
    console.log(this.formData);
    const key = changedItem.formItem.key;
    console.log(key);
    switch (key) {
      case 'sectionName': {
        this.onSectionChanged(changedItem.formValue);
        break;
      }
      default: {
        console.log('Form Item not found');
        break;
      }
    }
  }

  onSectionChanged(section: VesselSection) {
    if (section) {
      if (section.subSections) {
        this.config.formList[1].options = section.subSections;
      }
    }

    // this.subSections = section.subSections;
    // console.log(this.subSections);

    // if (roleItem.id === 1) {
    //   this.formData.controls.tagTraining.enable();
    // } else {
    //   this.formData.controls.tagTraining.disable();
    //   this.formData.controls.tagTraining.setValue(false);
    // }
  }

  onSubmit(): void {
    if (this.formData.valid) {
      this.updateFoulingState();
      this.onFormReset();
    }
  }

  onFoulingStateEdited(data: any): void {
    console.log(data);
    // this.editMode = true;
    // this.subSection = data.subSection;
    // console.log(this.subSection);
    this.formData.controls.sectionName.setValue(data.section);
    this.onSectionChanged(data.section);
    this.formData.controls.subSectionName.setValue(data.subSection);
    // this.formData.controls.foulingState.setValue(data.subSection.foulingState);
    this.formData.controls.foulingState.setValue(this.foulingStates.find(x => x.Id == data.subSection.foulingState.Id));
    
    console.log(data.subSection.foulingState);
    // this.formData.controls.subSectionName.setValue(this.subSection.name);
    // this.formData.get('foulingState').patchValue(this.subSection.foulingState);
  }

  onFormReset(): void {
    // this.formData.reset();
    // this.foulingStateCancelled.emit(true);
  }

  updateFoulingState(): void {
    let subSection: SubSection = this.formData.value.subSectionName;
    subSection.foulingState = this.formData.value.foulingState;
    // const formValue = this.formData.value;
    // console.log(formValue.subSectionName);

    // this.subSection.sectionId = this.subSection.sectionId;
    // this.subSection.name = formValue.subSectionName;
    // this.subSection.foulingState = formValue.foulingState;
    console.log(subSection);
    this.foulingStateUpdated.emit(subSection);
  }

}
