import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WhitelistCountriesService {

  constructor() { }

  getWhiteListedCountries(vesselId: number): IWhiteListedCountries[] {
    return [{
      VesselId: 0,
      CountryId: 2,
      CountryName: 'Afghanistan',
      MCCs: '412',
      Vessel: 'FullPictureLab'
    }, {
      VesselId: 0,
      CountryId: 9,
      CountryName: 'Antigua and Barbuda',
      MCCs: '344',
      Vessel: 'FullPictureLab'
    }, {
      VesselId: 0,
      CountryId: 36,
      CountryName: 'Cambodia',
      MCCs: '456',
      Vessel: 'FullPictureLab'
    }, {
      VesselId: 0,
      CountryId: 97,
      CountryName: 'India',
      MCCs: '404, 405,',
      Vessel: 'FullPictureLab'
    }];
  }
}
