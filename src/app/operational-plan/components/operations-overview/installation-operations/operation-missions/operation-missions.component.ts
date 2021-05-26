import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from '@kognifai/poseidon-message-service';
import { ConfirmationService } from 'primeng/api';
import { take } from 'rxjs/operators';
import { OperationDocument } from 'src/app/models/OperationDocument';
import { OperationalPlanService } from 'src/app/services/operational-plan.service';
import { saveAs } from 'file-saver';
import { Mission } from 'src/app/models/mission';


@Component({
  selector: 'app-operation-missions',
  templateUrl: './operation-missions.component.html',
  styleUrls: ['./operation-missions.component.scss']
})
export class OperationMissionsComponent implements OnInit {

  constructor(public fb: FormBuilder,
              private operationalPlanService: OperationalPlanService,
              private router: Router,
              private route: ActivatedRoute,
              private confirmationService: ConfirmationService,
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
    this.getoperationMissions(this.operation)
  }
  getoperationMissions(op: any) {
    if (op) {
      this.operation = op;
    }
    this.isDataLoading = true;
    this.operationalPlanService.getOperationMissions(this.operation.Id).pipe(take(1)).subscribe((data) => {
      this.OperationMissions = data;
      console.log(this.OperationMissions);
      this.isDataLoading = false;
    });
  }

  gotoFileManager(row: Mission) {
    console.log(row);
  }
  downloadOperatorLog(row: Mission) {
    console.log(row);
  }

}
