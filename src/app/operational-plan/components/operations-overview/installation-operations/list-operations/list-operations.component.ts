import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
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
    // { field: 'SecondaryOperations', sortfield: '', header: 'SecondaryOperations', filterMatchMode: '' },
    { field: 'Sections', sortfield: 'Sections', header: 'Sections', filterMatchMode: 'contains' },
    { field: 'OperationType.OperationTypeName', sortfield: 'OperationType.OperationTypeName', header: 'Type', filterMatchMode: 'contains' },
    { field: 'BookingStatus', sortfield: 'BookingStatus', header: 'Booking Status', filterMatchMode: 'contains' },
    { field: 'Operator', sortfield: 'Operator', header: 'Operator', filterMatchMode: 'contains' },
    { field: 'OperationStatus.Name', sortfield: 'OperationStatus.Name', header: 'Status', filterMatchMode: 'contains' },
    { field: 'PortLocation.PortName', sortfield: 'PortLocation.PortName', header: 'Port', filterMatchMode: 'contains' },
    { field: 'ETB', sortfield: '', header: 'ETB', filterMatchMode: 'contains' },
    { field: 'Id', header: 'Action', sortfield: '' }
  ];

  constructor(private operationalPlanService: OperationalPlanService, private route: ActivatedRoute) { }

  ngOnInit() {
    const params = this.route.snapshot.paramMap.get('vesselId');
    this.vesselId = parseInt(params, null);
    console.log('list op VesselId: ' + this.vesselId);

    this.isDataLoading = true;
    this.operationalPlanService.getOperations(this.vesselId).pipe(take(1)).subscribe((data) => {
      // console.log(data);
      this.operations = data;
      console.log(this.operations);
      this.isDataLoading = false;
    });
  }

  editOperation(operation: Operation)
  {
    console.log(operation);
    this.operationEdited.emit(operation);
    this.showCreateOperation.emit(true);
  }

  editSecondaryOperation(secondaryOperation: SecondaryOperation)
  {
    console.log(secondaryOperation);
    // this.secondaryOperationEdited.emit(secondaryOperation);
    // this.showCreateOperation.emit(true);
  }

  onOperationUpdated(operation: Operation)
  {
    console.log(operation);  // added for updated operation. Updade grid with updated operation
  }

  deleteOperation(operation: Operation)
  {
    console.log(operation);
  }

  deleteSecondaryOperation(secondaryOperation: SecondaryOperation)
  {
    console.log(secondaryOperation);
  }

  goToCreateOperation()
  {
    this.showCreateOperation.emit(true);
    this.createOperation.emit(true);
  }

}
