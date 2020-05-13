import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable, Subject } from 'rxjs';
import { LatencyRequest } from '../models/LatencyRequest';
import { AISRequest } from '../models/AISRequest';
import { ConfigurationService } from '@kognifai/poseidon-ng-configurationservice';
import { Configuration } from '../configuration';

@Injectable({
  providedIn: 'root'
})
export class ConnectivityMonitoringService {
  allVesselLinks: IVesselLinks[];
  vesselSubject = new Subject<IVesselLinks>();
  zoomChartSubject = new Subject();
  cachedVesselLatencyChart: ILatencyCacheData;
  nodeChangeSubject = new Subject();
  vesselLinkQualityConfig: any;
  vesselLinkQualityConfigPath: string;

  constructor(
    public http: HttpService,
    public configurationService: ConfigurationService<Configuration>
  ) {
    this.vesselLinkQualityConfig = this.configurationService.config.apiCollection.VesselLinkQuality;
    this.vesselLinkQualityConfigPath = `${this.vesselLinkQualityConfig.domainURL}${this.vesselLinkQualityConfig.path}`;
  }
  getVesselLinks(): Observable<any> {
    const requestData = {
      endPoint: `${this.vesselLinkQualityConfigPath}${this.vesselLinkQualityConfig.endpoints.GetVesselLinks}`
    };
    return this.http.getData(requestData);
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
      endPoint: `${this.vesselLinkQualityConfigPath}${this.vesselLinkQualityConfig.endpoints.AISPositionData}`,
      data: aisRequest
    };
    return this.http.postData(requestData);
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
      endPoint: `${this.vesselLinkQualityConfigPath}${this.vesselLinkQualityConfig.endpoints.GetSNMPData}/${nodeNumber}`
    };
    return this.http.getData(requestData);
  }
  public getChartData(latencyRequest: LatencyRequest): Observable<any> {
    // const a = { NodeNumber: 17876, FromDate: '2020-04-16T09:16:55.754Z', ToDate: '2020-04-17T09:16:55.754Z' };
    const requestData = {
      endPoint: `${this.vesselLinkQualityConfigPath}${this.vesselLinkQualityConfig.endpoints.LatencyTrendData}`,
      data: latencyRequest
    };
    return this.http.postData(requestData);
  }
}
