import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { ConfigurationService } from '@kognifai/poseidon-ng-configurationservice';
import { Configuration } from '../configuration';
import { text } from 'd3';

@Injectable({
  providedIn: 'root'
})
export class ConnectivityControlService {
  connectivityControlConfigCollection: any;
  connectivityControlApiUrl: string;
  whitelistConfigCollection: any;
  whitelistApiUrl: string;
  fileUploadStatusConfigCollection: any;
  fileUploadStatusApiUrl: string;

  constructor(
    private http: HttpService,
    public configurationService: ConfigurationService<Configuration>
  ) {
    this.connectivityControlConfigCollection = this.configurationService.config.apiCollection.ConnectivityControl;
    this.connectivityControlApiUrl = `${this.connectivityControlConfigCollection.domainURL}${this.connectivityControlConfigCollection.path}`;
    this.whitelistConfigCollection = this.configurationService.config.apiCollection.WhiteList;
    this.whitelistApiUrl = `${this.whitelistConfigCollection.domainURL}${this.whitelistConfigCollection.path}`;
    this.fileUploadStatusConfigCollection = this.configurationService.config.apiCollection.FileUploadStatus;
    this.fileUploadStatusApiUrl = `${this.fileUploadStatusConfigCollection.domainURL}${this.fileUploadStatusConfigCollection.path}`;
  }

  // Connectivity Control
  getConnectivityData(): Observable<IConnectivityControl[]> {
    const requestData = {
      endPoint: `${this.connectivityControlApiUrl}${this.connectivityControlConfigCollection.endpoints.GetVessels}`
    };
    return this.http.getData(requestData);
  }

  UpdateVessel(vesselData: IVesselList): Observable<boolean> {
    const requestData = {
      endPoint: `${this.connectivityControlApiUrl}${this.connectivityControlConfigCollection.endpoints.UpdateVessel}/${vesselData.Id}`,
      data: vesselData
    };
    return this.http.putData(requestData);
  }

  getConnectivityActionLog(vesselId: number): Observable<IConnectivityActionLog[]> {
    const requestData = {
      endPoint: `${this.connectivityControlApiUrl}${this.connectivityControlConfigCollection.endpoints.GetConnectivityControlTransaction}/${vesselId}`
    };
    return this.http.getData(requestData);
  }


  // File Upload Status
  getMissionList(vesselId: number): Observable<number[]> {
    const requestData = {
      endPoint: `${this.fileUploadStatusApiUrl}${this.fileUploadStatusConfigCollection.endpoints.MissionsOnVessel}/${vesselId}`,
    };
    return this.http.getData(requestData);
  }

  getDefaultFileLogStatus(): Observable<IFileLoggingStatus> {
    const requestData = {
      endPoint: `${this.fileUploadStatusApiUrl}${this.fileUploadStatusConfigCollection.endpoints.FDSDefaultUploadStatus}`,
    };
    return this.http.getData(requestData);
  }

  getVesselUploadStatus(filterData: any): Observable<IVesselUploadStatus> {
    const requestData = {
      endPoint: `${this.fileUploadStatusApiUrl}${this.fileUploadStatusConfigCollection.endpoints.FDSUploadStatus}`,
      params: {
        vesselId: filterData.VesselId,
        fromDate: filterData.FromDate,
        toDate: filterData.ToDate,
        fromMission: filterData.FromMission,
        toMission: filterData.ToMission
      }
    };
    return this.http.getDataV2(requestData);
  }

  MarkFileForUpload(ids: any): Observable<boolean> {
    const requestData = {
      endPoint: `${this.fileUploadStatusApiUrl}${this.fileUploadStatusConfigCollection.endpoints.MarkFileForUpload}`,
      data: ids
    };
    return this.http.putData(requestData);
  }

  getVesselHistoricalStatus(filterData: any): Observable<IFileLoggingStatus> {
    const requestData = {
      endPoint: `${this.fileUploadStatusApiUrl}${this.fileUploadStatusConfigCollection.endpoints.FDSHistoricalUploadStatus}`,
      params: {
        vesselIds: filterData.VesselIds,
        fromDate: filterData.FromDate,
        toDate: filterData.ToDate,
      }
    };
    return this.http.getDataV2(requestData);
  }

  // Whitelist
  getVessels(): Observable<IVessel[]> {
    const requestData = {
      endPoint: `${this.whitelistApiUrl}${this.whitelistConfigCollection.endpoints.GetVessels}`
    };
    return this.http.getData(requestData);
  }

  getWhiteListedCountries(vesselId: number): Observable<IWhiteListedCountries[]> {
    const requestData = {
      endPoint: `${this.whitelistApiUrl}${this.whitelistConfigCollection.endpoints.GetWhitelistedCountries}/${vesselId}`
    };
    return this.http.getData(requestData);
  }

  getLastSyncDate(vesselId: number): Observable<string> {
    const requestData = {
      endPoint: `${this.whitelistApiUrl}${this.whitelistConfigCollection.endpoints.GetLastSyncDate}/${vesselId}`
     };
    return this.http.getData(requestData);
  }

  getOperatorCountryList(): Observable<IOperatorCountryList[]> {
    const requestData = {
      endPoint: `${this.whitelistApiUrl}${this.whitelistConfigCollection.endpoints.GetOperatorCountryList}`
    };
    return this.http.getData(requestData);
  }

  removeWhitelistCountry(id: number): Observable<boolean> {
    const requestData = {
      endPoint: `${this.whitelistApiUrl}${this.whitelistConfigCollection.endpoints.RemoveWhitelistCountry}/${id}`
    };
    return this.http.deleteData(requestData);
  }

  markCountryWhitelist(formData: any): Observable<string> {
    const requestData = {
      endPoint: `${this.whitelistApiUrl}${this.whitelistConfigCollection.endpoints.MarkCountryWhitelist}`,
      data: formData
    };
    return this.http.postData(requestData);
  }

  getGroupCountries(CountryId: number): Observable<IOperatorCountryList[]> {
    const requestData = {
      endPoint: `${this.whitelistApiUrl}${this.whitelistConfigCollection.endpoints.GetGroupCountries}/${CountryId}`
    };
    return this.http.getData(requestData);
  }

  deleteCountryGroup(groupId: number): Observable<boolean> {
    const requestData = {
      endPoint: `${this.whitelistApiUrl}${this.whitelistConfigCollection.endpoints.DeleteCountryGroup}/${groupId}`,
    };
    return this.http.deleteData(requestData);
  }

  addCountryGroup(formData: any): Observable<string> {
    const requestData = {
      endPoint: `${this.whitelistApiUrl}${this.whitelistConfigCollection.endpoints.AddCountryGroup}`,
      data: formData
    };
    return this.http.postData(requestData);
  }

  addCountriesToGroup(formData: any): Observable<string> {
    const requestData = {
      endPoint: `${this.whitelistApiUrl}${this.whitelistConfigCollection.endpoints.AddCountriesToGroup}`,
      data: formData
    };
    return this.http.postData(requestData);
  }

  getLoggedInUser() {
    return this.http.getLoggedInUser();
}
}
