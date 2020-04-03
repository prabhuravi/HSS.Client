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
}
