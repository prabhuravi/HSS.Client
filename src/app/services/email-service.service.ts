/*
 * KONGSBERG PROPRIETARY. This document and its accompanying elements, contain KONGSBERG information which is proprietary and confidential.
Any disclosure, copying, distribution or use is prohibited if not otherwise explicitly agreed with KONGSBERG in writing.
Any authorized reproduction, in whole or in part, must include this legend. © [year of creation] KONGSBERG – All rights reserved.
 */
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable, forkJoin, observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfigurationService } from '@kognifai/poseidon-ng-configurationservice';
import { Configuration } from '../configuration';

@Injectable({
  providedIn: 'root'
})
export class EmailServiceService {
  operationalPlanConfig: any;
  emailConfig: any;
  operationPlanApiUrl: string;
  constructor(private http: HttpService, public configurationService: ConfigurationService<Configuration>) {
    this.operationalPlanConfig = this.configurationService.config.apiCollection.OperationalPlan;
    this.emailConfig = this.operationalPlanConfig.Email;
  }

  getPortRequest(operationId: number): Observable<string> {
    const requestData = {
      endPoint: `${this.operationalPlanConfig.domainURL}${this.emailConfig.path}${this.emailConfig.endpoints.portRequestPreview}/${operationId}`
    };
    return this.http.getMediaData(requestData, 'text');
  }

  getPortRequestEditable(operationId: number): Observable<string> {
    const requestData = {
      endPoint: `${this.operationalPlanConfig.domainURL}${this.emailConfig.path}${this.emailConfig.endpoints.portRequestEditable}/${operationId}`
    };
    return this.http.getMediaData(requestData, 'text');
  }

  getPlanProposal(operationId: number): Observable<string> {
    const requestData = {
      endPoint: `${this.operationalPlanConfig.domainURL}${this.emailConfig.path}${this.emailConfig.endpoints.planProposalPreview}/${operationId}`
    };
    return this.http.getMediaData(requestData, 'text');
  }

  getPlanProposalEditable(operationId: number): Observable<string> {
    const requestData = {
      endPoint: `${this.operationalPlanConfig.domainURL}${this.emailConfig.path}${this.emailConfig.endpoints.planProposalEditable}/${operationId}`
    };
    return this.http.getMediaData(requestData, 'text');
  }

  approvePortRequest(operationId: number, data: any): Observable<any> {
    const requestData = {
      endPoint: `${this.operationalPlanConfig.domainURL}${this.emailConfig.path}${this.emailConfig.endpoints.approvePortRequest}/${operationId}`,
      data: data
    };
    return this.http.putData(requestData);
  }

  approvePortRequestEditable(operationId: number, data: any): Observable<any> {
    const requestData = {
      endPoint: `${this.operationalPlanConfig.domainURL}${this.emailConfig.path}${this.emailConfig.endpoints.approvePortRequestEditable}/${operationId}`,
      data: data
    };
    return this.http.putData(requestData);
  }

  approvePlanProposal(operationId: number, data: any): Observable<any> {
    const requestData = {
      endPoint: `${this.operationalPlanConfig.domainURL}${this.emailConfig.path}${this.emailConfig.endpoints.approvePlanProposal}/${operationId}`,
      data : data
    };
    return this.http.putData(requestData);
  }

  approvePlanProposalEditable(operationId: number, data: any): Observable<any> {
    const requestData = {
      endPoint: `${this.operationalPlanConfig.domainURL}${this.emailConfig.path}${this.emailConfig.endpoints.approvePlanProposalEditable}/${operationId}`,
      data: data
    };
    return this.http.putData(requestData);
  }

  getPlanProposalMailRecipients(vesselId: number): Observable<any> {
    const requestData = {
      endPoint: `${this.operationalPlanConfig.domainURL}${this.emailConfig.path}${this.emailConfig.endpoints.getPlanProposalMailRecipients}/${vesselId}`
    };
    return this.http.getData(requestData);
  }

  getPortRequestMailRecipients(operationId: number): Observable<any> {
    const requestData = {
      endPoint: `${this.operationalPlanConfig.domainURL}${this.emailConfig.path}${this.emailConfig.endpoints.getPortRequestMailRecipients}/${operationId}`
    };
    return this.http.getData(requestData);
  }

}
