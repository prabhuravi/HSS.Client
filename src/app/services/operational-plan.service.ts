import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable, forkJoin, observable, of } from 'rxjs';
import { ConfigurationService } from '@kognifai/poseidon-ng-configurationservice';
import { Configuration } from '../configuration';

@Injectable({
  providedIn: 'root'
})
export class OperationalPlanService {

  operationalPlanConfig: any;
  operationPlanApiUrl: string;
  vesselApiUrl: string;
  robotApiUrl: string;
  operationTypeApiUrl: string;
  operatorApiUrl: string;
  portApiUrl: string;

  constructor(private http: HttpService, public configurationService: ConfigurationService<Configuration>) {
    this.operationalPlanConfig = this.configurationService.config.apiCollection.OperationalPlan;
    this.operationPlanApiUrl = `${this.operationalPlanConfig.domainURL}${this.operationalPlanConfig.OperationPlan.path}`;
    this.vesselApiUrl = `${this.operationalPlanConfig.domainURL}${this.operationalPlanConfig.Vessel.path}`;
    this.robotApiUrl = `${this.operationalPlanConfig.domainURL}${this.operationalPlanConfig.Robot.path}`;
    this.operationTypeApiUrl = `${this.operationalPlanConfig.domainURL}${this.operationalPlanConfig.OperationType.path}`;
    this.operatorApiUrl = `${this.operationalPlanConfig.domainURL}${this.operationalPlanConfig.Operator.path}`;
    this.portApiUrl = `${this.operationalPlanConfig.domainURL}${this.operationalPlanConfig.PortLocation.path}`;
  }

  // Operation Plan
  getOperationPlans(): Observable<IOperationalPlan[]> {
    const requestData = {
      endPoint: `${this.operationPlanApiUrl}${this.operationalPlanConfig.OperationPlan.endpoints.GetOperationPlans}`,
    };
    return this.http.getData(requestData);
  }

  getSubOperations(planId: number): Observable<ISubOperations[]> {
    const requestData = {
      endPoint: `${this.operationPlanApiUrl}${this.operationalPlanConfig.OperationPlan.endpoints.GetSubOperations}/${planId}`,
    };
    return this.http.getData(requestData);
  }

  searchOperationPlans(searchData: any): Observable<IOperationalPlan[]> {
    const requestData = {
      endPoint: `${this.operationPlanApiUrl}${this.operationalPlanConfig.OperationPlan.endpoints.SearchOperationPlan}`,
      params: searchData
    };
    return this.http.getDataV2(requestData);
  }

  getOperationPlanById(planId: number): Observable<any> {
    const requestData = {
      endPoint: `${this.operationPlanApiUrl}${this.operationalPlanConfig.OperationPlan.endpoints.GetOperationPlanById}/${planId}`
    };
    return this.http.getData(requestData);
  }

  getTradeRouteByVesselId(vesselId: number): Observable<any> {
    const requestData = {
      endPoint: `${this.operationPlanApiUrl}${this.operationalPlanConfig.OperationPlan.endpoints.GetTradeRouteByVesselId}/${vesselId}`
    };
    return of([
      { Id: '12', VesselId: 1, PortId: 17651, PortName: 'Panama City(US PFN)', PortCode: 'US PFN' },
      { Id: '123', VesselId: 1, PortId: 17896, PortName: 'Savannah(US SAV)', PortCode: 'US SAV' }
    ])
    // return this.http.getData(requestData);
  }

  getSectionFoulingStates(vesselId: number): Observable<any> {
    const requestData = {
      endPoint: `${this.operationPlanApiUrl}${this.operationalPlanConfig.OperationPlan.endpoints.GetSectionFoulingStates}/${vesselId}`
    };
    return of([{ Id: 1, VesselId: 1, SectionName: 'Top', Status: null, FoulingId: 1, JotunFoulingId: null, FoulingState: 'Good', Subsections: null },
    { Id: 2, VesselId: 1, SectionName: 'Bottom', Status: null, FoulingId: 2, JotunFoulingId: null, FoulingState: 'Bad', Subsections: null }]);
    // return this.http.getData(requestData);
  }

  getVesselSections(vesselId: number): Observable<any> {
    const requestData = {
      endPoint: `${this.operationPlanApiUrl}${this.operationalPlanConfig.OperationPlan.endpoints.GetVesselSections}/${vesselId}`
    };
    return of([{ Id: 1, VesselId: 1, SectionName: 'Top', Status: null, FoulingId: null, JotunFoulingId: null, FoulingState: null, Subsections: null },
    { Id: 2, VesselId: 1, SectionName: 'Bottom', Status: null, FoulingId: null, JotunFoulingId: null, FoulingState: null, Subsections: null }]);
    // return this.http.getData(requestData);
  }

