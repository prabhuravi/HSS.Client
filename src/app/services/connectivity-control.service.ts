import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConnectivityControlService {

  constructor() { }

  getConnectivityData(): IConnectivityControl[] {
    return [{
      Id: 1,
      VesselName: 'Talisman',
      IpAddress: '10.113.32.20',
      EnabledTime: '2020-03-04T09:07:35.687',
      TimeLimit: 0.0,
      IsUploadEnabled: true,
      RemainingMinutes: 0.0,
      RemainingTime: null,
      DisableTime: '2020-03-04T09:47:55.66',
      EnabledBy: '',
      NodeNumber: 17536,
      IMONumber: 9191319
    }, {
      Id: 2,
      VesselName: 'BergeApo',
      IpAddress: '10.113.52.148',
      EnabledTime: '2020-03-04T09:37:38.757',
      TimeLimit: 0.0,
      IsUploadEnabled: false,
      RemainingMinutes: 0.0,
      RemainingTime: null,
      DisableTime: '2020-03-04T09:47:56.62',
      EnabledBy: '',
      NodeNumber: 17618,
      IMONumber: 9233337
    }, {
      Id: 4,
      VesselName: 'Maalfrid',
      IpAddress: '10.112.221.20',
      EnabledTime: '2019-06-07T09:19:08.28',
      TimeLimit: 0.0,
      IsUploadEnabled: false,
      RemainingMinutes: 0.0,
      RemainingTime: null,
      DisableTime: '2019-06-07T09:27:03.87',
      EnabledBy: '',
      NodeNumber: 17268,
      IMONumber: 1112222
    }, {
      Id: 3,
      VesselName: 'Carpus',
      IpAddress: '192.168.111.21',
      EnabledTime: '2019-06-07T09:19:16.27',
      TimeLimit: 0.0,
      IsUploadEnabled: false,
      RemainingMinutes: 0.0,
      RemainingTime: null,
      DisableTime: '2019-06-07T09:27:02.713',
      EnabledBy: '',
      NodeNumber: 11111,
      IMONumber: 1111222
    }, {
      Id: 5,
      VesselName: 'Spain',
      IpAddress: '10.113.88.20',
      EnabledTime: '2019-06-07T09:19:23.92',
      TimeLimit: 0.0,
      IsUploadEnabled: false,
      RemainingMinutes: 0.0,
      RemainingTime: null,
      DisableTime: '2019-06-07T09:27:01.367',
      EnabledBy: '',
      NodeNumber: 17760,
      IMONumber: 1111333
    }, {
      Id: 10,
      VesselName: 'FullPictureLab',
      IpAddress: '10.113.117.20',
      EnabledTime: '2019-12-06T12:39:34.09',
      TimeLimit: 0.0,
      IsUploadEnabled: false,
      RemainingMinutes: 0.0,
      RemainingTime: null,
      DisableTime: '2019-12-26T16:18:29.19',
      EnabledBy: '',
      NodeNumber: 17876,
      IMONumber: 1112332
    }, {
      Id: 16,
      VesselName: 'Robot6',
      IpAddress: '10.113.112.148',
      EnabledTime: '2019-10-31T07:31:32.827',
      TimeLimit: 0.0,
      IsUploadEnabled: false,
      RemainingMinutes: 0.0,
      RemainingTime: null,
      DisableTime: '2019-11-04T12:18:52.103',
      EnabledBy: '',
      NodeNumber: 17858,
      IMONumber: 1111454
    }];
  }

  getConnectivityActionLog(VesselId: number): IConnectivityActionLog[] {
    return [{
      Id: 1795,
      VesselId: 2,
      Action: 'Enabled',
      ActionTime: '2020-04-02T04:36:34.883',
      User: 'admin'
    }, {
      Id: 1794,
      VesselId: 2,
      Action: 'Always on disabled',
      ActionTime: '2020-04-02T04:36:01.127',
      User: 'admin'
    }, {
      Id: 1793,
      VesselId: 2,
      Action: 'Always on enabled',
      ActionTime: '2020-04-02T04:35:56.853',
      User: 'admin'
    }, {
      Id: 1792,
      VesselId: 2,
      Action: 'Always on disabled',
      ActionTime: '2020-04-01T11:31:24.673',
      User: 'admin'
    }, {
      Id: 1790,
      VesselId: 2,
      Action: 'Always on enabled',
      ActionTime: '2020-04-01T11:28:10.323',
      User: 'admin'
    }, {
      Id: 1789,
      VesselId: 2,
      Action: 'Always on enabled',
      ActionTime: '2020-04-01T11:28:02.363',
      User: 'admin'
    }];
  }
}
