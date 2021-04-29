import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { take, timeout } from 'rxjs/operators';
import { Operation, SecondaryOperation } from 'src/app/models/Operation';
import { OperationalPlanService } from 'src/app/services/operational-plan.service';

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
    { field: 'Date', sortfield: '', header: 'Date', filterMatchMode: 'contains' },
    { field: 'Description', sortfield: 'Description', header: 'Description', filterMatchMode: 'contains' },
    { field: 'Sections', sortfield: 'Sections', header: 'Sections', filterMatchMode: 'contains' },
    { field: 'OperationType.OperationTypeName', sortfield: 'OperationType.OperationTypeName', header: 'Type', filterMatchMode: 'contains' },
    { field: 'BookingStatus', sortfield: 'BookingStatus', header: 'Booking Status', filterMatchMode: 'contains' },
    { field: 'Operator', sortfield: 'Operator', header: 'Operator', filterMatchMode: 'contains' },
    { field: 'OperationStatus.Name', sortfield: 'OperationStatus.Name', header: 'Status', filterMatchMode: 'contains' },
    { field: 'PortLocation.PortName', sortfield: 'PortLocation.PortName', header: 'Port', filterMatchMode: 'contains' },
    { field: 'ETB', sortfield: '', header: 'ETB', filterMatchMode: 'contains' },
    { field: 'Id', header: 'Action', sortfield: '' }
  ];

  constructor(private operationalPlanService: OperationalPlanService,private confirmationService: ConfirmationService, private route: ActivatedRoute,
  private messageService: MessageService) { }

  ngOnInit() {
    const params = this.route.snapshot.paramMap.get('vesselId');
    this.vesselId = parseInt(params, null);
    console.log('list op VesselId: ' + this.vesselId);
    this.loadOperations();

    // this.route.params.subscribe(params => {
    //   this.vesselId = params['vesselId'];
    //   console.log(this.vesselId);
    //   this.loadOperations();
    // });

  }

  loadOperations()
  {
    this.isDataLoading = true;
    this.operationalPlanService.getOperations(this.vesselId).pipe(take(1)).subscribe((data) => {
      console.log(data);
      this.operations = data;
      console.log(this.operations);
      this.isDataLoading = false;
    });
  }

  editOperation(operation: Operation)
  {
    this.operationEdited.emit(operation);
  }

  deleteOperation(operation: Operation)
  {
    console.log(operation);
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the operation?',
      accept: () => {
        this.isDataLoading = true;
        this.operationalPlanService.deleteOperation(operation.Id).pipe(take(1)).subscribe((data) => {
          this.isDataLoading = false;
          this.triggerToast('success', 'Success Message', `Operation deleted successfully`);
          this.loadOperations();
        });
      }
    });
  }

  deleteSecondaryOperation(secondaryOperation: SecondaryOperation)
  {
    console.log(secondaryOperation);
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

  goToCreateOperation()
  {
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
