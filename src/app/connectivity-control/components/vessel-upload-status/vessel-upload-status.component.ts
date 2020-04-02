import { Component, OnInit } from '@angular/core';
import { WhitelistCountriesService } from 'src/app/services/whitelist-countries.service';

@Component({
  selector: 'app-vessel-upload-status',
  templateUrl: './vessel-upload-status.component.html',
  styleUrls: ['./vessel-upload-status.component.scss']
})
export class VesselUploadStatusComponent implements OnInit {

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
