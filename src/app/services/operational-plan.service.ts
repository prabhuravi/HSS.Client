import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable, forkJoin, observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfigurationService } from '@kognifai/poseidon-ng-configurationservice';
import { Configuration } from '../configuration';
import { Installation } from '../models/Installation';
import { VesselSection } from '../models/Section';
import { VesselSectionAdapter } from '../models/modelAdapter';

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
  tradeRouteApiUrl: string;
  documentApiUrl: string;
  foulingStateApiUrl: string;
  sectionApiUrl: string;

  constructor(private http: HttpService, public configurationService: ConfigurationService<Configuration>, private vesselSectionAdapter: VesselSectionAdapter,) {
    this.operationalPlanConfig = this.configurationService.config.apiCollection.OperationalPlan;
    this.operationPlanApiUrl = `${this.operationalPlanConfig.domainURL}${this.operationalPlanConfig.OperationPlan.path}`;
    this.vesselApiUrl = `${this.operationalPlanConfig.domainURL}${this.operationalPlanConfig.Vessel.path}`;
    this.robotApiUrl = `${this.operationalPlanConfig.domainURL}${this.operationalPlanConfig.Robot.path}`;
    this.operationTypeApiUrl = `${this.operationalPlanConfig.domainURL}${this.operationalPlanConfig.OperationType.path}`;
    this.operatorApiUrl = `${this.operationalPlanConfig.domainURL}${this.operationalPlanConfig.Operator.path}`;
    this.portApiUrl = `${this.operationalPlanConfig.domainURL}${this.operationalPlanConfig.PortLocation.path}`;
    this.tradeRouteApiUrl = `${this.operationalPlanConfig.domainURL}${this.operationalPlanConfig.TradeRoute.path}`;
    this.documentApiUrl = `${this.operationalPlanConfig.domainURL}${this.operationalPlanConfig.Document.path}`;
    this.foulingStateApiUrl = `${this.operationalPlanConfig.domainURL}${this.operationalPlanConfig.FoulingState.path}`;
    this.sectionApiUrl = `${this.operationalPlanConfig.domainURL}${this.operationalPlanConfig.Section.path}`;
  }

  getLoggedInUser() {
    return this.http.getLoggedInUser();
  }

  // // Operation Plan
  // getOperationPlans(): Observable<IOperationalPlan[]> {
  //   const requestData = {
  //     endPoint: `${this.operationPlanApiUrl}${this.operationalPlanConfig.OperationPlan.endpoints.GetOperationPlans}`,
  //   };
  //   return this.http.getData(requestData);
  // }

  // getSubOperations(planId: number): Observable<ISubOperations[]> {
  //   const requestData = {
  //     endPoint: `${this.operationPlanApiUrl}${this.operationalPlanConfig.OperationPlan.endpoints.GetSubOperations}/${planId}`,
  //   };
  //   return this.http.getData(requestData);
  // }

  // searchOperationPlans(searchData: any): Observable<IOperationalPlan[]> {
  //   const requestData = {
  //     endPoint: `${this.operationPlanApiUrl}${this.operationalPlanConfig.OperationPlan.endpoints.SearchOperationPlan}`,
  //     params: searchData
  //   };
  //   return this.http.getDataV2(requestData);
  // }

  // getOperationPlanById(planId: number): Observable<any> {
  //   const requestData = {
  //     endPoint: `${this.operationPlanApiUrl}${this.operationalPlanConfig.OperationPlan.endpoints.GetOperationPlanById}/${planId}`
  //   };
  //   return this.http.getData(requestData);
  // }

  getOperationStatuses(): Observable<IOperationStatus[]> {
    const requestData = {
      endPoint: `${this.operationPlanApiUrl}${this.operationalPlanConfig.OperationPlan.endpoints.GetOperationStatuses}`,
    };
    return this.http.getData(requestData);
  }

  getRequestedBy(): Observable<IRequestedBy[]> {
    const requestData = {
      endPoint: `${this.operationPlanApiUrl}${this.operationalPlanConfig.OperationPlan.endpoints.GetRequestedBy}`,
    };
    return this.http.getData(requestData);
  }

  getOperationMasterData(): Observable<[IOperationTypes[], IOperationStatus[], IRequestedBy[]]> {
    return forkJoin([this.getOperationTypes(), this.getOperationStatuses(), this.getRequestedBy()]);
  }
  
  createOperation(data: any): Observable<any> {
    const requestData = {
      endPoint: `${this.operationPlanApiUrl}${this.operationalPlanConfig.OperationPlan.endpoints.CreateOperation}`,
      data: data
    };
    return this.http.postData(requestData);
  }

  updateOperation(operationId: number, data: any): Observable<any> {
    const requestData = {
      endPoint: `${this.operationPlanApiUrl}${this.operationalPlanConfig.OperationPlan.endpoints.UpdateOperation}/${operationId}`,
      data: data
    };
    return this.http.putData(requestData);
  }

  createSecondaryOperation(data: any): Observable<any> {
    const requestData = {
      endPoint: `${this.operationPlanApiUrl}${this.operationalPlanConfig.OperationPlan.endpoints.CreateSecondaryOperation}`,
      data: data
    };
    return this.http.postData(requestData);
  }

  getOperations(vesselId: number): Observable<any> {
    const requestData = {
      endPoint: `${this.operationPlanApiUrl}${this.operationalPlanConfig.OperationPlan.endpoints.GetOperations}/${vesselId}`
    };
    return this.http.getData(requestData);
  }

  getSecondaryOperations(operationId: number): Observable<any> {
    const requestData = {
      endPoint: `${this.operationPlanApiUrl}${this.operationalPlanConfig.OperationPlan.endpoints.GetSecondaryOperations}/${operationId}`
    };
    return this.http.getData(requestData);
  }

  getGetOperatorLogs(operationId: number): Observable<any> {
    const requestData = {
      endPoint: `${this.operationPlanApiUrl}${this.operationalPlanConfig.OperationPlan.endpoints.GetOperatorLogs}/${operationId}`
    };
    return this.http.getData(requestData);
  }

  addOperatorLog(data: any): Observable<any> {
    const requestData = {
      endPoint: `${this.operationPlanApiUrl}${this.operationalPlanConfig.TradeRoute.endpoints.AddOperatorLog}`,
      data: data
    };
    return this.http.postData(requestData);
  }

  deleteOperation(id: number): Observable<any> {
    const requestData = {
      endPoint: `${this.operationPlanApiUrl}${this.operationalPlanConfig.OperationPlan.endpoints.DeleteOperation}/${id}`,
    };
    return this.http.deleteData(requestData);
  }
  deleteSecondaryOperation(id: number): Observable<any> {
    const requestData = {
      endPoint: `${this.operationPlanApiUrl}${this.operationalPlanConfig.OperationPlan.endpoints.DeleteSecondaryOperation}/${id}`,
    };
    console.log(requestData);
    return this.http.deleteData(requestData);
  }
  getOperationSections(operationId: number): Observable<any> {
    const requestData = {
      endPoint: `${this.operationPlanApiUrl}${this.operationalPlanConfig.OperationPlan.endpoints.GetOperationSections}/${operationId}`
    };
    return this.http.getData(requestData);
  }
  getSecondaryOperationSections(secondaryOperationId: number): Observable<any> {
    const requestData = {
      endPoint: `${this.operationPlanApiUrl}${this.operationalPlanConfig.OperationPlan.endpoints.GetSecondaryOperationSections}/${secondaryOperationId}`
    };
    return this.http.getData(requestData);
  }
  
  getTradeRouteByVesselId(vesselId: number): Observable<any> {
    const requestData = {
      endPoint: `${this.tradeRouteApiUrl}${this.operationalPlanConfig.TradeRoute.endpoints.GetTradeRouteByVesselId}/${vesselId}`
    };
    // return of([
    //   { Id: '12', VesselId: 1, PortId: 17651, Order: 1, PortName: 'Panama City(US PFN)', PortCode: 'US PFN' },
    //   { Id: '123', VesselId: 1, PortId: 17896, Order: 2, PortName: 'Savannah(US SAV)', PortCode: 'US SAV' }
    // ])
    return this.http.getData(requestData);
  }

  addPortToRoute(data: any): Observable<any> {
    const requestData = {
      endPoint: `${this.tradeRouteApiUrl}${this.operationalPlanConfig.TradeRoute.endpoints.AddPortToRoute}`,
      data: data
    };
    // return of(true);
    return this.http.postData(requestData);
  }

  reorderTradeRoute(data: any): Observable<any>
  {
    const requestData = {
      endPoint: `${this.tradeRouteApiUrl}${this.operationalPlanConfig.TradeRoute.endpoints.ReorderTradeRoute}`,
      data: data
    };
    return this.http.putData(requestData);
  }

  getDocumentTypes(): Observable<any> {
    const requestData = {
      endPoint: `${this.documentApiUrl}${this.operationalPlanConfig.Document.endpoints.GetDocumentTypes}`
    };
    // return of("test");
    return this.http.getData(requestData);
  }

  getInstallationDocuments(vesselId: number): Observable<any> {
    const requestData = {
      endPoint: `${this.documentApiUrl}${this.operationalPlanConfig.Document.endpoints.GetInstallationDocuments}/${vesselId}`
    };
    // return of("test");
    return this.http.getData(requestData);
  }

  AddDocumentAsync(data: any): Observable<any> {
    const requestData = {
      endPoint: `${this.documentApiUrl}${this.operationalPlanConfig.Document.endpoints.AddDocument}`,
      data: data
    };
    // return of(true);
    return this.http.postDocument(requestData);
  }

  getInstallationsByDocumentTypeId(documentTypeId: number): Observable<any> {
    const requestData = {
      endPoint: `${this.documentApiUrl}${this.operationalPlanConfig.Document.endpoints.GetInstallationsByDocumentTypeId}/${documentTypeId}`
    };
    return this.http.getData(requestData);
  }

  deleteInstallationDocument(id: number): Observable<any> {
    const requestData = {
      endPoint: `${this.documentApiUrl}${this.operationalPlanConfig.Document.endpoints.DeleteInstallationDocument}/${id}`,
    };
    // return of(true);
    return this.http.deleteData(requestData);
  }

  deletePortFromRoute(id: number): Observable<any> {
    const requestData = {
      endPoint: `${this.tradeRouteApiUrl}${this.operationalPlanConfig.TradeRoute.endpoints.DeletePortFromRoute}/${id}`,
    };
    // return of(true);
    return this.http.deleteData(requestData);
  }

  getSectionFoulingState(vesselId: number): Observable<VesselSection[]> {
    const requestData = {
      endPoint: `${this.foulingStateApiUrl}${this.operationalPlanConfig.FoulingState.endpoints.GetSectionFoulingState}/${vesselId}`
    };
    return this.http
      .getData(requestData)
      .pipe(map((data: any[]) => data.map((item) => this.vesselSectionAdapter.adapt(item))
      )
      );
  }

  getFoulingStates(): Observable<any> {
    const requestData = {
      endPoint: `${this.foulingStateApiUrl}${this.operationalPlanConfig.FoulingState.endpoints.GetFoulingStates}`
    };
    console.log(requestData);
    // return of([{ Id: 1, State: 'Good', Code: '', Category: '', CreatedBy: '' }, { Id: 2, State: 'Poor', Code: '', Category: '', CreatedBy: '' },
    // { Id: 3, State: 'Fair', Code: '', Category: '', CreatedBy: '' }]);
    return this.http.getData(requestData);
  }

  reCalculateFoulingState(data: any): Observable<VesselSection[]> {
    const requestData = {
      endPoint: `${this.foulingStateApiUrl}${this.operationalPlanConfig.FoulingState.endpoints.ReCalculateFoulingState}`,
      data: data
    };
    return this.http
      .postData(requestData)
      .pipe(map((data: any[]) => data.map((item) => this.vesselSectionAdapter.adapt(item))
      )
      );
  }

  updateSubSectionFoulingState(subSectionId: number, data: any): Observable<any> {
    const requestData = {
      endPoint: `${this.foulingStateApiUrl}${this.operationalPlanConfig.FoulingState.endpoints.UpdateSubSectionFoulingState}/${subSectionId}`,
      data: data
    };
    // return of(true);
    return this.http.putData(requestData);
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
  getVesselList(): Observable<Installation[]> {
    const requestData = {
      endPoint: `${this.vesselApiUrl}${this.operationalPlanConfig.Vessel.endpoints.GetVesselDetails}`
    };
    return this.http.getDataGeneric(requestData);
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

  getOperationalData(): Observable<[Installation[], IRobotSystemDetails[], IOperationTypes[], IOperators[]]> {

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
