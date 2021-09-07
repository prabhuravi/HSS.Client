/*
 * KONGSBERG PROPRIETARY. This document and its accompanying elements, contain KONGSBERG information which is proprietary and confidential.
Any disclosure, copying, distribution or use is prohibited if not otherwise explicitly agreed with KONGSBERG in writing.
Any authorized reproduction, in whole or in part, must include this legend. © [year of creation] KONGSBERG – All rights reserved.
 */
import { Component, OnInit } from '@angular/core';
import { ConnectivityMonitoringService } from 'src/app/services/connectivity-monitoring.service';
import { AppConstants } from 'src/app/app.constants';
import { GaloreDataService, GaloreApiConnectionStatus } from 'src/app/services/galore-data.service';
import { GaloreQueryService } from 'src/app/services/galore-query.service';
import { NodeDc } from '@kognifai/galore-client';
import { take } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-connectivity-monitoring',
  templateUrl: './connectivity-monitoring.component.html',
  styleUrls: ['./connectivity-monitoring.component.scss']
})
export class ConnectivityMonitoringComponent implements OnInit {

  vesselLinksList: IVesselLinks[] = [];
  cols = [
    { field: 'NodeNumber', header: 'Node', sortfield: 'NodeNumber', filterMatchMode: 'contains' },
    { field: 'Name', header: 'Installation', sortfield: 'Name', filterMatchMode: 'contains' },
    { field: 'IPAddress', header: 'IP Address', sortfield: '', filterMatchMode: 'contains' },
    { field: 'Status', header: 'Status', sortfield: 'Status', filterMatchMode: 'contains' },
    { field: 'LastLatency', header: 'Last Latency', sortfield: 'LastLatency' },
    { field: 'LastSeen', header: 'Last Updated(GMT)', sortfield: '' },
    { field: 'CactiLink', header: 'Cacti', sortfield: '' }
  ];
  PRIMENG_CONSTANTS = AppConstants.PRIMENG_CONSTANTS;
  appConstants = AppConstants;
  showLoader = true;
  constructor(
    public connectivityMonitoringService: ConnectivityMonitoringService,
    public galoreDataService: GaloreDataService,
    public galoreQueryService: GaloreQueryService,
    public route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {
    let nodeType: string = '';
    if (this.route && this.route.params) {
      this.route.params.subscribe((params) => {
        this.vesselLinksList = [];
        if (params.nodeType === 'onshore') {
          nodeType = 'onshore';
        } else {
          nodeType = 'offshore';
        }
        this.galoreDataService.initialize().subscribe((status: GaloreApiConnectionStatus) => {
          if (status !== GaloreApiConnectionStatus.Reconnected) {
            this.galoreQueryService.fetchVesselEdge().subscribe((vesselEdgeNode: NodeDc[]) => {
            });
          }
        });
        this.connectivityMonitoringService.getVesselLinks(nodeType).pipe(take(1)).subscribe((data: IVesselLinks[]) => {
          if (data && data.length > 0) {
           this.showLoader = false;
           data = data.sort((a, b) => (a.Status === 'Up') ? -1 : 1);
           this.vesselLinksList = data;
           this.connectivityMonitoringService.setAllVesselLinks(data);
          }
        });
      }
      );
    }
  }

}
