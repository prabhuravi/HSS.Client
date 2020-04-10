import { Component, OnInit } from '@angular/core';
import { OperationalPlanService } from 'src/app/services/operational-plan.service';
import { FormType } from '../../../app.constants';

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

  constructor(
    private operationalPlanService: OperationalPlanService
  ) { }

  ngOnInit() {
    this.operationalPlanService.getRobotSystemDetails().subscribe((robotsystemData) => {
      this.robotsystemList = robotsystemData;
    });
    this.constructForm();
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
        value: '',
        key: 'IPAddress',
        validators: ['required'],
        disabled: false
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
    this.config.formTitle = 'Edit Robot System';
    this.formValues = data;
  }

  formSubmitted(data: any): void {
    console.log(data);
  }

}
