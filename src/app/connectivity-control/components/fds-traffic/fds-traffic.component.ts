import { Component, OnInit } from '@angular/core';
import { OperationalPlanService } from 'src/app/services/operational-plan.service';

@Component({
  selector: 'app-fds-traffic',
  templateUrl: './fds-traffic.component.html',
  styleUrls: ['./fds-traffic.component.scss']
})
export class FdsTrafficComponent implements OnInit {

  vesselList: IVesselList[] = [];
  activeVessel: IVesselList;

  constructor(
    private operationalPlanService: OperationalPlanService
  ) { }

  ngOnInit() {
    this.vesselList = this.operationalPlanService.getVesselList();
    this.activeVessel = this.vesselList[0];
  }

}
