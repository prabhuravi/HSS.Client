import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { take } from 'rxjs/operators';
import { FormType } from 'src/app/app.constants';
import { Contact, ContactRole } from 'src/app/models/Contact';
import { ContactAdapter } from 'src/app/models/modelAdapter';
import { ContactService } from 'src/app/services/contact.service';
import { FromBuilderService } from 'src/app/services/from-builder-service';
import { PrepareInstallationService } from 'src/app/services/prepare-installation.service';

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
  isFormSubmmited: boolean = false;
  config = {
    formList: [],
    className: 'kx-col kx-col--12 kx-col--6@mob-m kx-col--5@tab-m kx-col--3@ltp-s'
  };
  @Output() contactUpdated: EventEmitter<any> = new EventEmitter<any>();
  @Input() isOperationScreen: boolean;
  @Input() operation: any;
  isDataLoading = false;
  editMode: boolean = false;
  roleList: ContactRole[] = [];

  constructor(private formBuliderService: FromBuilderService,
              private contactAdapter: ContactAdapter,
              private contactService: ContactService,
              private messageService: MessageService,
              private prepareInstallationService: PrepareInstallationService,
              public fb: FormBuilder) { }

  ngOnInit() {
    this.isDataLoading = true;
    this.contactService.getContactTypes().pipe(take(1)).subscribe((data) => {
      this.isDataLoading = false;
      if (this.operation) {
        this.roleList = data.filter((x) => x.id >= 3 && x.id <= 5);
      } else {
        this.roleList = data;
      }
      this.constructForm();
      this.formData = this.formBuliderService.buildForm(this.config);
    });
  }

  constructForm(): void {
    this.config.formList = [
      {
        type: FormType.text,
        label: 'First Name',
        value: '',
        key: 'name',
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
        type: FormType.phone,
        label: 'Phone',
        value: '',
        key: 'phone',
        disabled: false
      },
      {
        type: FormType.phone,
        label: 'Alternative Phone',
        value: '',
        key: 'alternativePhone',
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
      }
    ];

    if (!this.isOperationScreen) {
      this.config.formList.push(
        {
          type: FormType.checkbox,
          label: 'Tag Training',
          value: false,
          key: 'tagTraining',
          validators: [],
          disabled: true
        }
      );
    } else {
      this.config.className = 'kx-col kx-col--12 kx-col--6@mob-m kx-col--5@tab-m kx-col--6@ltp-s';
    }
  }

  onSubmit(): void {
    this.isFormSubmmited = true;
    if (this.editMode) {
      this.saveContact();
    } else {
      this.addNewContact();
    }
    this.onFormReset();

  }

  formOnchangeEvent(changedItem: any): void {
    const key = changedItem.formItem.key;
    switch (key) {
      case 'role': {
        this.onRoleChanged(changedItem.formValue);
        break;
      }
      default: {
        break;
      }
    }
  }

  onRoleChanged(roleItem: ContactRole) {
    if (roleItem.name === 'Skate Operator') {
      if (this.formData.controls.tagTraining) {
        this.formData.controls.tagTraining.enable();
      }
    } else {
      if (this.formData.controls.tagTraining) {
      this.formData.controls.tagTraining.disable();
      this.formData.controls.tagTraining.setValue(false);
      }
    }
  }

  onFormReset(): void {
    this.isFormSubmmited = false;
    this.formData.reset();
    if (this.formData.controls.tagTraining) {
    this.formData.controls.tagTraining.disable();
    }
    this.editMode = false;
  }

  sectionEditInit(contactData: Contact): void {
    this.editMode = true;
    this.contact = contactData;
    this.formData.controls.name.setValue(contactData.name);
    this.formData.controls.surName.setValue(contactData.surName);
    this.formData.controls.email.setValue(contactData.email);
    this.formData.controls.phone.setValue(contactData.phone);
    this.formData.controls.alternativePhone.setValue(contactData.alternativePhone);
    this.formData.controls.role.setValue(contactData.ContactType);
    if (this.formData.controls.tagTraining) {
    this.formData.controls.tagTraining.setValue(contactData.tagTraining);
    if (contactData.ContactType.name === 'Skate Operator') {
      this.formData.controls.tagTraining.enable();
    } else {
      this.formData.controls.tagTraining.disable();
    }
  }
  }

  saveContact(): void {
    this.contact.name = this.formData.controls.name.value;
    this.contact.surName = this.formData.controls.surName.value;
    this.contact.email = this.formData.controls.email.value;
    this.contact.phone = this.formData.controls.phone.value ? this.formData.controls.phone.value.e164Number : null;
    this.contact.alternativePhone = this.formData.controls.alternativePhone.value ? this.formData.controls.alternativePhone.value.e164Number : null;
    this.contact.ContactType = this.formData.controls.role.value;
    this.contact.contactTypeId = this.formData.controls.role.value.id;
    if (this.operation) {
      this.contact.operationId = this.operation.Id;
    } else {
      this.contact.vesselId = this.prepareInstallationService.installation.id;
    }
    if (this.formData.controls.tagTraining) {
    this.contact.tagTraining = this.formData.controls.tagTraining.value;
    } else {
      this.contact.tagTraining = false;
    }
    this.contactService.updateVesselContact(this.contact).pipe(take(1)).subscribe((data) => {
      this.onFormReset();
      this.editMode = false;
      this.contactUpdated.emit(this.contact);
    });
  }

  addNewContact(): void {
    console.log('Add contact Operation');
    const newContact = this.contactAdapter.adapt(this.formData.value);
    newContact.contactTypeId = this.formData.controls.role.value.id;
    if (this.operation) {
      newContact.operationId = this.operation.Id;
    } else {
      newContact.vesselId = this.prepareInstallationService.installation.id;
    }

    if (this.formData.controls.phone.value != null) {
      newContact.phone = this.formData.controls.phone.value.e164Number;
    }
    if (this.formData.controls.alternativePhone.value != null) {
      newContact.alternativePhone = this.formData.controls.alternativePhone.value.e164Number;
    }
    if (!this.operation) {
      this.contactService.createVesselContact(newContact).pipe(take(1)).subscribe((data) => {
        newContact.id = data.id;
        this.triggerToast('success', 'Success Message', `contact added successfully`);
        this.contactUpdated.emit(newContact);
      });
    } else {
      this.contactService.createOperationContact(newContact).pipe(take(1)).subscribe((data) => {
        newContact.id = data.id;
        this.triggerToast('success', 'Success Message', `contact added successfully`);
        this.contactUpdated.emit(newContact);
      });
    }

  }

  triggerToast(severity: string, summary: string, detail: string): void {
    this.messageService.add(
      {
        severity,
        summary,
        detail
      });
  }

}
