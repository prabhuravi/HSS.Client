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
    return this.http.getData(requestData);
}

getPlanProposal(operationId: number): Observable<any> {
  const requestData = {
      endPoint: `${this.operationalPlanConfig.domainURL}${this.emailConfig.path}${this.emailConfig.endpoints.planProposalPreview}/${operationId}`
  };
  return this.http.getMediaData(requestData, 'text');
}

}
