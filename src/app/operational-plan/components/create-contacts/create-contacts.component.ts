import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { AppConstants, FormType } from 'src/app/app.constants';
import { Contact, ContactRole } from 'src/app/models/Contact';
import { FromBuilderService } from 'src/app/services/from-builder-service';

@Component({
  selector: 'app-create-contacts',
  templateUrl: './create-contacts.component.html',
  styleUrls: ['./create-contacts.component.scss']
})
export class CreateContactsComponent implements OnInit {

  isDataLoading = true;
  formValues: any = null;
  formType = FormType;
  formData: FormGroup;
  PRIMENG_CONSTANTS = AppConstants.PRIMENG_CONSTANTS;
  config = {
    formList: []
  };

  cols = [
    { field: 'firstName',  header: 'First Name'},
    { field: 'surName', header: 'Surname' },
    { field: 'email',  header: 'Email'},
    { field: 'alternativePhone', header: 'Alternative Phone' },
    { field: 'Phone',  header: 'Phone' },
    { field: 'role', header: 'Role' },
    { field: 'tagTraining', header: 'Tag Training' },
    { field: 'action',  header: 'Actions' }
  ];

  contacts: Contact[] = [
    {
      firstName: 'Test1',
      surName: '1',
      email: 'test@tests.com',
      alternativePhone: '12234556',
      phone: '123211',
      Role: {
        id: 1,
        name: 'Skate Operator'
      },
      tagTraining: true
    },
    {
      firstName: 'Test2',
      surName: '2',
      email: 'test2@tests.com',
      alternativePhone: '1223321',
      phone: '122211',
      Role: {
        id: 1,
        name: 'Crew Mate'
      },
      tagTraining: false
    },
    {
      firstName: 'Test3',
      surName: '3',
      email: 'test3@tests.com',
      alternativePhone: '1223321',
      phone: '122211',
      Role: {
        id: 1,
        name: 'Ship Captain'
      },
      tagTraining: false
    }
  ];
  roleList: ContactRole[] = [
    {
      id: 1,
      name: 'Skate Operator'
    },
    {
      id: 2,
      name: 'Crew Mate'
    },
    {
      id: 3,
      name: 'Ship Captain'
    }
  ];

  constructor(private formBuliderService: FromBuilderService,
              private confirmationService: ConfirmationService,
              public fb: FormBuilder) { }

  ngOnInit() {
    this.constructForm();
    this.formData = this.formBuliderService.buildForm(this.config);
    this.isDataLoading = false;
  }
  constructForm(): void {
    this.config.formList = [

      {
        type: FormType.text,
        label: 'First Name',
        value: '',
        key: 'Fname',
        validators: ['required'],
        disabled: false
      },
      {
        type: FormType.text,
        label: 'Surname',
        value: '',
        key: 'SurName',
        validators: ['required'],
        disabled: false
      },
      {
        type: FormType.text,
        label: 'Email',
        value: '',
        key: 'Email',
        validators: ['required'],
        disabled: false
      },
      {
        type: FormType.text,
        label: 'Phone',
        value: '',
        key: 'Phone',
        validators: ['required'],
        disabled: false
      },
      {
        type: FormType.text,
        label: 'Alternative Phone',
        value: '',
        key: 'Aphone',
        validators: ['required'],
        disabled: false
      },
      {
        type: FormType.dropdown,
        label: 'Role',
        options: this.roleList,
        value: '',
        key: 'Vessel',
        validators: ['required'],
        optionLabel: 'Name',
        disabled: false
      },
      {
        type: FormType.checkbox,
        label: 'Tag Training',
        value: false,
        key: 'Aphone',
        validators: ['required'],
        disabled: false
      }

    ];
  }

  onSubmit(): void {

    if (this.formData.valid) {
      console.log('form submitted');
    }
  }

  formOnchangeEvent(changedItem: any): void {
    console.log(changedItem.formItem);
    console.log(changedItem.formValue);
  }

}
