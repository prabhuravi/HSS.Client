import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable, forkJoin } from 'rxjs';
import { ConfigurationService } from '@kognifai/poseidon-ng-configurationservice';
import { Configuration } from '../configuration';

@Injectable({
  providedIn: 'root'
})
export class OperationalPlanService {

  operationalPlanConfig: any;

  constructor(
    private http: HttpService,
    public configurationService: ConfigurationService<Configuration>
  ) {
    this.operationalPlanConfig = this.configurationService.config.apiCollection.OperationalPlan;
  }

  getOperationPlans(formData: any): Observable<IOperationalPlan[]> {
    const requestData = {
      endPoint: `${this.operationalPlanConfig.path}${this.operationalPlanConfig.endpoints.GetOperationPlans}`,
      data: formData
    };
    return this.http.postData(requestData);
  }
  updateOperationPlan(planData: any): Observable<IOperationalPlan[]> {
    planData.LastUpdatedDate = new Date();
    const requestData = {
      endPoint: `${this.operationalPlanConfig.path}${this.operationalPlanConfig.endpoints.UpdateOperationPlan}`,
      data: planData
    };
    return this.http.postData(requestData);
  }
  searchOperationPlans(formData: any): Observable<IOperationalPlan[]> {
    const requestData = {
      endPoint: `${this.operationalPlanConfig.path}${this.operationalPlanConfig.endpoints.SearchOperationPlan}`,
      data: formData
    };
    return this.http.postData(requestData);
  }
  getSubOperations(planData): Observable<ISubOperations[]> {
    const requestData = {
      endPoint: `${this.operationalPlanConfig.path}${this.operationalPlanConfig.endpoints.GetSubOperations}`,
      data: planData
    };
    return this.http.postData(requestData);
  }
  updateSubOperationPlan(planData: any): Observable<IOperationalPlan[]> {
    const requestData = {
      endPoint: `${this.operationalPlanConfig.path}${this.operationalPlanConfig.endpoints.UpdateSubOperation}`,
      data: planData
    };
    return this.http.postData(requestData);
  }

  getRobotSystemDetails(): Observable<IRobotSystemDetails[]> {
    const requestData = {
      endPoint: `${this.operationalPlanConfig.path}${this.operationalPlanConfig.endpoints.GetRobotSystemDetails}`
    };
    return this.http.getData(requestData);
  }
  addRobotSystemDetail(robotSystemData): Observable<any> {
    const requestData = {
      endPoint: `${this.operationalPlanConfig.path}${this.operationalPlanConfig.endpoints.AddRobotSystemDetail}`,
      data: robotSystemData
    };
    return this.http.postData(requestData);
  }
  deleteRobotSystemDetail(robotSystemData): Observable<any> {
    const requestData = {
      endPoint: `${this.operationalPlanConfig.path}${this.operationalPlanConfig.endpoints.DeleteRobotSystem}`,
      data: robotSystemData
    };
    return this.http.postData(requestData);
  }

  getOperationTypes(): Observable<IOperationTypes[]> {
    const requestData = {
      endPoint: `${this.operationalPlanConfig.path}${this.operationalPlanConfig.endpoints.GetOperationTypes}`
    };
    return this.http.getData(requestData);
  }
  addOperationType(operationTypeData): Observable<any> {
    const requestData = {
      endPoint: `${this.operationalPlanConfig.path}${this.operationalPlanConfig.endpoints.AddOperationType}`,
      data: operationTypeData
    };
    return this.http.postData(requestData);
  }
  deleteOperationType(operationTypeData): Observable<any> {
    const requestData = {
      endPoint: `${this.operationalPlanConfig.path}${this.operationalPlanConfig.endpoints.DeleteOperationType}`,
      data: operationTypeData
    };
    return this.http.postData(requestData);
  }

  getOperators(): Observable<IOperators[]> {
    const requestData = {
      endPoint: `${this.operationalPlanConfig.path}${this.operationalPlanConfig.endpoints.GetOperators}`
    };
    return this.http.getData(requestData);
  }
  addOperator(operatorData): Observable<any> {
    const requestData = {
      endPoint: `${this.operationalPlanConfig.path}${this.operationalPlanConfig.endpoints.AddOperator}`,
      data: operatorData
    };
    return this.http.postData(requestData);
  }
  deleteOperator(operatorData): Observable<any> {
    const requestData = {
      endPoint: `${this.operationalPlanConfig.path}${this.operationalPlanConfig.endpoints.DeleteOperator}`,
      data: operatorData
    };
    return this.http.postData(requestData);
  }

  getTimeZone(): ITimeZone[] {
    return this.operationalPlanConfig.endpoints.GetTimeZone;
  }

  getPlanStatus(): IPlanStatus[] {
    return this.operationalPlanConfig.endpoints.GetPlanStatus;
  }

  getVesselList(): Observable<IVesselList[]> {
    const requestData = {
      endPoint: `${this.operationalPlanConfig.path}${this.operationalPlanConfig.endpoints.GetVesselDetails}`
    };
    return this.http.getData(requestData);
  }
  addVessel(vesselData): Observable<any> {
    const requestData = {
      endPoint: `${this.operationalPlanConfig.path}${this.operationalPlanConfig.endpoints.AddVesselDetail}`,
      data: vesselData
    };
    return this.http.postData(requestData);
  }
  deleteVessel(vesselData): Observable<any> {
    const requestData = {
      endPoint: `${this.operationalPlanConfig.path}${this.operationalPlanConfig.endpoints.DeleteVessel}`,
      data: vesselData
    };
    return this.http.postData(requestData);
  }

  getOperationalData(): Observable<any[]> {
    return forkJoin([this.getVesselList(), this.getRobotSystemDetails(), this.getOperationTypes(), this.getOperators()]);
  }

  filterPortLocations(portData: any): Observable<any[]> {
    const requestData = {
      endPoint: `${this.operationalPlanConfig.path}${this.operationalPlanConfig.endpoints.FilterPortLocations}`,
      data: portData
    };
    return this.http.postData(requestData);
  }
  getOperationPlanById(planId: number): Observable<any> {
    const requestData = {
      endPoint: `${this.operationalPlanConfig.path}${this.operationalPlanConfig.endpoints.GetOperationPlanById}${planId}`
    };
    return this.http.getData(requestData);
  }
}
