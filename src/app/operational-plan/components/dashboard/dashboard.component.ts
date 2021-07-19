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
      label: 'Installation',
      route: '/operational-plan'
    },
    {
      label: 'Hull Skater',
      route: '/operational-plan/HullSkater'
    },
    {
      label: 'Admin',
      route: '/operational-plan/HullSkater'
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
