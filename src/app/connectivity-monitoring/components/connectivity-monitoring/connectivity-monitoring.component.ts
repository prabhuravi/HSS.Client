import { Component, OnInit } from '@angular/core';
import { ConnectivityMonitoringService } from 'src/app/services/connectivity-monitoring.service';
import { AppConstants } from 'src/app/app.constants';
import { take } from 'rxjs/operators';
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
  PRIMENG_CONSTANTS = AppConstants.PRIMENG_CONSTANTS;
  showLoader = true;
  constructor(
    public connectivityMonitoringService: ConnectivityMonitoringService
  ) { }

  ngOnInit() {
    this.connectivityMonitoringService.getVesselLinks().pipe(take(1)).subscribe((data: IVesselLinks[]) => {
      if (data && data.length > 0) {
        this.showLoader = false;
        this.vesselLinksList = data;
        this.connectivityMonitoringService.setAllVesselLinks(data);
      }
    });
  }

}
