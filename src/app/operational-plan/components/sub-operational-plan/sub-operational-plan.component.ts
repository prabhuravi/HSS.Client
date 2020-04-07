import { Component, OnInit } from '@angular/core';
import { OperationalPlanService } from 'src/app/services/operational-plan.service';
import { FormType } from '../../../app.constants';

@Component({
  selector: 'app-sub-operational-plan',
  templateUrl: './sub-operational-plan.component.html',
  styleUrls: ['./sub-operational-plan.component.scss']
})
export class SubOperationalPlanComponent implements OnInit {

  planStatusList: IPlanStatus[] = [];
  subOperationsList: ISubOperations[] = [];
  formType = FormType;
  config = {
    formTitle: 'Sub Operation',
    formList: []
  };
  subOperationCols = [
    { field: 'SubOperationStartTime', header: 'Start Time' },
    { field: 'SubOperationEndTime', header: 'End Time' },
    { field: 'SubOperationDes', header: 'Description' },
    { field: 'Status', header: 'Status' },
    { field: 'Operator', header: 'Operator' },
    { field: 'Action', header: 'Action' }
  ];

  constructor(
    private operationalPlanService: OperationalPlanService
  ) { }

  ngOnInit() {
    this.subOperationsList = this.operationalPlanService.getSubOperations();
    this.planStatusList = this.operationalPlanService.getPlanStatus();
    this.constructForm();
  }

  constructForm(): void {
    this.config.formList = [
      {
        type: FormType.datepicker,
        label: 'Start Time ( Start and End Time should be greater than Operation End Time)',
        value: '',
        key: 'SubOperationStartTime',
        validators: [],
        disabled: false
      },
      {
        type: FormType.datepicker,
        label: 'End Time ( Start and End Time should be greater than Operation End Time)',
        value: '',
        key: 'SubOperationEndTime',
        validators: [],
        disabled: false
      },
      {
        type: FormType.dropdown,
        label: 'Status',
        options: this.planStatusList,
        value: this.planStatusList[0],
        key: 'Status',
        validators: ['required'],
        optionLabel: 'name',
        disabled: true
      },
      {
        type: FormType.text,
        label: 'Description',
        value: '',
        key: 'SubOperationDes',
        validators: [],
        disabled: false
      }
    ];
  }

}
