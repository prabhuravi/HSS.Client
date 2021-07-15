import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { Operation } from 'src/app/models/Operation';
import { OperationalPlanService } from 'src/app/services/operational-plan.service';

@Component({
  selector: 'app-operator-log',
  templateUrl: './operator-log.component.html',
  styleUrls: ['./operator-log.component.scss']
})
export class OperatorLogComponent implements OnInit {

  @Input() operation: Operation;
  operatorNote: string;
  operatorLogs: IOperatorLog[] = [];
  operatorLogLoading = false;

  constructor(private operationalPlanService: OperationalPlanService, private messageService: MessageService) { }

  ngOnInit() {
    this.operatorLogLoading = true;
    this.operationalPlanService.getGetOperatorLogs(this.operation.Id).pipe(take(1)).subscribe((data) => {
      this.operatorLogLoading = false;
      this.operatorLogs = data;
    });
  }

  addOperatorLog()
  {
    this.operatorLogLoading = true;
    this.operationalPlanService.addOperatorLog({OperationId: this.operation.Id, Note: this.operatorNote}).pipe(take(1)).subscribe((data) => {
      this.operatorLogLoading = false;
      this.operatorLogs = data;
      this.operatorNote = '';
      this.triggerToast('success', 'Success Message', `Note added successfully`);
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
