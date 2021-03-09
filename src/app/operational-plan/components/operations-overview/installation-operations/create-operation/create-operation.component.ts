import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TreeNode } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Tree } from 'primeng/tree';
import { take } from 'rxjs/operators';
import { FormType } from 'src/app/app.constants';
import { Operation, VesselContact } from 'src/app/models/Operation';
import { Section, SubSection, VesselSection } from 'src/app/models/Section';
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
  operationTypes: IOperationTypes[] = [];
  operationStatus: IOperationStatus[] = [];
  requestedBy: IRequestedBy[] = [];
  isFormSubmmited: boolean = false;
  vesselId: number = 0;
  operations: Operation[] = [];
  editOperation = false;
  showOperatorModal = false;
  selectedOperator: any = null;

  operatorList = [{ Id: 1, FName: 'Fredrik', LName: 'Thoresen', IsAvailable: true, InstallationName: '', Status: '', Date: '', VesselETA: '' },
  { Id: 2, FName: 'Sarva', LName: 'Nanda', IsAvailable: false, InstallationName: '', Status: 'Not Confirmed', Date: '03.03.2021', VesselETA: '02.03.2021' },
  { Id: 3, FName: 'Prabhu', LName: 'Ravi', IsAvailable: true, InstallationName: '', Status: '', Date: '', VesselETA: '' }];
  config = {
    formList: [],
    className: 'kx-col kx-col--12 kx-col--6@mob-m kx-col--5@tab-m kx-col--2@ltp-s'
  };

  isDataLoading = false;
  // operationTypes = [{ Id: 1, Name: 'Inspection' }, { Id: 2, Name: 'Cleaning' }];
  operators = [{ Id: 1, Name: 'Fredrik' }, { Id: 2, Name: 'Daniel' }];
  // operationStatus = [{ Id: 1, Status: 'Requested' }, { Id: 2, Status: 'Completed' }];
  // requestedBy = [{ Id: 1, Name: 'Customer' }, { Id: 2, Name: 'Operator' }];
  // roleList: ContactRole[] = [];

  treeData: TreeNode[] = [];
  selectedTreeData: TreeNode;
  sections: VesselSection[] = [];
  subsections: SubSection[] = [];
  selectedSections = [];

  constructor(private operationalPlanService: OperationalPlanService, private formBuliderService: FromBuilderService, private messageService: MessageService,
    private prepareInstallationService: PrepareInstallationService,
    public fb: FormBuilder) { }

  ngOnInit() {
    this.vesselId = 1;
    // this.operationalPlanService.getSectionFoulingState(this.vesselId).pipe(take(1)).subscribe((data) => {
    //   this.sections = data;
    //   console.log(this.sections);
    //   this.formatResponseForTree();
    // });

    this.operationalPlanService.getOperations(1).pipe(take(1)).subscribe((data) => {
      console.log(data);
      this.operations = data;
      console.log(this.operations);
    });

    this.isDataLoading = true;
    this.operationalPlanService.getOperationMasterData().pipe(take(1)).subscribe((data) => {
      this.isDataLoading = false;
      this.operationTypes = data[0];
      this.operationStatus = data[1];
      this.requestedBy = data[2];

      this.operationalPlanService.getSectionFoulingState(this.vesselId).pipe(take(1)).subscribe((data) => {
        this.sections = data;
        console.log(this.sections);
        this.formatResponseForTree();

        this.constructForm();
        this.formData = this.formBuliderService.buildForm(this.config);

      });

      // this.constructForm();
      // this.formData = this.formBuliderService.buildForm(this.config);
    });

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
        optionLabel: 'OperationTypeName',
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
        disabled: false,
        format: 'mm/dd/yy'
      },
      {
        type: FormType.datepicker,
        label: 'ETB',
        value: '',
        key: 'vesselETB',
        validators: [Validators.required],
        disabled: false,
        format: 'mm/dd/yy'
      },
      // {
      //   type: FormType.dropdown,
      //   label: 'Section',
      //   options: this.sections,
      //   value: '',
      //   key: 'section',
      //   validators: [Validators.required],
      //   optionLabel: 'name',
      //   disabled: false
      // },
      // {
      //   type: FormType.multiSelect,
      //   label: 'Sub Section',
      //   options: this.subsections,
      //   value: '',
      //   key: 'subSection',
      //   validators: [Validators.required],
      //   optionLabel: 'subSectionNumber',
      //   disabled: false
      // },
      // {
      //   type: FormType.dropdown,
      //   label: 'Operator',
      //   options: this.operators,
      //   value: '',
      //   key: 'operator',
      //   validators: [Validators.required],
      //   optionLabel: 'Name',
      //   disabled: false
      // },
      {
        type: FormType.dropdown,
        label: 'Status',
        options: this.operationStatus,
        value: this.operationStatus[0],
        key: 'operationStatus',
        validators: [Validators.required],
        optionLabel: 'Name',
        disabled: true
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
    console.log(this.formData);

    // this.isFormSubmmited = true;
    // console.log(this.selectedTreeData);
    // var operation = {
    //   vesselId: this.vesselId,
    //   operationName: 'test operation',
    //   operationTypeId: this.formData.controls.operationType.value.Id,
    //   date: this.formData.controls.operationDate.value,
    //   statusId: this.formData.controls.operationStatus.value.Id,
    //   portId: this.formData.controls.port.value.Id,
    //   operatorId: this.formData.controls.operator.value.Id,
    //   // hullSkaterId: 1,
    //   requestedById: this.formData.controls.requestedBy.value.Id,
    //   description: this.formData.controls.description.value,
    //   etb: this.formData.controls.vesselETB.value,
    //   createdBy: 'sandek',
    //   SubSectionIds: [9, 11, 12]
    // };
    // console.log(operation);
    // this.operationalPlanService.createOperation(operation).pipe(take(1)).subscribe((data) => {
    //   console.log(data);
    //   this.triggerToast('success', 'Success Message', `Operation added successfully`);
    //   this.createSecondaryOperation();
    // });

    // this.onFormReset();
  }

  createSecondaryOperation() {
    var secOperation = {
      OperationId: 5,
      OperationTypeId: 1,
      StatusId: 1,
      SubSectionIds: [9, 11, 12]
    };
    console.log(secOperation);
    this.operationalPlanService.createSecondaryOperation(secOperation).pipe(take(1)).subscribe((data) => {
      console.log(data);
      this.triggerToast('success', 'Success Message', `Secondary operation added successfully`);
    });
  }

  getOperationTypes(): void {
    this.isDataLoading = true;
    this.operationalPlanService.getOperationTypes().pipe(take(1)).subscribe((operationtypeData) => {
      this.isDataLoading = false;
      this.operationTypes = operationtypeData;
    });
  }

  formatResponseForTree() {
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
  }

  formOnchangeEvent(changedItem: any): void {
    console.log(this.formData);
    const key = changedItem.formItem.key;
    console.log(key);
    switch (key) {
      case 'section': {
        this.onSectionChanged(changedItem.formValue);
        break;
      }

      default: {
        console.log('form Item not found');
        break;
      }
    }
  }

  onSectionChanged(section: VesselSection) {
    this.formData.controls.subSection.reset();
    if (section) {
      if (section.subSections) {
        this.config.formList[5].options = section.subSections;
        console.log(section.subSections);
      }
    }
  }

  nodeSelect(event) {
    console.log(event.node);
    if (event.node.parent == undefined) // Section
    {
      const sectionIndex: number = this.selectedSections.findIndex(p => p.id == event.node.data);
      if (sectionIndex > -1) {  // if section already exists
        event.node.children.forEach(element => {
          if (this.selectedSections[sectionIndex].subSections.findIndex(p => p.id == element.data) == -1) { // add sub section if does not exist
            this.selectedSections[sectionIndex].subSections.push({ id: element.data, subSectionNumber: element.label })
          }
        });
      }
      else {
        var section = { id: event.node.data, name: event.node.label, subSections: [] };
        event.node.children.forEach(element => {
          section.subSections.push({ id: element.data, subSectionNumber: element.label })
        });
        this.selectedSections.push(section);
      }

    }
    else {  // Sub Section
      const parentSectionIndex: number = this.selectedSections.findIndex(p => p.id == event.node.parent.data);
      console.log(parentSectionIndex);
      if (parentSectionIndex > -1) // section already exists
      {
        this.selectedSections[parentSectionIndex].subSections.push({ id: event.node.data, subSectionNumber: event.node.label });
      }
      else {
        this.selectedSections.push({ id: event.node.parent.data, name: event.node.parent.label, subSections: [{ id: event.node.data, subSectionNumber: event.node.label }] });
      }
    }
    console.log(this.selectedSections);
    // this.messageService.add({severity: 'info', summary: 'Node Selected', detail: event.node.label});
  }

  nodeUnselect(event) {
    console.log(event.node);

    if (event.node.parent == undefined) // remove Section
    {
      const sectionIndex: number = this.selectedSections.findIndex(p => p.id == event.node.data);
      if (sectionIndex > -1) {
        this.selectedSections.splice(sectionIndex, 1);
      }
    }
    else {  // remove Sub Section
      const parentSectionIndex: number = this.selectedSections.findIndex(p => p.id == event.node.parent.data);
      console.log(parentSectionIndex);
      if (parentSectionIndex > -1) // check of section already exists
      {
        const subSectionIndex: number = this.selectedSections[parentSectionIndex].subSections.findIndex(p => p.id == event.node.data);
        if (subSectionIndex > -1) {
          this.selectedSections[parentSectionIndex].subSections.splice(subSectionIndex, 1);
          if (this.selectedSections[parentSectionIndex].subSections.length == 0) // remove section as well when no subsections left selected
          {
            this.selectedSections.splice(parentSectionIndex, 1);
          }
        }
      }
    }
    console.log(this.selectedSections);
  }

  onFormReset(): void {
    this.isFormSubmmited = false;
    this.formData.reset();

    if (this.editOperation) {
      console.log('reset');
      this.formData.controls.operationStatus.enable();
      this.formData.controls.operationStatus.updateValueAndValidity();
    }
    else (!this.editOperation)
    {
      this.formData.controls.operationStatus.setValue(this.operationStatus[0]);
      this.formData.controls.operationStatus.disable();
      this.formData.controls.operationStatus.updateValueAndValidity();
    }

  }

  showAvailableOperators(e: any) {
    e.preventDefault();
    this.showOperatorModal = !this.showOperatorModal;
    console.log("showAvailableOperators");
  }

  changeOperator(operator: any) {
    console.log(operator);
    this.selectedOperator = operator;
  }

  selectOperator() {
    console.log('selectOperator');
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
