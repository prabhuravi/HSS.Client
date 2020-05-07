import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConnectivityControlService } from '../../../services/connectivity-control.service';
import { take } from 'rxjs/operators';
import { AppConstants } from 'src/app/app.constants';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-connectivity-control',
  templateUrl: './connectivity-control.component.html',
  styleUrls: ['./connectivity-control.component.scss']
})
export class ConnectivityControlComponent implements OnInit, OnDestroy {

  vesselConnectivityControlList: IConnectivityControl[] = [];
  vesselConnectivityActionLogList: IConnectivityActionLog[] = [];
  cols = [
    { field: 'VesselName', sortfield: 'VesselName', header: `Vessel Name`, filterMatchMode: 'contains' },
    { field: 'IMONumber', sortfield: 'IMONumber', header: 'IMO Number', filterMatchMode: 'contains' },
    { field: 'DisableTime', sortfield: '', header: 'Disable Time (Optional, GMT)', filterMatchMode: 'contains' },
    { field: 'IsUploadEnabled', sortfield: '', header: 'File Upload Status', filterMatchMode: 'contains' },
    { field: 'LastAction', sortfield: '', header: 'Action Log(MM/dd/yyyy HH:mm, GMT)', filterMatchMode: 'contains' }
  ];
  displayActionLogModal: boolean;
  activeVessel: any = {};
  isDataLoading: boolean = true;
  isActionLogDataLoading: boolean = true;
  PRIMENG_CONSTANTS = AppConstants.PRIMENG_CONSTANTS;
  now: Date = new Date();
  dateTimeInterval = interval(60000);
  dateTimeIntervalSubscription: Subscription;

  constructor(
    public connectivityControlService: ConnectivityControlService
  ) { }

  ngOnInit(): void {
    this.dateTimeIntervalSubscription = this.dateTimeInterval.subscribe(() => {
      this.now = new Date();
    });
    this.loadData();
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
          vessel.DisableRetainTime = new Date(vessel.DisableTime);
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
    this.isDataLoading = true;
    data.EnabledBy = '';
    this.connectivityControlService.UpdateVessel(data).pipe(take(1)).subscribe(() => {
      this.loadData();
    });
  }
  updateRemainingTime(data): void {
    if (data.RemainingTime === null) {
      this.dateTimeInterval.pipe(take(1)).subscribe(() => {
        this.loadData();
      });
    } else {
      this.vesselConnectivityControlList[data.index].RemainingTime = data.RemainingTime;
    }
  }
}
