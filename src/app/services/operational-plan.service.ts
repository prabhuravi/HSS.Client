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

  getRobotSystemDetails(): IRobotSystemDetails[] {
    return [{
      RobotSystemId: 1,
      RobotSerialNumber: 'TalismanRobot (P1a)',
      IPAddress: '10.113.32.20',
      NodeNumber: 17536,
      ConnectivityControl: false,
      ConnectivityMonitoring: false,
      CreatedBy: null,
      CreatedDate: '0001-01-01T00:00:00',
      LastUpdatedBy: null,
      LastUpdatedDate: '0001-01-01T00:00:00'
    }, {
      RobotSystemId: 2,
      RobotSerialNumber: 'BergeApoRobot (P1a)',
      IPAddress: '10.113.52.148',
      NodeNumber: 17618,
      ConnectivityControl: false,
      ConnectivityMonitoring: false,
      CreatedBy: null,
      CreatedDate: '0001-01-01T00:00:00',
      LastUpdatedBy: null,
      LastUpdatedDate: '0001-01-01T00:00:00'
    }, {
      RobotSystemId: 3,
      RobotSerialNumber: 'Robot6 (P1b)',
      IPAddress: '10.113.112.148',
      NodeNumber: 17858,
      ConnectivityControl: false,
      ConnectivityMonitoring: false,
      CreatedBy: null,
      CreatedDate: '0001-01-01T00:00:00',
      LastUpdatedBy: null,
      LastUpdatedDate: '0001-01-01T00:00:00'
    }];
  }

  getOperationTypes(): IOperationTypes[] {
    return [{
      Id: 1,
      OperationTypeName: 'Maintenance',
      CreatedDate: '2019-03-25T06:17:38.627',
      CreatedBy: 'admin',
      LastUpdatedBy: 'Sandeep Kumar',
      LastUpdatedDate: '2019-04-02T10:22:34.483'
    }, {
      Id: 2,
      OperationTypeName: 'Cleaning',
      CreatedDate: '2019-03-25T06:17:46.473',
      CreatedBy: 'admin',
      LastUpdatedBy: 'admin',
      LastUpdatedDate: '2019-03-25T06:17:46.473'
    }, {
      Id: 3,
      OperationTypeName: 'Inspection',
      CreatedDate: '2019-03-25T06:17:53.507',
      CreatedBy: 'admin',
      LastUpdatedBy: 'admin',
      LastUpdatedDate: '2019-03-25T06:17:53.507'
    }, {
      Id: 4,
      OperationTypeName: 'Training',
      CreatedDate: '2019-05-22T05:44:24.547',
      CreatedBy: 'Fredrik Thoresen',
      LastUpdatedBy: 'Fredrik Thoresen',
      LastUpdatedDate: '2019-05-22T05:44:24.547'
    }, {
      Id: 6,
      OperationTypeName: 'Testing',
      CreatedDate: '2019-07-02T06:32:36.597',
      CreatedBy: 'Fredrik Thoresen',
      LastUpdatedBy: 'Fredrik Thoresen',
      LastUpdatedDate: '2019-07-02T06:32:36.597'
    }, {
      Id: 7,
      OperationTypeName: 'Full operation',
      CreatedDate: '2019-09-20T08:44:23.077',
      CreatedBy: 'Fredrik Thoresen',
      LastUpdatedBy: 'Fredrik Thoresen',
      LastUpdatedDate: '2019-09-20T08:44:23.077'
    }];
  }

  getOperators(): IOperators[] {
    return [{
      Id: 1,
      OperatorName: 'Fredrik Thoresen',
      CreatedDate: '2019-03-25T06:16:54.88',
      CreatedBy: 'admin',
      LastUpdatedBy: 'admin',
      LastUpdatedDate: '2019-04-16T05:59:14.36'
    }, {
      Id: 4,
      OperatorName: 'Federico Sogorb',
      CreatedDate: '2019-05-02T06:31:50.1',
      CreatedBy: 'Fredrik Thoresen',
      LastUpdatedBy: 'Fredrik Thoresen',
      LastUpdatedDate: '2019-05-02T06:31:50.1'
    }, {
      Id: 5,
      OperatorName: 'Manuel Juan Santonja',
      CreatedDate: '2019-05-22T05:45:21.96',
      CreatedBy: 'Fredrik Thoresen',
      LastUpdatedBy: 'Fredrik Thoresen',
      LastUpdatedDate: '2019-05-22T05:45:21.96'
    }, {
      Id: 7,
      OperatorName: 'Per Magnus Auby',
      CreatedDate: '2019-09-04T05:53:03.1',
      CreatedBy: 'Fredrik Thoresen',
      LastUpdatedBy: 'Fredrik Thoresen',
      LastUpdatedDate: '2019-09-04T05:53:03.1'
    }];
  }

  getTimeZone(): ITimeZone[] {
    return [
      {
        offset: 'GMT-12:00',
        name: 'Etc/GMT-12'
      },
      {
        offset: 'GMT-11:00',
        name: 'Etc/GMT-11'
      },
      {
        offset: 'GMT-11:00',
        name: 'Pacific/Midway'
      },
      {
        offset: 'GMT-10:00',
        name: 'America/Adak'
      },
      {
        offset: 'GMT-09:00',
        name: 'America/Anchorage'
      },
      {
        offset: 'GMT-09:00',
        name: 'Pacific/Gambier'
      },
      {
        offset: 'GMT-08:00',
        name: 'America/Dawson_Creek'
      },
      {
        offset: 'GMT-08:00',
        name: 'America/Ensenada'
      },
      {
        offset: 'GMT-08:00',
        name: 'America/Los_Angeles'
      },
      {
        offset: 'GMT-07:00',
        name: 'America/Chihuahua'
      },
      {
        offset: 'GMT-07:00',
        name: 'America/Denver'
      },
      {
        offset: 'GMT-06:00',
        name: 'America/Belize'
      },
      {
        offset: 'GMT-06:00',
        name: 'America/Cancun'
      },
      {
        offset: 'GMT-06:00',
        name: 'America/Chicago'
      },
      {
        offset: 'GMT-06:00',
        name: 'Chile/EasterIsland'
      },
      {
        offset: 'GMT-05:00',
        name: 'America/Bogota'
      },
      {
        offset: 'GMT-05:00',
        name: 'America/Havana'
      },
      {
        offset: 'GMT-05:00',
        name: 'America/New_York'
      },
      {
        offset: 'GMT-04:30',
        name: 'America/Caracas'
      },
      {
        offset: 'GMT-04:00',
        name: 'America/Campo_Grande'
      },
      {
        offset: 'GMT-04:00',
        name: 'America/Glace_Bay'
      },
      {
        offset: 'GMT-04:00',
        name: 'America/Goose_Bay'
      },
      {
        offset: 'GMT-04:00',
        name: 'America/Santiago'
      },
      {
        offset: 'GMT-04:00',
        name: 'America/La_Paz'
      },
      {
        offset: 'GMT-03:00',
        name: 'America/Argentina/Buenos_Aires'
      },
      {
        offset: 'GMT-03:00',
        name: 'America/Montevideo'
      },
      {
        offset: 'GMT-03:00',
        name: 'America/Araguaina'
      },
      {
        offset: 'GMT-03:00',
        name: 'America/Godthab'
      },
      {
        offset: 'GMT-03:00',
        name: 'America/Miquelon'
      },
      {
        offset: 'GMT-03:00',
        name: 'America/Sao_Paulo'
      },
      {
        offset: 'GMT-03:30',
        name: 'America/St_Johns'
      },
      {
        offset: 'GMT-02:00',
        name: 'America/Noronha'
      },
      {
        offset: 'GMT-01:00',
        name: 'Atlantic/Cape_Verde'
      },
      {
        offset: 'GMT',
        name: 'Europe/Belfast'
      },
      {
        offset: 'GMT',
        name: 'Africa/Abidjan'
      },
      {
        offset: 'GMT',
        name: 'Europe/Dublin'
      },
      {
        offset: 'GMT',
        name: 'Europe/Lisbon'
      },
      {
        offset: 'GMT',
        name: 'Europe/London'
      },
      {
        offset: 'UTC',
        name: 'UTC'
      },
      {
        offset: 'GMT+01:00',
        name: 'Africa/Algiers'
      },
      {
        offset: 'GMT+01:00',
        name: 'Africa/Windhoek'
      },
      {
        offset: 'GMT+01:00',
        name: 'Atlantic/Azores'
      },
      {
        offset: 'GMT+01:00',
        name: 'Atlantic/Stanley'
      },
      {
        offset: 'GMT+01:00',
        name: 'Europe/Amsterdam'
      },
      {
        offset: 'GMT+01:00',
        name: 'Europe/Belgrade'
      },
      {
        offset: 'GMT+01:00',
        name: 'Europe/Brussels'
      },
      {
        offset: 'GMT+02:00',
        name: 'Africa/Cairo'
      },
      {
        offset: 'GMT+02:00',
        name: 'Africa/Blantyre'
      },
      {
        offset: 'GMT+02:00',
        name: 'Asia/Beirut'
      },
      {
        offset: 'GMT+02:00',
        name: 'Asia/Damascus'
      },
      {
        offset: 'GMT+02:00',
        name: 'Asia/Gaza'
      },
      {
        offset: 'GMT+02:00',
        name: 'Asia/Jerusalem'
      },
      {
        offset: 'GMT+03:00',
        name: 'Africa/Addis_Ababa'
      },
      {
        offset: 'GMT+03:00',
        name: 'Asia/Riyadh89'
      },
      {
        offset: 'GMT+03:00',
        name: 'Europe/Minsk'
      },
      {
        offset: 'GMT+03:30',
        name: 'Asia/Tehran'
      },
      {
        offset: 'GMT+04:00',
        name: 'Asia/Dubai'
      },
      {
        offset: 'GMT+04:00',
        name: 'Asia/Yerevan'
      },
      {
        offset: 'GMT+04:00',
        name: 'Europe/Moscow'
      },
      {
        offset: 'GMT+04:30',
        name: 'Asia/Kabul'
      },
      {
        offset: 'GMT+05:00',
        name: 'Asia/Tashkent'
      },
      {
        offset: 'GMT+05:30',
        name: 'Asia/Kolkata'
      },
      {
        offset: 'GMT+05:45',
        name: 'Asia/Katmandu'
      },
      {
        offset: 'GMT+06:00',
        name: 'Asia/Dhaka'
      },
      {
        offset: 'GMT+06:00',
        name: 'Asia/Yekaterinburg'
      },
      {
        offset: 'GMT+06:30',
        name: 'Asia/Rangoon'
      },
      {
        offset: 'GMT+07:00',
        name: 'Asia/Bangkok'
      },
      {
        offset: 'GMT+07:00',
        name: 'Asia/Novosibirsk'
      },
      {
        offset: 'GMT+08:00',
        name: 'Etc/GMT+8'
      },
      {
        offset: 'GMT+08:00',
        name: 'Asia/Hong_Kong'
      },
      {
        offset: 'GMT+08:00',
        name: 'Asia/Krasnoyarsk'
      },
      {
        offset: 'GMT+08:00',
        name: 'Australia/Perth'
      },
      {
        offset: 'GMT+08:45',
        name: 'Australia/Eucla'
      },
      {
        offset: 'GMT+09:00',
        name: 'Asia/Irkutsk'
      },
      {
        offset: 'GMT+09:00',
        name: 'Asia/Seoul'
      },
      {
        offset: 'GMT+09:00',
        name: 'Asia/Tokyo'
      },
      {
        offset: 'GMT+09:30',
        name: 'Australia/Adelaide'
      },
      {
        offset: 'GMT+09:30',
        name: 'Australia/Darwin'
      },
      {
        offset: 'GMT+09:30',
        name: 'Pacific/Marquesas'
      },
      {
        offset: 'GMT+10:00',
        name: 'Etc/GMT+10'
      },
      {
        offset: 'GMT+10:00',
        name: 'Australia/Brisbane'
      },
      {
        offset: 'GMT+10:00',
        name: 'Australia/Hobart'
      },
      {
        offset: 'GMT+10:00',
        name: 'Asia/Yakutsk'
      },
      {
        offset: 'GMT+10:30',
        name: 'Australia/Lord_Howe'
      },
      {
        offset: 'GMT+11:00',
        name: 'Asia/Vladivostok'
      },
      {
        offset: 'GMT+11:30',
        name: 'Pacific/Norfolk'
      },
      {
        offset: 'GMT+12:00',
        name: 'Etc/GMT+12'
      },
      {
        offset: 'GMT+12:00',
        name: 'Asia/Anadyr'
      },
      {
        offset: 'GMT+12:00',
        name: 'Asia/Magadan'
      },
      {
        offset: 'GMT+12:00',
        name: 'Pacific/Auckland'
      },
      {
        offset: 'GMT+12:45',
        name: 'Pacific/Chatham'
      },
      {
        offset: 'GMT+13:00',
        name: 'Pacific/Tongatapu'
      },
      {
        offset: 'GMT+14:00',
        name: 'Pacific/Kiritimati'
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
}
