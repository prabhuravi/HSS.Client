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
    formTitle: 'Add Operator',
    formList: []
  };
  operatorList: IOperators[] = [];
  cols = [
    { field: 'OperatorName', header: 'Operator Name' },
    { field: 'Action', header: 'Action' }
  ];
  formValues: any = null;

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
        validators: ['required'],
        disabled: false
      }
    ];
  }
  editData(data: IOperators): void {
    this.config.formTitle = 'Edit Operator';
    this.formValues = data;
  }
  formSubmitted(data): void {
    console.log(data);
  }
}
