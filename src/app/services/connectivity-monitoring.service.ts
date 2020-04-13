import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, Subject } from 'rxjs';
import { LatencyRequest } from '../models/LatencyRequest';

@Injectable({
  providedIn: 'root'
})
export class ConnectivityMonitoringService {
  allVesselLinks: IVesselLinks[];
  vesselSubject = new Subject<IVesselLinks>();
  cachedVesselLatencyChart:ILatencyCacheData;
  nodeChangeSubject = new Subject();
  constructor(public http: HttpClient) { }
  domainURL = 'https://hgstest.kognif.ai/VesselLinkQualityAPIService/API/VesselLinkQuality/'
  getVesselLinks(): Observable<any> {

    const url = 'GetVesselLinks';

    return this.http.get(`${this.domainURL + url}`);

  }
  
  setNodeChangeSubject(nodeNumber: number){
    this.nodeChangeSubject.next(nodeNumber);
  }
  getNodeNumberSubject(){
   return this.nodeChangeSubject.asObservable();
  }
  setAllVesselLinks(IVesselLinks: IVesselLinks[]) {
    this.allVesselLinks = IVesselLinks;
  }
  getVesselLinksByNodeNumber(nodeNumber: number) {
   // if (!this.allVesselLinks) {
      this.getVesselLinks().subscribe((data) => {
        this.allVesselLinks = data;
        const vessel = this.allVesselLinks.filter((vessel: IVesselLinks) => {
          return vessel.NodeNumber.toFixed(0) == nodeNumber;
        });
        this.vesselSubject.next(vessel[0]);
      })

    // } else {
    //   const vessel = this.allVesselLinks.filter((vessel: IVesselLinks) => {
    //     return vessel.NodeNumber.toFixed(0) == nodeNumber;
    //   });
    //   this.vesselSubject.next(vessel[0]);
    // }



  }
  getVesselSubject(): Observable<any> {
    return this.vesselSubject.asObservable();
  }
  returncacheVesselLatencyChart(){
    return this.cachedVesselLatencyChart;
  }
  setLatencyChartData(data:ILatencyCacheData){
    this.cachedVesselLatencyChart =data;
  }
  getSnMPData(nodeNumber: number) {
    const url = 'GetSNMPData/' + nodeNumber
    return this.http.get(`${this.domainURL + url}`);
  }
  public getChartData(latencyRequest: LatencyRequest): Observable<any> {
    const url = 'LatencyTrendData'
    return this.http.post(`${this.domainURL + url}`,latencyRequest);

  }
}
