import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
      route: '/operational-plan/plan/add/0'
    },
    {
      label: 'Add Operator',
      route: '/operational-plan/operator'
    },
    {
      label: 'Add Operation Type',
      route: '/operational-plan/operation-type'
    },
    {
      label: 'Add Vessel',
      route: '/operational-plan/vessel'
    },
    {
      label: 'Add Hull Skater',
      route: '/operational-plan/robot-system'
    }
  ];

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  redirectTo(uri: string): void {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri])
    );
  }

}
