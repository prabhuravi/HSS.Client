import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TreeNode } from 'primeng/api';
import { MessageService } from 'primeng/api';
import * as moment from 'moment';
import { take } from 'rxjs/operators';
import { FormType } from 'src/app/app.constants';
import { Contact } from 'src/app/models/Contact';
import { Operation, OperationType, SecondaryOperation } from 'src/app/models/Operation';
import { Section, SubSection, VesselSection } from 'src/app/models/Section';
import { FromBuilderService } from 'src/app/services/from-builder-service';
import { OperationalPlanService } from 'src/app/services/operational-plan.service';
import { OperatorBookingService } from 'src/app/services/operator-booking.service';
import { PrepareInstallationService } from 'src/app/services/prepare-installation.service';
import { ContactAdapter } from 'src/app/models/modelAdapter';

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
  operationToEdit: Operation;
  secondayOperationToEdit: SecondaryOperation;
  editOperation = false;
  showOperatorModal = false;
  selectedOperator: Contact = null;
  operatorList: Contact[] = [];
  secondaryOperationList: SecondaryOperation[] = [
    new SecondaryOperation(
       0,
       0,
       1,
       1,
       '',
       null,
       null,
       null
    ),
    new SecondaryOperation(
      1,
      0,
      1,
      1,
      '',
      null,
      null,
      null
   )

  ];

  @Output() operationUpdated: EventEmitter<any> = new EventEmitter<any>();
  @Output() secondaryOperationUpdated: EventEmitter<any> = new EventEmitter<any>();
  config = {
    formList: [],
    className: 'kx-col kx-col--12 kx-col--6@mob-m kx-col--5@tab-m kx-col--2@ltp-s'
  };
  isDataLoading = false;
  treeData: TreeNode[] = [];
  selectedTreeData = [];
  sections: VesselSection[] = [];
  subsections: SubSection[] = [];
  selectedSections = [];
  @Output() showListOperation = new EventEmitter<boolean>();

  constructor(private operationalPlanService: OperationalPlanService, private formBuliderService: FromBuilderService, private messageService: MessageService,
    private prepareInstallationService: PrepareInstallationService, private route: ActivatedRoute, private operatorBookingService: OperatorBookingService, private contactAdapter: ContactAdapter,
    public fb: FormBuilder, public datepipe: DatePipe) { }

  ngOnInit() {
    const params = this.route.snapshot.paramMap.get('vesselId');
    this.vesselId = parseInt(params, null);
    this.isDataLoading = true;
    this.operationalPlanService.getOperationMasterData().pipe(take(1)).subscribe((data) => {
      this.isDataLoading = false;
      this.operationTypes = data[0];
      // console.log(this.operationTypes);
      this.operationStatus = data[1];
      // console.log(this.operationStatus);
      this.requestedBy = data[2];
      // console.log(this.requestedBy);

      this.operationalPlanService.getSectionFoulingState(this.vesselId).pipe(take(1)).subscribe((data) => {
        this.sections = data;
        console.log(this.sections);
        this.formatResponseForTree();
        this.constructForm();
        this.formData = this.formBuliderService.buildForm(this.config);
      });
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
        // validators: [Validators.required],
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
      // {
      //   type: FormType.text,
      //   label: 'Description',
      //   value: '',
      //   key: 'description',
      //   validators: [Validators.required],
      //   disabled: false
      // },
      {
        type: FormType.textarea,
        label: 'Description',
        value: '',
        key: 'description',
        rows: 3,
        validators: [Validators.required],
        disabled: false
      }
    ];
  }

  goToListOperations() {
    this.showListOperation.emit(false);
  }

  createOperation(event) {
    this.editOperation = false;
    this.formData.reset();
    this.selectedOperator = null;
    this.selectedTreeData = null;
    this.selectedSections = [];
    this.formData.controls.operationStatus.setValue(this.operationStatus[0]);
    this.formData.controls.operationStatus.disable();
    this.formData.controls.operationStatus.updateValueAndValidity();
  }

  onOperationEdited(operation: Operation): void {
    console.log(operation);
    this.editOperation = true;
    this.selectedOperator = null;
    this.selectedTreeData = null;
    this.selectedSections = [];
    this.operationToEdit = operation;
    this.selectedOperator = this.contactAdapter.adapt(operation.Operator);
    this.operationalPlanService.getOperationSections(operation.Id).pipe(take(1)).subscribe((data) => {
      console.log(data);
    });
    this.formData.setValue({
      operationType: this.operationTypes.find((p) => p.Id === operation.OperationType.Id),
      operationDate: new Date(),
      // operationDate:  operation.Date,
      description: operation.Description,
      port: operation.PortLocation,
      vesselETB: new Date(),
      // vesselETB: operation.ETB,
      operationStatus: this.operationStatus.find((p) => p.Id === operation.OperationStatus.Id),
      requestedBy: this.requestedBy.find((p) => p.Id === operation.RequestedBy.Id)
    });
    this.formData.controls.operationStatus.enable();
    this.formData.controls.operationStatus.updateValueAndValidity();

    // console.log(this.selectedTreeData);
    // this.selectedTreeData = [{ "label": "Port Forward", "data": 3, "children": [{ "label": 1, "data": 9 }, { "label": 2, "data": 11 }, { "label": 3, "data": 12 }] }, { "label": "Port Mid", "data": 4, "children": [{ "label": 1, "data": 10 }] }, { "label": "Port Aft", "data": 5, "children": [{ "label": 1, "data": 13 }] }, { "label": "Startboard Forward", "data": 6, "children": [{ "label": 1, "data": 14 }] }, { "label": "Startboard Mid", "data": 7, "children": [{ "label": 1, "data": 15 }] }, { "label": "Startboard Aft", "data": 8, "children": [] }];
    // this.selectedTreeData = [{ "label": "Port Forward", "data": 3, "children": [{ "label": 1, "data": 9, "partialSelected": false }, { "label": 2, "data": 11, "partialSelected": false }, { "label": 3, "data": 12, "partialSelected": false }], "partialSelected": false }];
    // this.selectedTreeData = [{ "label": "Port Forward", "data": 3, "children": [{ "label": 1, "data": 9, "partialSelected": false }, { "label": 2, "data": 11, "partialSelected": false }, { "label": 3, "data": 12, "partialSelected": false }], "partialSelected": false }, { "label": 1, "data": 9, "partialSelected": false }, { "label": 2, "data": 11, "partialSelected": false }, { "label": 3, "data": 12, "partialSelected": false }];
  }

  onSecondaryOperationEdited(secOperation: SecondaryOperation): void {
    this.editOperation = true;
    this.secondayOperationToEdit = secOperation;
    console.log(this.secondayOperationToEdit);
    this.operationalPlanService.getSecondaryOperationSections(secOperation.Id).pipe(take(1)).subscribe((data) => {
      console.log(data);
    });
  }

  onSubmit(): void {
    console.log(this.formData);
    this.isFormSubmmited = true;
    console.log(this.selectedTreeData);
    const operation = {
      vesselId: this.vesselId,
      operationName: this.formData.controls.description.value,
      operationTypeId: this.formData.controls.operationType.value.Id,
      date: this.converDateToISOString(this.formData.controls.operationDate.value),
      statusId: this.formData.controls.operationStatus.value.Id,
      portId: this.formData.controls.port.value.Id,
      operatorId: this.selectedOperator.contactId,
      // hullSkaterId: 1,
      requestedById: this.formData.controls.requestedBy.value.Id,
      description: this.formData.controls.description.value,
      etb: this.formData.controls.vesselETB.value? this.converDateToISOString(this.formData.controls.vesselETB.value): null,
      createdBy: '',
      VesselSectionModel: this.selectedSections
    };

    console.log(operation);
    if (this.editOperation) {
      operation.createdBy = this.operationToEdit.CreatedBy;
      this.operationalPlanService.updateOperation(this.operationToEdit.Id, operation).pipe(take(1)).subscribe((data) => {
        console.log(data);
        this.triggerToast('success', 'Success Message', `Operation updated successfully`);
        // this.onFormReset();
        this.operationUpdated.emit(operation);
      });
    } else {
      this.operationalPlanService.createOperation(operation).pipe(take(1)).subscribe((data) => {
        console.log(data);
        this.triggerToast('success', 'Success Message', `Operation added successfully`);
        // this.onFormReset();
        this.operationUpdated.emit(operation);
      });
    }
  }

  updateSecondaryOperationList(event: any) {

  }

  createSecondaryOperation() {
    const secOperation = {
      OperationId: 5,
      OperationTypeId: 1,
      StatusId: 1,
      VesselSectionModel: this.selectedSections
    };
    console.log(secOperation);
    this.operationalPlanService.createSecondaryOperation(secOperation).pipe(take(1)).subscribe((data) => {
      console.log(data);
      this.triggerToast('success', 'Success Message', `Secondary operation added successfully`);
      this.secondaryOperationUpdated.emit(secOperation);
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
    const treeData: Array<{}> = [];
    this.sections.forEach((section) => {
      const childs: Array<{}> = [];
      const partialSelect = false;
      section.subSections.forEach((subSection) => {
        const child = {
          label: subSection.subSectionNumber,
          data: subSection.id
        };
        childs.push(child);
        if (section.id === 29) {
         this.selectedTreeData.push(child);
          // partialSelect = true;
         console.log(this.selectedTreeData);
        }
      });
      const parent = {
        label: section.name,
        data: section.id,
        children: childs,
        partialSelected: partialSelect
      };
      if (section.id === 29) {
      this.selectedTreeData.push(parent);
      }
      treeData.push(parent);
    });
    this.treeData = treeData;
    console.log(treeData);
    // console.log(JSON.stringify(treeData));
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
    console.log(this.selectedTreeData);
    // console.log(JSON.stringify(this.selectedTreeData));
    console.log(event.node);
    if (event.node.parent === undefined) {
      const sectionIndex: number = this.selectedSections.findIndex((p) => p.id === event.node.data);
      if (sectionIndex > -1) {  // if section already exists
        event.node.children.forEach((element) => {
          if (this.selectedSections[sectionIndex].subSections.findIndex((p) => p.id === element.data) === -1) { // add sub section if does not exist
            this.selectedSections[sectionIndex].subSections.push({ id: element.data, subSectionNumber: element.label });
          }
        });
      } else {
        const section = { id: event.node.data, name: event.node.label, subSections: [] };
        event.node.children.forEach((element) => {
          section.subSections.push({ id: element.data, subSectionNumber: element.label });
        });
        this.selectedSections.push(section);
      }
    }
    else {  // Sub Section
      const parentSectionIndex: number = this.selectedSections.findIndex(p => p.id == event.node.parent.data);
      console.log(parentSectionIndex);
      if (parentSectionIndex > -1) {
        this.selectedSections[parentSectionIndex].subSections.push({ id: event.node.data, subSectionNumber: event.node.label });
      } else {
        this.selectedSections.push({ id: event.node.parent.data, name: event.node.parent.label, subSections: [{ id: event.node.data, subSectionNumber: event.node.label }] });
      }
    }
    console.log(this.selectedSections);
    // this.messageService.add({severity: 'info', summary: 'Node Selected', detail: event.node.label});
  }

  nodeUnselect(event) {
    console.log(this.selectedTreeData);
    console.log(event.node);
    if (event.node.parent == undefined) // remove Section
    {
      const sectionIndex: number = this.selectedSections.findIndex(p => p.id == event.node.data);
      if (sectionIndex > -1) {
        this.selectedSections.splice(sectionIndex, 1);
      }
    } else {  // remove Sub Section
      const parentSectionIndex: number = this.selectedSections.findIndex((p) => p.id === event.node.parent.data);
      console.log(parentSectionIndex);
      if (parentSectionIndex > -1) {
        const subSectionIndex: number = this.selectedSections[parentSectionIndex].subSections.findIndex((p) => p.id === event.node.data);
        if (subSectionIndex > -1) {
          this.selectedSections[parentSectionIndex].subSections.splice(subSectionIndex, 1);
          if (this.selectedSections[parentSectionIndex].subSections.length === 0) {
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
    this.editOperation = false;
    this.selectedOperator = null;
    this.selectedTreeData = null;
    this.selectedSections = [];
    this.formData.controls.operationStatus.setValue(this.operationStatus[0]);
    this.formData.controls.operationStatus.disable();
    this.formData.controls.operationStatus.updateValueAndValidity();
  }

  showAvailableOperators(e: any) {
    e.preventDefault();
    if(this.formData.controls.operationDate.value)
    {
      this.showOperatorModal = !this.showOperatorModal;
      const bookingDate =  this.datepipe.transform(this.formData.controls.operationDate.value, 'yyyy-MM-dd');
      this.isDataLoading = true;
      this.operatorBookingService.getOperatorForVessel(this.vesselId, bookingDate).pipe(take(1)).subscribe((data) => {
        this.operatorList = data;
        this.isDataLoading = false;
        console.log(this.operatorList);
      });
    }
    else{
      this.triggerToast('error', 'Message', `Please select date field first`);
    }
  }

  changeOperator(operator: Contact) {
    console.log(operator);
    this.selectedOperator = operator;
  }

  selectOperator() {
  }

  triggerToast(severity: string, summary: string, detail: string): void {
    this.messageService.add(
      {
        severity,
        summary,
        detail
      });
  }

  converDateToISOString(date: any): string
  {
    date = new Date(date.toString());
    date = new Date(date.toString().slice(0, date.toString().indexOf('GMT')) + 'GMT').toISOString();
    return date;
  }
}
