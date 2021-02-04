import { Injectable } from '@angular/core';
import { ConfigurationService } from '@kognifai/poseidon-ng-configurationservice';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Configuration } from '../configuration';
import { SectionAdapter, SectionStatusAdapter, VesselSectionAdapter } from '../models/modelAdapter';
import { VesselSection, SectionStatus } from '../models/Section';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  operationalPlanConfig: any;
  sectionconfig: any;
  constructor(private http: HttpService, public configurationService: ConfigurationService<Configuration>,
              private sectionAdapter: SectionAdapter,
              private vesselSectionAdapter: VesselSectionAdapter,
              private sectionStatusAdapter: SectionStatusAdapter
              ) {
    this.operationalPlanConfig = this.configurationService.config.apiCollection.OperationalPlan;
    this.sectionconfig = this.configurationService.config.apiCollection.OperationalPlan.Section;
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
   getSectionInformations(): Observable <[SectionStatus[], VesselSection[]]> {

    return forkJoin([this.getSectionStatus(), this.getSections()]);
 }
}
