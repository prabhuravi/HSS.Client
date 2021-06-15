import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
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
  vesselTradeRoute: ITradeRoute[];
  clonedVesselTradeRoute: ITradeRoute[];
  // username: string = '';
  isDataLoading = false;
  vesselId = 0;
  @Output() nextActiveTab: EventEmitter<any> = new EventEmitter();
  @Input() isOperationScreen: boolean;

  cols = [
    { field: 'PortName', sortfield: 'PortName', header: 'Port Name', filterMatchMode: 'contains' },
    { field: 'Order', sortfield: 'Order', header: 'Port Order', filterMatchMode: 'contains' }    
  ];

  constructor(private operationalPlanService: OperationalPlanService, private router: Router,
    private confirmationService: ConfirmationService,
    private prepareInstallationService: PrepareInstallationService,
    private route: ActivatedRoute, private messageService: MessageService) {
  }

  ngOnInit() {
    if(!this.isOperationScreen){
      this.cols.push({ field: 'Id', sortfield: '', header: 'Action' , filterMatchMode:''});
    }
    // this.username = this.operationalPlanService.getLoggedInUser();
    if (!this.prepareInstallationService.installation) {
      this.prepareInstallationService.setInstallationFromRoute(this.route);
    }
    this.getVesselTradeRoute();
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

  filterPortLocations(event) {
    this.operationalPlanService.filterPortLocations(event.query).subscribe((data) => {
      this.portLocations = data;
    });
  }

  addNewPort() {
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
        this.getVesselTradeRoute();  // for time being
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
        this.isDataLoading = false;
        this.reAssignProperties();
      });
    }
  }

  disableAddToRoute(port: any): boolean {
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
