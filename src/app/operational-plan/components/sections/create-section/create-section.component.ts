import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from '@kognifai/poseidon-message-service';
import { ConfirmationService } from 'primeng/api';
import { FormType } from 'src/app/app.constants';
import { FromBuilderService } from 'src/app/services/from-builder-service';
import { InstallationService } from 'src/app/services/installation.service';

@Component({
  selector: 'app-create-section',
  templateUrl: './create-section.component.html',
  styleUrls: ['./create-section.component.scss']
})
export class CreateSectionComponent implements OnInit {
  @Input() section: any;
  @Output() sectionAdded: EventEmitter<any> = new EventEmitter<any>();
  @Output() sectionEdited: EventEmitter<any> = new EventEmitter<any>();
  isDataLoading = true;
  editMode: boolean = false;
  PrepareInstallation: boolean = false;
  formValues: any = null;
  formType = FormType;
  formData: FormGroup;
  config = {
    formList: []
  };

  installationList: any  = [
    {
       id: 1,
       name: 'Active'
  },
  {
    id: 2,
    name: 'Obsloute'
   }

  ];

  constructor(
    private installationService: InstallationService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private formBuliderService: FromBuilderService,
    private route: ActivatedRoute,
    public fb: FormBuilder, public messageService: MessageService
  ) { }

  ngOnInit() {
    this.constructForm();
    this.formData = this.formBuliderService.buildForm(this.config);
    this.isDataLoading = false;
  }

  constructForm(): void {
    this.config.formList = [
      {
        type: FormType.text,
        label: 'Name',
        value: this.section ? this.section.name : '',
        key: 'SectionName',
        validators: [Validators.required, Validators.maxLength(20)],
        disabled: false
      },
      {
        type: FormType.dropdown,
        label: 'Status',
        options: this.installationList,
        value: '',
        key: 'SectionStatus',
        validators: [Validators.required],
        optionLabel: 'name',
        disabled: false
      }
    ];
  }

  onSubmit(): void {

    if (this.formData.valid) {
      if (this.editMode) {

      } else {
       
        this.addNewSection();
      }
     // console.log('form submitted');
    }
  }

  updateForm(sectionData: any): void {
    this.editMode = true;
    console.log('updateForm');
    console.log(sectionData);
    this.formData.controls.SectionName.setValue(sectionData.name);
    this.formData.controls.SectionStatus.setValue(sectionData.status);
  }

  formOnchangeEvent(changedItem: any): void {
    console.log(changedItem.formItem);
    console.log(changedItem.formValue);
  }
  onFormReset(): void {
    this.formData.reset();
    this.editMode = false;
  }

  addNewSection(): void {
    console.log('adnew');
    const newSection = this.formData.value;
    console.log(newSection);

  }

}
