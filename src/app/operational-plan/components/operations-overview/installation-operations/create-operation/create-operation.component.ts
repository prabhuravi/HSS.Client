import { DatePipe } from '@angular/common';
import { Component, ElementRef, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TreeNode } from 'primeng/api';
import { MessageService } from 'primeng/api';
import * as moment from 'moment';
import { take, timeout } from 'rxjs/operators';
import { FormType } from 'src/app/app.constants';
import { Contact } from 'src/app/models/Contact';
import { Operation, OperationType, SecondaryOperation } from 'src/app/models/Operation';
import { Section, SubSection, VesselSection } from 'src/app/models/Section';
import { FromBuilderService } from 'src/app/services/from-builder-service';
import { OperationalPlanService } from 'src/app/services/operational-plan.service';
import { OperatorBookingService } from 'src/app/services/operator-booking.service';
import { PrepareInstallationService } from 'src/app/services/prepare-installation.service';
import { ContactAdapter } from 'src/app/models/modelAdapter';
import { SecondryOperationListingComponent } from '../secondry-operation-listing/secondry-operation-listing.component';
import { CreateSecondryOperationComponent } from '../create-secondry-operation/create-secondry-operation.component';

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
  secondaryOperationList: SecondaryOperation[] = [];
  secondaryOperationsForEdit: SecondaryOperation[] = [];
  formsData = this.fb.group({
    title: [],
    formsArray: this.fb.array([])
  });
  formsArrayConfigs: any[] = [];
  form1Values: any = null;
  form2Values: any = null;
  displayMaximizable: boolean;
  vesselSectionArray: any[] = [];
  @ViewChild(SecondryOperationListingComponent, { static: false }) secondaryListingComponent: SecondryOperationListingComponent;
  @ViewChild(CreateSecondryOperationComponent, { static: false }) secondaryComponent: CreateSecondryOperationComponent;
  config = {
    formList: [],
    className: 'kx-col kx-col--12 kx-col--6@mob-m kx-col--5@tab-m kx-col--2@ltp-s'
  };
  config2 = {
    formList: [],
    className: 'kx-col kx-col--12 kx-col--6@mob-m kx-col--5@tab-m kx-col--2@ltp-s'
  };
  isDataLoading = false;
  sections: VesselSection[] = [];
  gobalSelectedSubSectionId: number[] = [];
  subsections: SubSection[] = [];
  @Output() showListOperation = new EventEmitter<boolean>();
  isFormDataReady = false;

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
      this.operationStatus = data[1];
      this.requestedBy = data[2];
      this.operationalPlanService.getSectionFoulingState(this.vesselId).pipe(take(1)).subscribe((data) => {
        this.sections = data;
        // console.log(this.sections);
        this.formsData = this.fb.group({
          title: [],
          formsArray: this.fb.array([])
        });
        this.constructFormPart1(this.config);
        this.formsArray.push(this.formBuliderService.buildForm(this.config));
        this.formsArrayConfigs.push(this.config);
        this.constructFormPart2(this.config2);
        this.formsArray.push(this.formBuliderService.buildForm(this.config2));
        this.formsArrayConfigs.push(this.config2);
        this.isFormDataReady = true;
      });
    });
  }

  get formsArray() {
    return this.formsData.get('formsArray') as FormArray;
  }

  constructFormPart1(config: any): void {
    config.formList = [
      {
        type: FormType.text,
        label: 'Assignment Type',
        value: 'Primary',
        key: 'assignmentType',
        validators: [Validators.required],
        disabled: true
      },
      {
        type: FormType.dropdown,
        label: 'Type',
        options: this.operationTypes,
        value: this.operationTypes[0],
        key: 'operationType',
        validators: [Validators.required],
        optionLabel: 'OperationTypeName',
        disabled: false
      },
      {
        type: FormType.dropdown,
        label: 'Status',
        options: this.operationStatus,
        value: this.operationStatus[0],
        key: 'operationStatus',
        validators: [Validators.required],
        optionLabel: 'Name',
        disabled: false
      }
    ];
  }
  constructFormPart2(config: any): void {
    config.formList = [
      {
        type: FormType.autocomplete,
        label: 'Port',
        value: '',
        key: 'port',
        // validators: [Validators.required],
        optionLabel: 'PortName',
        disabled: false
      },
      {
        type: FormType.dropdown,
        label: 'Requested By',
        options: this.requestedBy,
        value: '',
        key: 'requestedBy',
        // validators: [Validators.required],
        optionLabel: 'Name',
        disabled: false
      },
      {
        type: FormType.datepicker,
        label: 'Date',
        value: '',
        key: 'operationDate',
        // validators: [Validators.required],
        disabled: false,
        format: 'mm/dd/yy'
      },
      {
        type: FormType.datepicker,
        label: 'ETB',
        value: '',
        key: 'vesselETB',
        disabled: false,
        format: 'mm/dd/yy'
      },
      {
        type: FormType.textarea,
        label: 'Description',
        value: '',
        key: 'description',
        rows: 3,
        // validators: [Validators.required],
        disabled: false
      }
    ];
  }

  goToListOperations() {
    this.onFormReset();
    this.showListOperation.emit(false);
  }

  displayModal: boolean;
  showModalDialog() {
    this.displayModal = true;
  }

  addSecondaryOperationToList(event, element) {
    this.displayModal = false;
    // element.hide(event);
    this.secondaryListingComponent.updateSecondaryOperationList(new SecondaryOperation(0, 0, 2, 1, '', null, null, null));
  }

  onEditOperation(operation: Operation): void {
    console.log(operation);
    this.editOperation = true;
    this.selectedOperator = null;
    this.operationToEdit = operation;

    this.operationalPlanService.getSecondaryOperations(operation.Id).pipe(take(1)).subscribe((data) => {
      this.secondaryOperationsForEdit = data;
      console.log(this.secondaryOperationsForEdit);
      this.secondaryOperationsForEdit.forEach(element => {
        this.secondaryListingComponent.updateSecondaryOperationList(element);
        this.secondaryListingComponent.editOperation = true;
      });
    });

    this.selectedOperator = operation.Operator ? this.contactAdapter.adapt(operation.Operator) : null;
    this.operationalPlanService.getOperationSections(operation.Id).pipe(take(1)).subscribe((data) => {
      console.log(data);
    });

    const formsArrayAsAny = this.formsData.controls.formsArray as any;
    formsArrayAsAny.controls[0].setValue({
      assignmentType: 'Primary',
      operationType: this.operationTypes.find(p => p.Id == operation.OperationType.Id),
      operationStatus: this.operationStatus.find(p => p.Id == operation.OperationStatus.Id),
    });
    formsArrayAsAny.controls[1].setValue({
      port: operation.PortLocation ? operation.PortLocation : '',
      operationDate: operation.Date ? moment(operation.Date).toDate() : null,
      vesselETB: operation.ETB ? moment(operation.ETB).toDate() : null,
      requestedBy: operation.RequestedBy ? this.requestedBy.find(p => p.Id == operation.RequestedBy.Id) : null,
      description: operation.Description,
    });
    // formsArrayAsAny.controls[0].controls.operationStatus.enable();
    // formsArrayAsAny.controls[0].controls.operationStatus.updateValueAndValidity();
  }

  onSubmit(): void {
    console.log(this.formsData);
    const secondaryOpearations = this.secondaryListingComponent.updatedSecondaryOperations;
    this.isFormSubmmited = true;
    const formsArrayAsAny = this.formsData.controls.formsArray as any;
    const operation = {
      vesselId: this.vesselId,
      operationTypeId: formsArrayAsAny.controls[0].controls.operationType.value.Id,
      date: formsArrayAsAny.controls[1].controls.operationDate.value ? this.converDateToISOString(formsArrayAsAny.controls[1].controls.operationDate.value) : null,
      statusId: formsArrayAsAny.controls[0].controls.operationStatus.value.Id,
      portId: formsArrayAsAny.controls[1].controls.port.value ? formsArrayAsAny.controls[1].controls.port.value.Id : null,
      operatorId: this.selectedOperator ? this.selectedOperator.contactId : null,
      // hullSkaterId: 1,
      requestedById: formsArrayAsAny.controls[1].controls.requestedBy.value ? formsArrayAsAny.controls[1].controls.requestedBy.value.Id : null,
      description: formsArrayAsAny.controls[1].controls.description.value ? formsArrayAsAny.controls[1].controls.description.value : '',
      operationName: formsArrayAsAny.controls[1].controls.description.value ? formsArrayAsAny.controls[1].controls.description.value : '',
      etb: formsArrayAsAny.controls[1].controls.vesselETB.value ? this.converDateToISOString(formsArrayAsAny.controls[1].controls.vesselETB.value) : null,
      createdBy: '',
      VesselSectionModel: this.vesselSectionArray,
      SecondaryOperations: secondaryOpearations
    };
    console.log(this.vesselSectionArray);
    console.log(operation);
    if (this.editOperation) {
      operation.createdBy = this.operationToEdit.CreatedBy;
      this.isDataLoading = true;
      this.operationalPlanService.updateOperation(this.operationToEdit.Id, operation).pipe(take(1)).subscribe((data) => {
        console.log(data);
        this.isDataLoading = false;
        this.triggerToast('success', 'Success Message', `Operation updated successfully`);
      });
    } else {
      this.isDataLoading = true;
      this.operationalPlanService.createOperation(operation).pipe(take(1)).subscribe((data) => {
        console.log(data);
        this.isDataLoading = false;
        this.triggerToast('success', 'Success Message', `Operation added successfully`);
        this.onFormReset();
      });
    }
  }

  formOnchangeEvent(changedItem: any): void {
    const key = changedItem.formItem.key;
    switch (key) {
      case 'section': {
        break;
      }
      default: {
        break;
      }
    }
  }

  onFormReset(): void {
    this.isFormSubmmited = false;
    this.formsData.reset();
    this.editOperation = false;
    this.selectedOperator = null;
    const formsArrayAsAny = this.formsData.controls.formsArray as any;
    formsArrayAsAny.controls[0].controls.assignmentType.setValue('Primary');
    formsArrayAsAny.controls[0].controls.operationStatus.setValue(this.operationStatus[0]);
    // formsArrayAsAny.controls[0].controls.operationStatus.disable();
    // formsArrayAsAny.controls[0].controls.operationStatus.updateValueAndValidity();
    this.gobalSelectedSubSectionId = [];
    if (this.secondaryListingComponent) {
      this.secondaryListingComponent.clearSecondaryListing();
    }
    if (this.secondaryComponent) {
      this.secondaryComponent.clearForm();
    }
  }

  showAvailableOperators(e: any) {
    e.preventDefault();
    const formsArrayAsAny = this.formsData.controls.formsArray as any;
    if (formsArrayAsAny.controls[1].controls.operationDate.value) {
      this.showOperatorModal = !this.showOperatorModal;
      const bookingDate = this.datepipe.transform(formsArrayAsAny.controls[1].controls.operationDate.value, 'yyyy-MM-dd');
      this.isDataLoading = true;
      this.operatorBookingService.getOperatorForVessel(this.vesselId, bookingDate).pipe(take(1)).subscribe((data) => {
        this.operatorList = data;
        this.isDataLoading = false;
        console.log(this.operatorList);
      });
    } else {
      this.triggerToast('error', 'Message', `Please select date field first`);
    }
  }

  changeOperator(operator: Contact) {
    this.selectedOperator = operator;
  }

  showMaximizableDialog() {
    this.displayMaximizable = true;
  }

  onSectionSelected(section: VesselSection) {
    if (section.selected) {
      section.selected = false;
      section.subSections.forEach((subSection) => {
        subSection.selected = false;
      });
    } else {
      section.selected = true;
      section.subSections.forEach((subSection) => {
        subSection.selected = true;
      });
    }
    this.selectSectionSubsection();
  }

  onSubSectionSelected(rowsection: VesselSection, rowsubSection: SubSection) {
    if (rowsubSection.selected) {
      rowsubSection.selected = false;
      rowsection.selected = false;
    } else {
      rowsubSection.selected = true;

      const unSelectednode = rowsection.subSections.find((x) => x.selected === false);
      if (!unSelectednode) {
        rowsection.selected = true;
      }
    }
    this.selectSectionSubsection();
  }

  selectSectionSubsection() {
    const vesselSection = JSON.parse(JSON.stringify(this.sections)) as VesselSection[];
    this.vesselSectionArray = [];
    vesselSection.forEach((sections) => {
      const selectedSubsections = sections.subSections.filter((x) => x.selected === true);
      if (selectedSubsections.length > 0) {
        const section = JSON.parse(JSON.stringify(sections));
        section.subSections = selectedSubsections;
        this.vesselSectionArray.push(section);
      }
    });
    console.log(this.vesselSectionArray);
  }

  triggerToast(severity: string, summary: string, detail: string): void {
    this.messageService.add(
      {
        severity,
        summary,
        detail
      });
  }

  converDateToISOString(date: any): string {
    date = new Date(date.toString());
    date = new Date(date.toString().slice(0, date.toString().indexOf('GMT')) + 'GMT').toISOString();
    return date;
  }
}
