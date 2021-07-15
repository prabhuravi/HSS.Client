import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { take, timeout } from 'rxjs/operators';
import { OperationStatusEnum } from 'src/app/app.constants';
import { Operation, SecondaryOperation } from 'src/app/models/Operation';
import { OperationalPlanService } from 'src/app/services/operational-plan.service';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-list-operations',
  templateUrl: './list-operations.component.html',
  styleUrls: ['./list-operations.component.scss']
})
export class ListOperationsComponent implements OnInit {

  vesselId: number = 0;
  isDataLoading = false;
  @Output() showCreateOperation = new EventEmitter<boolean>();
  @Output() operationEdited: EventEmitter<any> = new EventEmitter<any>();
  @Output() createOperation: EventEmitter<any> = new EventEmitter<any>();

  operations: Operation[] = [];

  cols = [
    { field: 'OperationType.OperationTypeName', sortfield: 'OperationType.OperationTypeName', header: 'Type', filterMatchMode: 'contains' },
    { field: 'OperationStatus.Name', sortfield: 'OperationStatus.Name', header: 'Status', filterMatchMode: 'contains' },
    { field: 'Sections', sortfield: 'Sections', header: 'Sections', filterMatchMode: 'contains' },
    { field: 'Date', sortfield: '', header: 'Date', filterMatchMode: 'contains' },
    { field: 'Description', sortfield: 'Description', header: 'Description', filterMatchMode: 'contains' },
    { field: 'Operator.Name', sortfield: 'Operator.Name', header: 'Operator', filterMatchMode: 'contains' },
    { field: 'OperatorBooking.Status', sortfield: 'OperatorBooking.Status', header: 'Booking Status', filterMatchMode: 'contains' },
    { field: 'PortLocation.PortName', sortfield: 'PortLocation.PortName', header: 'Port', filterMatchMode: 'contains' },
    { field: 'ETB', sortfield: '', header: 'ETB', filterMatchMode: 'contains' },
    { field: 'Id', header: 'Action', sortfield: '' }
  ];

  constructor(private operationalPlanService: OperationalPlanService, private confirmationService: ConfirmationService, private route: ActivatedRoute,
    private messageService: MessageService) { }

  ngOnInit() {
    const params = this.route.snapshot.paramMap.get('vesselId');
    this.vesselId = parseInt(params, null);
    this.loadOperations();
  }

  loadOperations() {
    this.isDataLoading = true;
    this.operationalPlanService.getOperations(this.vesselId).pipe(take(1)).subscribe((data) => {
      this.operations = data;
      this.operations = this.operations.sort((a, b) => (a.Date < b.Date) ? 1 : -1);
      this.isDataLoading = false;
    });
  }

  editOperation(operation: Operation) {
    this.operationEdited.emit(operation);
  }

  goToOperationSections(operation: Operation) {
    this.operationEdited.emit(operation);
  }

  goToSecondaryOperationSections(secOperation: SecondaryOperation) {
  }

  deleteOperation(operation: Operation) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the operation?',
      accept: () => {
        if (operation.OperationStatus.Name == OperationStatusEnum.Requested || operation.OperationStatus.Name == OperationStatusEnum.Pending) {
          this.isDataLoading = true;
          this.operationalPlanService.deleteOperation(operation.Id).pipe(take(1)).subscribe((data) => {
            this.isDataLoading = false;
            this.triggerToast('success', 'Success Message', `Operation deleted successfully`);
            this.loadOperations();
          });
        }
        else {
          this.triggerToast('error', 'Message', `You can delete operation only when status is Requested or Pending`);
        }
      }
    });
  }

  deleteSecondaryOperation(secondaryOperation: SecondaryOperation) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the secondary operation?',
      accept: () => {
        this.isDataLoading = true;
        this.operationalPlanService.deleteSecondaryOperation(secondaryOperation.Id).pipe(take(1)).subscribe((data) => {
          this.isDataLoading = false;
          this.triggerToast('success', 'Success Message', `Secondary operation deleted successfully`);
          this.loadOperations();
        });
      }
    });
  }

  goToCreateOperation() {
    this.showCreateOperation.emit(true);
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
