import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { take } from 'rxjs/operators';
import { FormType } from 'src/app/app.constants';
import { Installation, InstallationStatus, InstallationType, VesselType } from 'src/app/models/Installation';
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
  @Output() nextActiveTab: EventEmitter<any> = new EventEmitter();
  formData: FormGroup;
  config = {
    formList: [],
    className: 'kx-col kx-col--12 kx-col--12@mob-m kx-col--6@tab-m kx-col--4@ltp-s'
  };
  installationList: Installation[] = [];
  robotsystemList: IRobotSystemDetails[] = [];
  vesselTypes: VesselType[] = [];
  installationTypes: InstallationType[] =[];
  installationStatus: InstallationStatus[] = [];
  // foulingStates: IFoulingState[] = [];

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
      this.installationTypes = data[3];
      // this.foulingStates = data[3];
      this.constructForm();
      this.formData = this.formBuliderService.buildForm(this.config);
      this.isDataLoading = false;
      this.prepareInstallationService.setInstallationFromRoute(this.route);
      if (this.route !== undefined && this.route !== null) {
        let vesselId = 0;
        const params = this.route.snapshot.paramMap.get('vesselId');
        vesselId = parseInt(params, null);
        if(vesselId > 0) {
          this.prepareInstallationService.getInstallationById(vesselId);
        }
      }
      this.prepareInstallationService.installationDetail.subscribe((x) => {
        if (x) {
          this.setFormValue(x);
        }
      });
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
        placeHolder: 'IMO Number',
        disabled: false
      },
      {
        type: FormType.text,
        label: 'Installation Id',
        value: '',
        key: 'InstallationId',
        validators: [Validators.required],
        placeHolder: 'Installation Id',
        disabled: false
      },
      {
        type: FormType.dropdown,
        label: 'Installation Type',
        options: this.vesselTypes,
        value: '',
        key: 'VesselType',
        optionLabel: 'name',
        placeHolder: 'Installation Type',
        disabled: false
      },
      {
        type: FormType.dropdown,
        label: 'Installation Type General',
        options: this.installationTypes,
        value: '',
        key: 'InstallationType',
        optionLabel: 'name',
        placeHolder: 'Installation Type General',
        disabled: false
      },
      {
        type: FormType.dropdown,
        label: 'Installation Status',
        options: this.installationStatus,
        value: this.installationStatus[0],
        key: 'InstallationStatus',
        validators: [Validators.required],
        optionLabel: 'name',
        disabled: false
      },
      {
        type: FormType.number,
        label: 'Node Number',
        value: '',
        key: 'NodeNumber',
        validators: [Validators.required],
        placeHolder: 'Node Number',
        disabled: false
      },
      {
        type: FormType.text,
        label: 'IP Address',
        value: '',
        key: 'gatewayIP',
        validators: [Validators.required],
        placeHolder: 'IP Address',
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
    this.prepareInstallationService.updateInstallationDetail(installation);

  }

  private setFormValue(installation: Installation) {
    this.onFormReset();
    if (installation) {
      console.log(installation);

      if (installation.vesselType) {
        this.formData.controls.VesselType.setValue(installation.vesselType);
      }

      if (installation.installationType) {
        this.formData.controls.InstallationType.setValue(installation.installationType);
      }

      if (installation.imoNo > 0) {
        this.formData.controls.ImoNo.setValue(installation.imoNo);
        this.formData.controls.ImoNo.disable();
      }
      if (installation.node && installation.node.installationId !== '') {
        this.formData.controls.InstallationId.setValue(installation.node.installationId);
        this.formData.controls.InstallationId.disable();
      }

      if (installation.installationStatus) {
        this.formData.controls.InstallationStatus.setValue(installation.installationStatus);
      } else {
        this.formData.controls.InstallationStatus.setValue(this.installationStatus[0]);
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
    this.formData.controls.InstallationStatus.setValue(this.installationStatus);
    this.formData.controls.ImoNo.enable();
    this.formData.controls.InstallationId.enable();
    this.formData.controls.NodeNumber.enable();
    this.formData.controls.gatewayIP.enable();

  }

  onSubmit(): void {
    // this.nextActiveTab.emit(1);
    console.log(this.formData);
    if (this.formData.valid) {

     const formValues = this.formData.getRawValue();
     const installationIformation: Installation = formValues.Installation;
    // installationIformation.foulingState = formValues.FoulingState;
     installationIformation.vesselType = formValues.VesselType;
     installationIformation.vesselTypeId = formValues.VesselType.id;
     installationIformation.installationTypeId = formValues.InstallationType.id;
     installationIformation.imoNo = formValues.ImoNo;
    // installationIformation.foulingId = formValues.FoulingState.Id;
     installationIformation.node.nodeNumber = formValues.NodeNumber;
     installationIformation.node.gatewayIP = formValues.gatewayIP;
     installationIformation.node.installationId = formValues.InstallationId;
     installationIformation.installationStatus = formValues.InstallationStatus;
     installationIformation.installationStatusId = formValues.InstallationStatus.id;
     console.log(this.formData.getRawValue());
     console.log(installationIformation);
    //  console.log(installationIformation);

     this.installationService.UpdateInstallationInformation(installationIformation).pipe(take(1)).subscribe(async (data) => {
       if (data) {
        this.triggerToast('success', 'Success Message', `Installation Information updated`);
        this.prepareInstallationService.updateInstallationDetail(installationIformation);
        this.router.navigateByUrl('/operational-plan/prepare-installation/trade-route/' + installationIformation.id);
       }

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