  getFoulingStates(): Observable<any> {
    const requestData = {
      endPoint: `${this.operationPlanApiUrl}${this.operationalPlanConfig.OperationPlan.endpoints.GetFoulingStates}`
    };
    return of([{ Id: 1, State: 'Good', Code: '', Category: '', CreatedBy: '' }, { Id: 2, State: 'Bad', Code: '', Category: '', CreatedBy: '' },
    { Id: 3, State: 'Fair', Code: '', Category: '', CreatedBy: '' }]);
    // return this.http.getData(requestData);
  }

  addPortToRoute(data: any): Observable<any> {
    const requestData = {
      endPoint: `${this.operationPlanApiUrl}${this.operationalPlanConfig.OperationPlan.endpoints.AddPortToRoute}`,
      data: data
    };
    return of(true);
    // return this.http.postData(requestData);
  }

  updateFoulingStateToSection(data: any): Observable<any> {
    const requestData = {
      endPoint: `${this.operationPlanApiUrl}${this.operationalPlanConfig.OperationPlan.endpoints.AssignFoulingStateToSection}`,
      data: data
    };
    return of(true);
    // return this.http.postData(requestData);
  }

  updateSectionFoulingState(sectionId: number, data: any): Observable<any> {
    const requestData = {
      endPoint: `${this.operationPlanApiUrl}${this.operationalPlanConfig.OperationPlan.endpoints.UpdateSectionFoulingState}/${sectionId}`,
      data: data
    };
    return of(true);
    // return this.http.putData(requestData);
  }

  deletePortFromRoute(id: number): Observable<any> {
    const requestData = {
      endPoint: `${this.operationPlanApiUrl}${this.operationalPlanConfig.OperationPlan.endpoints.DeletePortFromRoute}/${id}`,
    };
    return of(true);
    // return this.http.deleteData(requestData);
  }

  addOperationPlan(planData: any): Observable<any> {
    planData.LastUpdatedDate = new Date();
    const requestData = {
      endPoint: `${this.operationPlanApiUrl}${this.operationalPlanConfig.OperationPlan.endpoints.AddOperationPlan}`,
      data: planData
    };
    return this.http.postData(requestData);
  }

  updateOperationPlan(planId: number, planData: any): Observable<any> {
    const requestData = {
      endPoint: `${this.operationPlanApiUrl}${this.operationalPlanConfig.OperationPlan.endpoints.UpdateOperationPlan}/${planId}`,
      data: planData
    };
    return this.http.putData(requestData);
  }

  completeOperationPlan(planId: number): Observable<any> {
    const requestData = {
      endPoint: `${this.operationPlanApiUrl}${this.operationalPlanConfig.OperationPlan.endpoints.CompleteOperationPlan}/${planId}`,
    };
    return this.http.putData(requestData);
  }

  addSubOperationPlan(subPlanData: any): Observable<any> {
    const requestData = {
      endPoint: `${this.operationPlanApiUrl}${this.operationalPlanConfig.OperationPlan.endpoints.AddSubOperationPlan}`,
      data: subPlanData
    };
    return this.http.postData(requestData);
  }

  updateSubOperationPlan(subPlanId: number, subPlanData: any): Observable<any> {
    const requestData = {
      endPoint: `${this.operationPlanApiUrl}${this.operationalPlanConfig.OperationPlan.endpoints.UpdateSubOperationPlan}/${subPlanId}`,
      data: subPlanData
    };
    return this.http.putData(requestData);
  }

  completeSubOperationPlan(subPlanId: number): Observable<any> {
    const requestData = {
      endPoint: `${this.operationPlanApiUrl}${this.operationalPlanConfig.OperationPlan.endpoints.CompleteSubOperationPlan}/${subPlanId}`,
    };
    return this.http.putData(requestData);
  }

  //Robot System
  getRobotSystemDetails(): Observable<IRobotSystemDetails[]> {
    const requestData = {
      endPoint: `${this.robotApiUrl}${this.operationalPlanConfig.Robot.endpoints.GetRobotSystemDetails}`
    };
    return this.http.getData(requestData);
  }

  addRobotSystemDetail(robotSystemData): Observable<any> {
    const requestData = {
      endPoint: `${this.robotApiUrl}${this.operationalPlanConfig.Robot.endpoints.AddRobotSystemDetail}`,
      data: robotSystemData
    };
    return this.http.postData(requestData);
  }

  updateRobotSystemDetail(id: number, robotSystemData): Observable<any> {
    const requestData = {
      endPoint: `${this.robotApiUrl}${this.operationalPlanConfig.Robot.endpoints.UpdateRobotSystemDetail}/${id}`,
      data: robotSystemData
    };
    return this.http.putData(requestData);
  }

