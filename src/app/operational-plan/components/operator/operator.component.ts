import { Component, OnInit } from '@angular/core';
import { FormType } from '../../../app.constants';
import { OperationalPlanService } from 'src/app/services/operational-plan.service';

@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.scss']
})
export class OperatorComponent implements OnInit {

  config = {
    formTitle: 'Operator',
    formList: []
  };
  operatorList: IOperators[] = [];
  cols = [
    { field: 'OperatorName', header: 'Operator Name' },
    { field: 'Action', header: 'Action' }
  ];

  constructor(
    private operationalPlanService: OperationalPlanService
  ) { }

  ngOnInit() {
    this.operatorList = this.operationalPlanService.getOperators();
    this.constructForm();
  }
  constructForm() {
    this.config.formList = [
      {
        type: FormType.text,
        label: 'Operator Name',
        value: '',
        key: 'OperatorName',
        validators: [],
        disabled: false
      }
    ];
  }
}
