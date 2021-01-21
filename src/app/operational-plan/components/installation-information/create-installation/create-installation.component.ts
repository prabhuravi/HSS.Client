import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { take } from 'rxjs/operators';
import { FormType } from 'src/app/app.constants';
import { Installation, InstallationStatus, InstallationType } from 'src/app/models/Installation';
import { FromBuilderService } from 'src/app/services/from-builder-service';
import { InstallationService } from 'src/app/services/installation.service';

@Component({
  selector: 'app-create-installation',
  templateUrl: './create-installation.component.html',
  styleUrls: ['./create-installation.component.scss']
})
export class CreateInstallationComponent implements OnInit {

  isDataLoading = true;
  PrepareInstallation: boolean = false;
  formValues: any = null;
  formType = FormType;
  formData: FormGroup;
  config = {
    formList: [],
    className: 'kx-col kx-col--4 kx-col--6@mob-m kx-col--3@tab-m kx-col--4@ltp-s'
  };
  installationList: Installation[] = [];
  robotsystemList: IRobotSystemDetails[] = [];
  installationTypes: InstallationType[] = [];
  installationStatus: InstallationStatus[] = [];
  foulingStates: IFoulingState[] = [];

  constructor(private installationService: InstallationService,
              private router: Router,
              private confirmationService: ConfirmationService,
              private formBuliderService: FromBuilderService,
              private route: ActivatedRoute,
              public fb: FormBuilder, public messageService: MessageService) { }

  ngOnInit() {

    this.installationService.getInstallationFormData().pipe(take(1)).subscribe((data) => {

      this.installationList = data[0];
      this.installationTypes = data[1];
      this.installationStatus = data[2];
      this.foulingStates = data[3];
      this.constructForm();
      this.formData = this.formBuliderService.buildForm(this.config);
      this.isDataLoading = false;
    });

  }

  constructForm(): void {
    this.config.formList = [
      {
        type: FormType.dropdown,
        label: 'Name',
        options: this.installationList,
        value: '',
        key: 'Installation',
        validators: [Validators.required],
        optionLabel: 'displayName',
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
        validators: [Validators.required, Validators.maxLength(7)],
        disabled: false
      },
      {
        type: FormType.dropdown,
        label: 'Installation Type',
        options: this.installationTypes,
        value: '',
        key: 'InstallationType',
        optionLabel: 'name',
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
    const key = changedItem.formItem.key;
    console.log(key);
    switch (key) {
      case 'Installation': {
        this.onInstallationdropDownChanged(changedItem.formValue);
        break;
      }

      default: {
        console.log('form Item not found');
        break;
      }
    }
  }
  onInstallationdropDownChanged(installation: Installation) {
    console.log(installation);
    // console.log(this.config.formList);
    if (installation.imoNo > 0) {
      this.formData.controls.ImoNo.setValue(installation.imoNo);
      this.formData.controls.ImoNo.disable();
    }
    if (installation.node && installation.node.installationId !== '' ) {
      this.formData.controls.InstallationId.setValue(installation.node.installationId);
      this.formData.controls.InstallationId.disable();
     }

    if (installation.installationStatus && installation.installationStatus.name !== '') {
      this.formData.controls.InstallationStatus.setValue(installation.installationStatus.name);
      this.formData.controls.InstallationStatus.disable();
     }

    if (installation.node && installation.node.nodeNumber > 0) {
       this.formData.controls.NodeNumber.setValue(installation.node.nodeNumber);
       this.formData.controls.NodeNumber.disable();
     }

    if (installation.node && installation.node.gatewayIP !== '') {
      this.formData.controls.IPAddress.setValue(installation.node.gatewayIP);
      this.formData.controls.IPAddress.disable();
    }

  }

  onFormReset(): void {
    this.formData.reset();
    this.formData.controls.InstallationStatus.setValue('Prepare');
    this.formData.controls.ImoNo.enable();
    this.formData.controls.InstallationId.enable();
    this.formData.controls.NodeNumber.enable();
    this.formData.controls.IPAddress.enable();

  }

  onSubmit(): void {
    console.log(this.formData);
    if (this.formData.valid) {
     const installationIformation: Installation = this.formData.controls.Installation.value;
     console.log(installationIformation);
     installationIformation.installationTypeId = this.formData.controls.InstallationType.value.id;
     installationIformation.foulingId = this.formData.controls.FoulingState.value.Id;
     console.log(installationIformation);

     this.installationService.UpdateInstallationInformation(installationIformation).pipe(take(1)).subscribe(() => {
      this.triggerToast('success', 'Success Message', `Installation Information updated`);
      this.router.navigateByUrl('/operational-plan/prepare-installation/trade-route');
    });

    }
  }

  triggerToast(severity: string, summary: string, detail: string): void {
    this.messageService.add(
      {
        severity,
        summary,
        detail
      });
  }

}
