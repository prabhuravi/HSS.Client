import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TreeNode } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Tree } from 'primeng/tree';
import { take } from 'rxjs/operators';
import { FormType } from 'src/app/app.constants';
import { Section, VesselSection } from 'src/app/models/Section';
import { FromBuilderService } from 'src/app/services/from-builder-service';
import { OperationalPlanService } from 'src/app/services/operational-plan.service';
import { PrepareInstallationService } from 'src/app/services/prepare-installation.service';

@Component({
  selector: 'app-create-operation',
  templateUrl: './create-operation.component.html',
  styleUrls: ['./create-operation.component.scss']
})
export class CreateOperationComponent implements OnInit {

  formValues: any = null;
  formType = FormType;
  formData: FormGroup;
  // contact: Contact;
  isFormSubmmited: boolean = false;
  config = {
    formList: [],
    className: 'kx-col kx-col--12 kx-col--6@mob-m kx-col--5@tab-m kx-col--2@ltp-s'
  };

  isDataLoading = false;
  editMode: boolean = false;

  operationTypes = [{ Id: 1, Name: 'Inspection' }, { Id: 2, Name: 'Cleaning' }];
  operators = [{ Id: 1, Name: 'Fredrik' }, { Id: 2, Name: 'Daniel' }];
  operationStatus = [{ Id: 1, Status: 'Requested' }, { Id: 2, Status: 'Completed' }];
  requestedBy = [{ Id: 1, Name: 'Customer' }, { Id: 2, Name: 'Operator' }];
  // roleList: ContactRole[] = [];

  treeData: TreeNode[] = [];
  selectedTreeData: TreeNode;
  sections: VesselSection[]

  constructor(private operationalPlanService: OperationalPlanService, private formBuliderService: FromBuilderService, private messageService: MessageService,
    private prepareInstallationService: PrepareInstallationService,
    public fb: FormBuilder) { }

  ngOnInit() {
    this.operationalPlanService.getSectionFoulingState(1).pipe(take(1)).subscribe((data) => {
      this.sections = data;
      console.log(this.sections);

      let treeData: {}[] = [];
      this.sections.forEach(section => {
        let childs: {}[] = [];
        section.subSections.forEach(subSection => {
          var child = {
            "label": subSection.subSectionNumber,
            "data": subSection.id,
          };
          childs.push(child);
        });
        var parent =
        {
          "label": section.name,
          "data": section.id,
          "children": childs
        };
        treeData.push(parent);
      });
      this.treeData = treeData;
      console.log(treeData);
    });

    this.constructForm();
    this.formData = this.formBuliderService.buildForm(this.config);
  }

  constructForm(): void {
    this.config.formList = [
      {
        type: FormType.dropdown,
        label: 'Operation Type',
        options: this.operationTypes,
        value: '',
        key: 'operationType',
        validators: [Validators.required],
        optionLabel: 'Name',
        disabled: false
      },
      {
        type: FormType.autocomplete,
        label: 'Port',
        value: '',
        key: 'port',
        validators: [Validators.required],
        optionLabel: 'PortName',
        disabled: false
      },
      {
        type: FormType.datepicker,
        label: 'Date',
        value: '',
        key: 'operationDate',
        validators: [Validators.required],
        disabled: false
      },
      {
        type: FormType.datepicker,
        label: 'ETB',
        value: '',
        key: 'vesselETB',
        validators: [Validators.maxLength(15)],
        disabled: false
      },
      {
        type: FormType.dropdown,
        label: 'Operator',
        options: this.operators,
        value: '',
        key: 'operator',
        validators: [Validators.required],
        optionLabel: 'Name',
        disabled: false
      },
      {
        type: FormType.dropdown,
        label: 'Status',
        options: this.operationStatus,
        value: '',
        key: 'operationStatus',
        validators: [Validators.required],
        optionLabel: 'Status',
        disabled: false
      },
      {
        type: FormType.dropdown,
        label: 'Requested By',
        options: this.requestedBy,
        value: '',
        key: 'requestedBy',
        validators: [Validators.required],
        optionLabel: 'Name',
        disabled: false
      },
      {
        type: FormType.text,
        label: 'Description',
        value: '',
        key: 'description',
        validators: [Validators.required],
        disabled: false
      }

    ];
  }

