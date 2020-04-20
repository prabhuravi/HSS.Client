import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConnectivityControlService } from '../../../services/connectivity-control.service';
import { take } from 'rxjs/operators';
import { AppConstants } from 'src/app/app.constants';
import { Subscription } from 'rxjs';
import { interval } from 'rxjs';

@Component({
  selector: 'app-connectivity-control',
  templateUrl: './connectivity-control.component.html',
  styleUrls: ['./connectivity-control.component.scss']
})
export class ConnectivityControlComponent implements OnInit, OnDestroy {

  vesselConnectivityControlList: IConnectivityControl[] = [];
  vesselConnectivityActionLogList: IConnectivityActionLog[] = [];
  cols = [
    { field: 'VesselName', sortfield: 'VesselName', header: 'Vessel Name', filterMatchMode: 'contains' },
    { field: 'IMONumber', sortfield: 'IMONumber', header: 'IMO Number', filterMatchMode: 'contains' },
    { field: 'DisableTime', sortfield: '', header: 'Disable Time (Optional, GMT)', filterMatchMode: 'contains' },
    { field: 'IsUploadEnabled', sortfield: '', header: 'File Upload Status', filterMatchMode: 'contains' },
    { field: 'LastAction', sortfield: 'EnabledBy', header: 'Action Log(MM/dd/yyyy HH:mm, GMT)', filterMatchMode: 'contains' }
  ];
  displayActionLogModal: boolean;
  activeVessel: any = {};
  isDataLoading: boolean = true;
  isActionLogDataLoading: boolean = true;
  PRIMENG_CONSTANTS = AppConstants.PRIMENG_CONSTANTS;
  dateTimeInterval = interval(60000);
  dateTimeIntervalSubscription: Subscription;

  constructor(
    private connectivityControlService: ConnectivityControlService
  ) { }

  ngOnInit(): void {
    this.loadData();
    this.dateTimeIntervalSubscription = this.dateTimeInterval.subscribe(() => {
      this.loadData();
    });
  }
  ngOnDestroy(): void {
    if (this.dateTimeIntervalSubscription) {
      this.dateTimeIntervalSubscription.unsubscribe();
    }
  }
  loadData(): void {
    this.connectivityControlService.getConnectivityData().pipe(take(1)).subscribe((connectivityData) => {
      this.isDataLoading = false;
      connectivityData.forEach((vessel) => {
        if (vessel.IsUploadEnabled && !vessel.AlwaysOn) {
          vessel.DisableTime = new Date(vessel.DisableTime);
        } else {
          vessel.DisableTime = null;
        }
      });
      this.vesselConnectivityControlList = connectivityData;
      this.vesselConnectivityControlList.sort((a, b) => (a.VesselName > b.VesselName) ? 1 : -1);
      this.vesselConnectivityControlList.sort((a, b) => (a.IsUploadEnabled > b.IsUploadEnabled) ? -1 : 1);
    });
  }
  toggleActivityLogModal(): void {
    this.displayActionLogModal = !this.displayActionLogModal;
  }
  loadVesselActivityLog(vesselDetail): void {
    this.activeVessel = vesselDetail;
    this.isActionLogDataLoading = true;
    this.connectivityControlService.getConnectivityActionLog(this.activeVessel.Id).pipe(take(1)).subscribe((data) => {
      this.isActionLogDataLoading = false;
      this.vesselConnectivityActionLogList = data;
    });
  }
  updateUploadStatus(data: IVesselList): void {
    data.EnabledBy = '';
    this.connectivityControlService.UpdateVessel(data).pipe(take(1)).subscribe(() => {
      this.loadData();
    });
  }

}
