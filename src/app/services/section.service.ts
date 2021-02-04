import { Injectable } from '@angular/core';
import { ConfigurationService } from '@kognifai/poseidon-ng-configurationservice';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Configuration } from '../configuration';
import { SectionAdapter, SectionStatusAdapter, VesselSectionAdapter, FoulingStateAdapter } from '../models/modelAdapter';
import { VesselSection, SectionStatus } from '../models/Section';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  operationalPlanConfig: any;
  sectionconfig: any;
  foulingConfig: any;
  constructor(private http: HttpService, public configurationService: ConfigurationService<Configuration>,
              private sectionAdapter: SectionAdapter,
              private vesselSectionAdapter: VesselSectionAdapter,
      private sectionStatusAdapter: SectionStatusAdapter,
      private foulingStateAdapter: FoulingStateAdapter
              ) {
    this.operationalPlanConfig = this.configurationService.config.apiCollection.OperationalPlan;
    this.sectionconfig = this.configurationService.config.apiCollection.OperationalPlan.Section;
    this.foulingConfig = this.configurationService.config.apiCollection.OperationalPlan.Fouling;
   }

   getSections(): Observable<VesselSection[]> {
    const requestData = {
      endPoint: `${this.sectionconfig.path}${this.sectionconfig.endpoints.GetSections}`
    };
    return this.http.getData(requestData).pipe(map((data: any[]) =>  data.map((item) =>  this.vesselSectionAdapter.adapt(item))));

   }
   getSectionStatus(): Observable<SectionStatus[]> {
    const requestData = {
      endPoint: `${this.sectionconfig.path}${this.sectionconfig.endpoints.GetSectionStatus}`
    };
    return this.http.getData(requestData).pipe(map((data: any[]) =>  data.map((item) =>  this.sectionStatusAdapter.adapt(item))));

    }
    getSectionInformations(): Observable<[SectionStatus[], VesselSection[]]> {

        return forkJoin([this.getSectionStatus(), this.getSections()]);
    }
    getFoulingStates(): Observable<IFoulingState[]> {
        const requestData = {
            endPoint: `${this.foulingConfig.path}${this.foulingConfig.endpoints.GetFoulingStates}`
        };
        return this.http.getData(requestData).pipe(map((data: any[]) => data.map((item) => this.foulingStateAdapter.adapt(item))));
    }
}
