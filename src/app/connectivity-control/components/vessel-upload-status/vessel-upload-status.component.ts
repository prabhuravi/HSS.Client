import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OperationalPlanService } from 'src/app/services/operational-plan.service';
import { ConnectivityControlService } from 'src/app/services/connectivity-control.service';
import { take } from 'rxjs/operators';
import { AppConstants } from 'src/app/app.constants';

@Component({
  selector: 'app-vessel-upload-status',
  templateUrl: './vessel-upload-status.component.html',
  styleUrls: ['./vessel-upload-status.component.scss']
})
export class VesselUploadStatusComponent implements OnInit {

  form: FormGroup;
  isFormSubmitted = false;
  vesselList: IVesselList[] = [];
  fromMissionList: IBasicDropdown[] = [];
  toMissionList: IBasicDropdown[] = [];
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
  vesselListLoaded: boolean = false;
  PRIMENG_CONSTANTS = AppConstants.PRIMENG_CONSTANTS;

  constructor(
    private operationalPlanService: OperationalPlanService,
    private connectivityControlService: ConnectivityControlService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.loadVessels();
  }
  loadVessels(): void {
    this.operationalPlanService.getVesselList().subscribe((data) => {
      this.vesselListLoaded = true;
      this.vesselList = data;
      this.form = this.buildForm();
    });
  }
  getMissionList(): void {
    const formData = {
      VesselName: this.form.get('VesselName').value.VesselName
    };
    this.connectivityControlService.getMissionList(formData).pipe(take(1)).subscribe((data) => {
      this.fromMissionList = [];
      data.forEach((e) => {
        const mission = {
          name: e,
          value: e
        };
        this.fromMissionList.push(mission);
      });
    });
  }
  filterToMissionList(): void {
    const activeFromMission = this.form.get('FromMission').value.value;
    this.toMissionList = [];
    this.fromMissionList.forEach((e) => {
      if (e.value > activeFromMission) {
        this.toMissionList.push(e);
      }
    });
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
      this.form.value.VesselName = this.form.value.VesselName.VesselName;
      this.form.value.FromMission = this.form.value.FromMission.value;
      this.form.value.ToMission = this.form.value.ToMission.value;
      this.connectivityControlService.getVesselUploadStatus(this.form.value).pipe(take(1)).subscribe((data) => {
        this.vesselHistoricalUploadStatus = data;
      });
    }
  }

}
