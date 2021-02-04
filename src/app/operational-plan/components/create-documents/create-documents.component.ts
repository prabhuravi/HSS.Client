import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { take } from 'rxjs/operators';
import { AppConstants } from 'src/app/app.constants';
import { OperationalPlanService } from 'src/app/services/operational-plan.service';
import { PrepareInstallationService } from 'src/app/services/prepare-installation.service';

@Component({
  selector: 'app-create-documents',
  templateUrl: './create-documents.component.html',
  styleUrls: ['./create-documents.component.scss']
})
export class CreateDocumentsComponent implements OnInit {

  documentName: string;
  documentTypes: IDocumentType[] = [];
  selectedDocumentType: IDocumentType = null;
  documentVersion: string;
  documentDate: Date;
  installationDocuments: IInstallationDocument[] = [];
  uploadFromOptions = [{ Option: 'Local' }, { Option: 'Cloud' }];
  selectedUploadFrom: any;
  uploadFrom: string;
  documentTypeId: number = null;
  editDocument: IInstallationDocument = null;
  showCloudLibraryModal: boolean;
  isCloudLibraryDataLoading: boolean = true;
  installationsByDocumentType: ICopyInstallationModel[] = [];
  selectedInstallationByDocType: any = null;

  PRIMENG_CONSTANTS = AppConstants.PRIMENG_CONSTANTS;
  form: FormGroup;
  file: File;

  isDataLoading = false;
  disableActivity: boolean;
  vesselId = 0;
  @Output() nextActiveTab: EventEmitter<any> = new EventEmitter();

  cols = [
    { field: 'Date', sortfield: '', header: 'Date', filterMatchMode: 'contains' },
    { field: 'DocumentName', sortfield: 'DocumentName', header: 'Document Name', filterMatchMode: 'contains' },
    { field: 'DocumentTypeName', sortfield: 'DocumentTypeName', header: 'Document Type', filterMatchMode: 'contains' },
    { field: 'CopyVesselId', sortfield: 'CopyVesselId', header: 'Upload Source', filterMatchMode: 'contains' },
    { field: 'FileName', sortfield: 'FileName', header: 'File', filterMatchMode: 'contains' },
    { field: 'Id', sortfield: '', header: 'Action' }
  ];

  constructor(public fb: FormBuilder, private operationalPlanService: OperationalPlanService, private router: Router,
    private confirmationService: ConfirmationService, private prepareInstallationService: PrepareInstallationService, private messageService: MessageService) { }

  ngOnInit() {
    this.vesselId = this.prepareInstallationService.installation.id;
    this.isCloudLibraryDataLoading = false;
    this.getDocumentType();
    this.getInstallationDocuments();
    this.form = this.buildForm();
    console.log(this.prepareInstallationService.installation);
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
    console.log(this.showCloudLibraryModal);
  }

  changeInstallationDocument(item: any) {
    this.selectedInstallationByDocType = item;
    console.log(this.selectedInstallationByDocType);
  }

  useInstallationDocument() {
    console.log(this.selectedInstallationByDocType);
  }

  documentTypeChanged()
  {
    this.documentTypeId = this.form.get('documentType').value.Id;
  }

  uploadSourceChanged() {
    this.selectedInstallationByDocType = null;
    this.editDocument = null;
    this.form.controls.documentName.reset();
    this.form.controls.version.reset();
    this.form.controls.documentDate.reset();
    this.form.controls.localFile.reset();

    if (this.form && this.form.get) {
      this.uploadFrom = this.form.get('uploadSource').value.Option;
      if (this.uploadFrom == 'Local') {
        this.form.controls.documentName.setValidators([Validators.required]);
        this.form.controls.version.setValidators([Validators.required]);
        this.form.controls.documentDate.setValidators([Validators.required]);
        this.form.controls.documentName.enable();
        this.form.controls.version.enable();
        this.form.controls.documentDate.enable();

        // if (this.editDocument !== null) {
        //   this.form.controls.localFile.clearValidators();
        // }
        // else {
        //   this.form.controls.localFile.setValidators([Validators.required]);
        // }

        this.form.controls.localFile.setValidators([Validators.required]);
        this.form.controls.localFile.setValue('');
        this.form.controls.localFile.updateValueAndValidity();
      }
      else {  // Cloud
        this.form.controls.localFile.clearValidators();
        this.form.controls.documentName.clearValidators();
        this.form.controls.version.clearValidators();
        this.form.controls.documentDate.clearValidators();
        this.form.controls.documentName.disable();
        this.form.controls.version.disable();
        this.form.controls.documentDate.disable();

        this.form.controls.localFile.updateValueAndValidity();

        // this.editDocument = null;
        // this.form.controls.documentName.reset();
        // this.form.controls.version.reset();
        // this.form.controls.documentDate.reset();
        // this.form.controls.localFile.reset();
      }
    }
  }

