import { Component, OnInit, ɵConsole } from '@angular/core';
import { OperationalPlanService } from 'src/app/services/operational-plan.service';
import { FormType, AppConstants } from '../../../app.constants';
import { ConfirmationService, MessageService } from 'primeng/api';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-robot-system',
  templateUrl: './robot-system.component.html',
  styleUrls: ['./robot-system.component.scss']
})
export class RobotSystemComponent implements OnInit {

  robotsystemList: IRobotSystemDetails[] = [];
  formType = FormType;
  config = {
    formTitle: 'Add Hull Skater',
    formList: []
  };
  cols = [
    { field: 'SerialNumber', header: 'HullSkater Serial Number' },
    { field: 'Name', header: 'Name' },
    { field: 'Version', header: 'Version' },
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
    this.operationalPlanService.getRobotSystemDetails().pipe(take(1)).subscribe((robotsystemData) => {
      this.isDataLoading = false;
      this.robotsystemList = robotsystemData;
    });
  }

  constructForm(): void {
    this.config.formList = [
      {
        type: FormType.text,
        label: 'HullSkater Serial Number',
        value: '',
        key: 'SerialNumber',
        validators: ['required'],
        disabled: false
      },
      {
        type: FormType.text,
        label: 'Name',
        value: '',
        key: 'Name',
        validators: ['required'],
        disabled: false
      },
      {
        type: FormType.text,
        label: 'Version',
        value: '',
        key: 'Version',
        validators: ['required'],
        disabled: false
      }
    ];
  }

  editData(data: IRobotSystemDetails): void {
    this.activeId = data.Id;
    this.config.formTitle = 'Edit Hull Skater';
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
    if (this.activeId !== 0) {  //Update
      data.Id = this.activeId;
      this.operationalPlanService.updateRobotSystemDetail(data.Id, data).subscribe((success) => {
        this.triggerToast('success', 'Success Message', `Hull Skater Updated Successfully`);
        this.formReset = new Boolean(true);
        this.activeId = 0;
        this.config.formTitle = 'Update Hull Skater';
        this.formValues = null;
        this.loadData();
      });
    }
    else {  //Add
      this.operationalPlanService.addRobotSystemDetail(data).subscribe((success) => {
        this.triggerToast('success', 'Success Message', `Hull Skater Added Successfully`);
        this.formReset = new Boolean(true);
        this.activeId = 0;
        this.config.formTitle = 'Add Hull Skater';
        this.formValues = null;
        this.loadData();
      });
    }
  }

  deleteData(id): void {
    this.disableDeleteButton = true;
    this.operationalPlanService.deleteRobotSystemDetail(id).subscribe((success) => {
      this.disableDeleteButton = false;
      this.triggerToast('success', 'Success Message', `Hull Skater Deleted Successfully`);
      this.formReset = new Boolean(true);
      this.activeId = 0;
      this.config.formTitle = 'Add Hull Skater';
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
