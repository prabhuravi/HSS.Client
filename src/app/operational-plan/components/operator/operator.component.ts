import { Component, OnInit } from '@angular/core';
import { FormType, AppConstants } from '../../../app.constants';
import { OperationalPlanService } from 'src/app/services/operational-plan.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.scss']
})
export class OperatorComponent implements OnInit {

  config = {
    formTitle: 'Add Operator',
    formList: []
  };
  operatorList: IOperators[] = [];
  cols = [
    { field: 'OperatorName', header: 'Operator Name' },
    { field: 'Action', header: 'Action' }
  ];
  formValues: any = null;
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
    this.operationalPlanService.getOperators().pipe(take(1)).subscribe((operatorData) => {
      this.isDataLoading = false;
      this.operatorList = operatorData;
    });
  }

  constructForm() {
    this.config.formList = [
      {
        type: FormType.text,
        label: 'Operator Name',
        value: '',
        key: 'OperatorName',
        validators: ['required'],
        disabled: false
      }
    ];
  }

  editData(data: IOperators): void {
    this.activeId = data.Id;
    this.config.formTitle = 'Edit Operator';
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
    if (this.activeId !== 0) { //Update Operator
      data.Id = this.activeId;
      this.operationalPlanService.updateOperator(data.Id , data).subscribe((success) => {
        this.triggerToast('success', 'Success Message', `Data Updated Successfully`);
        this.formReset = new Boolean(true);
        this.activeId = 0;
        this.config.formTitle = 'Add Operator';
        this.formValues = null;
        this.loadData();
      });
    }
    else { // Add Operator
      this.operationalPlanService.addOperator(data).subscribe((success) => {
        this.triggerToast('success', 'Success Message', `Data Added Successfully`);
        this.formReset = new Boolean(true);
        this.activeId = 0;
        this.config.formTitle = 'Add Operator';
        this.formValues = null;
        this.loadData();
      });
    }
  }

  deleteData(id): void {
    this.disableDeleteButton = true;
    this.operationalPlanService.deleteOperator(id).subscribe((success) => {
      this.disableDeleteButton = false;
      this.triggerToast('success', 'Success Message', `Data Deleted Successfully`);
      this.formReset = new Boolean(true);
      this.activeId = 0;
      this.config.formTitle = 'Add Operator';
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
