import { Component, OnInit } from '@angular/core';
import { ConnectivityMonitoringService } from 'src/app/services/connectivity-monitoring.service';

@Component({
  selector: 'app-connectivity-monitoring',
  templateUrl: './connectivity-monitoring.component.html',
  styleUrls: ['./connectivity-monitoring.component.scss']
})
export class ConnectivityMonitoringComponent implements OnInit {

  vesselLinksList: IVesselLinks[] = [];
  cols = [
    { field: 'NodeNumber', header: 'Node Number' },
    { field: 'Name', header: 'Name' },
    { field: 'IPAddress', header: 'IP Address' },
    { field: 'CreatedBy', header: 'Created By' },
    { field: 'LastSeenUTC', header: 'Last Updated(UTC)' },
    { field: 'Status', header: 'Status' },
    { field: 'LastLatency', header: 'Last Latency' },
    { field: 'Cacti', header: 'Cacti' }
  ];

  constructor(
    private connectivityMonitoringService: ConnectivityMonitoringService
  ) { }

  ngOnInit() {
    this.vesselLinksList = this.connectivityMonitoringService.getVesselLinks();
  }

}
