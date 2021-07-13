import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { take } from 'rxjs/operators';
import { FormType } from 'src/app/app.constants';
import { FromBuilderService } from 'src/app/services/from-builder-service';
import { OperationalPlanService } from 'src/app/services/operational-plan.service';
import { PrepareInstallationService } from 'src/app/services/prepare-installation.service';

@Component({
  selector: 'app-trade-route',
  templateUrl: './trade-route.component.html',
  styleUrls: ['./trade-route.component.scss']
})
export class TradeRouteComponent implements OnInit {
  port: IPortLocation = null;
  portOrder: number = 1;
  maxPortOrder: number = 1
  portLocations: IPortLocation[] = [];
  unLocodeCountries: IUnLocodeCountry[] = [];
  vesselTradeRoute: ITradeRoute[] = [];
  clonedVesselTradeRoute: ITradeRoute[];
  isDataLoading = false;
  addEditPortLoading = false;
  vesselId = 0;
  @Output() nextActiveTab: EventEmitter<any> = new EventEmitter();
  @Input() isOperationScreen: boolean;

  cols = [
    { field: 'PortName', sortfield: 'PortName', header: 'Port', filterMatchMode: 'contains' },
    { field: 'CountryName', sortfield: 'CountryName', header: 'Country', filterMatchMode: 'contains' },
    { field: 'Type', sortfield: 'Type', header: 'Type', filterMatchMode: 'contains' },
    { field: 'Coordinate', sortfield: '', header: 'Lat Long', filterMatchMode: 'contains' },
    { field: 'Order', sortfield: 'Order', header: 'Port Order', filterMatchMode: 'contains' }
  ];

  addPortConfig = {
    formList: [],
    className: 'kx-col kx-col--12 kx-col--6@mob-m kx-col--5@tab-m kx-col--3@ltp-s'
  };
  formData: FormGroup;
  formValues: any = null;
  // portTypes: IPortType[] = [];
  portTypes = [{ Id: 1, Name: 'Port' }, { Id: 2, Name: 'Anchorage' }];
  editPort = false;
  displayAddEditPort = false;

  constructor(private operationalPlanService: OperationalPlanService, private router: Router,
    private confirmationService: ConfirmationService,
    private prepareInstallationService: PrepareInstallationService,
    private route: ActivatedRoute, private messageService: MessageService,
    private formBuliderService: FromBuilderService) {
  }

  ngOnInit() {
    if (!this.isOperationScreen) {
      this.cols.push({ field: 'Id', sortfield: '', header: 'Action', filterMatchMode: '' });
    }
    if (!this.prepareInstallationService.installation) {
      this.prepareInstallationService.setInstallationFromRoute(this.route);
    }

    // this.isDataLoading = true;
    // this.operationalPlanService.getPortTypes().pipe(take(1)).subscribe((data) => {
    //   this.portTypes = data;
    //   this.isDataLoading = false;
    //   this.constructForm();
    //   this.formData = this.formBuliderService.buildForm(this.addPortConfig);
    // });

    this.isDataLoading = true;
    this.operationalPlanService.getUnLocodeCountries().pipe(take(1)).subscribe((data) => {
      this.unLocodeCountries = data;
      console.log(this.unLocodeCountries);
      this.isDataLoading = false;
      this.constructForm();
      this.formData = this.formBuliderService.buildForm(this.addPortConfig);
    });

    this.getVesselTradeRoute();
    // this.constructForm();
    // this.formData = this.formBuliderService.buildForm(this.addPortConfig);
  }

