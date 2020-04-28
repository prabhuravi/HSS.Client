import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OperationalPlanService } from 'src/app/services/operational-plan.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AppConstants } from 'src/app/app.constants';

@Component({
  selector: 'app-manage-plans',
  templateUrl: './manage-plans.component.html',
  styleUrls: ['./manage-plans.component.scss']
})
export class ManagePlansComponent implements OnInit {

  form: FormGroup;
  isFormSubmitted = false;
  operationalPlansList: IOperationalPlan[] = [];
  cols = [
    { field: 'VesselName', sortfield: 'VesselName', header: 'Vessel', filterMatchMode: 'contains' },
    { field: 'ImoNumber', sortfield: '', header: 'IMO', filterMatchMode: 'contains' },
    { field: 'OperationDate', sortfield: '', header: 'Date', filterMatchMode: 'contains' },
    { field: 'ETADate', sortfield: '', header: 'ETA Date', filterMatchMode: 'contains' },
    { field: 'OperationLoc', sortfield: '', header: 'Location', filterMatchMode: 'contains' },
    { field: 'OperationType', sortfield: '', header: 'Type', filterMatchMode: 'contains' },
    { field: 'OperationDes', sortfield: '', header: 'Description', filterMatchMode: 'contains' },
    { field: 'Status', sortfield: '', header: 'Status', filterMatchMode: 'contains' },
    { field: 'OperatorName', sortfield: '', header: 'Operator', filterMatchMode: 'contains' },
    { field: 'Planner', sortfield: '', header: 'Planner', filterMatchMode: 'contains' },
    { field: 'CreatedBy', sortfield: '', header: 'Created By', filterMatchMode: 'contains' },
    { field: 'LastUpdatedBy', sortfield: '', header: 'Updated By', filterMatchMode: 'contains' },
    { field: 'LastUpdatedDate', sortfield: '', header: 'Updated Date', filterMatchMode: 'contains' },
    { field: 'PlanId', sortfield: '', header: 'Action', filterMatchMode: 'contains' }
  ];
  subOperationsList: ISubOperations[] = [];
  subOperationCols = [
    { field: 'SubOperationStartTime', sortfield: 'SubOperationStartTime', header: 'Sub Operation Start Time' },
    { field: 'SubOperationEndTime', sortfield: '', header: 'Sub Operation End Time' },
    { field: 'SubOperationDes', sortfield: '', header: 'Description' },
    { field: 'Status', sortfield: '', header: 'Status' },
    { field: 'CreatedBy', sortfield: '', header: 'Created By' },
    { field: 'LastUpdatedBy', sortfield: '', header: 'Updated By' },
    { field: 'LastUpdatedDate', sortfield: '', header: 'Updated Date' },
    { field: 'SubPlanId', sortfield: '', header: 'Action' }
  ];
  showLogs = true;
  isDataLoading: boolean;
  isSubOperationDataLoading: boolean;
  PRIMENG_CONSTANTS = AppConstants.PRIMENG_CONSTANTS;

  constructor(
    private operationalPlanService: OperationalPlanService,
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getPlanList();
    this.form = this.buildForm();
  }

  getPlanList(): void {
    this.isDataLoading = true;
    this.operationalPlanService.getOperationPlans({ showLogs: this.showLogs }).subscribe((data) => {
      this.isDataLoading = false;
      this.operationalPlansList = data;
    });
  }

  loadSubOperations(planData): void {
    this.isSubOperationDataLoading = true;
    this.operationalPlanService.getSubOperations(planData).subscribe((data) => {
      this.isSubOperationDataLoading = false;
      this.subOperationsList = data;
    });
  }

  buildForm() {
    const group = this.fb.group({});
    group.addControl('OperationFromDate', this.fb.control({ value: '', disabled: false }, [Validators.required]));
    group.addControl('OperationToDate', this.fb.control({ value: '', disabled: false }, [Validators.required]));
    return group;
  }

  searchFormOnSubmit() {
    if (this.form.valid) {
      this.isDataLoading = true;
      this.form.value.showLogs = this.showLogs;
      this.operationalPlanService.searchOperationPlans(this.form.value).subscribe((data) => {
        this.isDataLoading = false;
        this.operationalPlansList = data;
      });
    }
  }
  completeOperation(rowData: any) {
    rowData.Status = 'Completed';
    rowData.Action = 'Edit';
    this.operationalPlanService.updateOperationPlan(rowData).subscribe((data) => {
      this.getPlanList();
    });
  }
  completeSubOperation(rowData: any): void {
    rowData.Status = 'Completed';
    this.operationalPlanService.updateSubOperationPlan(rowData).subscribe((data) => {
      this.triggerToast('success', 'Success Message', `Data Updated Successfully`);
    });
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
