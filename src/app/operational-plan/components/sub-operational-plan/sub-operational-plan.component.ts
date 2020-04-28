import { Component, OnInit } from '@angular/core';
import { OperationalPlanService } from 'src/app/services/operational-plan.service';
import { FormType, AppConstants } from '../../../app.constants';
import { ConfirmationService } from 'primeng/api';
import { take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

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
  PRIMENG_CONSTANTS = AppConstants.PRIMENG_CONSTANTS;
  allSubscription: Subscription[] = [];
  planId = 0;
  formReset: boolean;

  constructor(
    private operationalPlanService: OperationalPlanService,
    private confirmationService: ConfirmationService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.planStatusList = this.operationalPlanService.getPlanStatus();
    this.allSubscription.push(
      this.route.params.subscribe((params) => {
        // tslint:disable-next-line:radix
        this.planId = parseInt(params.planid);
        this.loadData();
      })
    );
  }
  loadData(): void {
    this.isDataLoading = true;
    this.operationalPlanService.getOperationPlanById(this.planId).pipe(take(1)).subscribe((data) => {
      this.isDataLoading = false;
      this.planDetails = data;
      this.constructForm();
    });
  }
  constructForm(): void {
    if (!this.planDetails) {
      return;
    }
    this.config.formList = [
      {
        type: FormType.datepicker,
        label: 'Start Time ( Start and End Time should be greater than Operation End Time)',
        value: '',
        key: 'SubOperationStartTime',
        validators: ['required'],
        disabled: false,
        mindate: new Date(this.planDetails.OperationDate)
      },
      {
        type: FormType.datepicker,
        label: 'End Time ( Start and End Time should be greater than Operation End Time)',
        value: '',
        key: 'SubOperationEndTime',
        validators: ['required'],
        disabled: false,
        mindate: new Date(this.planDetails.OperationDate)
      },
      {
        type: FormType.dropdown,
        label: 'Status',
        options: this.planStatusList,
        value: this.planStatusList[0],
        key: 'Status',
        validators: [],
        optionLabel: 'name',
        disabled: true
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
    console.log(data);
    this.activeId = data.SubPlanId;
    data.Status = this.planStatusList.find((e) => e.name === data.Status).value;
    data.SubOperationStartTime = new Date(data.SubOperationStartTime);
    data.SubOperationEndTime = new Date(data.SubOperationEndTime);
    this.formReset = false;
    this.formValues = data;
  }
  updateData(formData: any): void {
    formData.PlanId = this.planDetails.PlanId;
    if (this.activeId !== 0) {
      formData.SubPlanId = this.activeId;
      formData.Status = formData.Status.value;
    } else {
      formData.Status = 'New';
    }
    this.operationalPlanService.updateSubOperationPlan(formData).subscribe((data) => {
      this.formReset = true;
      this.loadData();
    });
  }
  completeSubOperation(rowData: any): void {
    rowData.Status = 'Completed';
    this.operationalPlanService.updateSubOperationPlan(rowData).subscribe((data) => {
      this.loadData();
    });
  }

}