  onRowReorder(event) {
    let tradeRouteIds: {}[] = [];
    this.vesselTradeRoute.forEach(element => {
      tradeRouteIds.push(element.Id)
    });

    if (event.dragIndex !== event.dropIndex) {
      this.isDataLoading = true;
      this.operationalPlanService.reorderTradeRoute({ VesselId: this.vesselId, TradeRouteIds: tradeRouteIds }).pipe(take(1)).subscribe((data) => {
        this.vesselTradeRoute = data;
        this.reAssignProperties();
        this.isDataLoading = false;
      });
    }

    // if (event.dragIndex !== event.dropIndex) {
    //   this.isDataLoading = true;
    //   this.operationalPlanService.reorderTradeRoute({ VesselId: this.vesselId, DragId: this.clonedVesselTradeRoute[event.dragIndex].Id, DropId: this.clonedVesselTradeRoute[event.dropIndex].Id }).pipe(take(1)).subscribe((data) => {
    //     this.vesselTradeRoute = data;
    //     this.reAssignProperties();
    //     this.isDataLoading = false;
    //   });
    // }
  }

  constructForm(): void {
    this.addPortConfig.formList = [
      {
        type: FormType.dropdown,
        label: 'Country Code',
        options: this.unLocodeCountries,
        value: '',
        key: 'countryCode',
        validators: [Validators.required],
        optionLabel: 'Country',
        disabled: false,
        placeHolder: 'Select Country'
      },
      {
        type: FormType.text,
        label: 'Port Code',
        value: '',
        key: 'portCode',
        validators: [Validators.required, Validators.pattern('^[A-Za-z]+$'), Validators.minLength(3), Validators.maxLength(3)],
        disabled: false,
        placeHolder: 'Eg. OSL'
      },
      {
        type: FormType.text,
        label: 'Port Name',
        value: '',
        key: 'portName',
        validators: [Validators.required],
        disabled: false,
        placeHolder: 'Port Name'
      },
      {
        type: FormType.dropdown,
        label: 'Type',
        options: this.portTypes,
        value: '',
        key: 'portType',
        validators: [Validators.required],
        optionLabel: 'Name',
        disabled: false
      },
      {
        type: FormType.text,
        label: 'Lat Long',
        value: '',
        key: 'coordinate',
        validators: [Validators.pattern(/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/)],
        disabled: false,
        placeHolder: 'Eg. 59.9,10.7333'
      },
      {
        type: FormType.text,
        label: 'Description',
        value: '',
        key: 'description',
        validators: [],
        disabled: false,
        placeHolder: 'Description'
      }
    ];
  }

  showAddEditPort(e: any) {
    e.preventDefault();
    console.log(this.port);
    this.displayAddEditPort = true
    this.formData.reset();
    this.formData.enable();
    if (this.editPort) {
      this.formData.setValue({
        portName: this.port.PortName,
        countryCode: this.unLocodeCountries.find(p => p.Id == this.port.CountryId),
        portCode: this.port.PortCode,
        coordinate: this.port.Coordinate ? this.port.Coordinate : '',
        portType: this.port.Type ? this.portTypes.find((p) => p.Name === this.port.Type) : null,
        description: this.port.Description ? this.port.Description : ''
      });
      if (!this.port.IsNewPort) {
        this.formData.controls.countryCode.disable();
        this.formData.controls.portName.disable();
        this.formData.controls.portCode.disable();
      }
    }
  }

  addEditPort() {
    console.log(this.formData);
    const portDetail = {
      PortName: this.formData.controls.portName.value,
      PortCode: this.formData.controls.portCode.value.toUpperCase(),
      CountryId: this.formData.controls.countryCode.value.Id,
      Coordinate: this.formData.controls.coordinate.value,
      Type: this.formData.controls.portType.value.Name,
      IsNewPort: !this.editPort ? true : this.port.IsNewPort,
      Description: this.formData.controls.description.value
    };
    console.log(portDetail);
    if (this.editPort) // edit existing port
    {
      this.addEditPortLoading = true;
      console.log(this.port);
      this.operationalPlanService.updatePort(this.port.Id, portDetail).subscribe((response) => {
        if (response)
          this.triggerToast('success', 'Success Message', `Port updated successfully`);
        else
          this.triggerToast('error', 'Error Message', `Port not updated`);
        this.addEditPortLoading = false;
      });
    }
    else { //Add new port
      this.addEditPortLoading = true;
      this.operationalPlanService.addNewPort(portDetail).subscribe((response) => {
        if (response) {
          this.triggerToast('success', 'Success Message', `Port added to route successfully`);
          this.formData.reset();
        }
        else
          this.triggerToast('error', 'Error Message', `Port already exists with this country code and port code`);
        this.addEditPortLoading = false;
      });
    }
  }

