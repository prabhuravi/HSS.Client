import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { take } from 'rxjs/operators';
import { AppConstants } from 'src/app/app.constants';
import { InstallationService } from 'src/app/services/installation.service';
import { OperationalPlanService } from 'src/app/services/operational-plan.service';
import { PrepareInstallationService } from 'src/app/services/prepare-installation.service';

@Component({
  selector: 'app-create-documents',
  templateUrl: './create-documents.component.html',
  styleUrls: ['./create-documents.component.scss']
})
export class CreateDocumentsComponent implements OnInit {
  documentTypes: IDocumentType[] = [];
  installationDocuments: IInstallationDocument[] = [];
  uploadFromOptions = [{ Option: 'Local' }, { Option: 'Cloud' }];
  uploadFrom: string;
  editDocument: IInstallationDocument = null;
  showCloudLibraryModal: boolean;
  isCloudLibraryDataLoading: boolean = true;
  selectedInstallationDocuments: IInstallationDocument[] = [];
  selectedDocument: any = null;
  installations: IVessel[] = [];
  selectedInstallation: IVessel = null;

  PRIMENG_CONSTANTS = AppConstants.PRIMENG_CONSTANTS;
  form: FormGroup;
  file: File;
  isDataLoading = false;
  selectInstallationLoading = false;
  disableActivity: boolean;
  vesselId = 0;
  @Output() nextActiveTab: EventEmitter<any> = new EventEmitter();

  cols = [
    { field: 'Date', sortfield: '', header: 'Date', filterMatchMode: 'contains' },
    { field: 'DocumentName', sortfield: 'DocumentName', header: 'Document Name', filterMatchMode: 'contains' },
    { field: 'DocumentTypeName', sortfield: 'DocumentTypeName', header: 'Document Type', filterMatchMode: 'contains' },
    { field: 'UploadSource', sortfield: 'UploadSource', header: 'Upload Source', filterMatchMode: 'contains' },
    // { field: 'CopyVesselId', sortfield: 'CopyVesselId', header: 'Upload Source', filterMatchMode: 'contains' },
    { field: 'FileName', sortfield: 'FileName', header: 'File', filterMatchMode: 'contains' },
    { field: 'Id', sortfield: '', header: 'Action' }
  ];

  pDialogCols = [
    { field: 'Id', sortfield: '', header: 'Select' },
    { field: 'DocumentName', sortfield: 'DocumentName', header: 'Document Name', filterMatchMode: 'contains' },
    { field: 'DocumentTypeName', sortfield: 'DocumentTypeName', header: 'Document Type', filterMatchMode: 'contains' },
    { field: 'FileName', sortfield: 'FileName', header: 'File Name', filterMatchMode: 'contains' },
  ];

  constructor(public fb: FormBuilder, private operationalPlanService: OperationalPlanService, private installationService: InstallationService, private router: Router, private route: ActivatedRoute,
    private confirmationService: ConfirmationService, private prepareInstallationService: PrepareInstallationService, private messageService: MessageService) { }

  ngOnInit() {
    if (!this.prepareInstallationService.installation) {
      this.prepareInstallationService.setInstallationFromRoute(this.route);
    }
    this.isCloudLibraryDataLoading = false;
    this.getDocumentType();
    this.getInstallationDocuments();
    this.form = this.buildForm();
  }

  buildForm() {
    const group = this.fb.group({});
    group.addControl('documentName', this.fb.control({ value: '', disabled: false }, [Validators.required]));
    group.addControl('documentType', this.fb.control({ value: '', disabled: false }, [Validators.required]));
    group.addControl('version', this.fb.control({ value: '', disabled: false }, [Validators.required]));
    group.addControl('documentDate', this.fb.control({ value: '', disabled: false }, [Validators.required]));
    group.addControl('uploadSource', this.fb.control({ value: '', disabled: false }, [Validators.required]));
    group.addControl('localFile', this.fb.control({ value: '', disabled: false }, [Validators.required]));
    return group;
  }

