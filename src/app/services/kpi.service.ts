/*
 * KONGSBERG PROPRIETARY. This document and its accompanying elements, contain KONGSBERG information which is proprietary and confidential.
Any disclosure, copying, distribution or use is prohibited if not otherwise explicitly agreed with KONGSBERG in writing.
Any authorized reproduction, in whole or in part, must include this legend. © [year of creation] KONGSBERG – All rights reserved.
 */
import { Injectable } from '@angular/core';
import { ConfigurationService } from '@kognifai/poseidon-ng-configurationservice';
import { Observable } from 'rxjs';
import { Configuration } from '../configuration';
import { HttpService } from './http.service';

@Injectable({
    providedIn: 'root'
})
export class KPIService {
    operationalPlanConfig: any;
    kpiConfig: any;
    constructor(private http: HttpService, public configurationService: ConfigurationService<Configuration>) {
        this.operationalPlanConfig = this.configurationService.config.apiCollection.OperationalPlan;
        this.kpiConfig = this.operationalPlanConfig.KPI;
    }

    getHSRegularityKPIQuestion(templateId: number): Observable<any> {
        const requestData = {
            endPoint: `${this.operationalPlanConfig.domainURL}${this.kpiConfig.path}${this.kpiConfig.endpoints.GetHSRegularityKPIQuestion}/${templateId}`
        };
        return this.http.getData(requestData);
    }

    updateHSRegularityKPIAnswer(operationId: number, kpiAnswers: any): Observable<any> {
        const requestData = {
            endPoint: `${this.operationalPlanConfig.domainURL}${this.kpiConfig.path}${this.kpiConfig.endpoints.UpdateHSRegularityKPIAnswer}/${operationId}`,
            data: kpiAnswers
        };
        return this.http.postData(requestData);
    }
}
