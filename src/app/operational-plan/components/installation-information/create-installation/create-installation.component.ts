import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { take } from 'rxjs/operators';
import { FormType } from 'src/app/app.constants';
import { Installation, InstallationStatus, VesselType } from 'src/app/models/Installation';
import { InstallationAdapter, NodeAdapter } from 'src/app/models/modelAdapter';
import { FromBuilderService } from 'src/app/services/from-builder-service';
import { InstallationService } from 'src/app/services/installation.service';
import { PrepareInstallationService } from 'src/app/services/prepare-installation.service';

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
  vesselTypes: VesselType[] = [];
  installationStatus: InstallationStatus[] = [];
  foulingStates: IFoulingState[] = [];

  constructor(private installationService: InstallationService,
              private router: Router,
              private confirmationService: ConfirmationService,
              private formBuliderService: FromBuilderService,
              private prepareInstallationService: PrepareInstallationService,
              private route: ActivatedRoute,
              private installationAdapter: InstallationAdapter,
              private nodeAdapter: NodeAdapter,
              public fb: FormBuilder, public messageService: MessageService) { }

  ngOnInit() {

    this.installationService.getInstallationFormData().pipe(take(1)).subscribe(async (data) => {

      this.installationList = data[0];
      console.log(this.installationList);
      this.vesselTypes = data[1];
      this.installationStatus = data[2];
      this.foulingStates = data[3];
      this.constructForm();
      this.formData = await this.formBuliderService.buildForm(this.config);
      this.isDataLoading = false;
      if (this.prepareInstallationService.installation) {
        this.setFormValue(this.prepareInstallationService.installation);
      }
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
        label: 'Vessel Type',
        options: this.vesselTypes,
        value: '',
        key: 'VesselType',
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
        key: 'gatewayIP',
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
    this.setFormValue(installation);

  }

  private setFormValue(installation: Installation) {
    console.log(installation);
    if (installation) {

      if (installation.vesselType) {
        this.formData.controls.VesselType.setValue(installation.vesselType);
      }

      if (installation.foulingState) {
        this.formData.controls.FoulingState.setValue(installation.foulingState);
      }
      if (installation.imoNo > 0) {
        this.formData.controls.ImoNo.setValue(installation.imoNo);
        this.formData.controls.ImoNo.disable();
      }
      if (installation.node && installation.node.installationId !== '') {
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
        this.formData.controls.gatewayIP.setValue(installation.node.gatewayIP);
        this.formData.controls.gatewayIP.disable();
      }
      const selectedInstallation = this.installationList.find((x) => x.id === installation.id);
      this.formData.controls.Installation.setValue(selectedInstallation);

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

     const formValues = this.formData.getRawValue();
     const installationIformation: Installation = formValues.Installation;
     installationIformation.foulingState = formValues.FoulingState;
     installationIformation.vesselType = formValues.VesselType;
     installationIformation.vesselTypeId = formValues.VesselType.id;
     installationIformation.foulingId = formValues.FoulingState.Id;
     installationIformation.node.nodeNumber = formValues.NodeNumber;
     installationIformation.node.gatewayIP = formValues.gatewayIP;
     installationIformation.node.installationId = formValues.InstallationId;
     console.log(this.formData.getRawValue());
     console.log(installationIformation);
    //  console.log(installationIformation);

     this.installationService.UpdateInstallationInformation(installationIformation).pipe(take(1)).subscribe(async () => {
      this.triggerToast('success', 'Success Message', `Installation Information updated`);
      await this.prepareInstallationService.updateInstallationDetail(installationIformation);
      this.router.navigateByUrl('/operational-plan/prepare-installation/trade-route/' + installationIformation.id);

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
