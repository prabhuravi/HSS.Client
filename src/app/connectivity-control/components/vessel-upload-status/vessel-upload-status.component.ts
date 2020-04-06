import { Component, OnInit } from '@angular/core';
import { OperationalPlanService } from 'src/app/services/operational-plan.service';

@Component({
  selector: 'app-vessel-upload-status',
  templateUrl: './vessel-upload-status.component.html',
  styleUrls: ['./vessel-upload-status.component.scss']
})
export class VesselUploadStatusComponent implements OnInit {

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
