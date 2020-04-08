import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OperationalPlanService } from 'src/app/services/operational-plan.service';

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

  constructor(
    private operationalPlanService: OperationalPlanService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getPlanList();
    this.form = this.buildForm();
  }

  getPlanList(): void {
    this.operationalPlansList = this.operationalPlanService.getOperationPlans();
  }

  loadSubOperations(operationData): void {
    this.subOperationsList = this.operationalPlanService.getSubOperations();
  }

  buildForm() {
    const group = this.fb.group({});
    group.addControl('OperationFromDate', this.fb.control({ value: '', disabled: false }, [Validators.required]));
    group.addControl('OperationToDate', this.fb.control({ value: '', disabled: false }, [Validators.required]));
    group.addControl('ShowLogs', this.fb.control({ value: '', disabled: false }, [Validators.required]));
    return group;
  }
  editData(data: IOperationalPlan) {
    console.log(data);
  }

  searchFormOnSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }

}
