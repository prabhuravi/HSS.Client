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
    formTitle: 'Add Operation Type',
    formList: []
  };
  operationtypeList: IOperationTypes[] = [];
  cols = [
    { field: 'OperationTypeName', header: 'Operation Type' },
    { field: 'Action', header: 'Action' }
  ];
  formValues: any;

  constructor(
    private operationalPlanService: OperationalPlanService
  ) { }

  ngOnInit() {
    this.operationalPlanService.getOperationTypes().subscribe((operationtypeData) => {
      this.operationtypeList = operationtypeData;
    });
    this.constructForm();
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
    this.config.formTitle = 'Edit Operation Type';
    this.formValues = data;
  }

  formSubmitted(data: any): void {
    console.log(data);
  }

}
