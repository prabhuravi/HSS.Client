import { Component, OnInit } from '@angular/core';
import { ConnectivityControlService } from '../../../services/connectivity-control.service';
import { take } from 'rxjs/operators';
import { AppConstants } from 'src/app/app.constants';

@Component({
  selector: 'app-connectivity-control',
  templateUrl: './connectivity-control.component.html',
  styleUrls: ['./connectivity-control.component.scss']
})
export class ConnectivityControlComponent implements OnInit {

  vesselConnectivityControlList: IConnectivityControl[] = [];
  vesselConnectivityActionLogList: IConnectivityActionLog[] = [];
  cols = [
    { field: 'VesselName', header: 'Vessel Name', filterMatchMode: 'contains' },
    { field: 'IMONumber', header: 'IMO Number', filterMatchMode: 'contains' },
    { field: 'DisableTime', header: 'Disable Time (Optional)', filterMatchMode: 'contains' },
    { field: 'IsUploadEnabled', header: 'File Upload Status', filterMatchMode: 'contains' },
    { field: 'EnabledBy', header: 'Action Log', filterMatchMode: 'contains' }
  ];
  displayActionLogModal: boolean;
  activeVessel: any = {};
  isDataLoading: boolean;
  PRIMENG_CONSTANTS = AppConstants.PRIMENG_CONSTANTS;

  constructor(
    private connectivityControlService: ConnectivityControlService
  ) { }

  ngOnInit() {
    this.loadData();
  }
  loadData(): void {
    this.isDataLoading = true;
    this.connectivityControlService.getConnectivityData().pipe(take(1)).subscribe((data) => {
      this.isDataLoading = false;
      this.vesselConnectivityControlList = data;
    });
  }
  toggleActivityLogModal(): void {
    this.displayActionLogModal = !this.displayActionLogModal;
  }
  loadVesselActivityLog(vesselDetail): void {
    this.activeVessel = vesselDetail;
    this.connectivityControlService.getConnectivityActionLog(this.activeVessel.Id).pipe(take(1)).subscribe((data) => {
      this.isDataLoading = false;
      this.vesselConnectivityActionLogList = data;
    });
  }
  updateUploadStatus(data: IConnectivityControl): void {
    console.log(data);
  }

}
