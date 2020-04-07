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
    formTitle: 'Robot System',
    formList: []
  };
  cols = [
    { field: 'RobotSerialNumber', header: 'Robot Serial Number' },
    { field: 'NodeNumber', header: 'Node Number' },
    { field: 'IPAddress', header: 'Gateway Address' },
    { field: 'Action', header: 'Action' }
  ];

  constructor(
    private operationalPlanService: OperationalPlanService
  ) { }

  ngOnInit() {
    this.robotsystemList = this.operationalPlanService.getRobotSystemDetails();
    this.constructForm();
  }

  constructForm(): void {
    this.config.formList = [
      {
        type: FormType.text,
        label: 'Robot Serial Number',
        value: '',
        key: 'RobotSerialNumber',
        validators: [],
        disabled: false
      },
      {
        type: FormType.text,
        label: 'Node Number',
        value: '',
        key: 'NodeNumber',
        validators: [],
        disabled: false
      },
      {
        type: FormType.text,
        label: 'Operational Gateway Address',
        value: '',
        key: 'IPAddress',
        validators: [],
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

}
