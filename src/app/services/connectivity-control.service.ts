import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ConnectivityControlService {

  constructor(
    private http: HttpService
  ) { }

  getConnectivityData(): Observable<IConnectivityControl[]> {
    const requestData = {
      endPoint: '/VesselConfig/api/VesselConfiguration/GetVessels'
    };
    return this.http.getData(requestData);
  }
  UpdateVessel(vesselData: IVesselList): Observable<boolean> {
    const requestData = {
      endPoint: `/VesselConfig/api/VesselConfiguration/UpdateVessel?vesselId=${vesselData.Id}`,
      data: vesselData
    };
    return this.http.putData(requestData);
  }

  getConnectivityActionLog(connectivityId: number): Observable<IConnectivityActionLog[]> {
    const requestData = {
      endPoint: `/VesselConfig/api/VesselConfiguration/GetConnectivityControlTransaction/${connectivityId}`
    };
    return this.http.getData(requestData);
  }

  getMissionList(formData: any): Observable<number[]> {
    const requestData = {
      endPoint: '/VesselConfig/api/VesselConfiguration/MissionsOnVessel',
      data: formData
    };
    return this.http.postData(requestData);
  }
  getVesselUploadStatus(formData: IVesselMissionData): Observable<IVesselUploadStatus> {
    const requestData = {
      endPoint: '/VesselConfig/api/VesselConfiguration/FDSUploadStatus',
      data: formData
    };
    return this.http.postData(requestData);
  }
  getVesselHistoricalStatus(formData: IVesselHistoricalData): Observable<IVesselUploadStatus> {
    const requestData = {
      endPoint: '/VesselConfig/api/VesselConfiguration/FDSHistoricalUploadStatus',
      data: formData
    };
    return this.http.postData(requestData);
  }

  getWhiteListedCountries(vesselId: number): Observable<IWhiteListedCountries[]> {
    const requestData = {
      endPoint: `/VesselConfig/api/VesselConfiguration/GetWhitelistedCountries/${vesselId}`
    };
    return this.http.getData(requestData);
  }
  getOperatorCountryList(): Observable<IOperatorCountryList[]> {
    const requestData = {
      endPoint: '/VesselConfig/api/VesselConfiguration/GetOperatorCountryList'
    };
    return this.http.getData(requestData);
  }
  removeWhitelistCountry(formData: IWhiteListedCountries): Observable<boolean> {
    const requestData = {
      endPoint: '/VesselConfig/api/VesselConfiguration/RemoveWhitelistCountry',
      data: formData
    };
    return this.http.postData(requestData);
  }
  markCountryWhitelist(formData: any): Observable<string> {
    const requestData = {
      endPoint: '/VesselConfig/api/VesselConfiguration/MarkCountryWhitelist',
      data: formData
    };
    return this.http.postData(requestData);
  }
  addCountryToGroup(formData: IOperatorCountryList[]): Observable<string> {
    const requestData = {
      endPoint: '/VesselConfig/api/VesselConfiguration/MarkCountryWhitelist',
      data: formData
    };
    return this.http.postData(requestData);
  }
  getGroupCountries(CountryId: number): Observable<IOperatorCountryList[]> {
    const requestData = {
      endPoint: `/VesselConfig/api/VesselConfiguration/GetGroupCountries/${CountryId}`
    };
    return this.http.getData(requestData);
  }
  deleteCountryGroup(formData: any): Observable<boolean> {
    const requestData = {
      endPoint: '/VesselConfig/api/VesselConfiguration/DeleteCountryGroup',
      data: formData
    };
    return this.http.postData(requestData);
  }
  addCountryGroup(formData: any): Observable<boolean> {
    const requestData = {
      endPoint: '/VesselConfig/api/VesselConfiguration/AddCountryGroup',
      data: formData
    };
    return this.http.postData(requestData);
  }
  removeGroupCountry(formData: any): Observable<boolean> {
    const requestData = {
      endPoint: '/VesselConfig/api/VesselConfiguration/RemoveGroupCountry',
      data: formData
    };
    return this.http.postData(requestData);
  }
}
