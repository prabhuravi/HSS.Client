import { Component, OnInit } from '@angular/core';
import { FormType } from '../../../app.constants';
import { OperationalPlanService } from 'src/app/services/operational-plan.service';
import { Subscription } from 'rxjs';
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

  constructor(
    private operationalPlanService: OperationalPlanService
  ) { }

  ngOnInit() {
    this.getOperatorList();
    this.constructForm();
  }
  getOperatorList(): void {
    this.operationalPlanService.getOperators().pipe(take(1)).subscribe((operatorData) => {
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
    this.formValues = data;
  }
  formSubmitted(data): void {
    if (this.activeId !== 0) {
      data.Id = this.activeId;
    }
    this.operationalPlanService.addOperator(data).subscribe((success) => {
      this.getOperatorList();
    });
  }
  deleteData(data): void {
    this.operationalPlanService.deleteOperator(data).subscribe((success) => {
      this.getOperatorList();
    });
  }
}
