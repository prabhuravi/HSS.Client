import { Component, OnInit } from '@angular/core';
import { FormType } from '../../../app.constants';
import { WhitelistCountriesService } from 'src/app/services/whitelist-countries.service';
import { OperationalPlanService } from 'src/app/services/operational-plan.service';

@Component({
  selector: 'app-add-plan',
  templateUrl: './add-plan.component.html',
  styleUrls: ['./add-plan.component.scss']
})
export class AddPlanComponent implements OnInit {

  vesselList: IVesselList[] = [];
  robotsystemList: IRobotSystemDetails[] = [];
  operationtypeList: IOperationTypes[] = [];
  operatorList: IOperators[] = [];
  timeZoneList: ITimeZone[] = [];
  planStatusList: IPlanStatus[] = [];
  formType = FormType;
  config = {
    formTitle: 'Plan',
    formList: []
  };

  constructor(
    private whitelistCountriesService: WhitelistCountriesService,
    private operationalPlanService: OperationalPlanService
  ) { }

  ngOnInit(): void {
    this.vesselList = this.whitelistCountriesService.getVesselList();
    this.robotsystemList = this.operationalPlanService.getRobotSystemDetails();
    this.operationtypeList = this.operationalPlanService.getOperationTypes();
    this.operatorList = this.operationalPlanService.getOperators();
    this.timeZoneList = this.operationalPlanService.getTimeZone();
    this.planStatusList = this.operationalPlanService.getPlanStatus();
    this.constructForm();
  }

  constructForm(): void {
    this.config.formList = [
      {
        type: FormType.dropdown,
        label: 'Vessel',
        options: this.vesselList,
        value: '',
        key: 'VesselId',
        validators: ['required'],
        optionLabel: 'VesselName',
        disabled: false
      },
      {
        type: FormType.dropdown,
        label: 'Robot System',
        options: this.robotsystemList,
        value: '',
        key: 'RobotSystemId',
        validators: ['required'],
        optionLabel: 'RobotSerialNumber',
        disabled: false
      },
      {
        type: FormType.datepicker,
        label: 'Operation Date',
        value: '',
        key: 'OperationDate',
        validators: ['required'],
        disabled: false
      },
      {
        type: FormType.datepicker,
        label: 'ETA Date',
        value: '',
        key: 'ETADate',
        validators: ['required'],
        disabled: false
      },
      {
        type: FormType.dropdown,
        label: 'Time Zone',
        options: this.timeZoneList,
        value: '',
        key: 'LocalTimeZone',
        validators: ['required'],
        optionLabel: 'offset',
        disabled: false
      },
      {
        type: FormType.text,
        label: 'Location',
        value: '',
        key: 'OperationLoc',
        validators: ['required'],
        disabled: false
      },
      {
        type: FormType.dropdown,
        label: 'Operation Type',
        options: this.operationtypeList,
        value: '',
        key: 'OperationTypeId',
        validators: ['required'],
        optionLabel: 'OperationTypeName',
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
        key: 'OperationDes',
        validators: ['required'],
        disabled: false
      },
      {
        type: FormType.dropdown,
        label: 'Planner',
        options: this.operatorList,
        value: '',
        key: 'PlannerId',
        validators: ['required'],
        optionLabel: 'OperatorName',
        disabled: false
      },
      {
        type: FormType.dropdown,
        label: 'Operator',
        options: this.operatorList,
        value: '',
        key: 'OperatorId',
        validators: ['required'],
        optionLabel: 'OperatorName',
        disabled: false
      },
      {
        type: FormType.text,
        label: 'Comments',
        value: '',
        key: 'Comments',
        validators: [],
        disabled: false
      }
    ];
  }

  formSubmitted(formData: any) {
    console.log('formData', formData);
  }

}
