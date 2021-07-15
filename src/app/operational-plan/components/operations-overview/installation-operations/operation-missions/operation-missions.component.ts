import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfigurationService } from '@kognifai/poseidon-ng-configurationservice';
import * as fileSaver from 'file-saver';
import { ConfirmationService, MessageService } from 'primeng/api';
import { take } from 'rxjs/operators';
import { Configuration } from 'src/app/configuration';
import { Mission } from 'src/app/models/mission';
import { OperationalPlanService } from 'src/app/services/operational-plan.service';

@Component({
  selector: 'app-operation-missions',
  templateUrl: './operation-missions.component.html',
  styleUrls: ['./operation-missions.component.scss']
})
export class OperationMissionsComponent implements OnInit {

  constructor(public fb: FormBuilder,
              private operationalPlanService: OperationalPlanService,
              private router: Router,
              private confirmationService: ConfirmationService,
              public configurationService: ConfigurationService<Configuration>,
              private messageService: MessageService) { }

  cols = [
    { field: 'fileManager', sortfield: '', header: '' },
    { field: 'logs', sortfield: '', header: '' },
    { field: 'name', sortfield: 'name', header: 'Name', filterMatchMode: 'contains' },
    { field: 'missionNumber', sortfield: 'missionNumber', header: 'Mission Number', filterMatchMode: 'contains' },
    { field: 'type', sortfield: 'type', header: 'Type', filterMatchMode: 'contains' },
    { field: 'description', sortfield: 'description', header: 'Description', filterMatchMode: 'contains' },
    { field: 'startTime', sortfield: 'startTime', header: 'Start Time', filterMatchMode: 'contains' },
    { field: 'endTime', sortfield: 'endTime', header: 'End Time', filterMatchMode: 'contains' },
    { field: 'uploadedDate', sortfield: 'uploadedDate', header: 'Uploaded Date' }
  ];
  vesselId = 0;
  OperationMissions: Mission[] = [];
  isDataLoading = false;
  @Input() operation: any;

  ngOnInit() {
    this.getoperationMissions(this.operation);
  }
  getoperationMissions(op: any) {
    if (op) {
      this.operation = op;
    }
    this.isDataLoading = true;
    this.operationalPlanService.getOperationMissions(this.operation.Id).pipe(take(1)).subscribe((data) => {
      this.OperationMissions = data;
      this.isDataLoading = false;
    });
  }

  gotoFileManager(row: Mission) {
    window.location.href = `${this.configurationService.config.filemanagerLink}` + row.missionPath;
  }
  
  downloadOperatorLog(row: Mission) {
    this.isDataLoading = true;
    this.operationalPlanService.downloadMissionLog(row.id).pipe(take(1)).subscribe((response) => {
      const blob: any = new Blob([response], { type: 'text/csv; charset=utf-8' });
      fileSaver.saveAs(blob, row.name + '_OperatorComments.csv');
      this.isDataLoading = false;
    },
      (err) => {
        this.isDataLoading = false;
        console.log(err.message);
        if (err.status === 404) {
          this.triggerToast('error', 'Message', `No operator comments generated for the mission.`);
        } else {
          this.confirmationService.confirm({
            header: 'Error',
            message: `<span class="u--bgDanger">${err.message}</span>`,
            rejectVisible: false,
            acceptLabel: 'Ok'
          });
        }
      }
    );
  }

  triggerToast(severity: string, summary: string, detail: string): void {
    this.messageService.add(
      {
        severity,
        summary,
        detail
      });
  }

  goToListOperations(){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/operational-plan/operations-overview/' + this.operation.VesselId])
    );
  }

}
