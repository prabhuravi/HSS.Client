/*
 * KONGSBERG PROPRIETARY. This document and its accompanying elements, contain KONGSBERG information which is proprietary and confidential.
Any disclosure, copying, distribution or use is prohibited if not otherwise explicitly agreed with KONGSBERG in writing.
Any authorized reproduction, in whole or in part, must include this legend. © [year of creation] KONGSBERG – All rights reserved.
 */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ConfirmationService, MessageService } from 'primeng/api';
import { take } from 'rxjs/operators';
import { AppConstants } from 'src/app/app.constants';
import { ConnectivityControlService } from 'src/app/services/connectivity-control.service';
import { OperationalPlanService } from 'src/app/services/operational-plan.service';

@Component({
  selector: 'app-vessel-upload-status',
  templateUrl: './vessel-upload-status.component.html',
  styleUrls: ['./vessel-upload-status.component.scss']
})
export class VesselUploadStatusComponent implements OnInit {

  form: FormGroup;
  isFormSubmitted: boolean;
  // vesselList: IVesselList[] = [];
  vesselList: IVessel[] = [];
  missionList: IBasicDropdown[] = [];
  fromMissionList: IBasicDropdown[] = [];
  toMissionList: IBasicDropdown[] = [];
  vesselHistoricalUploadStatus: IVesselUploadStatus;
  selectedRows: any[];
  prevFiliterData: any;
  disableMarkForUpload: boolean = true;
  disableActivity: boolean;
  appConstants = AppConstants;
  cols = [

    { field: 'FileUploadedDate', sortfield: 'VesselName', header: 'Uploaded Date', filterMatchMode: 'contains' },
    { field: 'VesselName', sortfield: 'VesselName', header: 'Installation Name', filterMatchMode: 'contains' },
    { field: 'Mission', sortfield: 'Mission', header: 'Mission Name', filterMatchMode: 'contains' },
    { field: 'FileName', sortfield: 'FileName', header: 'File Name', filterMatchMode: 'contains' },
    { field: 'FilePath', sortfield: '', header: 'Vessel File Path', filterMatchMode: 'contains' },
    { field: 'FileCreatedDate', sortfield: 'FileCreatedDate', header: 'Created Date', filterMatchMode: 'contains' },
    { field: 'FileModifiedDate', sortfield: '', header: 'Modified Date', filterMatchMode: 'contains' },
    { field: 'FileType', sortfield: 'FileType', header: 'Type', filterMatchMode: 'contains' },
    { field: 'UploadStatus', sortfield: 'UploadStatus', header: 'Status', filterMatchMode: 'contains' },
    { field: 'FileSize', sortfield: '', header: 'Act(KB)', filterMatchMode: 'contains' },
    { field: 'UploadedSize', sortfield: '', header: 'Upload(KB)', filterMatchMode: 'contains' },
    { field: 'UploadCount', sortfield: '', header: 'Count', filterMatchMode: 'contains' }
  ];
  vesselListLoaded: boolean;
  PRIMENG_CONSTANTS = AppConstants.PRIMENG_CONSTANTS;

  constructor(
    public operationalPlanService: OperationalPlanService,
    public connectivityControlService: ConnectivityControlService,
    public confirmationService: ConfirmationService,
    public messageService: MessageService,
    public fb: FormBuilder
  ) { }

  ngOnInit() {
    this.loadVessels();
  }
  loadVessels(): void {
    this.connectivityControlService.getVessels().subscribe((data) => {
      this.vesselListLoaded = true;
      this.vesselList = data;
      this.form = this.buildForm();
    });
  }
  getMissionList(): void {
    let vesselId;
    if (this.form && this.form.get) {
      vesselId = this.form.get('VesselId').value.Id
    }
    this.connectivityControlService.getMissionList(vesselId).pipe(take(1)).subscribe((data) => {
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
    let activeFromMission = '';
    if (this.form && this.form.get) {
      activeFromMission = this.form.get('FromMission').value.value;
    }
    this.toMissionList = [];
    this.missionList.forEach((e) => {
      if (e.value >= activeFromMission) {
        this.toMissionList.push(e);
      }
    });
  }
  filterFromMissionList(): void {
    let activeToMission = '';
    if (this.form && this.form.get) {
      activeToMission = this.form.get('ToMission').value.value;
    }
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
    this.vesselHistoricalUploadStatus = null;
    this.isFormSubmitted = true;
    if (this.form.valid) {
      const filterData = {
        VesselId: this.form.value.VesselId.Id,
        FromMission: this.form.value.FromMission.value == undefined? '': this.form.value.FromMission.value,
        ToMission: this.form.value.ToMission.value == undefined? '': this.form.value.ToMission.value,
        FromDate: this.form.value.FromDate,
        ToDate: this.form.value.ToDate
      };
      if (filterData.FromDate instanceof Date) {
        const FromDate = moment(filterData.FromDate).format().split('+');
        filterData.FromDate = `${FromDate[0]}`;
      }
      if (filterData.ToDate instanceof Date) {
        const ToDate = moment(filterData.ToDate).format().split('+');
        filterData.ToDate = `${ToDate[0]}`;
      }
      this.connectivityControlService.getVesselUploadStatus(filterData).pipe(take(1)).subscribe((data) => {
        this.isFormSubmitted = false;
        this.vesselHistoricalUploadStatus = data;
        this.prevFiliterData = filterData;
      });
    }
  }
  resetMissions(): void {
    this.missionList = [];
    this.fromMissionList = [];
    this.toMissionList = [];
  }

  selectRow(checkValue) {
    if (checkValue) {
      this.selectedRows = this.vesselHistoricalUploadStatus.FileOnVessels.filter((value) => value.FileType === '.upload_later');
    } else {
      this.selectedRows = [];
    }
    this.checkRowSelection();
  }

  onRowSelect(event) {
    this.checkRowSelection();

}

onRowUnselect(event) {
  this.checkRowSelection();
}

checkRowSelection(): void {
  if (this.selectedRows.length > 0 ) {
    this.disableMarkForUpload = false;
  } else {
    this.disableMarkForUpload = true;
  }
}

markSelectionForUpload(): void{
  const markForUploadIds = this.selectedRows.map(({ Id }) => Id);
  this.confirmationService.confirm({
    message: 'Are you sure that you want to mark the selected ' + this.selectedRows.length + ' file(s) for upload ?',
    accept: () => {

      this.connectivityControlService.MarkFileForUpload(markForUploadIds).pipe(take(1)).subscribe(() => {
        this.triggerToast('success', 'Success Message', 'Files will be uploaded in the next sync with vessel');
        this.isFormSubmitted = true;
        this.connectivityControlService.getVesselUploadStatus(this.prevFiliterData).pipe(take(1)).subscribe((data) => {
            this.vesselHistoricalUploadStatus = data;
            this.selectedRows = [];
            this.checkRowSelection();
            this.isFormSubmitted = false;
        });
      });
    }
  });
}

triggerToast(severity: string, summary: string, detail: string): void {
  this.messageService.add(
    {
      severity,
      summary,
      detail
    });
}

}
