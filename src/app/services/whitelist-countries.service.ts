import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WhitelistCountriesService {

  constructor() { }

  getOperatorCountryList(): IOperatorCountryList[] {
    return [{
      CountryId: 1,
      CountryName: 'Abkhazia',
      Zone: 'Unspecified'
    }, {
      CountryId: 2,
      CountryName: 'Afghanistan',
      Zone: 'Unspecified'
    }, {
      CountryId: 3,
      CountryName: 'Albania',
      Zone: 'Unspecified'
    }, {
      CountryId: 4,
      CountryName: 'Algeria',
      Zone: 'Unspecified'
    }];
  }

  getVesselList(): IVesselList[] {
    return [{
      Id: 1,
      VesselName: 'Talisman',
      IpAddress: '10.113.32.20',
      EnabledTime: '2020-03-04T10:34:02.353',
      TimeLimit: 0.0,
      IsUploadEnabled: true,
      RemainingMinutes: 0.0,
      RemainingTime: '1 Day(s), 22 Hour(s), 50 Minutes',
      DisableTime: '2020-03-06T09:47:55',
      EnabledBy: 'admin',
      NodeNumber: 17536,
      IMONumber: 9191319
    }, {
      Id: 2,
      VesselName: 'BergeApo',
      IpAddress: '10.113.52.148',
      EnabledTime: '2020-03-04T09:37:38.757',
      TimeLimit: 0.0,
      IsUploadEnabled: false,
      RemainingMinutes: 0.0,
      RemainingTime: null,
      DisableTime: '2020-03-04T09:47:56.62',
      EnabledBy: '',
      NodeNumber: 17618,
      IMONumber: 9233337
    }, {
      Id: 4,
      VesselName: 'Maalfrid',
      IpAddress: '10.112.221.20',
      EnabledTime: '2019-06-07T09:19:08.28',
      TimeLimit: 0.0,
      IsUploadEnabled: false,
      RemainingMinutes: 0.0,
      RemainingTime: null,
      DisableTime: '2019-06-07T09:27:03.87',
      EnabledBy: '',
      NodeNumber: 17268,
      IMONumber: 11122
    }];
  }

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
