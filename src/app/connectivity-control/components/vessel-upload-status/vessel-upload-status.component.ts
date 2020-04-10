import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OperationalPlanService } from 'src/app/services/operational-plan.service';
import { ConnectivityControlService } from 'src/app/services/connectivity-control.service';

@Component({
  selector: 'app-vessel-upload-status',
  templateUrl: './vessel-upload-status.component.html',
  styleUrls: ['./vessel-upload-status.component.scss']
})
export class VesselUploadStatusComponent implements OnInit {

  form: FormGroup;
  isFormSubmitted = false;
  vesselList: IVesselList[] = [];
  missionList: IBasicDropdown[] = [];
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

  constructor(
    private operationalPlanService: OperationalPlanService,
    private connectivityControlService: ConnectivityControlService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.missionList = this.connectivityControlService.getMissionList(this.vesselList[0].VesselName);
    this.form = this.buildForm();
  }
  buildForm() {
    const group = this.fb.group({});
    group.addControl('VesselName', this.fb.control({ value: '', disabled: false }, [Validators.required]));
    group.addControl('FromMission', this.fb.control({ value: '', disabled: false }, [Validators.required]));
    group.addControl('ToMission', this.fb.control({ value: '', disabled: false }, [Validators.required]));
    return group;
  }
  onSubmit() {
    this.isFormSubmitted = true;
    if (this.form.valid) {
      console.log(this.form.value);
      this.vesselHistoricalUploadStatus = this.connectivityControlService.getVesselUploadStatus(this.form.value);
    }
  }

}
