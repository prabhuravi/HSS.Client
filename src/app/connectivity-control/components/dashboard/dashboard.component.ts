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
      route: '/connectivity-control/'
    },
    {
      label: 'FDS Traffic',
      route: '/connectivity-control/fds-traffic'
    },
    {
      label: 'Vessel Upload Status',
      route: '/connectivity-control/vessel-upload-status'
    },
    {
      label: 'Whitelist Countries',
      route: '/connectivity-control/whitelist-countries'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
