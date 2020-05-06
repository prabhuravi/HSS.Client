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
    formTitle: 'Add Robot System',
    formList: []
  };
  cols = [
    { field: 'RobotSerialNumber', header: 'Robot Serial Number' },
    { field: 'NodeNumber', header: 'Node Number' },
    { field: 'IPAddress', header: 'Gateway Address' },
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
        label: 'Robot Serial Number',
        value: '',
        key: 'RobotSerialNumber',
        validators: ['required'],
        disabled: false
      },
      {
        type: FormType.number,
        label: 'Node Number',
        value: '',
        key: 'NodeNumber',
        validators: ['required'],
        disabled: false
      },
      {
        type: FormType.text,
        label: 'Operational Gateway Address',
        labelSmall: '(Only Valid IP Address)',
        value: '',
        key: 'IPAddress',
        validators: ['required', 'ipaddress'],
        disabled: false,
        ipaddress: true
      },
      {
        type: FormType.checkbox,
        label: 'Connectivity Control',
        value: false,
        key: 'ConnectivityControl',
        validators: [],
        disabled: false
      },
      {
        type: FormType.checkbox,
        label: 'Connectivity Monitoring',
        value: false,
        key: 'ConnectivityMonitoring',
        validators: [],
        disabled: false
      }
    ];
  }
  editData(data: IRobotSystemDetails): void {
    this.activeId = data.RobotSystemId;
    this.config.formTitle = 'Edit Robot System';
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
    if (this.activeId !== 0) {
      data.RobotSystemId = this.activeId;
    }
    this.operationalPlanService.addRobotSystemDetail(data).subscribe((success) => {
      this.triggerToast('success', 'Success Message', `Data ${(this.activeId !== 0) ? 'Updated' : 'Added'} Successfully`);
      // tslint:disable-next-line:no-construct
      this.formReset = new Boolean(true);
      this.activeId = null;
      this.config.formTitle = 'Add Operator';
      this.formValues = null;
      this.loadData();
    });
  }
  deleteData(data): void {
    this.disableDeleteButton = true;
    this.operationalPlanService.deleteRobotSystemDetail(data).subscribe((success) => {
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
