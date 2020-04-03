import { Component, OnInit } from '@angular/core';
import { OperationalPlanService } from 'src/app/services/operational-plan.service';

@Component({
  selector: 'app-manage-plans',
  templateUrl: './manage-plans.component.html',
  styleUrls: ['./manage-plans.component.scss']
})
export class ManagePlansComponent implements OnInit {

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

  constructor(
    private operationalPlanService: OperationalPlanService
  ) { }

  ngOnInit(): void {
    this.getPlanList();
  }

  getPlanList(): void {
    this.operationalPlansList = this.operationalPlanService.getOperationPlans();
  }

}