  toggleCloudLibraryModal(): void {
    this.showCloudLibraryModal = !this.showCloudLibraryModal;
    this.selectedDocument = null;
    this.selectedInstallation = null;
    this.selectedInstallationDocuments = [];
    this.selectInstallationLoading = true;
    this.installationService.getPreparedInstallations().pipe(take(1)).subscribe((data) => {
      this.installations = data;
      this.installations = this.installations.filter(x => x.Id !== this.vesselId);
      this.selectInstallationLoading = false;
    });
  }

  selectDocument(item: any) {
    this.selectedDocument = item;
  }

  installationChanged() {
    this.selectInstallationLoading = true;
    this.operationalPlanService.getInstallationDocuments(this.selectedInstallation.Id).pipe(take(1)).subscribe((data) => {
      this.selectedInstallationDocuments = data;
      this.selectInstallationLoading = false;
    });
  }

  uploadSourceChanged() {
    this.selectedDocument = null;
    this.editDocument = null;
    this.form.controls.documentName.reset();
    this.form.controls.version.reset();
    this.form.controls.localFile.reset();
    if (this.form && this.form.get) {
      this.uploadFrom = this.form.get('uploadSource').value.Option;
      if (this.uploadFrom == 'Local') {
        this.form.controls.documentType.setValidators([Validators.required]);
        this.form.controls.documentName.setValidators([Validators.required]);
        this.form.controls.version.setValidators([Validators.required]);
        this.form.controls.documentDate.setValidators([Validators.required]);
        this.form.controls.documentType.enable();
        this.form.controls.documentName.enable();
        this.form.controls.version.enable();
        this.form.controls.documentDate.enable();
        this.form.controls.documentDate.setValue(new Date());
        this.form.controls.localFile.setValidators([Validators.required]);
        this.form.controls.localFile.setValue('');
        this.form.controls.localFile.updateValueAndValidity();
      }
      else {
        this.form.controls.localFile.clearValidators();
        this.form.controls.documentType.clearValidators();
        this.form.controls.documentName.clearValidators();
        this.form.controls.version.clearValidators();
        this.form.controls.documentDate.clearValidators();
        this.form.controls.documentType.disable();
        this.form.controls.documentName.disable();
        this.form.controls.version.disable();
        this.form.controls.documentDate.disable();
        this.form.controls.documentDate.reset();
        this.form.controls.localFile.updateValueAndValidity();
      }
    }
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

  getDocumentType() {
    this.isDataLoading = true;
    this.operationalPlanService.getDocumentTypes().pipe(take(1)).subscribe((data) => {
      this.documentTypes = data;
      this.isDataLoading = false;
    });
  }

  incomingFile(event) {
    this.file = event.target.files[0];
  }

  addDocument() {
    if (this.form.valid) {
      let formData: FormData = new FormData();
      formData.append('Id', (this.editDocument == null ? 0 : this.editDocument.Id).toString());
      formData.append('VesselId', this.vesselId.toString());
      formData.append('CreatedBy', '');
      formData.append('InstallationName', this.prepareInstallationService.installation.displayName);
      if (this.uploadFrom === 'Cloud' && this.selectedDocument !== null)
      {
        formData.append('DocumentId', this.selectedDocument.DocumentId);
        formData.append('CopyVesselId', this.selectedDocument.VesselId);
      }
      else {
        formData.append('DocumentName', this.form.value.documentName);
        formData.append('DocumentTypeId', this.form.value.documentType.Id);
        this.form.value.documentDate = this.converDateToISOString(this.form.value.documentDate),
          formData.append('Date', this.form.value.documentDate);
        formData.append('Version', this.form.value.version);
        formData.append('CopyVesselId', "0");
        if (this.editDocument !== null) {
          formData.append('DocumentId', this.editDocument.DocumentId.toString());
        }
        if (this.file != undefined) {
          formData.append('File', this.file, this.file.name);
        }
      }
      this.isDataLoading = true;
      this.operationalPlanService.AddDocumentAsync(formData).pipe(take(1)).subscribe((data) => {
        this.isDataLoading = false;
        if (this.editDocument == null) {
          this.triggerToast('success', 'Success Message', `Document added successfully`);
        }
        else {
          this.triggerToast('success', 'Success Message', `Document updated successfully`);
        }
        this.getInstallationDocuments();
        this.clear();
      });
    }
  }

  editInstallationDocument(rowData: IInstallationDocument) {
    this.editDocument = rowData;
    this.form.setValue({
      documentName: rowData.DocumentName,
      documentType: this.documentTypes.find(p => p.Id == rowData.DocumentTypeId),
      version: rowData.Version,
      documentDate: new Date(rowData.Date).toLocaleDateString(),
      uploadSource: this.uploadFromOptions.find(p => p.Option == (rowData.CopyVesselId === 0 ? 'Local' : 'Cloud')),
      localFile: ''
    });
    this.uploadFrom = this.uploadFromOptions.find(p => p.Option == (rowData.CopyVesselId === 0 ? 'Local' : 'Cloud')).Option;

    if (this.uploadFrom == 'Local') {
      this.form.controls.documentName.setValidators([Validators.required]);
      this.form.controls.documentType.setValidators([Validators.required]);
      this.form.controls.version.setValidators([Validators.required]);
      this.form.controls.documentDate.setValidators([Validators.required]);
      this.form.controls.documentName.enable();
      this.form.controls.documentType.enable();
      this.form.controls.version.enable();
      this.form.controls.documentDate.enable();
      if (this.editDocument !== null) {
        this.form.controls.localFile.clearValidators();
      }
      else {
        this.form.controls.localFile.setValidators([Validators.required]);
      }
      this.file = undefined;
      this.form.controls.localFile.reset();
      this.form.controls.localFile.updateValueAndValidity();
    }
    else {
      this.form.controls.localFile.clearValidators();
      this.form.controls.documentName.clearValidators();
      this.form.controls.documentType.clearValidators();
      this.form.controls.version.clearValidators();
      this.form.controls.documentDate.clearValidators();
      this.form.controls.documentName.disable();
      this.form.controls.documentType.disable();
      this.form.controls.version.disable();
      this.form.controls.documentDate.disable();
      this.form.controls.localFile.updateValueAndValidity();
      this.form.controls.documentName.reset();
      this.form.controls.documentType.reset();
      this.form.controls.version.reset();
      this.form.controls.documentDate.reset();
      this.form.controls.localFile.reset();
    }
  }

  deleteInstallationDocument(rowData: IInstallationDocument) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the document?',
      accept: () => {
        this.isDataLoading = true;
        this.operationalPlanService.deleteInstallationDocument(rowData.Id).pipe(take(1)).subscribe((data) => {
          this.isDataLoading = false;
          this.triggerToast('success', 'Success Message', `Document deleted successfully`);
          this.getInstallationDocuments();
        });
      }
    });
  }

  clear() {
    this.editDocument = null;
    this.uploadFrom = '';
    this.form.reset();
  }

  cancel() {
    this.router.navigateByUrl('/operational-plan');
  }

  next(): void {
    // this.nextActiveTab.emit(5);
    this.router.navigateByUrl('/operational-plan/prepare-installation/contacts/' + this.vesselId);
  }

  triggerToast(severity: string, summary: string, detail: string): void {
    this.messageService.add(
      {
        severity,
        summary,
        detail
      });
  }
  
  converDateToISOString(date: any): string {
    date = new Date(date.toString());
    date = new Date(date.toString().slice(0, date.toString().indexOf('GMT')) + 'GMT').toISOString();
    return date;
  }
}
