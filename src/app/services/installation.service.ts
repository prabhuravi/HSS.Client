import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable, forkJoin, observable, of } from 'rxjs';
import { ConfigurationService } from '@kognifai/poseidon-ng-configurationservice';
import { Configuration } from '../configuration';
import { Installation,  InstallationStatus,  InstallationType,  VesselType} from '../models/Installation';
import { map } from 'rxjs/operators';
import { InstallationAdapter, VesselTypeAdapter, InstallationStatusAdapter, FoulingStateAdapter } from '../models/modelAdapter';
import { SectionService } from './section.service';

@Injectable({
  providedIn: 'root'
})
export class InstallationService {
  operationalPlanConfig: any;
  installationConfig: any;
  foulingConfig: any;
  constructor(private http: HttpService, public configurationService: ConfigurationService<Configuration>,
              private installationAdapter: InstallationAdapter,
              private vesselTypeAdapter: VesselTypeAdapter,
              private installationTypeAdapter: VesselTypeAdapter,
              private installationStatusAdapter: InstallationStatusAdapter,
              private foulingStateAdapter: FoulingStateAdapter,
              private sectionService: SectionService
              ) {
    this.operationalPlanConfig = this.configurationService.config.apiCollection.OperationalPlan;
    this.installationConfig = this.configurationService.config.apiCollection.OperationalPlan.Installation;
    this.foulingConfig = this.configurationService.config.apiCollection.OperationalPlan.Fouling;
   }

   getInstallationOverviewData(): Observable <[Installation[], InstallationStatus[], IFoulingState[]]> {

     return forkJoin([this.getinstallationsForoverview(), this.getinstallationStatus(), this.sectionService.getFoulingStates()]);
  }
  getInstallationFormData(): Observable <[Installation[], VesselType[], InstallationStatus[], InstallationType[]]> {

    return forkJoin([this.getinstallations(), this.getVesselTypes(), this.getinstallationStatus(), this.getInstallationTypes()]);
 }

   getinstallations(): Observable<Installation[]> {
    const requestData = {
      endPoint: `${this.operationalPlanConfig.domainURL}${this.installationConfig.path}${this.installationConfig.endpoints.GetInstallations}`
    };
    return this.http.getData(requestData).pipe(map((data: any[]) =>  data.map((item) =>  this.installationAdapter.adapt(item))));
  }

  getinstallationsById(vesselId: number): Observable<Installation> {
    const requestData = {
      endPoint: `${this.operationalPlanConfig.domainURL}${this.installationConfig.path}${this.installationConfig.endpoints.GetInstallations}/${vesselId}`
    };
    return this.http.getData(requestData).pipe(map((data: any[]) =>   this.installationAdapter.adapt(data)));
  }

  getVesselTypes(): Observable<VesselType[]> {
    const requestData = {
      endPoint: `${this.operationalPlanConfig.domainURL}${this.installationConfig.path}${this.installationConfig.endpoints.GetVesselType}`
    };
    return this.http.getData(requestData).pipe(map((data: any[]) =>  data.map((item) =>  this.vesselTypeAdapter.adapt(item))));
  }
  getInstallationTypes(): Observable<InstallationType[]> {
    const requestData = {
      endPoint: `${this.operationalPlanConfig.domainURL}${this.installationConfig.path}${this.installationConfig.endpoints.GetInstallationType}`
    };
    return this.http.getData(requestData).pipe(map((data: any[]) =>  data.map((item) =>  this.vesselTypeAdapter.adapt(item))));
  }
  getinstallationStatus(): Observable<InstallationStatus[]> {
    const requestData = {
      endPoint: `${this.operationalPlanConfig.domainURL}${this.installationConfig.path}${this.installationConfig.endpoints.GetInstallationStatus}`
    };
    return this.http.getData(requestData).pipe(map((data: any[]) =>  data.map((item) =>  this.installationStatusAdapter.adapt(item))));
  }
  UpdateInstallationInformation(installationIformation: Installation): Observable<boolean> {
    const requestData = {
      endPoint: `${this.operationalPlanConfig.domainURL}${this.installationConfig.path}${this.installationConfig.endpoints.UpdateInstallation}/${installationIformation.id}`,
      data: installationIformation
    };
    return this.http.putData(requestData);
}

getinstallationsForoverview(): Observable<Installation[]> {
  const requestData = {
    endPoint: `${this.operationalPlanConfig.domainURL}${this.installationConfig.path}${this.installationConfig.endpoints.GetInstallationOverview}`
  };
  return this.http.getData(requestData).pipe(map((data: any[]) =>  data.map((item) =>  this.installationAdapter.adapt(item))));
}

getInstallationOverview(vesselId: number): Observable<Installation> {
  const requestData = {
    endPoint: `${this.operationalPlanConfig.domainURL}${this.installationConfig.path}${this.installationConfig.endpoints.GetInstallationOverview}/${vesselId}`
  };
  return this.http.getData(requestData).pipe(
    map((data: any) =>
    this.installationAdapter.adapt(data))
    );
}

}
