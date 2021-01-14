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

  port: any = null;
  portLocations: any[] = [];
  vesselTradeRoute: any[];
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
    private route: ActivatedRoute, public messageService: MessageService) { }

  ngOnInit() {
    this.vesselId = 1;

    // this.route.params.subscribe((params) => {
    //   this.vesselId = parseInt(params.vesselId);
    //   if (this.vesselId) {

        this.operationalPlanService.getTradeRouteByVesselId(this.vesselId).pipe(take(1)).subscribe((data) => {
          console.log(data);
          this.vesselTradeRoute = data;
        });

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
    this.operationalPlanService.addPortToRoute({PortId: this.port.Id, VesselId: this.vesselId}).subscribe((data) => {
      this.triggerToast('success', 'Success Message', `Port added to route successfully`);

      this.operationalPlanService.getTradeRouteByVesselId(this.vesselId).pipe(take(1)).subscribe((data) => {
        console.log(data);
        this.vesselTradeRoute = data;
      });

    });
  }

  removePortFromTradeRoute(data: any) {
    console.log(data);
  }

  disableAddToRoute(port: any): boolean
  {
    return port !== null && typeof port !== 'object' || port === null || port === '' ;
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
