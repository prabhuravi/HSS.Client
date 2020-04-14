import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { AuthenticationService } from '@kognifai/poseidon-authenticationservice';
import { ConfigurationService } from '@kognifai/poseidon-ng-configurationservice';
import { Configuration } from '../configuration';
import { User } from 'oidc-client';

@Injectable({
  providedIn: 'root'
})
export class OperationalPlanService {

  username: string = '';

  constructor(
    public httpClient: HttpClient,
    private http: HttpService,
    private authenticationService: AuthenticationService,
    public configurationService: ConfigurationService<Configuration>
  ) {
    if (this.authenticationService && this.authenticationService.userManager) {
      this.authenticationService.userManager.getUser().then((user: User) => {
        this.getUserInfo(user);
      });
    }
  }
  getUserInfo(user) {
    this.getLoggedInUserInfo(user).subscribe((userInfo: any) => {
      this.username = userInfo.username;
    });
  }

  getLoggedInUserInfo(user: User): Observable<any> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + user.access_token
    });
    const url = this.configurationService.config.userInfoApiUrl + user.profile.sub;
    return this.httpClient.get(url, { headers: reqHeader });
  }

  getOperationPlans(formData: any): Observable<IOperationalPlan[]> {
    const requestData = {
      endPoint: '/OperationPlanAPI/api/OperationalPlan/GetOperationPlans',
      data: formData
    };
    return this.http.postData(requestData);
  }

  updateOperationPlan(planData: any): Observable<IOperationalPlan[]> {
    planData.CreatedBy = this.username;
    planData.LastUpdatedBy = this.username;
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
    planData.CreatedBy = this.username;
    planData.LastUpdatedBy = this.username;
    planData.LastUpdatedDate = new Date();
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
    robotSystemData.CreatedBy = this.username;
    robotSystemData.LastUpdatedBy = this.username;
    const requestData = {
      endPoint: '/OperationPlanAPI/api/OperationalPlan/AddRobotSystemDetail',
      data: robotSystemData
    };
    return this.http.postData(requestData);
  }
  deleteRobotSystemDetail(robotSystemData): Observable<any> {
    robotSystemData.CreatedBy = this.username;
    robotSystemData.LastUpdatedBy = this.username;
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
    operationTypeData.CreatedBy = this.username;
    operationTypeData.LastUpdatedBy = this.username;
    const requestData = {
      endPoint: '/OperationPlanAPI/api/OperationalPlan/AddOperationType',
      data: operationTypeData
    };
    return this.http.postData(requestData);
  }
  deleteOperationType(operationTypeData): Observable<any> {
    operationTypeData.CreatedBy = this.username;
    operationTypeData.LastUpdatedBy = this.username;
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
    operatorData.CreatedBy = this.username;
    operatorData.LastUpdatedBy = this.username;
    const requestData = {
      endPoint: '/OperationPlanAPI/api/OperationalPlan/AddOperator',
      data: operatorData
    };
    return this.http.postData(requestData);
  }
  deleteOperator(operatorData): Observable<any> {
    operatorData.CreatedBy = this.username;
    operatorData.LastUpdatedBy = this.username;
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

  getOperatorCountryList(): IOperatorCountryList[] {
    return [{
      CountryId: 1,
      CountryName: 'Abkhazia',
      Zone: 'Unspecified'
    }, {
      CountryId: 2,
      CountryName: 'Afghanistan',
      Zone: 'Unspecified'
    }, {
      CountryId: 3,
      CountryName: 'Albania',
      Zone: 'Unspecified'
    }, {
      CountryId: 4,
      CountryName: 'Algeria',
      Zone: 'Unspecified'
    }];
  }

  getVesselList(): Observable<IVesselList[]> {
    const requestData = {
      endPoint: '/OperationPlanAPI/api/OperationalPlan/GetVesselDetails'
    };
    return this.http.getData(requestData);
  }
  addVessel(vesselData): Observable<any> {
    vesselData.CreatedBy = this.username;
    vesselData.LastUpdatedBy = this.username;
    const requestData = {
      endPoint: '/OperationPlanAPI/api/OperationalPlan/AddVesselDetail',
      data: vesselData
    };
    return this.http.postData(requestData);
  }
  deleteVessel(vesselData): Observable<any> {
    vesselData.CreatedBy = this.username;
    vesselData.LastUpdatedBy = this.username;
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
