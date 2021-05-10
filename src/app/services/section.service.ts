import { Injectable } from '@angular/core';
import { ConfigurationService } from '@kognifai/poseidon-ng-configurationservice';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Configuration } from '../configuration';
import {
  SectionAdapter,
  SectionStatusAdapter,
  VesselSectionAdapter,
  FoulingStateAdapter,
  SubSectionAdapter
} from '../models/modelAdapter';
import { VesselSection, SectionStatus, Section, SubSection } from '../models/Section';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class SectionService {
  operationalPlanConfig: any;
  sectionconfig: any;
  foulingConfig: any;
  constructor(
    private http: HttpService,
    public configurationService: ConfigurationService<Configuration>,
    private sectionAdapter: SectionAdapter,
    private vesselSectionAdapter: VesselSectionAdapter,
    private subSectionAdapter: SubSectionAdapter,
    private sectionStatusAdapter: SectionStatusAdapter,
    private foulingStateAdapter: FoulingStateAdapter
  ) {
    this.operationalPlanConfig = this.configurationService.config.apiCollection.OperationalPlan;
    this.sectionconfig = this.configurationService.config.apiCollection.OperationalPlan.Section;
    this.foulingConfig = this.configurationService.config.apiCollection.OperationalPlan.FoulingState;
  }

  getSectionInformations(): Observable<[SectionStatus[], Section[]]> {
    return forkJoin([this.getSectionStatus(), this.getSections()]);
  }

  getVesselSections(vesselId: number): Observable<VesselSection[]> {
    const requestData = {
      endPoint:
        `${this.operationalPlanConfig.domainURL}${this.sectionconfig.path}${this.sectionconfig.endpoints.GetVesselSections}/${vesselId}`};
    return this.http
      .getData(requestData)
      .pipe(
        map((data: any[]) =>
          data.map((item) => this.vesselSectionAdapter.adapt(item))
        )
      );
  }
  getSectionStatus(): Observable<SectionStatus[]> {
    const requestData = {
      endPoint: `${this.operationalPlanConfig.domainURL}${this.sectionconfig.path}${this.sectionconfig.endpoints.GetSectionStatus}`
    };
    return this.http
      .getData(requestData)
      .pipe(
        map((data: any[]) =>
          data.map((item) => this.sectionStatusAdapter.adapt(item))
        )
      );
  }
  getFoulingStates(): Observable<IFoulingState[]> {
    const requestData = {
      endPoint: `${this.operationalPlanConfig.domainURL}${this.foulingConfig.path}${this.foulingConfig.endpoints.GetFoulingStates}`
    };
    return this.http
      .getData(requestData)
      .pipe(
        map((data: any[]) =>
          data.map((item) => this.foulingStateAdapter.adapt(item))
        )
      );
  }
  getSections(): Observable<Section[]> {
    const requestData = {
      endPoint: `${this.operationalPlanConfig.domainURL}${this.sectionconfig.path}${this.sectionconfig.endpoints.GetSections}`
    };
    return this.http
      .getData(requestData)
      .pipe(
        map((data: any[]) =>
          data.map((item) => this.sectionAdapter.adapt(item))
        )
      );
  }
  UpdateVesselSection(vesselSection: VesselSection): Observable<boolean> {
    const requestData = {
      endPoint:
        `${this.operationalPlanConfig.domainURL}${this.sectionconfig.path}${this.sectionconfig.endpoints.UpdateVesselSection}/${vesselSection.id}`,
      data: vesselSection
    };
    return this.http.putData(requestData);
  }
  UpdateVesselSubSection(subSection: SubSection): Observable<boolean> {
    const requestData = {
      endPoint:
        `${this.operationalPlanConfig.domainURL}${this.sectionconfig.path}${this.sectionconfig.endpoints.UpdateSubSection}/${subSection.id}`,
      data: subSection
    };
    return this.http.putData(requestData);
  }
  CreateVesselSubSection(subSection: SubSection): Observable<SubSection> {
    const requestData = {
      endPoint:
        `${this.operationalPlanConfig.domainURL}${this.sectionconfig.path}${this.sectionconfig.endpoints.CreateSubSection}`,
      data: subSection
    };
    return this.http.postData(requestData).pipe(
      map((data: any) =>
        this.subSectionAdapter.adapt(data))
      );
  }
  CreateVesselSection(vesselSection: VesselSection): Observable<VesselSection> {
    const requestData = {
      endPoint:
        `${this.operationalPlanConfig.domainURL}${this.sectionconfig.path}${this.sectionconfig.endpoints.CreateVesselSection}`,
      data: vesselSection
    };
    return this.http.postData(requestData).pipe(
      map((data: any) =>
        this.vesselSectionAdapter.adapt(data))
      );
  }
  deleteVesselSection(id: number): Observable<any> {
    const requestData = {
      endPoint:  `${this.operationalPlanConfig.domainURL}${this.sectionconfig.path}${this.sectionconfig.endpoints.DeleteVesselSection}/${id}`
    };
    return this.http.deleteData(requestData);
  }
  deleteSubSection(id: number): Observable<any> {
    const requestData = {
      endPoint:  `${this.operationalPlanConfig.domainURL}${this.sectionconfig.path}${this.sectionconfig.endpoints.DeleteSubSection}/${id}`
    };
    return this.http.deleteData(requestData);
  }

  addVesselSection(data: any): Observable<boolean> {
    const requestData = {
      endPoint:
        `${this.operationalPlanConfig.domainURL}${this.sectionconfig.path}${this.sectionconfig.endpoints.AddVesselSection}`,
      data: data
    };
    return this.http.postData(requestData);
  }
}
