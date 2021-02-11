import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  // username: string = '';
  isDataLoading = false;
  // disableActivity: boolean;
  vesselId = 0;
  @Output() nextActiveTab: EventEmitter<any> = new EventEmitter();

  cols = [
    { field: 'PortName', sortfield: 'PortName', header: 'Port Name', filterMatchMode: 'contains' },
    { field: 'Order', sortfield: 'Order', header: 'Order', filterMatchMode: 'contains' },
    { field: 'Id', sortfield: '', header: 'Action' }
  ];

  constructor(private operationalPlanService: OperationalPlanService, private router: Router,
              private confirmationService: ConfirmationService,
              private prepareInstallationService: PrepareInstallationService,
              private route: ActivatedRoute, private messageService: MessageService) { }

  ngOnInit() {
    // this.username = this.operationalPlanService.getLoggedInUser();
    this.vesselId = this.prepareInstallationService.installation.id;
    this.getVesselTradeRoute();
  }

  filterPortLocations(event) {
    this.operationalPlanService.filterPortLocations(event.query).subscribe((data) => {
      this.portLocations = data;
      console.log(this.portLocations);
    });
  }

  addNewPort() {
    console.log(this.port);
    console.log(this.portOrder);
    if (this.vesselTradeRoute.findIndex((p) => p.PortId === this.port.Id) === -1) {
      this.isDataLoading = true;
      this.operationalPlanService.addPortToRoute({ PortId: this.port.Id, Order: this.portOrder, VesselId: this.vesselId }).subscribe((data) => {
        this.triggerToast('success', 'Success Message', `Port added to route successfully`);
        this.isDataLoading = false;
        this.port = null;
        this.getVesselTradeRoute();
      });
    } else {
      this.port = null;
      this.triggerToast('error', 'Failure Message', `Port already exists in route`);
    }
  }

  removePortFromTradeRoute(dataRow: ITradeRoute) {
    console.log(dataRow);
    this.confirmationService.confirm({
      message: 'Are you sure you want to remove port ' + dataRow.PortName + ' from the route?',
      accept: () => {
        this.isDataLoading = true;
        this.operationalPlanService.deletePortFromRoute(dataRow.Id).pipe(take(1)).subscribe(() => {
          this.triggerToast('success', 'Success Message', 'Port removed from the route');
          this.isDataLoading = false;
          this.getVesselTradeRoute();
        });
      }
    });
  }

  getVesselTradeRoute() {
    this.isDataLoading = true;
    this.operationalPlanService.getTradeRouteByVesselId(this.vesselId).pipe(take(1)).subscribe((data) => {
      this.vesselTradeRoute = data;
      this.vesselTradeRoute = this.vesselTradeRoute.sort((a, b) => (a.Order > b.Order) ? 1 : -1);
      this.isDataLoading = false;
      console.log(this.vesselTradeRoute);
      if(this.vesselTradeRoute.length > 0)
      {
          this.portOrder = this.vesselTradeRoute[this.vesselTradeRoute.length - 1].Order + 1;
          this.maxPortOrder = this.vesselTradeRoute[this.vesselTradeRoute.length - 1].Order + 1
      }
      else{
        this.portOrder = 1;
        this.maxPortOrder = 1;
      }
    });
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
    this.nextActiveTab.emit(2);
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
