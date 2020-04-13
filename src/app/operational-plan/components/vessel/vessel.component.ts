import { Component, OnInit } from '@angular/core';
import { OperationalPlanService } from 'src/app/services/operational-plan.service';
import { FormType } from '../../../app.constants';
import { ConfirmationService, MessageService } from 'primeng/api';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-vessel',
  templateUrl: './vessel.component.html',
  styleUrls: ['./vessel.component.scss']
})
export class VesselComponent implements OnInit {

  vesselList: IVesselList[] = [];
  formType = FormType;
  config = {
    formTitle: 'Add Vessel',
    formList: []
  };
  cols = [
    { field: 'VesselName', header: 'Vessel Name' },
    { field: 'ImoNumber', header: 'IMO Number' },
    { field: 'Action', header: 'Action' }
  ];
  formValues: any;
  activeId = 0;
  isDataLoading: boolean;
  disableDeleteButton: boolean;

  constructor(
    private operationalPlanService: OperationalPlanService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
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
        key: 'VesselName',
        validators: ['required'],
        disabled: false
      },
      {
        type: FormType.number,
        label: 'IMO Number',
        value: '',
        key: 'ImoNumber',
        validators: ['required'],
        disabled: false
      }
    ];
  }
  editData(data: IVesselList): void {
    this.activeId = data.Id;
    this.config.formTitle = 'Edit Vessel';
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
    if (this.activeId !== 0) {
      data.Id = this.activeId;
    }
    this.operationalPlanService.addVessel(data).subscribe((success) => {
      this.triggerToast('success', 'Success Message', `Data ${(this.activeId !== 0) ? 'Updated' : 'Added'} Successfully`);
      this.loadData();
    });
  }
  deleteData(data): void {
    this.disableDeleteButton = true;
    this.operationalPlanService.deleteVessel(data).subscribe((success) => {
      this.disableDeleteButton = false;
      this.triggerToast('success', 'Success Message', `Data Deleted Successfully`);
      this.loadData();
    });
  }
  deleteDataConfirm(data) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.deleteData(data);
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
