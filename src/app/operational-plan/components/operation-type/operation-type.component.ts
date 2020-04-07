import { Component, OnInit } from '@angular/core';
import { OperationalPlanService } from 'src/app/services/operational-plan.service';
import { FormType } from 'src/app/app.constants';

@Component({
  selector: 'app-operation-type',
  templateUrl: './operation-type.component.html',
  styleUrls: ['./operation-type.component.scss']
})
export class OperationTypeComponent implements OnInit {

  config = {
    formTitle: 'Operation Type',
    formList: []
  };
  operationtypeList: IOperationTypes[] = [];
  cols = [
    { field: 'OperationTypeName', header: 'Operation Type' },
    { field: 'Action', header: 'Action' }
  ];

  constructor(
    private operationalPlanService: OperationalPlanService
  ) { }

  ngOnInit() {
    this.operationtypeList = this.operationalPlanService.getOperationTypes();
    this.constructForm();
  }
  constructForm() {
    this.config.formList = [
      {
        type: FormType.text,
        label: 'Operation Type',
        value: '',
        key: 'OperationTypeName',
        validators: [],
        disabled: false
      }
    ];
  }

}
