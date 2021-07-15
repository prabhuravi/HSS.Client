import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from '@kognifai/poseidon-message-service';
import { ConfirmationService } from 'primeng/api';
import { take } from 'rxjs/operators';
import { OperationDocument } from 'src/app/models/OperationDocument';
import { OperationalPlanService } from 'src/app/services/operational-plan.service';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-operation-document',
  templateUrl: './operation-document.component.html',
  styleUrls: ['./operation-document.component.scss']
})
export class OperationDocumentComponent implements OnInit {

  constructor(public fb: FormBuilder,
              private operationalPlanService: OperationalPlanService,
              private router: Router,
              private route: ActivatedRoute,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) { }

  cols = [
    { field: 'documentType.typeName', sortfield: 'documentType.typeName', header: 'Document Type', filterMatchMode: 'contains' },
    { field: 'file', sortfield: 'file', header: 'File', filterMatchMode: 'contains' },
    { field: 'createdDate', sortfield: 'createdDate', header: 'CreatedDate' },
    { field: 'modifiedDate', sortfield: 'modifiedDate', header: 'ModifiedDate' },
    { field: 'Download', sortfield: '', header: 'Download' }
  ];
  vesselId = 0;
  OperationDocuments: OperationDocument[] = [];
  isDataLoading = false;
  @Input() operation: any;

  ngOnInit() {
    this.getOperationDocuments(this.operation);
  }
  getOperationDocuments(op: any) {
    if (op) {
      this.operation = op;
    }
    this.operationalPlanService.getOperationDocuments(this.operation.Id).pipe(take(1)).subscribe((data) => {
      this.OperationDocuments = data;
      this.isDataLoading = false;
    });
  }
  downloadDocument(row: OperationDocument) {
    this.operationalPlanService.downloadOperationDocument(row.id).subscribe((response) => {
       const blob: any = new Blob([response], { type: response.type });
       fileSaver.saveAs(blob, row.file);
    });
  }

  goToListOperations(){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/operational-plan/operations-overview/' + this.operation.VesselId])
    );
  }
}
