import { Component, OnInit } from '@angular/core';
import { ConnectivityMonitoringService } from 'src/app/services/connectivity-monitoring.service';
import { AppConstants } from 'src/app/app.constants';
import { GaloreDataService, GaloreApiConnectionStatus } from 'src/app/services/galore-data.service';
import { GaloreQueryService } from 'src/app/services/galore-query.service';
import { NodeDc } from '@kognifai/galore-client';
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
    { field: 'Name', header: 'Installation', sortfield: 'Name', filterMatchMode: 'contains' },
    { field: 'IPAddress', header: 'IP Address', sortfield: '', filterMatchMode: 'contains' },
    { field: 'Status', header: 'Status', sortfield: 'Status', filterMatchMode: 'contains' },
    { field: 'LastLatency', header: 'Last Latency', sortfield: 'LastLatency' },
    { field: 'LastSeen', header: 'Last Updated(GMT)', sortfield: '' },
    { field: 'CactiLink', header: 'Cacti', sortfield: '' }
  ];
  PRIMENG_CONSTANTS = AppConstants.PRIMENG_CONSTANTS;
  showLoader = true;
  constructor(
    public connectivityMonitoringService: ConnectivityMonitoringService,
    public galoreDataService: GaloreDataService,
    public galoreQueryService: GaloreQueryService
  ) { }

  ngOnInit() {
    this.galoreDataService.initialize().subscribe((status: GaloreApiConnectionStatus) => {
      if (status !== GaloreApiConnectionStatus.Reconnected) {
        this.galoreQueryService.fetchVesselEdge().subscribe((vesselEdgeNode: NodeDc[]) => {
        });
      }
    });
    this.connectivityMonitoringService.getVesselLinks().pipe(take(1)).subscribe((data: IVesselLinks[]) => {
      if (data && data.length > 0) {
        this.showLoader = false;
        data = data.sort((a, b) => (a.Status === 'Up') ? -1 : 1);
        this.vesselLinksList = data;
        // this.vesselLinksList.forEach(element => {
        //   element.CactiLink = 'https://cacti.kognif.ai/cacti/graph_view.php?action=preview&host_id=1686';
        // });
        this.connectivityMonitoringService.setAllVesselLinks(data);
      }
    });
  }

}
