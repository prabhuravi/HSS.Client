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
    { field: 'VesselName', header: 'Vessel Name', filterMatchMode: 'contains' },
    { field: 'IMONumber', header: 'IMO Number', filterMatchMode: 'contains' },
    { field: 'DisableTime', header: 'Disable Time (Optional)', filterMatchMode: 'contains' },
    { field: 'IsUploadEnabled', header: 'File Upload Status', filterMatchMode: 'contains' },
    { field: 'EnabledBy', header: 'Action Log', filterMatchMode: 'contains' }
  ];
  displayActionLogModal: boolean;
  activeVessel: any = {};
  isDataLoading: boolean = true;
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
  updateUploadStatus(data: IVesselList): void {
    data.EnabledBy = '';
    this.connectivityControlService.UpdateVessel(data).pipe(take(1)).subscribe(() => {
      this.loadData();
    });
  }

}
