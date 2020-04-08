import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectivityMonitoringService {
  allVesselLinks: IVesselLinks[];
  vesselSubject = new Subject<IVesselLinks>();
  constructor(public http: HttpClient) { }
  domainURL = 'https://hgstest.kognif.ai/VesselLinkQualityAPIService/API/VesselLinkQuality/'
  getVesselLinks(): Observable<any> {

    const url = 'GetVesselLinks';

    return this.http.get(`${this.domainURL + url}`);

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

  getSnMPData(nodeNumber: number) {
    const url = 'GetSNMPData/' + nodeNumber
    return this.http.get(`${this.domainURL + url}`);
  }
  public getChartData(): Observable<any> {
    return this.http.get("./assets/vesselChartData.json");

  }
}
