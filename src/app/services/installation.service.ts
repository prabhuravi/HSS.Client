import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable, forkJoin, observable, of } from 'rxjs';
import { ConfigurationService } from '@kognifai/poseidon-ng-configurationservice';
import { Configuration } from '../configuration';
import { Installation,  InstallationStatus,  InstallationType} from '../models/Installation';
import { map } from 'rxjs/operators';
import { InstallationAdapter, InstallationTypeAdapter, InstallationStatusAdapter, FoulingStateAdapter } from '../models/modelAdapter';

@Injectable({
  providedIn: 'root'
})
export class InstallationService {
  operationalPlanConfig: any;
  installationConfig: any;
  foulingConfig: any;
  constructor(private http: HttpService, public configurationService: ConfigurationService<Configuration>,
              private installationAdapter: InstallationAdapter,
              private installationTypeAdapter: InstallationTypeAdapter,
              private installationStatusAdapter: InstallationStatusAdapter,
              private foulingStateAdapter: FoulingStateAdapter
              ) {
    this.operationalPlanConfig = this.configurationService.config.apiCollection.OperationalPlan;
    this.installationConfig = this.configurationService.config.apiCollection.OperationalPlan.Installation;
    this.foulingConfig = this.configurationService.config.apiCollection.OperationalPlan.Fouling;
   }

   getInstallationFormData(): Observable <[Installation[], InstallationType[], InstallationStatus[], IFoulingState[]]> {

     return forkJoin([this.getinstallations(), this.getinstallationTypes(), this.getinstallationStatus(), this.getFoulingstates()]);
  }

   getinstallations(): Observable<Installation[]> {
    const requestData = {
      endPoint: `${this.installationConfig.path}${this.installationConfig.endpoints.GetInstallations}`
    };
    return this.http.getData(requestData).pipe(map((data: any[]) =>  data.map((item) =>  this.installationAdapter.adapt(item))));
  }

  getinstallationTypes(): Observable<InstallationType[]> {
    const requestData = {
      endPoint: `${this.installationConfig.path}${this.installationConfig.endpoints.GetInstallationType}`
    };
    return this.http.getData(requestData).pipe(map((data: any[]) =>  data.map((item) =>  this.installationTypeAdapter.adapt(item))));
  }
  getinstallationStatus(): Observable<InstallationStatus[]> {
    const requestData = {
      endPoint: `${this.installationConfig.path}${this.installationConfig.endpoints.GetInstallationStatus}`
    };
    return this.http.getData(requestData).pipe(map((data: any[]) =>  data.map((item) =>  this.installationStatusAdapter.adapt(item))));
  }
  getFoulingstates(): Observable<IFoulingState[]> {
    const requestData = {
      endPoint: `${this.foulingConfig.path}${this.foulingConfig.endpoints.GetFoulingStates}`
    };
    return this.http.getData(requestData).pipe(map((data: any[]) =>  data.map((item) =>  this.foulingStateAdapter.adapt(item))));
  }

  UpdateInstallationInformation(installationIformation: Installation): Observable<boolean> {
    return of(true);
}

}
