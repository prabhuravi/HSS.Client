import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { OperationalPlanService } from 'src/app/services/operational-plan.service';

@Component({
  selector: 'app-trade-route',
  templateUrl: './trade-route.component.html',
  styleUrls: ['./trade-route.component.scss']
})
export class TradeRouteComponent implements OnInit {

  submitted = false;

  port: IPortLocation = null;
  portLocations: IPortLocation[] = [];
  vesselTradeRoute: ITradeRoute[];
  username: string = '';
  //  = [
  //   { Id: '10788', PortName: 'Savanna-la-Mar(JM SLM)', PortCode: 'JM SLM' },
  //   { Id: '17896', PortName: 'Savannah(US SAV)', PortCode: 'US SAV' }
  // ];
  isDataLoading = false;
  disableActivity: boolean;
  vesselId = 0;

  cols = [
    { field: 'PortName', sortfield: 'PortName', header: 'Port Name', filterMatchMode: 'contains' },
    { field: 'Id', sortfield: '', header: 'Action' }
  ];

  constructor(private operationalPlanService: OperationalPlanService, private router: Router,
    private confirmationService: ConfirmationService,
    private route: ActivatedRoute, private messageService: MessageService) { }

  ngOnInit() {
    this.username = this.operationalPlanService.getLoggedInUser();
    this.vesselId = 1;

    // this.route.params.subscribe((params) => {
    //   this.vesselId = parseInt(params.vesselId);
    //   if (this.vesselId) {

    this.getVesselTradeRoute();

    //   }
    // });
  }

  filterPortLocations(event) {
    this.operationalPlanService.filterPortLocations(event.query).subscribe((data) => {
      this.portLocations = data;
      console.log(this.portLocations);
    });
  }

  addNewPort() {
    console.log(this.port);
    if (this.vesselTradeRoute.findIndex(p => p.PortId == this.port.Id) == -1) {
      this.isDataLoading = true;
      this.operationalPlanService.addPortToRoute({ PortId: this.port.Id, Order: 1, VesselId: this.vesselId }).subscribe((data) => {
        this.triggerToast('success', 'Success Message', `Port added to route successfully`);
        this.isDataLoading = false;
        this.port = null;
        this.getVesselTradeRoute();
      });
    }
    else {
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
      this.isDataLoading = false;
      console.log(this.vesselTradeRoute);
    });
  }

  disableAddToRoute(port: any): boolean {
    return port !== null && typeof port !== 'object' || port === null || port === '';
  }

  cancel()
  {
    this.port = null;
  }

  next(): void {
    this.router.navigateByUrl('/operational-plan/prepare-installation/sections');
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
