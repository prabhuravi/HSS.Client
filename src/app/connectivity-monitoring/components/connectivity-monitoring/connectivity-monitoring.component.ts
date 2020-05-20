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
    { field: 'NodeNumber', header: 'Node Number', sortfield: 'NodeNumber', filterMatchMode: 'contains' },
    { field: 'Name', header: 'Vessel Name', sortfield: 'Name', filterMatchMode: 'contains' },
    { field: 'IPAddress', header: 'IP Address', sortfield: '', filterMatchMode: 'contains' },
    { field: 'Status', header: 'Status', sortfield: 'Status', filterMatchMode: 'contains' },
    { field: 'LastLatency', header: 'Last Latency', sortfield: 'LastLatency' },
    { field: 'LastSeen', header: 'Last Updated(GMT) (dd/MM/yyyy HH:mm)', sortfield: '' }
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
        data = data.sort((a, b) => (a.Status === 'Up') ? -1 : 1);
        this.vesselLinksList = data;
        this.connectivityMonitoringService.setAllVesselLinks(data);
      }
    });
  }

}
