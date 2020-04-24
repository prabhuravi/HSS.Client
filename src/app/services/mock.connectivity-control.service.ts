import { Observable, of } from 'rxjs';

export class MockConnectivityControlService {
    getConnectivityData(): Observable<IConnectivityControl[]> {
        return of([]);
    }

    UpdateVessel(vesselData: IVesselList): Observable<boolean> {
        return of(true);
    }

    getConnectivityActionLog(connectivityId: number): Observable<IConnectivityActionLog[]> {
        return of([]);
    }

    getMissionList(formData: any): Observable<number[]> {
        return of([]);
    }
    getVesselUploadStatus(formData: IVesselMissionData): Observable<IVesselUploadStatus> {
        return of({} as any);
    }
    getVesselHistoricalStatus(formData: IVesselHistoricalData): Observable<IVesselUploadStatus> {
        return of({} as any);
    }

    getWhiteListedCountries(vesselId: number): Observable<IWhiteListedCountries[]> {
        return of([]);
    }
    getOperatorCountryList(): Observable<IOperatorCountryList[]> {
        return of([]);
    }
    removeWhitelistCountry(formData: IWhiteListedCountries): Observable<boolean> {
        return of(true);
    }
    markCountryWhitelist(formData: any): Observable<string> {
        return of('');
    }
    getGroupCountries(CountryId: number): Observable<IOperatorCountryList[]> {
        return of([]);
    }
    deleteCountryGroup(formData: any): Observable<boolean> {
        return of(true);
    }
    addCountryGroup(formData: any): Observable<boolean> {
        return of(true);
    }
    addCountriesToGroup(formData: any): Observable<string> {
        return of('');
    }
    removeGroupCountry(formData: any): Observable<boolean> {
        return of(true);
    }
}
