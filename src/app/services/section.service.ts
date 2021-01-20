import { Injectable } from '@angular/core';
import { ConfigurationService } from '@kognifai/poseidon-ng-configurationservice';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Configuration } from '../configuration';
import { SectionAdapter, SectionStatusAdapter } from '../models/modelAdapter';
import { Section, SectionStatus } from '../models/Section';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  operationalPlanConfig: any;
  sectionconfig: any;
  constructor(private http: HttpService, public configurationService: ConfigurationService<Configuration>,
              private sectionAdapter: SectionAdapter,
              private sectionStatusAdapter: SectionStatusAdapter
              ) {
    this.operationalPlanConfig = this.configurationService.config.apiCollection.OperationalPlan;
    this.sectionconfig = this.configurationService.config.apiCollection.OperationalPlan.Section;
   }

   getSections(): Observable<Section[]> {
    const requestData = {
      endPoint: `${this.sectionconfig.path}${this.sectionconfig.endpoints.GetSections}`
    };
    return this.http.getData(requestData).pipe(map((data: any[]) =>  data.map((item) =>  this.sectionAdapter.adapt(item))));

   }
   getSectionStatus(): Observable<SectionStatus[]> {
    const requestData = {
      endPoint: `${this.sectionconfig.path}${this.sectionconfig.endpoints.GetSectionStatus}`
    };
    return this.http.getData(requestData).pipe(map((data: any[]) =>  data.map((item) =>  this.sectionStatusAdapter.adapt(item))));

   }
}
