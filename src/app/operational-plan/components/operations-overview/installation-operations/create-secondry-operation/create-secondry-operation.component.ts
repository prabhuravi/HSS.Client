import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { take } from 'rxjs/operators';
import { FormType } from 'src/app/app.constants';
import { FromBuilderService } from 'src/app/services/from-builder-service';
import { OperationalPlanService } from 'src/app/services/operational-plan.service';
import { SubSection, VesselSection } from 'src/app/models/Section';

@Component({
  selector: 'app-create-secondry-operation',
  templateUrl: './create-secondry-operation.component.html',
  styleUrls: ['./create-secondry-operation.component.scss']
})
export class CreateSecondryOperationComponent implements OnInit {
  formType = FormType;
  secodaryformData: FormGroup;
  isFormSubmmited: boolean = false;
  operationTypes: IOperationTypes[] = [];
  operationStatus: IOperationStatus[] = [];
  requestedBy: IRequestedBy[] = [];
  formValues: any = null;
  editSecondaryOperation: boolean = false;
  displayMaximizable: boolean;

  isDataLoading = false;
  secondaryconfig = {
    formList: [],
    className: 'kx-col kx-col--12 kx-col--6@mob-m kx-col--5@tab-m kx-col--2@ltp-s'
  };
  @Input() sections: VesselSection[] = [];
  @Output() secondaryUpdated: EventEmitter<any> = new EventEmitter<any>();
  constructor(private formBuliderService: FromBuilderService,
              private operationalPlanService: OperationalPlanService,
              public fb: FormBuilder

    ) { }

  ngOnInit() {
    this.isDataLoading = true;
    this.operationalPlanService.getOperationMasterData().pipe(take(1)).subscribe((data) => {
      this.isDataLoading = false;
      this.operationTypes = data[0];

      this.operationStatus = data[1];

      this.requestedBy = data[2];

      this.constructForm();

      this.secodaryformData = this.formBuliderService.buildForm(this.secondaryconfig);
    });
  }
  formOnchangeEvent(changedItem: any): void {
  }
  onSubmit(): void {

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
}

onSubSectionSelected(rowsection: VesselSection, rowsubSection: SubSection) {
 if (rowsubSection.selected) {
  rowsubSection.selected = false;
  rowsection.selected = false;
} else {
  rowsubSection.selected = true;

  const unSelectednode =  rowsection.subSections.find((x) => x.selected === false);
  if (!unSelectednode) {
    rowsection.selected = true;
  }
}
}
  constructForm(): void {
    this.secondaryconfig.formList = [

      {
        type: FormType.text,
        label: 'Assignment Type',
        value: 'Secondary',
        key: 'name',
        validators: [Validators.required, Validators.maxLength(15)],
        disabled: true
      },
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
        type: FormType.dropdown,
        label: 'Status',
        options: this.operationStatus,
        value: this.operationStatus[0],
        key: 'operationStatus',
        validators: [Validators.required],
        optionLabel: 'Name',
        disabled: true
      }

    ];
  }

}
