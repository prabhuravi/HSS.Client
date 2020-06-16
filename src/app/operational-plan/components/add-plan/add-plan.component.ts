import { Component, OnInit } from '@angular/core';
import { FormType } from '../../../app.constants';
import { OperationalPlanService } from 'src/app/services/operational-plan.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-add-plan',
  templateUrl: './add-plan.component.html',
  styleUrls: ['./add-plan.component.scss']
})
export class AddPlanComponent implements OnInit {

  vesselList: IVessel[] = [];
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
  allSubscription: Subscription[] = [];
  planId = 0;
  planType = 'Add';

  constructor(
    private operationalPlanService: OperationalPlanService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void { 
    this.operationalPlanService.getOperationalData().pipe(take(1)).subscribe((data) => {
      this.vesselList = data[0];
      this.robotsystemList = data[1];
      this.operationtypeList = data[2];
      this.operatorList = data[3];
      this.timeZoneList = this.operationalPlanService.getTimeZone();
      this.planStatusList = this.operationalPlanService.getPlanStatus();
      this.isDataLoading = false;
      this.allSubscription.push(
        this.route.params.subscribe((params) => {
          // tslint:disable-next-line:radix
          this.planId = parseInt(params.id);
          this.planType = params.type;
          this.config.formTitle = `${this.planType} Plan`;
          if (this.planId) {
            this.operationalPlanService.getOperationPlanById(this.planId).pipe(take(1)).subscribe((planData) => {
              this.formValues = planData;
              this.formValues.VesselId = this.vesselList.find((e) => e.Id === this.formValues.VesselId);
              this.formValues.HullSkaterId = this.robotsystemList.find((e) => e.Id === this.formValues.HullSkaterId);
              this.formValues.OperationDate = new Date(this.formValues.OperationDate);
              this.formValues.ETADate = new Date(this.formValues.ETADate);
              this.formValues.LocalTimeZone = this.timeZoneList.find((e) => e.offset === this.formValues.LocalTimeZone);
              this.formValues.OperationTypeId = this.operationtypeList.find((e) => e.Id === this.formValues.OperationTypeId);
              this.formValues.Status = this.planStatusList.find((e) => e.name === this.formValues.Status);
              this.formValues.PlannerId = this.operatorList.find((e) => e.Id === this.formValues.PlannerId);
              this.formValues.OperatorId = this.operatorList.find((e) => e.Id === this.formValues.OperatorId);
              this.formValues.PortId = {
                Id: this.formValues.PortId
              };
            });
          }
          this.constructForm();
        })
      );
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
        optionLabel: 'Name',
        disabled: false
      },
      {
        type: FormType.dropdown,
        label: 'Robot System',
        options: this.robotsystemList,
        value: '',
        key: 'HullSkaterId',
        validators: ['required'],
        optionLabel: 'Name',
        disabled: false
      },
      {
        type: FormType.datepicker,
        label: 'Operation Date',
        value: '',
        key: 'OperationDate',
        validators: ['required'],
        disabled: false,
        mindate: new Date()
      },
      {
        type: FormType.datepicker,
        label: 'ETA Date',
        value: '',
        key: 'ETADate',
        validators: ['required'],
        disabled: false,
        mindate: new Date()
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
        key: 'PortId',
        validators: ['required'],
        optionLabel: 'PortName',
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
        disabled: (this.planId) ? false : true
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
    let action = (this.planId) ? this.capitalize(this.planType) : 'Add';
    const planData: any = {
      Status: (this.planId) ? formData.Status.value : 'New',
      VesselId: formData.VesselId.Id,
      HullSkaterId: formData.HullSkaterId.Id,
      LocalTimeZone: formData.LocalTimeZone.offset,
      PortId: formData.PortId.Id,
      OperationTypeId: formData.OperationTypeId.Id,
      OperationDes: formData.OperationDes,
      PlannerId: formData.PlannerId.Id,
      OperatorId: formData.OperatorId.Id,
      Comments: formData.Comments,
      OperationDate: formData.OperationDate,
      ETADate: formData.ETADate,
      CreatedBy: formData.CreatedBy
    };
    if ((this.planId)) {
      planData.PlanId = (this.planId);
    }
    console.log(planData);
    if (action === 'Add' || action === 'Copy') {
      this.operationalPlanService.addOperationPlan(planData).subscribe((data) => {
        this.router.navigateByUrl('/operational-plan');
      });
    }
    else {  // Update
      this.operationalPlanService.updateOperationPlan(this.planId, planData).subscribe((data) => {
        this.router.navigateByUrl('/operational-plan');
      });
    }

  }

  capitalize = (s) => {
    if (typeof s !== 'string') { return ''; }
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

}
