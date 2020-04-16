import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OperationalPlanService } from 'src/app/services/operational-plan.service';
import { ConnectivityControlService } from 'src/app/services/connectivity-control.service';
import { AppConstants } from 'src/app/app.constants';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-fds-traffic',
  templateUrl: './fds-traffic.component.html',
  styleUrls: ['./fds-traffic.component.scss']
})
export class FdsTrafficComponent implements OnInit {

  form: FormGroup;
  isFormSubmitted = false;
  vesselList: IVesselList[] = [];
  vesselHistoricalUploadStatus: IVesselUploadStatus;
  cols = [
    { field: 'FileUploadedDate', header: 'Uploaded Date', filterMatchMode: 'contains' },
    { field: 'Mission', header: 'Mission Name', filterMatchMode: 'contains' },
    { field: 'FileName', header: 'File Name', filterMatchMode: 'contains' },
    { field: 'FilePath', header: 'File Path', filterMatchMode: 'contains' },
    { field: 'FileCreatedDate', header: 'Created Date', filterMatchMode: 'contains' },
    { field: 'FileModifiedDate', header: 'Modified Date', filterMatchMode: 'contains' },
    { field: 'FileType', header: 'File Type', filterMatchMode: 'contains' },
    { field: 'UploadStatus', header: 'Status', filterMatchMode: 'contains' },
    { field: 'FileSize', header: 'Actual File Size (KB)', filterMatchMode: 'contains' },
    { field: 'UploadedSize', header: 'Uploaded Size (KB)', filterMatchMode: 'contains' },
    { field: 'UploadCount', header: 'Upload Count', filterMatchMode: 'contains' }
  ];
  PRIMENG_CONSTANTS = AppConstants.PRIMENG_CONSTANTS;
  vesselListLoaded: boolean = false;

  constructor(
    private operationalPlanService: OperationalPlanService,
    private connectivityControlService: ConnectivityControlService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loadVessels();
  }
  loadVessels(): void {
    this.operationalPlanService.getVesselList().subscribe((data) => {
      this.vesselListLoaded = true;
      this.vesselList = data;
      this.form = this.buildForm();
    });
  }

  buildForm() {
    const group = this.fb.group({});
    group.addControl('VesselName', this.fb.control({ value: '', disabled: false }, [Validators.required]));
    group.addControl('FromDate', this.fb.control({ value: '', disabled: false }, [Validators.required]));
    group.addControl('ToDate', this.fb.control({ value: '', disabled: false }, [Validators.required]));
    return group;
  }
  onSubmit(): void {
    this.isFormSubmitted = true;
    if (this.form.valid) {
      this.form.value.VesselName = this.form.value.VesselName.VesselName;
      this.connectivityControlService.getVesselHistoricalStatus(this.form.value).pipe(take(1)).subscribe((data) => {
        this.vesselHistoricalUploadStatus = data;
      });
    }
  }

}