  deleteRobotSystemDetail(id: number): Observable<any> {
    const requestData = {
      endPoint: `${this.robotApiUrl}${this.operationalPlanConfig.Robot.endpoints.DeleteRobotSystem}/${id}`,
    };
    return this.http.deleteData(requestData);
  }

  //OperationType
  getOperationTypes(): Observable<IOperationTypes[]> {
    const requestData = {
      endPoint: `${this.operationTypeApiUrl}${this.operationalPlanConfig.OperationType.endpoints.GetOperationTypes}`
    };
    return this.http.getData(requestData);
  }

  addOperationType(operationTypeData): Observable<any> {
    const requestData = {
      endPoint: `${this.operationTypeApiUrl}${this.operationalPlanConfig.OperationType.endpoints.AddOperationType}`,
      data: operationTypeData
    };
    return this.http.postData(requestData);
  }

  updateOperationType(id: number, operationTypeData): Observable<any> {
    const requestData = {
      endPoint: `${this.operationTypeApiUrl}${this.operationalPlanConfig.OperationType.endpoints.UpdateOperationType}/${id}`,
      data: operationTypeData
    };
    return this.http.putData(requestData);
  }

  deleteOperationType(id: number): Observable<any> {
    const requestData = {
      endPoint: `${this.operationTypeApiUrl}${this.operationalPlanConfig.OperationType.endpoints.DeleteOperationType}/${id}`,
    };
    return this.http.deleteData(requestData);
  }

  // Operator
  getOperators(): Observable<IOperators[]> {
    const requestData = {
      endPoint: `${this.operatorApiUrl}${this.operationalPlanConfig.Operator.endpoints.GetOperators}`
    };
    return this.http.getData(requestData);
  }

  addOperator(operatorData): Observable<any> {
    const requestData = {
      endPoint: `${this.operatorApiUrl}${this.operationalPlanConfig.Operator.endpoints.AddOperator}`,
      data: operatorData
    };
    return this.http.postData(requestData);
  }

  updateOperator(id: number, operatorData: any): Observable<any> {
    const requestData = {
      endPoint: `${this.operatorApiUrl}${this.operationalPlanConfig.Operator.endpoints.UpdateOperator}/${id}`,
      data: operatorData
    };
    return this.http.putData(requestData);
  }

  deleteOperator(id: number): Observable<any> {
    const requestData = {
      endPoint: `${this.operatorApiUrl}${this.operationalPlanConfig.Operator.endpoints.DeleteOperator}/${id}`,
    };
    return this.http.deleteData(requestData);
  }

  getTimeZone(): ITimeZone[] {
    return this.operationalPlanConfig.GetTimeZone;
  }

  getPlanStatus(): IPlanStatus[] {
    return this.operationalPlanConfig.GetPlanStatus;
  }

  // Vessel
  getVesselList(): Observable<IVessel[]> {
    const requestData = {
      endPoint: `${this.vesselApiUrl}${this.operationalPlanConfig.Vessel.endpoints.GetVesselDetails}`
    };
    return this.http.getData(requestData);
  }

  addVessel(vesselData): Observable<any> {
    const requestData = {
      endPoint: `${this.vesselApiUrl}${this.operationalPlanConfig.Vessel.endpoints.AddVesselDetail}`,
      data: vesselData
    };
    return this.http.postData(requestData);
  }

  updateVessel(id: number, vesselData): Observable<any> {
    const requestData = {
      endPoint: `${this.vesselApiUrl}${this.operationalPlanConfig.Vessel.endpoints.UpdateVesselDetail}/${id}`,
      data: vesselData
    };
    return this.http.putData(requestData);
  }

  deleteVessel(id: number): Observable<any> {
    const requestData = {
      endPoint: `${this.vesselApiUrl}${this.operationalPlanConfig.Vessel.endpoints.DeleteVessel}/${id}`,
    };
    return this.http.deleteData(requestData);
  }


  getOperationalData(): Observable<any[]> {
    return forkJoin([this.getVesselList(), this.getRobotSystemDetails(), this.getOperationTypes(), this.getOperators()]);
  }

  filterPortLocations(portName: string): Observable<any[]> {
    const requestData = {
      endPoint: `${this.portApiUrl}${this.operationalPlanConfig.PortLocation.endpoints.FilterPortLocations}/${portName}`,
    };
    return this.http.getData(requestData);
  }

  getPortLocationById(portId: string): Observable<any> {
    const requestData = {
      endPoint: `${this.portApiUrl}${this.operationalPlanConfig.PortLocation.endpoints.GetPortLocationById}/${portId}`,
    };
    return this.http.getData(requestData);
  }


}