  filterPortLocations(event) {
    this.operationalPlanService.filterPortLocations(event.query).subscribe((data) => {
      this.portLocations = data;
    });
  }

  addPortToRoute() {
    if (this.vesselTradeRoute.findIndex((p) => p.PortId === this.port.Id) === -1) {
      this.isDataLoading = true;
      console.log(this.port);
      this.operationalPlanService.addPortToRoute({ PortId: this.port.Id, Order: this.portOrder, VesselId: this.vesselId }).subscribe((data) => {
        this.triggerToast('success', 'Success Message', `Port added to route successfully`);
        this.isDataLoading = false;

        // this.vesselTradeRoute.forEach(element => {
        //   if(element.Order >= this.portOrder)
        //   {
        //     element.Order = element.Order + 1;
        //   }
        // });
        // this.vesselTradeRoute.push({Id: null, VesselId: this.vesselId, PortId: this.port.Id, Order: this.portOrder, PortName: this.port.PortName, PortCode: this.port.PortCode.toString()});
        // this.reAssignProperties()

        this.port = null;
        this.getVesselTradeRoute();
      });
    } else {
      this.port = null;
      this.triggerToast('error', 'Failure Message', `Port already exists in route`);
    }
  }

  removePortFromTradeRoute(dataRow: ITradeRoute) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to remove port ' + dataRow.PortName + ' from the route?',
      accept: () => {
        this.isDataLoading = true;
        this.operationalPlanService.deletePortFromRoute(dataRow.Id).pipe(take(1)).subscribe((data) => {
          this.triggerToast('success', 'Success Message', 'Port removed from the route');
          this.isDataLoading = false;
          this.vesselTradeRoute = data;
          this.reAssignProperties();
        });
      }
    });
  }

  reAssignProperties() {
    this.vesselTradeRoute = this.vesselTradeRoute.sort((a, b) => (a.Order > b.Order) ? 1 : -1);
    this.clonedVesselTradeRoute = Object.assign([], this.vesselTradeRoute);
    if (this.vesselTradeRoute.length > 0) {
      this.portOrder = this.vesselTradeRoute[this.vesselTradeRoute.length - 1].Order + 1;
      this.maxPortOrder = this.vesselTradeRoute[this.vesselTradeRoute.length - 1].Order + 1
    }
    else {
      this.portOrder = 1;
      this.maxPortOrder = 1;
    }
  }

  getVesselTradeRoute() {
    if (this.route !== undefined && this.route !== null) {
      const params = this.route.snapshot.paramMap.get('vesselId');
      this.vesselId = parseInt(params, null);
      this.isDataLoading = true;
      this.operationalPlanService.getTradeRouteByVesselId(this.vesselId).pipe(take(1)).subscribe((data) => {
        this.vesselTradeRoute = data;
        console.log(this.vesselTradeRoute);
        this.isDataLoading = false;
        this.reAssignProperties();
      });
    }
  }

  disableAddToRoute(port: any): boolean {
    if ((port !== null && typeof port !== 'object') || port === null || port === '')
      this.editPort = false;
    else
      this.editPort = true;

    return (port !== null && typeof port !== 'object') || port === null || port === '' || this.portOrder === null;
  }

  clear() {
    this.port = null;
    this.portOrder = null;
  }
  cancel() {
    this.router.navigateByUrl('/operational-plan');
  }

  next(): void {
    // this.nextActiveTab.emit(2);
    this.router.navigateByUrl('/operational-plan/prepare-installation/sections/' + this.vesselId);
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
