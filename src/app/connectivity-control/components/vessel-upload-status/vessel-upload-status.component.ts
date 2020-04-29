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
  isFormSubmitted: boolean;
  vesselList: IVesselList[] = [];
  missionList: IBasicDropdown[] = [];
  fromMissionList: IBasicDropdown[] = [];
  toMissionList: IBasicDropdown[] = [];
  vesselHistoricalUploadStatus: IVesselUploadStatus;
  cols = [
    { field: 'FileUploadedDate', sortfield: 'VesselName', header: 'Uploaded Date', filterMatchMode: 'contains' },
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
  vesselListLoaded: boolean;
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
      VesselId: this.form.get('VesselId').value.Id
    };
    this.connectivityControlService.getMissionList(formData).pipe(take(1)).subscribe((data) => {
      this.missionList = [];
      data.forEach((e) => {
        const mission = {
          name: e,
          value: e
        };
        this.missionList.push(mission);
      });
      this.fromMissionList = this.missionList;
      this.toMissionList = this.missionList;
    });
  }
  filterToMissionList(): void {
    const activeFromMission = this.form.get('FromMission').value.value;
    this.toMissionList = [];
    this.missionList.forEach((e) => {
      if (e.value >= activeFromMission) {
        this.toMissionList.push(e);
      }
    });
  }
  filterFromMissionList(): void {
    const activeToMission = this.form.get('ToMission').value.value;
    this.fromMissionList = [];
    this.missionList.forEach((e) => {
      if (e.value <= activeToMission) {
        this.fromMissionList.push(e);
      }
    });
  }
  buildForm() {
    const group = this.fb.group({});
    group.addControl('VesselId', this.fb.control({ value: '', disabled: false }, [Validators.required]));
    group.addControl('FromMission', this.fb.control({ value: '', disabled: false }, []));
    group.addControl('ToMission', this.fb.control({ value: '', disabled: false }, []));
    group.addControl('FromDate', this.fb.control({ value: '', disabled: false }, []));
    group.addControl('ToDate', this.fb.control({ value: '', disabled: false }, []));
    return group;
  }
  onSubmit() {
    this.isFormSubmitted = true;
    if (this.form.valid) {
      this.form.value.VesselId = this.form.value.VesselId.Id;
      this.form.value.FromMission = this.form.value.FromMission.value;
      this.form.value.ToMission = this.form.value.ToMission.value;
      this.connectivityControlService.getVesselUploadStatus(this.form.value).pipe(take(1)).subscribe((data) => {
        this.isFormSubmitted = false;
        this.vesselHistoricalUploadStatus = data;
      });
    }
  }

}
