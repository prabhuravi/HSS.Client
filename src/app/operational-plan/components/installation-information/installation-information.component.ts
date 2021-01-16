import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from '@kognifai/poseidon-message-service';
import { ConfirmationService } from 'primeng/api';
import { take } from 'rxjs/operators';
import { FormType } from 'src/app/app.constants';
import { Installation } from 'src/app/models/Installation';
import { FromBuilderService } from 'src/app/services/from-builder-service';
import { OperationalPlanService } from 'src/app/services/operational-plan.service';

@Component({
  selector: 'app-installation-information',
  templateUrl: './installation-information.component.html',
  styleUrls: ['./installation-information.component.scss']
})
export class InstallationInformationComponent implements OnInit {

  isDataLoading = true;
  PrepareInstallation: boolean = false;
  formValues: any = null;
  formType = FormType;
  formData: FormGroup;
  config = {
    formList: []
  };
  vesselList: Installation[] = [];
  robotsystemList: IRobotSystemDetails[] = [];
  installationTypes: IInstallationType[] = [];
  foulingStates: IFoulingState[] = [];

  constructor(private operationalPlanService: OperationalPlanService,
              private router: Router,
              private confirmationService: ConfirmationService,
              private formBuliderService: FromBuilderService,
              private route: ActivatedRoute,
              public fb: FormBuilder, public messageService: MessageService) { }

  ngOnInit() {

    this.operationalPlanService.getOperationalData().pipe(take(1)).subscribe((data) => {
      if (this.router.url === '/operational-plan/prepare-installation') {
        this.PrepareInstallation = true;
      }
      this.vesselList = data[0];
      this.robotsystemList = data[1];
      this.isDataLoading = false;
      const ves = this.vesselList[0];
      this. constructForm();
      this.formData = this.formBuliderService.buildForm(this.config);
    
      //this.formData = this.buildForm();
      console.log(this.formData);
    });

  }

  constructForm(): void {
    this.config.formList = [
      {
        type: FormType.dropdown,
        label: 'Name',
        options: this.vesselList,
        callBackFnName: 'onchangeVessel()',
        value: '',
        key: 'Vessel',
        validators: [Validators.required],
        optionLabel: 'DisplayName',
        disabled: false
      },
      {
        type: FormType.number,
        label: 'IMO Number',
        value: '',
        key: 'ImoNo',
        validators: [Validators.required, Validators.min(1000000), Validators.max(9999999)],
        disabled: false
      },
      {
        type: FormType.text,
        label: 'Installation Id',
        value: '',
        key: 'InstallationId',
        validators: [Validators.required, Validators.maxLength(7)] ,
        disabled: false
      },
      {
        type: FormType.dropdown,
        label: 'Installation Type',
        options: this.installationTypes,
        value: '',
        key: 'InstallationType',
        optionLabel: 'Name',
        validators: [Validators.required],
        disabled: false
      },
      {
        type: FormType.text,
        label: 'Installation Status',
        value: 'Prepare',
        key: 'InstallationStatus',
        validators: [Validators.required],
        disabled: true
      },
      {
        type: FormType.dropdown,
        label: 'Fouling State',
        options: this.foulingStates,
        value: '',
        key: 'FoulingState',
        optionLabel: 'State',
        validators: [Validators.required],
        disabled: false
      },
      {
        type: FormType.number,
        label: 'Node Number',
        value: '',
        key: 'NodeNumber',
        validators: [Validators.required, Validators.min(10000), Validators.max(99999)],
        disabled: false
      },
      {
        type: FormType.text,
        label: 'IP Address',
        value: '',
        key: 'IPAddress',
        validators: [Validators.required, Validators.pattern(this.formBuliderService.ipAddressPattern)],
        disabled: false
      },
      {
        type: FormType.dropdown,
        label: 'Robot System',
        options: this.robotsystemList,
        value: '',
        key: 'HullSkaterId',
        validators: [Validators.required],
        optionLabel: 'Name',
        disabled: false
      }
    ];
  }

  formSubmitted(formData: any): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
       console.log(formData);
      }
    });
  }

  formOnchangeEvent(changedItem: any): void {
    console.log(changedItem.formItem);
    console.log(changedItem.formValue);
  }

  onSubmit(): void {
    console.log(this.formData);
    if (this.formData.valid) {
      console.log('form submitted');
    }
  }

}
