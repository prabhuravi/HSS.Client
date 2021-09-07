/*
 * KONGSBERG PROPRIETARY. This document and its accompanying elements, contain KONGSBERG information which is proprietary and confidential.
Any disclosure, copying, distribution or use is prohibited if not otherwise explicitly agreed with KONGSBERG in writing.
Any authorized reproduction, in whole or in part, must include this legend. © [year of creation] KONGSBERG – All rights reserved.
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  connectivityControlRouteList: IRouteList[] = [
    {
      label: 'Connectivity Control',
      route: '/vessel-configuration'
    },
    {
      label: 'FDS Traffic',
      route: '/vessel-configuration/fds-traffic'
    },
    {
      label: 'Vessel Upload Status',
      route: '/vessel-configuration/vessel-upload-status'
    },
    {
      label: 'Whitelist Countries',
      route: '/vessel-configuration/whitelist-countries'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
