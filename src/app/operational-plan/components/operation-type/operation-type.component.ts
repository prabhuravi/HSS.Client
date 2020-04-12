import { Component, OnInit } from '@angular/core';
import { OperationalPlanService } from 'src/app/services/operational-plan.service';
import { FormType } from 'src/app/app.constants';
import { ConfirmationService, MessageService } from 'primeng/api';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-operation-type',
  templateUrl: './operation-type.component.html',
  styleUrls: ['./operation-type.component.scss']
})
export class OperationTypeComponent implements OnInit {

  config = {
    formTitle: 'Add Operation Type',
    formList: []
  };
  operationtypeList: IOperationTypes[] = [];
  cols = [
    { field: 'OperationTypeName', header: 'Operation Type' },
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
    this.operationalPlanService.getOperationTypes().pipe(take(1)).subscribe((operationtypeData) => {
      this.isDataLoading = false;
      this.operationtypeList = operationtypeData;
    });
  }
  constructForm() {
    this.config.formList = [
      {
        type: FormType.text,
        label: 'Operation Type',
        value: '',
        key: 'OperationTypeName',
        validators: ['required'],
        disabled: false
      }
    ];
  }
  editData(data: IOperationTypes): void {
    this.activeId = data.Id;
    this.config.formTitle = 'Edit Operation Type';
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
    this.operationalPlanService.addOperationType(data).subscribe((success) => {
      this.triggerToast('success', 'Success Message', `Data ${(this.activeId !== 0) ? 'Updated' : 'Added'} Successfully`);
      this.loadData();
    });
  }
  deleteData(data): void {
    this.disableDeleteButton = true;
    this.operationalPlanService.deleteOperationType(data).subscribe((success) => {
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
