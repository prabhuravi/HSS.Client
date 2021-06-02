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
        console.log(requestData);
        return this.http.getData(requestData);
    }
}
