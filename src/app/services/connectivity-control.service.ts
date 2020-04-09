import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConnectivityControlService {

  vesselUploadStatus: IVesselUploadStatus = {
    FilesOnVessel: 5,
    FilesUploaded: 0,
    FilesNotUploaded: 5,
    FilesInProgress: 0,
    FilesExcluded: 0,
    filesUploadStatus: [{
      Id: 259,
      VesselName: 'FullPictureLab',
      Mission: 'Mission_572_2018-12-09T03-56-08.8_UTC',
      MissionNumber: 572,
      FileName: 'log.zip',
      FilePath: 'E:\\VesselRepository\\FullPictureLab\\RobotMissions\\Mission_572_2018-12-09T03-56-08.8_UTC\\log.zip',
      FileUploadedDate: null,
      FileCreatedDate: '2019-08-29T12:47:58',
      FileModifiedDate: '2019-08-29T12:47:58',
      FileType: '.zip',
      UploadedSize: 0,
      FileSize: 16634,
      UploadStatus: 'Not Uploaded',
      IsMoved: false,
      UploadCount: 0,
      RecordCreatedDate: '2020-04-03T11:59:23.717',
      RecordModifiedDate: '2020-04-07T07:21:27.817'
    }, {
      Id: 260,
      VesselName: 'FullPictureLab',
      Mission: 'Mission_572_2018-12-09T03-56-08.8_UTC',
      MissionNumber: 572,
      FileName: 'Mission.xml',
      FilePath: 'E:\\VesselRepository\\FullPictureLab\\RobotMissions\\Mission_572_2018-12-09T03-56-08.8_UTC\\Mission.xml',
      FileUploadedDate: null,
      FileCreatedDate: '2019-08-29T12:47:58',
      FileModifiedDate: '2018-12-09T03:03:48',
      FileType: '.xml',
      UploadedSize: 0,
      FileSize: 1,
      UploadStatus: 'Not Uploaded',
      IsMoved: false,
      UploadCount: 0,
      RecordCreatedDate: '2020-04-03T11:59:24.053',
      RecordModifiedDate: '2020-04-07T07:21:27.827'
    }, {
      Id: 261,
      VesselName: 'FullPictureLab',
      Mission: 'Mission_572_2018-12-09T03-56-08.8_UTC',
      MissionNumber: 572,
      FileName: 'upload.md5',
      FilePath: 'E:\\VesselRepository\\FullPictureLab\\RobotMissions\\Mission_572_2018-12-09T03-56-08.8_UTC\\upload.md5',
      FileUploadedDate: null,
      FileCreatedDate: '2019-08-29T12:47:58',
      FileModifiedDate: '2018-12-09T03:03:48',
      FileType: '.md5',
      UploadedSize: 0,
      FileSize: 1,
      UploadStatus: 'Not Uploaded',
      IsMoved: false,
      UploadCount: 0,
      RecordCreatedDate: '2020-04-03T11:59:24.063',
      RecordModifiedDate: '2020-04-07T07:21:27.833'
    }, {
      Id: 262,
      VesselName: 'FullPictureLab',
      Mission: 'Mission_572_2018-12-09T03-56-08.8_UTC',
      MissionNumber: 572,
      FileName: 'camera2hq_2018-12-09_03-56-11+0000.mkv',
      FilePath: 'E:\\VesselRepository\\FullPictureLab\\RobotMissions\\Mission_572_2018-12-09T03-56-08.8_UTC\\Video\\camera2hq_2018-12-09_03-56-11+0000.mkv',
      FileUploadedDate: null,
      FileCreatedDate: '2019-08-29T12:47:58',
      FileModifiedDate: '2018-12-09T03:03:54',
      FileType: '.mkv',
      UploadedSize: 0,
      FileSize: 52807,
      UploadStatus: 'Not Uploaded',
      IsMoved: false,
      UploadCount: 0,
      RecordCreatedDate: '2020-04-03T11:59:24.073',
      RecordModifiedDate: '2020-04-07T07:21:27.84'
    }, {
      Id: 263,
      VesselName: 'FullPictureLab',
      Mission: 'Mission_572_2018-12-09T03-56-08.8_UTC',
      MissionNumber: 572,
      FileName: 'camera2hq_2018-12-09_03-56-11+0000.mkv.filepart',
      FilePath: 'E:\\VesselRepository\\FullPictureLab\\RobotMissions\\Mission_572_2018-12-09T03-56-08.8_UTC\\Video\\camera2hq_2018-12-09_03-56-11+0000.mkv.filepart',
      FileUploadedDate: null,
      FileCreatedDate: '2019-08-29T12:47:58',
      FileModifiedDate: '2018-12-10T12:04:06',
      FileType: '.filepart',
      UploadedSize: 0,
      FileSize: 5979,
      UploadStatus: 'Not Uploaded',
      IsMoved: false,
      UploadCount: 0,
      RecordCreatedDate: '2020-04-03T11:59:24.08',
      RecordModifiedDate: '2020-04-07T07:21:27.85'
    }]
  };

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
  getMissionList(VesselName: string): IBasicDropdown[] {
    return [
      {
        name: 532,
        value: 532
      },
      {
        name: 535,
        value: 535
      }
    ];
  }
  getVesselUploadStatus(VesselMissionData: IVesselMissionData): IVesselUploadStatus {
    return this.vesselUploadStatus;
  }
  getVesselHistoricalStatus(VesselMissionData: IVesselHistoricalData): IVesselUploadStatus {
    return this.vesselUploadStatus;
  }
}
