import { Component, OnInit } from '@angular/core';
import { FormType } from '../../../app.constants';
import { OperationalPlanService } from 'src/app/services/operational-plan.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';

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
    formTitle: 'Add Plan',
    formList: []
  };
  isDataLoading = true;
  formValues: any = null;

  constructor(
    private operationalPlanService: OperationalPlanService,
    private router: Router,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.operationalPlanService.getOperationalData().subscribe((data) => {
      this.vesselList = data[0];
      this.robotsystemList = data[1];
      this.operationtypeList = data[2];
      this.operatorList = data[3];
      this.timeZoneList = this.operationalPlanService.getTimeZone();
      this.planStatusList = this.operationalPlanService.getPlanStatus();
      this.isDataLoading = false;
      if (history && history.state && history.state.actionType) {
        this.config.formTitle = `${history.state.actionType} Plan`;
        this.formValues = history.state;
        console.log(this.formValues);
        this.formValues.VesselId = this.vesselList.find((e) => e.Id === this.formValues.VesselId);
        this.formValues.RobotSystemId = this.robotsystemList.find((e) => e.RobotSerialNumber === this.formValues.RobotSerialNumber);
        this.formValues.OperationDate = new Date(this.formValues.OperationDate);
        this.formValues.ETADate = new Date(this.formValues.ETADate);
        this.formValues.LocalTimeZone = this.timeZoneList.find((e) => e.offset === this.formValues.LocalTimeZone);
        this.formValues.OperationTypeId = this.operationtypeList.find((e) => e.Id === this.formValues.OperationTypeId);
        this.formValues.Status = this.planStatusList.find((e) => e.name === this.formValues.Status);
        this.formValues.PlannerId = this.operatorList.find((e) => e.Id === this.formValues.PlannerId);
        this.formValues.OperatorId = this.operatorList.find((e) => e.Id === this.formValues.OperatorId);
        this.formValues.OperationLoc = {
          PortName: this.formValues.OperationLoc
        };
      }
      this.constructForm();
    });
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
        type: FormType.autocomplete,
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
        disabled: (history && history.state && history.state.actionType) ? false : true
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

  formSubmitted(formData: any): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.updateData(formData);
      }
    });
  }
  updateData(formData): void {
    console.log(formData);
    const plandData: any = {
      Status: (history && history.state && history.state.actionType) ? formData.Status.value : 'New',
      Action: (history && history.state && history.state.actionType) ? 'Edit' : 'Add',
      VesselId: formData.VesselId.Id,
      RobotSystemId: formData.RobotSystemId.RobotSystemId,
      LocalTimeZone: formData.LocalTimeZone.offset,
      OperationLoc: formData.OperationLoc.PortName,
      portCode: formData.OperationLoc.PortCode,
      OperationTypeId: formData.OperationTypeId.Id,
      OperationDes: formData.OperationDes,
      PlannerId: formData.PlannerId.Id,
      OperatorId: formData.OperatorId.Id,
      Comments: formData.Comments,
      OperationDate: formData.OperationDate,
      ETADate: formData.ETADate
    };
    if (history && history.state && history.state.actionType) {
      plandData.PlanId = this.formValues.PlanId;
    }
    console.log(plandData);
    this.operationalPlanService.updateOperationPlan(plandData).subscribe((data) => {
      this.router.navigateByUrl('/operational-plan');
    });
  }

}
