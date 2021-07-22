import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OperationalPlanService } from 'src/app/services/operational-plan.service';
import { ConnectivityControlService } from 'src/app/services/connectivity-control.service';
import { AppConstants } from 'src/app/app.constants';
import { take } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-fds-traffic',
  templateUrl: './fds-traffic.component.html',
  styleUrls: ['./fds-traffic.component.scss']
})
export class FdsTrafficComponent implements OnInit {

  form: FormGroup;
  isFormSubmitted: boolean;
  // vesselList: IVesselList[] = [];
  vesselList: IVessel[] = [];
  vesselHistoricalUploadStatus: IFileLoggingStatus;
  appConstants = AppConstants;
  cols = [
    { field: 'Date', sortfield: 'FileUploadedDate', header: 'Uploaded Date', filterMatchMode: 'contains' },
    { field: 'VesselName', sortfield: 'VesselName', header: 'Vessel Name', filterMatchMode: 'contains' },
    { field: 'Mission', sortfield: 'Mission', header: 'Mission Name', filterMatchMode: 'contains' },
    { field: 'FileName', sortfield: 'FileName', header: 'File Name', filterMatchMode: 'contains' },
    { field: 'FilePath', sortfield: '', header: 'Vessel File Path', filterMatchMode: 'contains' },
    // { field: 'FileCreatedDate', sortfield: '', header: 'File Created Date', filterMatchMode: 'contains' },
    // { field: 'FileModifiedDate', sortfield: '', header: 'File Modified Date', filterMatchMode: 'contains' },
    { field: 'FileType', sortfield: 'FileType', header: 'File Type', filterMatchMode: 'contains' },
    // { field: 'UploadStatus', sortfield: 'UploadStatus', header: 'Status', filterMatchMode: 'contains' },
    { field: 'FileSize', sortfield: '', header: 'Actual(KB)', filterMatchMode: 'contains' },
    { field: 'FileSize', sortfield: '', header: 'Uploaded(KB)', filterMatchMode: 'contains' },
    { field: 'UploadCount', sortfield: '', header: 'Count', filterMatchMode: 'contains' }
  ];
  PRIMENG_CONSTANTS = AppConstants.PRIMENG_CONSTANTS;
  vesselListLoaded: boolean;
  vesselHistoricalUploadStatusLoaded: boolean;
  showDefaultData: boolean = true;

  constructor(
    public operationalPlanService: OperationalPlanService,
    public connectivityControlService: ConnectivityControlService,
    public fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loadVessels();
    this.loadDefaultData();
  }

  loadDefaultData(): void {
    this.isFormSubmitted = true;
    this.vesselHistoricalUploadStatusLoaded = false;
    this.connectivityControlService.getDefaultFileLogStatus().pipe(take(1)).subscribe((data) => {
      this.isFormSubmitted = false;
      this.vesselHistoricalUploadStatusLoaded = true;
      this.vesselHistoricalUploadStatus = data;
    });
  }

  buildForm() {
    const group = this.fb.group({});
    group.addControl('VesselIds', this.fb.control({ value: [], disabled: false }, []));
    group.addControl('FromDate', this.fb.control({ value: '', disabled: false }, []));
    group.addControl('ToDate', this.fb.control({ value: '', disabled: false }, []));
    return group;
  }

  loadVessels(): void {
    this.connectivityControlService.getVessels().subscribe((data) => {
      this.vesselListLoaded = true;
      this.vesselList = data;
      this.form = this.buildForm();
      // this.onSubmit();
    });
  }

  onSubmit(): void {
    this.showDefaultData = false;
    this.isFormSubmitted = true;
    this.vesselHistoricalUploadStatusLoaded = false;
    if (this.form.valid) {
      const filterData = {
        VesselIds: this.form.value.VesselIds? this.form.value.VesselIds.map((e) => e.Id): [],
        FromDate: this.form.value.FromDate,
        ToDate: this.form.value.ToDate
      };
      if(!filterData.FromDate)
      {
        filterData.FromDate = '';
      }
      if(!filterData.ToDate)
      {
        filterData.ToDate = '';
      }
      if (filterData.FromDate instanceof Date) {
        const FromDate = moment(filterData.FromDate).format().split('+');
        filterData.FromDate = `${FromDate[0]}`;
      }
      if (filterData.ToDate instanceof Date) {
        const ToDate = moment(filterData.ToDate).format().split('+');
        filterData.ToDate = `${ToDate[0]}`;
      }
      this.connectivityControlService.getVesselHistoricalStatus(filterData).pipe(take(1)).subscribe((data) => {
        this.isFormSubmitted = false;
        this.vesselHistoricalUploadStatusLoaded = true;
        this.vesselHistoricalUploadStatus = data;
      });
    }
  }

}
