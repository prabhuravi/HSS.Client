import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from '@kognifai/poseidon-message-service';
import { ConfirmationService } from 'primeng/api';
import { take } from 'rxjs/operators';
import { saveAs } from 'file-saver';
import { OperationalPlanService } from 'src/app/services/operational-plan.service';
import { PrepareInstallationService } from 'src/app/services/prepare-installation.service';



@Component({
  selector: 'app-installation-document',
  templateUrl: './installation-document.component.html',
  styleUrls: ['./installation-document.component.scss']
})
export class InstallationDocumentComponent implements OnInit {

  constructor(public fb: FormBuilder,
              private operationalPlanService: OperationalPlanService,
              private router: Router,
              private route: ActivatedRoute,
              private confirmationService: ConfirmationService, 
              private prepareInstallationService: PrepareInstallationService,
              private messageService: MessageService) { }
  cols = [
    { field: 'Date', sortfield: '', header: 'Date', filterMatchMode: 'contains' },
    { field: 'DocumentName', sortfield: 'DocumentName', header: 'Document Name', filterMatchMode: 'contains' },
    { field: 'DocumentTypeName', sortfield: 'DocumentTypeName', header: 'Document Type', filterMatchMode: 'contains' },
    { field: 'UploadSource', sortfield: 'UploadSource', header: 'Upload Source', filterMatchMode: 'contains' },
    { field: 'FileName', sortfield: 'FileName', header: 'File', filterMatchMode: 'contains' },
    { field: 'Download', sortfield: '', header: 'Download' }
  ];
  vesselId = 0;
  installationDocuments: IInstallationDocument[] = [];
  isDataLoading = false;
  ngOnInit() {
    this.getInstallationDocuments();
  }

  getInstallationDocuments() {
    if (this.route !== undefined && this.route !== null) {
      const params = this.route.snapshot.paramMap.get('vesselId');
      this.vesselId = parseInt(params, null);
      this.isDataLoading = true;
      this.operationalPlanService.getInstallationDocuments(this.vesselId).pipe(take(1)).subscribe((data) => {
        this.installationDocuments = data;
        console.log(this.installationDocuments);
        this.isDataLoading = false;
      });
    }
  }
  downloadDocument(row: IInstallationDocument) {
    this.operationalPlanService.downloadDocument(row.DocumentId).pipe(take(1)).subscribe((blob) => {
      console.log(blob);
      saveAs(blob, row.FileName, {
        type: blob.type
     });
  });
}
}
