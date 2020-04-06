import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OperationalPlanService {

  constructor() { }

  getOperationPlans(): IOperationalPlan[] {
    return [{
      PlanId: 6,
      VesselName: 'Berge Apo',
      ImoNumber: 9233337,
      VesselId: 2,
      RobotSystemId: 2,
      RobotSerialNumber: 'BergeApoRobot (P1a)',
      OperationDes: 'Test',
      OperationDate: '2019-04-23T08:00:00',
      OperationLoc: 'Kaohsiung(TW KHH)',
      PortCode: 'TW KHH',
      LocalTimeZone: 'GMT+8:00',
      OperationTypeId: 1,
      OperationType: 'Maintenance',
      Status: 'Completed',
      ETADate: '2019-04-26T15:00:00',
      OperatorId: 1,
      OperatorName: 'Fredrik Thoresen',
      PlannerId: 1,
      Planner: 'Fredrik Thoresen',
      Comments: 'Testing connection to robot',
      CreatedBy: 'Fredrik Thoresen',
      CreatedDate: '2019-04-23T13:19:24.22',
      LastUpdatedBy: 'Fredrik Thoresen',
      LastUpdatedDate: '2019-05-21T08:04:48.273',
      Action: null
    }];
  }

  getSubOperations(operationData: IOperationalPlan): ISubOperations[] {
    return [{
      SubPlanId: 34,
      PlanId: 3,
      SubOperationDes: 'Some Description',
      SubOperationStartTime: '2019-05-29T00:00:00',
      SubOperationEndTime: '2019-06-25T00:00:00',
      Status: 'Completed',
      OperatorName: null,
      CreatedBy: 'Nishtha Katara',
      CreatedDate: '2019-06-19T07:12:32.213',
      LastUpdatedBy: 'Nishtha Katara',
      LastUpdatedDate: '2019-06-19T07:15:55.3'
    }, {
      SubPlanId: 35,
      PlanId: 3,
      SubOperationDes: 'dzfg',
      SubOperationStartTime: '2019-05-26T00:00:00',
      SubOperationEndTime: '2019-06-04T00:00:00',
      Status: 'New',
      OperatorName: null,
      CreatedBy: 'Nishtha Katara',
      CreatedDate: '2019-06-19T07:13:21.3',
      LastUpdatedBy: 'Nishtha Katara',
      LastUpdatedDate: '2019-06-19T07:13:21.3'
    }, {
      SubPlanId: 42,
      PlanId: 3,
      SubOperationDes: 'dsgdfg',
      SubOperationStartTime: '2019-06-06T00:03:00',
      SubOperationEndTime: '2019-08-06T16:56:00',
      Status: 'New',
      OperatorName: null,
      CreatedBy: 'Deepa Sharma',
      CreatedDate: '2019-08-19T12:54:30.243',
      LastUpdatedBy: 'Deepa Sharma',
      LastUpdatedDate: '2019-08-19T12:54:30.243'
    }];
  }
}
