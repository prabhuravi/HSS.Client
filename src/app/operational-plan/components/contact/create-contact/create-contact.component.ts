import { EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { FormType } from 'src/app/app.constants';
import { Contact, ContactRole } from 'src/app/models/Contact';
import { ContactAdapter } from 'src/app/models/modelAdapter';
import { FromBuilderService } from 'src/app/services/from-builder-service';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.scss']
})
export class CreateContactComponent implements OnInit {
  formValues: any = null;
  formType = FormType;
  formData: FormGroup;
  contact: Contact;
  config = {
    formList: [],
    className: 'kx-col kx-col--3 kx-col--6@mob-m kx-col--3@tab-m kx-col--3@ltp-s'
  };

  @Output() contactUpdated: EventEmitter<any> = new EventEmitter<any>();

  isDataLoading = false;
  editMode: boolean = false;

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
              private contactAdapter: ContactAdapter,
              private confirmationService: ConfirmationService,
              public fb: FormBuilder) { }

  ngOnInit() {
    this.constructForm();
    this.formData = this.formBuliderService.buildForm(this.config);
  }

  constructForm(): void {
    this.config.formList = [

      {
        type: FormType.text,
        label: 'First Name',
        value: '',
        key: 'firstName',
        validators: [Validators.required, Validators.maxLength(15)],
        disabled: false
      },
      {
        type: FormType.text,
        label: 'Surname',
        value: '',
        key: 'surName',
        validators: [Validators.maxLength(15)],
        disabled: false
      },
      {
        type: FormType.text,
        label: 'Email',
        value: '',
        key: 'email',
        validators: [Validators.required, Validators.email],
        disabled: false
      },
      {
        type: FormType.text,
        label: 'Phone',
        value: '',
        key: 'phone',
        validators: [Validators.required, Validators.minLength(10), Validators.maxLength(15), Validators.pattern(this.formBuliderService.phoneNumberPattern)],
        disabled: false
      },
      {
        type: FormType.text,
        label: 'Alternative Phone',
        value: '',
        key: 'alternativePhone',
        validators: [Validators.minLength(10), Validators.maxLength(15), Validators.pattern(this.formBuliderService.phoneNumberPattern)],
        disabled: false
      },
      {
        type: FormType.dropdown,
        label: 'Role',
        options: this.roleList,
        value: '',
        key: 'role',
        validators: [Validators.required],
        optionLabel: 'name',
        disabled: false
      },
      {
        type: FormType.checkbox,
        label: 'Tag Training',
        value: false,
        key: 'tagTraining',
        validators: [],
        disabled: true
      }

    ];
  }

  onSubmit(): void {

      if (this.editMode) {
        this.saveContact();
      } else {

        this.addNewContact();
      }
      this.onFormReset();

  }

  formOnchangeEvent(changedItem: any): void {
    console.log(this.formData);
    const key = changedItem.formItem.key;
    console.log(key);
    switch (key) {
      case 'role': {
        this.onRoleChanged(changedItem.formValue);
        break;
      }

      default: {
        console.log('form Item not found');
        break;
      }
    }
  }

  onRoleChanged(roleItem: ContactRole) {
    console.log(roleItem);
    if (roleItem.id === 1) {
      this.formData.controls.tagTraining.enable();
    } else {
      this.formData.controls.tagTraining.disable();
      this.formData.controls.tagTraining.setValue(false);
    }
  }

  onFormReset(): void {
    this.formData.reset();
    this.formData.controls.tagTraining.disable();
    this.editMode = false;
  }

  sectionEditInit(contactData: Contact): void {
    this.editMode = true;
    this.contact = contactData;
    this.formData.controls.firstName.setValue(contactData.firstName);
    this.formData.controls.surName.setValue(contactData.surName);
    this.formData.controls.email.setValue(contactData.email);
    this.formData.controls.phone.setValue(contactData.phone);
    this.formData.controls.alternativePhone.setValue(contactData.alternativePhone);
    this.formData.controls.role.setValue(contactData.role);
    this.formData.controls.tagTraining.setValue(contactData.tagTraining);
    if (contactData.role.id === 1) {
      this.formData.controls.tagTraining.enable();
    } else {
      this.formData.controls.tagTraining.disable();
    }
  }

  saveContact(): void {
    console.log('save');
    console.log(this.formData.value);

    this.contact.firstName =  this.formData.controls.firstName.value;
    this.contact.surName = this.formData.controls.surName.value;
    this.contact.email = this.formData.controls.email.value;
    this.contact.phone  = this.formData.controls.phone.value;
    this.contact.alternativePhone = this.formData.controls.alternativePhone.value;
    this.contact.role = this.formData.controls.role.value;
    this.contact.tagTraining = this.formData.controls.tagTraining.value;
    this.contactUpdated.emit(this.contact);
  }

  addNewContact(): void {
    console.log('add');
    const newContact = this.contactAdapter.adapt(this.formData.value);
    newContact.id = Math.floor(Math.random() * 999999) + 1;
    console.log(newContact);
    this.contactUpdated.emit(newContact);
  }

}
