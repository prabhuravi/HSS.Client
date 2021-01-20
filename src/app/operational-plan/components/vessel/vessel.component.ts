import { Component, OnInit } from '@angular/core';
import { OperationalPlanService } from 'src/app/services/operational-plan.service';
import { FormType, AppConstants } from '../../../app.constants';
import { ConfirmationService, MessageService } from 'primeng/api';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-vessel',
  templateUrl: './vessel.component.html',
  styleUrls: ['./vessel.component.scss']
})
export class VesselComponent implements OnInit {

  vesselList: any[] = [];
  formType = FormType;
  config = {
    formTitle: 'Add Vessel',
    formList: []
  };
  cols = [
    { field: 'Name', header: 'Vessel Name' },
    { field: 'ImoNo', header: 'IMO Number' },
    { field: 'Action', header: 'Action' }
  ];
  formValues: any;
  activeId = 0;
  isDataLoading: boolean;
  disableDeleteButton: boolean;
  PRIMENG_CONSTANTS = AppConstants.PRIMENG_CONSTANTS;
  formReset: any;

  constructor(
    public operationalPlanService: OperationalPlanService,
    public confirmationService: ConfirmationService,
    public messageService: MessageService
  ) { }

  ngOnInit() {
    this.loadData();
    this.constructForm();
  }

  loadData(): void {
    this.isDataLoading = true;
    this.operationalPlanService.getVesselList().subscribe((data) => {
      this.isDataLoading = false;
      this.vesselList = data;
    });
  }
  constructForm(): void {
    this.config.formList = [
      {
        type: FormType.text,
        label: 'Vessel Name',
        value: '',
        key: 'Name',
        validators: ['required'],
        disabled: false
      },
      {
        type: FormType.number,
        label: 'IMO Number',
        value: '',
        key: 'ImoNo',
        validators: ['required'],
        disabled: false
      }
    ];
  }

  editData(data: IVessel): void {
    this.activeId = data.Id;
    this.config.formTitle = 'Edit Vessel';
    this.formReset = false;
    this.formValues = data;
  }

  formSubmitted(data): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.updateData(data);
      }
    });
  }

  updateData(data): void {
    const formData = {  // Take more input from UI later
      Id: this.activeId ,
      ImoNo: data.ImoNo,
      Name: data.Name,
      DisplayName: data.Name,
      Owner: '',
      Status: 'Active',
      InstallationId: '',
      LloydsVesselId: 0,
    };
    if (this.activeId !== 0) {
      this.operationalPlanService.updateVessel(formData.Id, formData).subscribe((success) => {
        this.triggerToast('success', 'Success Message', `Vessel Updated Successfully`);
        this.formReset = new Boolean(true);
        this.activeId = 0;
        this.config.formTitle = 'Update Vessel';
        this.formValues = null;
        this.loadData();
      });
    }
    else {
      this.operationalPlanService.addVessel(formData).subscribe((success) => {
        this.triggerToast('success', 'Success Message', `Vessel Added Successfully`);
        this.formReset = new Boolean(true);
        this.activeId = 0;
        this.config.formTitle = 'Add Vessel';
        this.formValues = null;
        this.loadData();
      });
    }
  }

  deleteData(id): void {
    this.disableDeleteButton = true;
    this.operationalPlanService.deleteVessel(id).subscribe((success) => {
      this.disableDeleteButton = false;
      this.triggerToast('success', 'Success Message', `Vessel Deleted Successfully`);
      this.formReset = new Boolean(true);
      this.activeId = 0;
      this.config.formTitle = 'Add Vessel';
      this.formValues = null;
      this.loadData();
    });
  }

  deleteDataConfirm(id) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.deleteData(id);
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
