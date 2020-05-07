import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { ConfigurationService } from '@kognifai/poseidon-ng-configurationservice';
import { Configuration } from '../configuration';

@Injectable({
  providedIn: 'root'
})
export class ConnectivityControlService {

  vesselConfigurationConfig: any;

  constructor(
    private http: HttpService,
    public configurationService: ConfigurationService<Configuration>
  ) {
    this.vesselConfigurationConfig = this.configurationService.config.apiCollection.VesselConfiguration;
  }

  getConnectivityData(): Observable<IConnectivityControl[]> {
    const requestData = {
      endPoint: `${this.vesselConfigurationConfig.path}${this.vesselConfigurationConfig.endpoints.GetVessels}`
    };
    return this.http.getData(requestData);
  }
  UpdateVessel(vesselData: IVesselList): Observable<boolean> {
    const requestData = {
      endPoint: `${this.vesselConfigurationConfig.path}${this.vesselConfigurationConfig.endpoints.UpdateVessel}${vesselData.Id}`,
      data: vesselData
    };
    return this.http.putData(requestData);
  }

  getConnectivityActionLog(connectivityId: number): Observable<IConnectivityActionLog[]> {
    const requestData = {
      endPoint: `${this.vesselConfigurationConfig.path}${this.vesselConfigurationConfig.endpoints.GetConnectivityControlTransaction}/${connectivityId}`
    };
    return this.http.getData(requestData);
  }

  getMissionList(formData: any): Observable<number[]> {
    const requestData = {
      endPoint: `${this.vesselConfigurationConfig.path}${this.vesselConfigurationConfig.endpoints.MissionsOnVessel}`,
      data: formData
    };
    return this.http.postData(requestData);
  }
  getVesselUploadStatus(formData: any): Observable<IVesselUploadStatus> {
    const requestData = {
      endPoint: `${this.vesselConfigurationConfig.path}${this.vesselConfigurationConfig.endpoints.FDSUploadStatus}`,
      data: formData
    };
    return this.http.postData(requestData);
  }
  getVesselHistoricalStatus(formData: any): Observable<IVesselUploadStatus> {
    const requestData = {
      endPoint: `${this.vesselConfigurationConfig.path}${this.vesselConfigurationConfig.endpoints.FDSHistoricalUploadStatus}`,
      data: formData
    };
    return this.http.postData(requestData);
  }

  getWhiteListedCountries(vesselId: number): Observable<IWhiteListedCountries[]> {
    const requestData = {
      endPoint: `${this.vesselConfigurationConfig.path}${this.vesselConfigurationConfig.endpoints.GetWhitelistedCountries}/${vesselId}`
    };
    return this.http.getData(requestData);
  }
  getOperatorCountryList(): Observable<IOperatorCountryList[]> {
    const requestData = {
      endPoint: `${this.vesselConfigurationConfig.path}${this.vesselConfigurationConfig.endpoints.GetOperatorCountryList}`
    };
    return this.http.getData(requestData);
  }
  removeWhitelistCountry(formData: IWhiteListedCountries): Observable<boolean> {
    const requestData = {
      endPoint: `${this.vesselConfigurationConfig.path}${this.vesselConfigurationConfig.endpoints.RemoveWhitelistCountry}`,
      data: formData
    };
    return this.http.postData(requestData);
  }
  markCountryWhitelist(formData: any): Observable<string> {
    const requestData = {
      endPoint: `${this.vesselConfigurationConfig.path}${this.vesselConfigurationConfig.endpoints.MarkCountryWhitelist}`,
      data: formData
    };
    return this.http.postData(requestData);
  }
  getGroupCountries(CountryId: number): Observable<IOperatorCountryList[]> {
    const requestData = {
      endPoint: `${this.vesselConfigurationConfig.path}${this.vesselConfigurationConfig.endpoints.GetGroupCountries}/${CountryId}`
    };
    return this.http.getData(requestData);
  }
  deleteCountryGroup(formData: any): Observable<boolean> {
    const requestData = {
      endPoint: `${this.vesselConfigurationConfig.path}${this.vesselConfigurationConfig.endpoints.DeleteCountryGroup}`,
      data: formData
    };
    return this.http.postData(requestData);
  }
  addCountryGroup(formData: any): Observable<boolean> {
    const requestData = {
      endPoint: `${this.vesselConfigurationConfig.path}${this.vesselConfigurationConfig.endpoints.AddCountryGroup}`,
      data: formData
    };
    return this.http.postData(requestData);
  }
  addCountriesToGroup(formData: any): Observable<string> {
    const requestData = {
      endPoint: `${this.vesselConfigurationConfig.path}${this.vesselConfigurationConfig.endpoints.AddCountriesToGroup}`,
      data: formData
    };
    return this.http.postData(requestData);
  }
  removeGroupCountry(formData: any): Observable<boolean> {
    const requestData = {
      endPoint: `${this.vesselConfigurationConfig.path}${this.vesselConfigurationConfig.endpoints.RemoveGroupCountry}`,
      data: formData
    };
    return this.http.postData(requestData);
  }
}