  chooseFromCloudLibrary() {
    this.isDataLoading = true;
    this.operationalPlanService.getInstallationsByDocumentTypeId(this.form.value.documentType.Id).pipe(take(1)).subscribe((data) => {
      console.log(data);
      this.installationsByDocumentType = data;
      this.installationsByDocumentType = this.installationsByDocumentType.filter(x => x.VesselId !== this.vesselId);
      console.log(this.installationsByDocumentType);
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
      formData.append('DocumentTypeId', this.form.value.documentType.Id);
      formData.append('CreatedBy', '');
      // formData.append('CopyVesselId', ((this.uploadFrom === 'Cloud' && this.selectedInstallationByDocType !== null) ? this.selectedInstallationByDocType.Id : 0).toString());
      formData.append('InstallationName', this.prepareInstallationService.installation.displayName);
      if (this.uploadFrom === 'Cloud' && this.selectedInstallationByDocType !== null) // Upload from Cloud
      {
        formData.append('DocumentId', this.selectedInstallationByDocType.DocumentId);
        formData.append('CopyVesselId', this.selectedInstallationByDocType.VesselId);
      }
      else { //Upload from Local 
        formData.append('DocumentName', this.form.value.documentName);
        formData.append('Date', this.form.value.documentDate.toJSON());
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
        console.log(data);
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

  getInstallationDocuments() {
    // this.vesselId = 1;
    this.isDataLoading = true;
    this.operationalPlanService.getInstallationDocuments(this.vesselId).pipe(take(1)).subscribe((data) => {
      console.log(data);
      this.installationDocuments = data;
      console.log(this.installationDocuments);
      // this.installationDocuments = [{
      //   Id: 1, VesselId: 1, DocumentId: 23, DocumentTypeId: 1, DocumentName: 'Installation Manual', DocumentTypeName: 'Manual', Version: '1.0.0',
      //   DocumentPath: '', FileName: 'TalismanManual.docx', Date: new Date(), UploadSource: 'Local', CopyVesselId: 2
      // }];
      this.isDataLoading = false;
    });
  }

  getDocumentType() {
    this.isDataLoading = true;
    this.operationalPlanService.getDocumentTypes().pipe(take(1)).subscribe((data) => {
      this.documentTypes = data;
      // this.documentTypes = [{ Id: 1, TypeName: 'Manual', CreatedDate: new Date(), ModifiedDate: new Date(), CreatedBy: 'Sandeep' },
      // { Id: 2, TypeName: 'Inspection Path', CreatedDate: new Date(), ModifiedDate: new Date(), CreatedBy: 'Prabhu' }];
      this.isDataLoading = false;
    });
  }

  editInstallationDocument(rowData: IInstallationDocument) {
    this.editDocument = rowData;
    this.form.setValue({
      documentName: rowData.DocumentName,
      documentType: this.documentTypes.find(p => p.Id == rowData.DocumentTypeId),
      version: rowData.Version,
      documentDate:  new Date(rowData.Date).toLocaleDateString(),
      uploadSource: this.uploadFromOptions.find(p => p.Option == (rowData.CopyVesselId === 0 ? 'Local' : 'Cloud')),
      localFile: ''
    });
    this.uploadFrom = this.uploadFromOptions.find(p => p.Option == (rowData.CopyVesselId === 0 ? 'Local' : 'Cloud')).Option;
    this.documentTypeId = rowData.DocumentTypeId;

    if (this.uploadFrom == 'Local') {
      this.form.controls.documentName.setValidators([Validators.required]);
      this.form.controls.version.setValidators([Validators.required]);
      this.form.controls.documentDate.setValidators([Validators.required]);
      this.form.controls.documentName.enable();
      this.form.controls.version.enable();
      this.form.controls.documentDate.enable();

      if (this.editDocument !== null) {
        this.form.controls.localFile.clearValidators();
      }
      else {
        this.form.controls.localFile.setValidators([Validators.required]);
      }
      this.form.controls.localFile.reset();
      this.form.controls.localFile.updateValueAndValidity();
    }
    else {  // Cloud
      this.form.controls.localFile.clearValidators();
      this.form.controls.documentName.clearValidators();
      this.form.controls.version.clearValidators();
      this.form.controls.documentDate.clearValidators();
      this.form.controls.documentName.disable();
      this.form.controls.version.disable();
      this.form.controls.documentDate.disable();
      this.form.controls.localFile.updateValueAndValidity();

      this.form.controls.documentName.reset();
      this.form.controls.version.reset();
      this.form.controls.documentDate.reset();
      this.form.controls.localFile.reset();
    }
  }

  deleteInstallationDocument(rowData: IInstallationDocument) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the document?',
      accept: () => {
        console.log(rowData);
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
    this.documentTypeId = null;
    this.form.reset();
  }

  cancel() {
    this.router.navigateByUrl('/operational-plan');
  }

  next(): void {
    this.nextActiveTab.emit(5);
    this.router.navigateByUrl('/operational-plan/prepare-installation/contacts/' + this.prepareInstallationService.installation.id);
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
