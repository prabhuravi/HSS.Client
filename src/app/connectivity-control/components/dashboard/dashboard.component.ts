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
