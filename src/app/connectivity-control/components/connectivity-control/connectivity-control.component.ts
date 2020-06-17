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
  currentUTC: Date;
  dateTimeInterval = interval(60000);
  dateTimeIntervalSubscription: Subscription;
  loggedInUser: string = '';

  constructor(
    public connectivityControlService: ConnectivityControlService
  ) {
    this.updateDisableCalendarDefaultTime();
  }
  updateDisableCalendarDefaultTime(): void {
    const dateToday = new Date();
    const month = dateToday.getMonth() + 1;
    const stringDate = dateToday.getUTCFullYear().toString() + '-' + month.toString() + '-' + dateToday.getUTCDate().toString() +
      ' ' + dateToday.getUTCHours().toString() + ':' + dateToday.getUTCMinutes().toString() + ':' + dateToday.getUTCSeconds().toString();
    const currentTime: Date = new Date(Date.parse(stringDate));
    currentTime.setMinutes(currentTime.getMinutes() + 5);
    this.currentUTC = currentTime;
  }

  ngOnInit(): void {
    this.dateTimeIntervalSubscription = this.dateTimeInterval.subscribe(() => {
      this.updateDisableCalendarDefaultTime();
    });
    this.loadData();
    this.loggedInUser = this.connectivityControlService.getLoggedInUser();
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
    data.EnabledBy = this.loggedInUser;
    if (data.DisableTime !== null) {
      data.DisableTime = new Date(data.DisableTime.toString());
      data.DisableTime = data.DisableTime.toString().slice(0, data.DisableTime.toString().indexOf('GMT')) + 'GMT';
      data.DisableTime = new Date(data.DisableTime).toISOString();
    }
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
