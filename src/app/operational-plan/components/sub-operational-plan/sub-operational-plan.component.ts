import { Component, OnInit } from '@angular/core';
import { OperationalPlanService } from 'src/app/services/operational-plan.service';
import { FormType } from '../../../app.constants';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-sub-operational-plan',
  templateUrl: './sub-operational-plan.component.html',
  styleUrls: ['./sub-operational-plan.component.scss']
})
export class SubOperationalPlanComponent implements OnInit {

  planStatusList: IPlanStatus[] = [];
  subOperationsList: ISubOperations[] = [];
  formType = FormType;
  config = {
    formTitle: 'Sub Operation',
    formList: []
  };
  subOperationCols = [
    { field: 'SubOperationStartTime', header: 'Start Time' },
    { field: 'SubOperationEndTime', header: 'End Time' },
    { field: 'SubOperationDes', header: 'Description' },
    { field: 'Status', header: 'Status' },
    { field: 'Operator', header: 'Operator' },
    { field: 'Action', header: 'Action' }
  ];
  isDataLoading: boolean;
  formValues: any = null;
  planDetails: any;
  activeId = 0;

  constructor(
    private operationalPlanService: OperationalPlanService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.planStatusList = this.operationalPlanService.getPlanStatus();
    if (history && history.state && history.state.actionType) {
      this.config.formTitle = `${history.state.actionType}`;
      this.planDetails = history.state;
      this.loadData();
    }
    this.constructForm();
  }
  loadData(): void {
    this.isDataLoading = true;
    this.operationalPlanService.getSubOperations(this.planDetails).subscribe((data) => {
      this.isDataLoading = false;
      this.subOperationsList = data;
    });
  }
  constructForm(): void {
    this.config.formList = [
      {
        type: FormType.datepicker,
        label: 'Start Time ( Start and End Time should be greater than Operation End Time)',
        value: '',
        key: 'SubOperationStartTime',
        validators: ['required'],
        disabled: false
      },
      {
        type: FormType.datepicker,
        label: 'End Time ( Start and End Time should be greater than Operation End Time)',
        value: '',
        key: 'SubOperationEndTime',
        validators: ['required'],
        disabled: false
      },
      {
        type: FormType.dropdown,
        label: 'Status',
        options: this.planStatusList,
        value: this.planStatusList[0],
        key: 'Status',
        validators: [],
        optionLabel: 'name',
        disabled: false
      },
      {
        type: FormType.text,
        label: 'Description',
        value: '',
        key: 'SubOperationDes',
        validators: [],
        disabled: false
      }
    ];
  }
  formSubmitted(formData: any): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.updateData(formData);
      }
    });
  }
  editData(data: any): void {
    this.activeId = data.SubPlanId;
    data.Status = this.planStatusList.find((e) => e.name === data.Status);
    data.SubOperationStartTime = new Date(data.SubOperationStartTime);
    data.SubOperationEndTime = new Date(data.SubOperationEndTime);
    this.formValues = data;
    console.log(this.formValues);
  }
  updateData(formData: any): void {
    console.log(formData);
    if (history && history.state && history.state.actionType) {
      formData.PlanId = this.planDetails.PlanId;
    }
    if (this.activeId !== 0) {
      formData.SubPlanId = this.activeId;
    }
    this.operationalPlanService.updateSubOperationPlan(formData).subscribe((data) => {
      this.loadData();
    });
  }

}
