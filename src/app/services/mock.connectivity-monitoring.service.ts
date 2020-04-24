import { LatencyRequest } from '../models/LatencyRequest';
import { AISRequest } from '../models/AISRequest';
import { of, Observable } from 'rxjs';

export class MockConnectivityMonitoringService {
    allVesselLinks: IVesselLinks[] = [];
    cachedVesselLatencyChart: ILatencyCacheData;

    getVesselLinks(): Observable<any> {
        return of();
    }
    setNodeChangeSubject(nodeNumber: number) {
        return 1;
    }
    getNodeNumberSubject() {
        return of();
    }
    setAllVesselLinks(IVesselLinks: IVesselLinks[]) {
        this.allVesselLinks = IVesselLinks;
    }
    getAllCachedResult() {
        return this.allVesselLinks;
    }
    getVesselLinksByNodeNumber(nodeNumber: number) {
        return 0;
    }
    getVesselNameByNodeNumber(nodeNumber) {
        if (this.allVesselLinks) {
            const vessel = this.allVesselLinks.filter((vessel1: IVesselLinks) => {
                return vessel1.NodeNumber.toFixed(0) === nodeNumber;
            });
            return vessel[0].Name;
        }
    }
    getAISData(aisRequest?: AISRequest) {
        return null;
    }
    getVesselSubject(): Observable<any> {
        return of();
    }
    returncacheVesselLatencyChart() {
        return this.cachedVesselLatencyChart;
    }
    setLatencyChartData(data: ILatencyCacheData) {
        this.cachedVesselLatencyChart = data;
    }
    getSnMPData(nodeNumber: number) {
        return null;
    }
    public getChartData(latencyRequest: LatencyRequest): Observable<any> {
        return of();
    }
}
