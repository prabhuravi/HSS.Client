import { Component, OnInit } from '@angular/core';
import { WhitelistCountriesService } from 'src/app/services/whitelist-countries.service';
import { OperationalPlanService } from 'src/app/services/operational-plan.service';

@Component({
  selector: 'app-whitelist-countries',
  templateUrl: './whitelist-countries.component.html',
  styleUrls: ['./whitelist-countries.component.scss']
})
export class WhitelistCountriesComponent implements OnInit {

  whiteListedCountries: IWhiteListedCountries[] = [];
  cols = [
    { field: 'CountryName', header: 'Country Name' },
    { field: 'MCCs', header: 'FCC' },
    { field: 'Vessel', header: 'Whitelisted For' },
    { field: 'VesselId', header: 'Action' }
  ];
  vesselList: IVesselList[] = [];
  activeVessel: IVesselList;
  operatorCountryList: IOperatorCountryList[] = [];
  activeOperatorCountry: IOperatorCountryList;
  constructor(
    private whitelistCountriesService: WhitelistCountriesService,
    private operationalPlanService: OperationalPlanService
  ) { }

  ngOnInit() {
    this.whiteListedCountries = this.whitelistCountriesService.getWhiteListedCountries(1);
    this.vesselList = this.operationalPlanService.getVesselList();
    this.activeVessel = this.vesselList[0];
    this.operatorCountryList = this.operationalPlanService.getOperatorCountryList();
    this.activeOperatorCountry = this.operatorCountryList[0];
  }

}
