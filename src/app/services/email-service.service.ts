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

getPortRequest(operationId: number): Observable<any> {
    const requestData = {
        endPoint: `${this.operationalPlanConfig.domainURL}${this.emailConfig.path}${this.emailConfig.endpoints.portRequestPreview}/${operationId}`
    };
    return this.http.getMediaData(requestData, 'text');
}

getPortRequestEditable(operationId: number): Observable<any> {
    const requestData = {
        endPoint: `${this.operationalPlanConfig.domainURL}${this.emailConfig.path}${this.emailConfig.endpoints.portRequestEditable}/${operationId}`
    };
    return this.http.getMediaData(requestData, 'text');
}

getPlanProposal(operationId: number): Observable<any> {
  const requestData = {
      endPoint: `${this.operationalPlanConfig.domainURL}${this.emailConfig.path}${this.emailConfig.endpoints.planProposalPreview}/${operationId}`
  };
  return this.http.getMediaData(requestData, 'text');
}

getPlanProposalEditable(operationId: number): Observable<any> {
  const requestData = {
      endPoint: `${this.operationalPlanConfig.domainURL}${this.emailConfig.path}${this.emailConfig.endpoints.planProposalEditable}/${operationId}`
  };
  return this.http.getMediaData(requestData, 'text');
}

approvePortRequest(operationId: number): Observable<any> {
  const requestData = {
    endPoint: `${this.operationalPlanConfig.domainURL}${this.emailConfig.path}${this.emailConfig.endpoints.approvePortRequest}/${operationId}`
  };
  return this.http.putData(requestData);
}
approvePlanProposal(operationId: number): Observable<any> {
  const requestData = {
    endPoint: `${this.operationalPlanConfig.domainURL}${this.emailConfig.path}${this.emailConfig.endpoints.approvePlanProposal}/${operationId}`
  };
  return this.http.putData(requestData);
}

}
