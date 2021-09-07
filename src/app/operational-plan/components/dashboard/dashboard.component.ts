/*
 * KONGSBERG PROPRIETARY. This document and its accompanying elements, contain KONGSBERG information which is proprietary and confidential.
Any disclosure, copying, distribution or use is prohibited if not otherwise explicitly agreed with KONGSBERG in writing.
Any authorized reproduction, in whole or in part, must include this legend. © [year of creation] KONGSBERG – All rights reserved.
 */
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
