import { Component, OnInit } from '@angular/core';
import { WhitelistCountriesService } from 'src/app/services/whitelist-countries.service';

@Component({
  selector: 'app-fds-traffic',
  templateUrl: './fds-traffic.component.html',
  styleUrls: ['./fds-traffic.component.scss']
})
export class FdsTrafficComponent implements OnInit {

  vesselList: IVesselList[] = [];
  activeVessel: IVesselList;

  constructor(
    private whitelistCountriesService: WhitelistCountriesService
  ) { }

  ngOnInit() {
    this.vesselList = this.whitelistCountriesService.getVesselList();
    this.activeVessel = this.vesselList[0];
  }

}
