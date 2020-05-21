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
  vesselList: IVesselList[] = [];
  vesselHistoricalUploadStatus: IVesselUploadStatus;
  cols = [
    { field: 'FileUploadedDate', sortfield: 'FileUploadedDate', header: 'Uploaded Date', filterMatchMode: 'contains' },
    { field: 'VesselName', sortfield: 'VesselName', header: 'Vessel Name', filterMatchMode: 'contains' },
    { field: 'Mission', sortfield: 'Mission', header: 'Mission Name', filterMatchMode: 'contains' },
    { field: 'FileName', sortfield: 'FileName', header: 'File Name', filterMatchMode: 'contains' },
    { field: 'FilePath', sortfield: '', header: 'Vessel File Path', filterMatchMode: 'contains' },
    { field: 'FileCreatedDate', sortfield: '', header: 'File Created Date', filterMatchMode: 'contains' },
    { field: 'FileModifiedDate', sortfield: '', header: 'File Modified Date', filterMatchMode: 'contains' },
    { field: 'FileType', sortfield: 'FileType', header: 'File Type', filterMatchMode: 'contains' },
    { field: 'UploadStatus', sortfield: 'UploadStatus', header: 'Status', filterMatchMode: 'contains' },
    { field: 'FileSize', sortfield: '', header: 'Actual File Size (KB)', filterMatchMode: 'contains' },
    { field: 'UploadedSize', sortfield: '', header: 'Uploaded Size (KB)', filterMatchMode: 'contains' },
    { field: 'UploadCount', sortfield: '', header: 'Count', filterMatchMode: 'contains' }
  ];
  PRIMENG_CONSTANTS = AppConstants.PRIMENG_CONSTANTS;
  vesselListLoaded: boolean;
  vesselHistoricalUploadStatusLoaded: boolean;

  constructor(
    public operationalPlanService: OperationalPlanService,
    public connectivityControlService: ConnectivityControlService,
    public fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loadVessels();
  }
  loadVessels(): void {
    this.operationalPlanService.getVesselList().pipe(take(1)).subscribe((data) => {
      this.vesselListLoaded = true;
      this.vesselList = data;
      this.form = this.buildForm();
      this.onSubmit();
    });
  }

  buildForm() {
    const group = this.fb.group({});
    group.addControl('VesselIds', this.fb.control({ value: [], disabled: false }, []));
    group.addControl('FromDate', this.fb.control({ value: '', disabled: false }, []));
    group.addControl('ToDate', this.fb.control({ value: '', disabled: false }, []));
    return group;
  }
  onSubmit(): void {
    this.isFormSubmitted = true;
    this.vesselHistoricalUploadStatusLoaded = false;
    if (this.form.valid) {
      const formData = {
        VesselIds: this.form.value.VesselIds.map((e) => e.Id),
        FromDate: this.form.value.FromDate,
        ToDate: this.form.value.ToDate
      };
      if (formData.FromDate instanceof Date) {
        const FromDate = moment(formData.FromDate).format().split('+');
        formData.FromDate = `${FromDate[0]}`;
      }
      if (formData.ToDate instanceof Date) {
        const ToDate = moment(formData.ToDate).format().split('+');
        formData.ToDate = `${ToDate[0]}`;
      }
      this.connectivityControlService.getVesselHistoricalStatus(formData).pipe(take(1)).subscribe((data) => {
        this.isFormSubmitted = false;
        this.vesselHistoricalUploadStatusLoaded = true;
        this.vesselHistoricalUploadStatus = data;
      });
    }
  }

}
