import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { take } from 'rxjs/operators';
import { AppConstants } from 'src/app/app.constants';
import { OperationalPlanService } from 'src/app/services/operational-plan.service';

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
  editDocument: IInstallationDocument = null;
  showCloudLibraryModal: boolean;
  isCloudLibraryDataLoading: boolean = true;
  cloudLibraryData = [];
  selectedCloudLibraryItem: any = null;

  PRIMENG_CONSTANTS = AppConstants.PRIMENG_CONSTANTS;
  form: FormGroup;
  file: File;

  isDataLoading = false;
  disableActivity: boolean;
  vesselId = 0;

  cols = [
    { field: 'Date', sortfield: 'Date', header: 'Date', filterMatchMode: 'contains' },
    { field: 'DocumentName', sortfield: 'Name', header: 'Document Name', filterMatchMode: 'contains' },
    { field: 'DocumentType', sortfield: 'Type', header: 'Document Type', filterMatchMode: 'contains' },
    { field: 'File', sortfield: 'File', header: 'File', filterMatchMode: 'contains' },
    { field: 'Id', sortfield: '', header: 'Action' }
  ];

  constructor(public fb: FormBuilder, private operationalPlanService: OperationalPlanService,
    private confirmationService: ConfirmationService, private messageService: MessageService) { }

  ngOnInit() {
    this.isCloudLibraryDataLoading = false;
    this.getDocumentType();
    this.getInstallationDocument();
    this.form = this.buildForm();
    this.cloudLibraryData = [{ Id: 1, InstallationName: 'Talisman' },
    { Id: 2, InstallationName: 'Berge Apo' }, { Id: 3, InstallationName: 'Ejnan' }];
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
    this.selectedCloudLibraryItem = item;
    console.log(this.selectedCloudLibraryItem);
  }

  useInstallationDocument() {
    console.log(this.selectedCloudLibraryItem);
  }

  uploadSourceChanged() {
    this.selectedCloudLibraryItem = null;
    if (this.form && this.form.get) {
      this.uploadFrom = this.form.get('uploadSource').value.Option;
      if (this.uploadFrom == 'Local') {
        this.form.controls.localFile.setValidators([Validators.required]);
        this.form.controls.localFile.updateValueAndValidity();
        this.form.controls.localFile.setValue('');
      }
      else {
        this.form.controls.localFile.clearValidators();
        this.form.controls.localFile.updateValueAndValidity();
      }
    }
    console.log(this.uploadFrom);
    console.log(this.form);
    // this.uploadFrom = this.selectedUploadFrom.Option;
  }

  chooseFromCloudLibrary() {
    console.log('chooseFromCloudLibrary');
  }

  incomingFile(event) {
    this.file = event.target.files[0];
    console.log(this.file);
    console.log(this.form);
  }

  addDocument() {
    console.log(this.form);
    if (this.form.valid) {
      const data = {
        Id: this.editDocument == null ? 0 : this.editDocument.Id, //Id == 0 add mode, otherwise edit mode
        VesselId: this.vesselId,
        DocumentTypeId: this.form.value.documentType.value !== undefined ? this.form.value.documentType.value.Id : '',
        Date: this.form.value.documentDate.value !== undefined ? this.form.value.documentDate.value : '',
        Version: this.form.value.version.value !== undefined ? this.form.value.version : '',
        CreatedBy: '',
        CloudDecumentId: (this.uploadFrom === 'Cloud' && this.selectedCloudLibraryItem !== null)? this.selectedCloudLibraryItem.Id: 0  // If not zero this is an upload from cloud
      };

      let formData: FormData = new FormData();
      // formData.append('data', data);

      if (this.file != undefined) {
        formData.append('uploadFile', this.file, this.file.name);
        console.log(formData);

        this.isDataLoading = true;
        this.operationalPlanService.getVesselSections(this.vesselId).pipe(take(1)).subscribe((data) => {
          this.isDataLoading = false;
          if (this.editDocument == null) {
            this.triggerToast('success', 'Success Message', `Document added successfully`);
          }
          else {
            this.triggerToast('success', 'Success Message', `Document updated successfully`);
          }
          this.editDocument = null;
          this.uploadFrom = '';
          this.form.reset();

        });
      }

      if (this.selectedCloudLibraryItem !== null) {
        console.log(this.selectedCloudLibraryItem);
        // This is an upload from cloud library
        if (this.editDocument == null) {
          this.triggerToast('success', 'Success Message', `Document added successfully`);
        }
        else {
          this.triggerToast('success', 'Success Message', `Document updated successfully`);
        }
      }

    }
  } k

  getInstallationDocument() {
    this.isDataLoading = true;
    this.operationalPlanService.getInstallationDocument(this.vesselId).pipe(take(1)).subscribe((data) => {
      // this.installationDocuments = data;
      this.installationDocuments = [{ Id: 1, DocumentTypeId: 1, DocumentName: 'Installation Manual', DocumentType: 'Manual', Version: '1.0.0', DocumentPath: '', File: 'TalismanManual.docx', Date: new Date(), UploadSource: 'Local' }];
      this.isDataLoading = false;
    });
  }

  getDocumentType() {
    this.isDataLoading = true;
    this.operationalPlanService.getDocumentType().pipe(take(1)).subscribe((data) => {
      // this.documentTypes = data;
      this.documentTypes = [{ Id: 1, TypeName: 'Manual', CreatedDate: new Date(), ModifiedDate: new Date(), CreatedBy: 'Sandeep' },
      { Id: 2, TypeName: 'Inspection Path', CreatedDate: new Date(), ModifiedDate: new Date(), CreatedBy: 'Prabhu' }];
      this.isDataLoading = false;
    });
  }

  editInstallationDocument(rowData: IInstallationDocument) {
    console.log(rowData);
    this.editDocument = rowData;
    this.form.setValue({
      documentName: rowData.DocumentName,
      documentType: this.documentTypes.find(p => p.Id == rowData.DocumentTypeId),
      version: rowData.Version,
      documentDate: rowData.Date,
      uploadSource: this.uploadFromOptions.find(p => p.Option == rowData.UploadSource),
      localFile: ''
    });
    console.log(this.form);
    this.uploadFrom = this.uploadFromOptions.find(p => p.Option == rowData.UploadSource).Option;

    if (this.uploadFrom == 'Local') {
      this.form.controls.localFile.setValidators([Validators.required]);
      this.form.controls.localFile.updateValueAndValidity();
      this.form.controls.localFile.setValue('');
    }
    else {
      this.form.controls.localFile.clearValidators();
      this.form.controls.localFile.updateValueAndValidity();
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
        });
      }
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
