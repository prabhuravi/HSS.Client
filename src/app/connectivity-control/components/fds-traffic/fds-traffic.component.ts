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
    { field: 'FileUploadedDate', sortfield: 'VesselName', header: 'Uploaded Date', filterMatchMode: 'contains' },
    { field: 'Mission', sortfield: '', header: 'Mission Name', filterMatchMode: 'contains' },
    { field: 'FileName', sortfield: '', header: 'File Name', filterMatchMode: 'contains' },
    { field: 'FilePath', sortfield: '', header: 'File Path', filterMatchMode: 'contains' },
    { field: 'FileCreatedDate', sortfield: '', header: 'Created Date', filterMatchMode: 'contains' },
    { field: 'FileModifiedDate', sortfield: '', header: 'Modified Date', filterMatchMode: 'contains' },
    { field: 'FileType', sortfield: '', header: 'File Type', filterMatchMode: 'contains' },
    { field: 'UploadStatus', sortfield: '', header: 'Status', filterMatchMode: 'contains' },
    { field: 'FileSize', sortfield: '', header: 'Actual File Size (KB)', filterMatchMode: 'contains' },
    { field: 'UploadedSize', sortfield: '', header: 'Uploaded Size (KB)', filterMatchMode: 'contains' },
    { field: 'UploadCount', sortfield: '', header: 'Count', filterMatchMode: 'contains' }
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
        this.isFormSubmitted = false;
        this.vesselHistoricalUploadStatus = data;
      });
    }
  }

}
