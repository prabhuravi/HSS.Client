import { Component, OnInit } from '@angular/core';
import { ConnectivityControlService } from '../../../services/connectivity-control.service';

@Component({
  selector: 'app-connectivity-control',
  templateUrl: './connectivity-control.component.html',
  styleUrls: ['./connectivity-control.component.scss']
})
export class ConnectivityControlComponent implements OnInit {

  vesselConnectivityControlList: IConnectivityControl[] = [];
  cols = [
    { field: 'VesselName', header: 'Vessel Name', filterMatchMode: 'contains' },
    { field: 'IMONumber', header: 'IMO Number', filterMatchMode: 'contains' },
    { field: 'IsUploadEnabled', header: 'File Upload Status', filterMatchMode: 'contains' },
    { field: 'DisableTime', header: 'Disable Time (Optional)', filterMatchMode: 'contains' },
    { field: 'EnabledBy', header: 'Action Log', filterMatchMode: 'contains' }
  ];
  displayActionLogModal: boolean;
  activeVessel: any = {};

  constructor(
    private connectivityControlService: ConnectivityControlService
  ) { }

  ngOnInit() {
    this.vesselConnectivityControlList = this.connectivityControlService.getConnectivityData();
  }
  toggleActivityLogModal(): void {
    this.displayActionLogModal = !this.displayActionLogModal;
  }
  loadVesselActivityLog(vesselDetail): void {
    this.activeVessel = vesselDetail;
  }

}
