import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OperationalPlanService {

  constructor(
    private http: HttpService
  ) {
  }

  getOperationPlans(formData: any): Observable<IOperationalPlan[]> {
    const requestData = {
      endPoint: '/OperationPlanAPI/api/OperationalPlan/GetOperationPlans',
      data: formData
    };
    return this.http.postData(requestData);
  }
  updateOperationPlan(planData: any): Observable<IOperationalPlan[]> {
    planData.LastUpdatedDate = new Date();
    const requestData = {
      endPoint: '/OperationPlanAPI/api/OperationalPlan/UpdateOperationPlan',
      data: planData
    };
    return this.http.postData(requestData);
  }
  searchOperationPlans(formData: any): Observable<IOperationalPlan[]> {
    const requestData = {
      endPoint: '/OperationPlanAPI/api/OperationalPlan/SearchOperationPlan',
      data: formData
    };
    return this.http.postData(requestData);
  }
  getSubOperations(planData): Observable<ISubOperations[]> {
    const requestData = {
      endPoint: '/OperationPlanAPI/api/OperationalPlan/GetSubOperations',
      data: planData
    };
    return this.http.postData(requestData);
  }
  updateSubOperationPlan(planData: any): Observable<IOperationalPlan[]> {
    const requestData = {
      endPoint: '/OperationPlanAPI/api/OperationalPlan/UpdateSubOperation',
      data: planData
    };
    return this.http.postData(requestData);
  }

  getRobotSystemDetails(): Observable<IRobotSystemDetails[]> {
    const requestData = {
      endPoint: '/OperationPlanAPI/api/OperationalPlan/GetRobotSystemDetails'
    };
    return this.http.getData(requestData);
  }
  addRobotSystemDetail(robotSystemData): Observable<any> {
    const requestData = {
      endPoint: '/OperationPlanAPI/api/OperationalPlan/AddRobotSystemDetail',
      data: robotSystemData
    };
    return this.http.postData(requestData);
  }
  deleteRobotSystemDetail(robotSystemData): Observable<any> {
    const requestData = {
      endPoint: '/OperationPlanAPI/api/OperationalPlan/DeleteRobotSystem',
      data: robotSystemData
    };
    return this.http.postData(requestData);
  }

  getOperationTypes(): Observable<IOperationTypes[]> {
    const requestData = {
      endPoint: '/OperationPlanAPI/api/OperationalPlan/GetOperationTypes'
    };
    return this.http.getData(requestData);
  }
  addOperationType(operationTypeData): Observable<any> {
    const requestData = {
      endPoint: '/OperationPlanAPI/api/OperationalPlan/AddOperationType',
      data: operationTypeData
    };
    return this.http.postData(requestData);
  }
  deleteOperationType(operationTypeData): Observable<any> {
    const requestData = {
      endPoint: '/OperationPlanAPI/api/OperationalPlan/DeleteOperationType',
      data: operationTypeData
    };
    return this.http.postData(requestData);
  }

  getOperators(): Observable<IOperators[]> {
    const requestData = {
      endPoint: '/OperationPlanAPI/api/OperationalPlan/GetOperators'
    };
    return this.http.getData(requestData);
  }
  addOperator(operatorData): Observable<any> {
    const requestData = {
      endPoint: '/OperationPlanAPI/api/OperationalPlan/AddOperator',
      data: operatorData
    };
    return this.http.postData(requestData);
  }
  deleteOperator(operatorData): Observable<any> {
    const requestData = {
      endPoint: '/OperationPlanAPI/api/OperationalPlan/DeleteOperator',
      data: operatorData
    };
    return this.http.postData(requestData);
  }

  getTimeZone(): ITimeZone[] {
    return [
      {
        name: 'GMT',
        offset: 'GMT'
      },
      {
        name: 'GMT+1:00',
        offset: 'GMT+1:00'
      },
      {
        name: 'GMT+2:00',
        offset: 'GMT+2:00'
      },
      {
        name: 'GMT+3:00',
        offset: 'GMT+3:00'
      },
      {
        name: 'GMT+3:30',
        offset: 'GMT+3:30'
      },
      {
        name: 'GMT+4:00',
        offset: 'GMT+4:00'
      },
      {
        name: 'GMT+5:00',
        offset: 'GMT+5:00'
      },
      {
        name: 'GMT+5:30',
        offset: 'GMT+5:30'
      },
      {
        name: 'GMT+6:00',
        offset: 'GMT+6:00'
      },
      {
        name: 'GMT+7:00',
        offset: 'GMT+7:00'
      },
      {
        name: 'GMT+8:00',
        offset: 'GMT+8:00'
      },
      {
        name: 'GMT+9:00',
        offset: 'GMT+9:00'
      },
      {
        name: 'GMT+9:30',
        offset: 'GMT+9:30'
      },
      {
        name: 'GMT+10:00',
        offset: 'GMT+10:00'
      },
      {
        name: 'GMT+11:00',
        offset: 'GMT+11:00'
      },
      {
        name: 'GMT+12:00',
        offset: 'GMT+12:00'
      },
      {
        name: 'GMT-11:00',
        offset: 'GMT-11:00'
      },
      {
        name: 'GMT-10:00',
        offset: 'GMT-10:00'
      },
      {
        name: 'GMT-9:00',
        offset: 'GMT-9:00'
      },
      {
        name: 'GMT-8:00',
        offset: 'GMT-8:00'
      },
      {
        name: 'GMT-7:00',
        offset: 'GMT-7:00'
      },
      {
        name: 'GMT-6:00',
        offset: 'GMT-6:00'
      },
      {
        name: 'GMT-5:00',
        offset: 'GMT-5:00'
      },
      {
        name: 'GMT-4:00',
        offset: 'GMT-4:00'
      },
      {
        name: 'GMT-3:30',
        offset: 'GMT-3:30'
      },
      {
        name: 'GMT-3:00',
        offset: 'GMT-3:00'
      },
      {
        name: 'GMT-1:00',
        offset: 'GMT-1:00'
      }
    ];
  }

  getPlanStatus(): IPlanStatus[] {
    return [
      {
        name: 'New',
        value: 'New'
      },
      {
        name: 'Completed',
        value: 'Completed'
      },
      {
        name: 'Cancelled',
        value: 'Cancelled'
      },
      {
        name: 'Deleted',
        value: 'Deleted'
      }
    ];
  }

  getVesselList(): Observable<IVesselList[]> {
    const requestData = {
      endPoint: '/OperationPlanAPI/api/OperationalPlan/GetVesselDetails'
    };
    return this.http.getData(requestData);
  }
  addVessel(vesselData): Observable<any> {
    const requestData = {
      endPoint: '/OperationPlanAPI/api/OperationalPlan/AddVesselDetail',
      data: vesselData
    };
    return this.http.postData(requestData);
  }
  deleteVessel(vesselData): Observable<any> {
    const requestData = {
      endPoint: '/OperationPlanAPI/api/OperationalPlan/DeleteVessel',
      data: vesselData
    };
    return this.http.postData(requestData);
  }

  getOperationalData(): Observable<any[]> {
    const vesselRequestData = {
      endPoint: '/OperationPlanAPI/api/OperationalPlan/GetVesselDetails'
    };
    const vesselData = this.http.getData(vesselRequestData);
    const operatorRequestData = {
      endPoint: '/OperationPlanAPI/api/OperationalPlan/GetOperators'
    };
    const operatorData = this.http.getData(operatorRequestData);
    const operationTypeRequestData = {
      endPoint: '/OperationPlanAPI/api/OperationalPlan/GetOperationTypes'
    };
    const operationTypeData = this.http.getData(operationTypeRequestData);
    const robotSystemRequestData = {
      endPoint: '/OperationPlanAPI/api/OperationalPlan/GetRobotSystemDetails'
    };
    const robotSystemData = this.http.getData(robotSystemRequestData);
    return forkJoin([vesselData, robotSystemData, operationTypeData, operatorData]);
  }

  filterPortLocations(portData: any): Observable<any[]> {
    const requestData = {
      endPoint: '/OperationPlanAPI/api/OperationalPlan/FilterPortLocations',
      data: portData
    };
    return this.http.postData(requestData);
  }
}
