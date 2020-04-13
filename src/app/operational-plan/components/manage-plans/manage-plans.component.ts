import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OperationalPlanService } from 'src/app/services/operational-plan.service';
import { Router } from '@angular/router';

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
    { field: 'VesselName', header: 'Vessel', filterMatchMode: 'contains' },
    { field: 'ImoNumber', header: 'IMO', filterMatchMode: 'contains' },
    { field: 'OperationDate', header: 'Operation Date (Local Time)', filterMatchMode: 'contains' },
    { field: 'ETADate', header: 'Vessel ETA Date (Local Time)', filterMatchMode: 'contains' },
    { field: 'OperationLoc', header: 'Location', filterMatchMode: 'contains' },
    { field: 'OperationType', header: 'Operation Type', filterMatchMode: 'contains' },
    { field: 'OperationDes', header: 'Description', filterMatchMode: 'contains' },
    { field: 'Status', header: 'Status', filterMatchMode: 'contains' },
    { field: 'OperatorName', header: 'Operator', filterMatchMode: 'contains' },
    { field: 'Planner', header: 'Planner', filterMatchMode: 'contains' },
    { field: 'CreatedBy', header: 'Created By', filterMatchMode: 'contains' },
    { field: 'LastUpdatedBy', header: 'Last Updated By', filterMatchMode: 'contains' },
    { field: 'LastUpdatedDate', header: 'Updated Date (UTC Time)', filterMatchMode: 'contains' },
    { field: 'PlanId', header: 'Action', filterMatchMode: 'contains' }
  ];
  subOperationsList: ISubOperations[] = [];
  subOperationCols = [
    { field: 'SubOperationStartTime', header: 'Sub Operation Start Time' },
    { field: 'SubOperationEndTime', header: 'Sub Operation End Time' },
    { field: 'SubOperationDes', header: 'Description' },
    { field: 'Status', header: 'Status' },
    { field: 'CreatedBy', header: 'Created By' },
    { field: 'LastUpdatedBy', header: 'Updated By' },
    { field: 'LastUpdatedDate', header: 'Updated Date' },
    { field: 'SubPlanId', header: 'Action' }
  ];
  showLogs = false;
  isDataLoading: boolean;
  isSubOperationDataLoading: boolean;

  constructor(
    private operationalPlanService: OperationalPlanService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getPlanList();
    this.form = this.buildForm();
  }
  loadLogs(data: any): void {
    this.getPlanList();
  }

  getPlanList(): void {
    this.isDataLoading = true;
    this.operationalPlanService.getOperationPlans({showLogs: this.showLogs}).subscribe((data) => {
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

  openPlanComponent(actionType: string, data: any, route: string): void {
    this.router.navigateByUrl(route, {
      state: {
        ...data,
        actionType
      }
    });
  }

}
