import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { take } from 'rxjs/operators';
import { FormType } from 'src/app/app.constants';
import { Installation, InstallationStatus, InstallationType, VesselType } from 'src/app/models/Installation';
import { FromBuilderService } from 'src/app/services/from-builder-service';
import { InstallationService } from 'src/app/services/installation.service';
import { PrepareInstallationService } from 'src/app/services/prepare-installation.service';

@Component({
  selector: 'app-create-installation',
  templateUrl: './create-installation.component.html',
  styleUrls: ['./create-installation.component.scss']
})
export class CreateInstallationComponent implements OnInit {

  vesselId: number = 0;
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
  node: Node;
  robotsystemList: IRobotSystemDetails[] = [];
  vesselTypes: VesselType[] = [];
  installationTypes: InstallationType[] = [];
  installationStatus: InstallationStatus[] = [];

  constructor(private installationService: InstallationService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private formBuliderService: FromBuilderService,
    private prepareInstallationService: PrepareInstallationService,
    private route: ActivatedRoute,
    public fb: FormBuilder, public messageService: MessageService) { }

  ngOnInit() {
    this.isDataLoading = true;
    this.installationService.getInstallationFormData().pipe(take(1)).subscribe(async (data) => {
      this.installationList = data[0];
      this.vesselTypes = data[1];
      this.installationStatus = data[2];
      this.installationTypes = data[3];
      this.constructForm();
      this.formData = this.formBuliderService.buildForm(this.config);
      this.prepareInstallationService.setInstallationFromRoute(this.route);
      if (this.route !== undefined && this.route !== null) {
        const params = this.route.snapshot.paramMap.get('vesselId');
        this.vesselId = parseInt(params, null);
        this.prepareInstallationService.getInstallationById(this.vesselId);
        this.prepareInstallationService.installationDetail.subscribe((x) => {
          if (x) {
            this.isDataLoading = true;
            this.installationService.getNodeByVesselId(x.id).pipe(take(1)).subscribe((data) => {
              const node = (data && data.Node) ? data.Node : null;
              this.setFormValue(x, node);
              this.isDataLoading = false;
            });
          }
        });
      }
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
        placeHolder: 'Optional, auto populated from CRM',
        disabled: true
      },
      {
        type: FormType.text,
        label: 'Installation Id',
        value: '',
        key: 'InstallationId',
        // validators: [Validators.required],
        placeHolder: 'Optional, auto populated from CRM',
        disabled: true
      },
      {
        type: FormType.dropdown,
        label: 'Installation Type',
        options: this.vesselTypes,
        value: '',
        key: 'VesselType',
        optionLabel: 'name',
        placeHolder: 'Optional',
        disabled: false
      },
      {
        type: FormType.dropdown,
        label: 'Installation Type General',
        options: this.installationTypes,
        value: '',
        key: 'InstallationType',
        optionLabel: 'name',
        placeHolder: 'Optional',
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
        // validators: [Validators.required],
        placeHolder: 'Optional, auto populated from SSP',
        disabled: true
      },
      {
        type: FormType.text,
        label: 'Skater IP',
        value: '',
        key: 'robotIP',
        // validators: [Validators.required],
        placeHolder: 'Optional, auto populated from SSP',
        disabled: true
      }
    ];
  }

  formSubmitted(formData: any): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
      }
    });
  }

  formOnchangeEvent(changedItem: any): void {
    const key = changedItem.formItem.key;
    switch (key) {
      case 'Installation': {
        this.onInstallationdropDownChanged(changedItem.formValue);
        break;
      }
      default: {
        break;
      }
    }
  }

  onInstallationdropDownChanged(installation: Installation) {
    this.prepareInstallationService.updateInstallationDetail(installation);
  }

  private setFormValue(installation: Installation, node) {
    this.onFormReset();
    if (installation) {
      if (installation.vesselType) {
        this.formData.controls.VesselType.setValue(installation.vesselType);
      }

      if (installation.installationType) {
        this.formData.controls.InstallationType.setValue(installation.installationType);
      }

      if (installation.imoNo > 0) {
        this.formData.controls.ImoNo.setValue(installation.imoNo);
      }

      if (installation.installationId) {
        this.formData.controls.InstallationId.setValue(installation.installationId);
      }

      if (installation.installationStatus) {
        this.formData.controls.InstallationStatus.setValue(installation.installationStatus);
      } else {
        this.formData.controls.InstallationStatus.setValue(this.installationStatus[0]);
      }

      if (node && node.NodeNumber) {
        this.formData.controls.NodeNumber.setValue(node.NodeNumber);
      }

      if (node && node.RobotIP) {
        this.formData.controls.robotIP.setValue(node.RobotIP);
      }

      const selectedInstallation = this.installationList.find((x) => x.id === installation.id);
      this.formData.controls.Installation.setValue(selectedInstallation);
    }
  }

  onFormReset(): void {
    this.formData.reset();
    this.formData.controls.InstallationStatus.setValue(this.installationStatus);
  }

  onSubmit(): void {
    if (this.formData.valid) {
      const formValues = this.formData.getRawValue();
      const installationIformation: Installation = formValues.Installation;
      if (formValues.VesselType) {
        installationIformation.vesselType = formValues.VesselType;
        installationIformation.vesselTypeId = formValues.VesselType.id;
      } else {
        installationIformation.vesselTypeId = null;
      }
      if (formValues.InstallationType) {
        installationIformation.installationTypeId = formValues.InstallationType.id;
      } else {
        installationIformation.installationTypeId = null;
      }

      installationIformation.imoNo = formValues.ImoNo;
      if (!formValues.ImoNo) {
        installationIformation.imoNo = 0;
      }
      installationIformation.installationId = formValues.InstallationId;
      installationIformation.installationStatus = formValues.InstallationStatus;
      installationIformation.installationStatusId = formValues.InstallationStatus.id;
      this.isDataLoading = true;
      this.installationService.UpdateInstallationInformation(installationIformation).pipe(take(1)).subscribe(async (data) => {
        if (data) {
          this.triggerToast('success', 'Success Message', `Installation Information updated`);
          this.prepareInstallationService.updateInstallationDetail(installationIformation);
          this.isDataLoading = false;
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
