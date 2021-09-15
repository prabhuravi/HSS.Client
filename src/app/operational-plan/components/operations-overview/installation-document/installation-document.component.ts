/*
 * KONGSBERG PROPRIETARY. This document and its accompanying elements, contain KONGSBERG information which is proprietary and confidential.
Any disclosure, copying, distribution or use is prohibited if not otherwise explicitly agreed with KONGSBERG in writing.
Any authorized reproduction, in whole or in part, must include this legend. © [year of creation] KONGSBERG – All rights reserved.
 */
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as fileSaver from 'file-saver';
import { take } from 'rxjs/operators';
import { AppConstants } from 'src/app/app.constants';
import { OperationalPlanService } from 'src/app/services/operational-plan.service';

@Component({
  selector: 'app-installation-document',
  templateUrl: './installation-document.component.html',
  styleUrls: ['./installation-document.component.scss']
})
export class InstallationDocumentComponent implements OnInit {

  constructor(public fb: FormBuilder,
              private operationalPlanService: OperationalPlanService,
              private route: ActivatedRoute) { }
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
  appConstants = AppConstants;

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
        this.isDataLoading = false;
      });
    }
  }
  downloadDocument(row: IInstallationDocument) {
    this.operationalPlanService.downloadDocument(row.DocumentId).pipe(take(1)).subscribe((response) => {
      const blob: any = new Blob([response], { type: response.type });
      fileSaver.saveAs(blob, row.FileName);
  });
}
}
