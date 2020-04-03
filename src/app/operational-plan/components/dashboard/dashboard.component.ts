import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  operationalPlanMainRouteList: IRouteList[] = [
    {
      label: 'Operational Plan',
      route: '/operational-plan'
    }
  ];
  operationalPlanSubRouteList: IRouteList[] = [
    {
      label: 'Add Plan',
      route: '/operational-plan/plan'
    },
    {
      label: 'Add Operator',
      route: '/operational-plan/operator/add'
    },
    {
      label: 'Add Operation Type',
      route: '/operational-plan/operation-type/add'
    },
    {
      label: 'Add Vessel',
      route: '/operational-plan/vessel/add'
    },
    {
      label: 'Add Robot System',
      route: '/operational-plan/robot-system/add'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
