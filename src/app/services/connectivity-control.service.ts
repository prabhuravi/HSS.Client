import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

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

  constructor(
    private http: HttpService
  ) { }

  getConnectivityData(): Observable<IConnectivityControl[]> {
    const requestData = {
      endPoint: '/VesselConfig/api/VesselConfiguration/GetVessels'
    };
    return this.http.getData(requestData);
  }

  getConnectivityActionLog(connectivityId: number): Observable<IConnectivityActionLog[]> {
    const requestData = {
      endPoint: `/VesselConfig/api/VesselConfiguration/GetConnectivityControlTransaction/${connectivityId}`
    };
    return this.http.getData(requestData);
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

  getWhiteListedCountries(vesselId: number): Observable<IWhiteListedCountries[]> {
    const requestData = {
      endPoint: `/VesselConfig/api/VesselConfiguration/GetWhitelistedCountries/${vesselId}`
    };
    return this.http.getData(requestData);
  }
  getOperatorCountryList(): Observable<IOperatorCountryList[]> {
    const requestData = {
      endPoint: '/VesselConfig/api/VesselConfiguration/GetOperatorCountryList'
    };
    return this.http.getData(requestData);
  }
  removeWhitelistCountry(formData: IWhiteListedCountries): Observable<boolean> {
    const requestData = {
      endPoint: '/VesselConfig/api/VesselConfiguration/RemoveWhitelistCountry',
      data: formData
    };
    return this.http.postData(requestData);
  }
  markCountryWhitelist(formData: any): Observable<string> {
    const requestData = {
      endPoint: '/VesselConfig/api/VesselConfiguration/MarkCountryWhitelist',
      data: formData
    };
    return this.http.postData(requestData);
  }
  addCountryToGroup(formData: IOperatorCountryList[]): Observable<string> {
    const requestData = {
      endPoint: '/VesselConfig/api/VesselConfiguration/MarkCountryWhitelist',
      data: formData
    };
    return this.http.postData(requestData);
  }
  getGroupCountries(CountryId: number): Observable<IOperatorCountryList[]> {
    const requestData = {
      endPoint: `/VesselConfig/api/VesselConfiguration/GetGroupCountries/${CountryId}`
    };
    return this.http.getData(requestData);
  }
  deleteCountryGroup(formData: any): Observable<boolean> {
    const requestData = {
      endPoint: '/VesselConfig/api/VesselConfiguration/DeleteCountryGroup',
      data: formData
    };
    return this.http.postData(requestData);
  }
  addCountryGroup(formData: any): Observable<boolean> {
    const requestData = {
      endPoint: '/VesselConfig/api/VesselConfiguration/AddCountryGroup',
      data: formData
    };
    return this.http.postData(requestData);
  }
}
