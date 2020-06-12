import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable, Subject } from 'rxjs';
import { LatencyRequest } from '../models/LatencyRequest';
import { AISRequest } from '../models/AISRequest';
import { ConfigurationService } from '@kognifai/poseidon-ng-configurationservice';
import { Configuration } from '../configuration';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class ConnectivityMonitoringService {
  allVesselLinks: IVesselLinks[];
  vesselSubject = new Subject<IVesselLinks>();
  zoomChartSubject = new Subject();
  cachedVesselLatencyChart: ILatencyCacheData;
  nodeChangeSubject = new Subject();

  connectivityMonitoringConfig: any;
  connectivityMonitoringApiUrl: string;

  constructor(
    public http: HttpService,
    public configurationService: ConfigurationService<Configuration>
  ) {
    this.connectivityMonitoringConfig = this.configurationService.config.apiCollection.ConnectivityMonitoring;
    this.connectivityMonitoringApiUrl = `${this.connectivityMonitoringConfig.domainURL}${this.connectivityMonitoringConfig.path}`;
  }

  getVesselLinks(): Observable<any> {

    const requestData = {
      endPoint: `${this.connectivityMonitoringApiUrl}${this.connectivityMonitoringConfig.endpoints.GetVesselLinks}`,
      params: { }
    };
    return this.http.getDataV2(requestData);
  }

  setZoomChangeSubject(nodeNumber: any) {
    this.zoomChartSubject.next(nodeNumber);
  }

  getZoomChangeSubject() {
    return this.zoomChartSubject.asObservable();
  }

  setNodeChangeSubject(nodeNumber: number) {
    this.nodeChangeSubject.next(nodeNumber);
  }

  getNodeNumberSubject() {
    return this.nodeChangeSubject.asObservable();
  }

  setAllVesselLinks(IVesselLinks: IVesselLinks[]) {
    this.allVesselLinks = IVesselLinks;
  }

  getAllCachedResult() {
    return this.allVesselLinks;
  }

  getVesselLinksByNodeNumber(nodeNumber: number) {
    this.getVesselLinks().subscribe((data) => {
      this.allVesselLinks = data;
      const vessel = this.allVesselLinks.filter((vessel1: IVesselLinks) => {
        // tslint:disable-next-line:triple-equals
        return vessel1.NodeNumber.toFixed(0) == nodeNumber;
      });
      this.vesselSubject.next(vessel[0]);
    });
  }

  getVesselNameByNodeNumber(nodeNumber) {
    if (this.allVesselLinks) {
      const vessel = this.allVesselLinks.filter((vessel1: IVesselLinks) => {
        // tslint:disable-next-line:triple-equals
        return vessel1.NodeNumber.toFixed(0) == nodeNumber;
      });
      return vessel[0].Name;
    }
  }

  getAISData(aisRequest?: AISRequest) {
    const a = { VesselName: 'Talisman', FromDate: '2020-03-30T11:46:23.000Z', ToDate: '2020-04-14T11:46:23.000Z' };
    aisRequest.VesselName = this.getVesselNameByNodeNumber(aisRequest.NodeNumber);
    const requestData = {
      endPoint: `${this.connectivityMonitoringApiUrl}${this.connectivityMonitoringConfig.endpoints.AISPositionData}`,
      params: {
        vesselName: aisRequest.VesselName,
        fromDate: aisRequest.FromDate,
        toDate: aisRequest.ToDate }
    };

    return this.http.getDataV2(requestData);
  }

  getVesselSubject(): Observable<any> {
    return this.vesselSubject.asObservable();
  }

  returncacheVesselLatencyChart() {
    return this.cachedVesselLatencyChart;
  }

  setLatencyChartData(data: ILatencyCacheData) {
    this.cachedVesselLatencyChart = data;
  }

  getSnMPData(nodeNumber: number) {
    const requestData = {
      endPoint: `${this.connectivityMonitoringApiUrl}${this.connectivityMonitoringConfig.endpoints.GetSNMPData}/${nodeNumber}`,
      params: { }
    };
    return this.http.getDataV2(requestData);
  }

  public getChartData(latencyRequest: LatencyRequest): Observable<any> {
    const requestData = {
      endPoint: `${this.connectivityMonitoringApiUrl}${this.connectivityMonitoringConfig.endpoints.LatencyTrendData}`,
      params: {
        nodeNumber: latencyRequest.NodeNumber,
        fromDate: latencyRequest.FromDate,
        toDate: latencyRequest.ToDate }
    };
    return this.http.getDataV2(requestData);
  }
}