  onSubmit(): void {
    this.isFormSubmmited = true;
    console.log(this.formData);
    console.log(this.selectedTreeData);
    // this.onFormReset();
  }

  formOnchangeEvent(changedItem: any): void {
    console.log(this.formData);
    const key = changedItem.formItem.key;
    console.log(key);
    switch (key) {
      case 'role': {
        // this.onRoleChanged(changedItem.formValue);
        break;
      }

      default: {
        console.log('form Item not found');
        break;
      }
    }
  }

  // onRoleChanged(roleItem: ContactRole) {
  //   console.log(roleItem);
  //   if (roleItem.id === 3) {
  //     this.formData.controls.tagTraining.enable();
  //   } else {
  //     this.formData.controls.tagTraining.disable();
  //     this.formData.controls.tagTraining.setValue(false);
  //   }
  // }

  onFormReset(): void {
    this.isFormSubmmited = false;
    console.log('reset');
    this.formData.reset();
    // this.formData.controls.tagTraining.disable();
    // this.editMode = false;
  }

  // sectionEditInit(contactData: Contact): void {
  //   this.editMode = true;
  //   this.contact = contactData;
  //   this.formData.controls.name.setValue(contactData.name);
  //   this.formData.controls.surName.setValue(contactData.surName);
  //   this.formData.controls.email.setValue(contactData.email);
  //   this.formData.controls.phone.setValue(contactData.phone);
  //   this.formData.controls.alternativePhone.setValue(contactData.alternativePhone);
  //   this.formData.controls.role.setValue(contactData.ContactType);
  //   this.formData.controls.tagTraining.setValue(contactData.tagTraining);
  //   if (contactData.ContactType.id === 3) {
  //     this.formData.controls.tagTraining.enable();
  //   } else {
  //     this.formData.controls.tagTraining.disable();
  //   }
  // }

  // saveContact(): void {
  //   console.log('save');
  //   console.log(this.formData.value);
  //   this.contact.name =  this.formData.controls.name.value;
  //   this.contact.surName = this.formData.controls.surName.value;
  //   this.contact.email = this.formData.controls.email.value;
  //   this.contact.phone  = this.formData.controls.phone.value;
  //   this.contact.alternativePhone = this.formData.controls.alternativePhone.value;
  //   this.contact.ContactType = this.formData.controls.role.value;
  //   this.contact.contactTypeId = this.formData.controls.role.value.id;
  //   this.contact.vesselId = this.prepareInstallationService.installation.id;
  //   this.contact.tagTraining = this.formData.controls.tagTraining.value;
  //   this.contactService.updateVesselContact(this.contact).pipe(take(1)).subscribe((data) => {
  //     this.onFormReset();
  //     this.editMode = false;
  //     this.contactUpdated.emit(this.contact);
  //     });
  // }

  // addNewContact(): void {
  //   const newContact = this.contactAdapter.adapt(this.formData.value);
  //   newContact.contactTypeId = this.formData.controls.role.value.id;
  //   newContact.vesselId = this.prepareInstallationService.installation.id;
  //   console.log(newContact);
  //   this.contactService.createVesselContact(newContact).pipe(take(1)).subscribe((data) => {
  //     newContact.id = data.id;
  //     console.log(data);
  //     this.triggerToast('success', 'Success Message', `contact added successfully`);
  //     this.contactUpdated.emit(newContact);
  //   });
  // }

  triggerToast(severity: string, summary: string, detail: string): void {
    this.messageService.add(
      {
        severity,
        summary,
        detail
      });
  }

}
