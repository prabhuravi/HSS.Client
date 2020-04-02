import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConnectivityMonitoringService {

  constructor() { }

  getVesselLinks(): IVesselLinks[] {
    return [{
      NodeNumber: 17536.0,
      Name: 'Talisman',
      Status: 'Down',
      LastSeen: '2019-10-29T12:06:39',
      LastLatency: 270,
      LastSeenUTC: '29/10/2019 12:06:39',
      CreatedBy: 'Andreas Iversen',
      IPAddress: '10.113.32.20'
    }, {
      NodeNumber: 17618.0,
      Name: 'BergeApo',
      Status: 'Up',
      LastSeen: '2020-03-01T08:41:39',
      LastLatency: 344,
      LastSeenUTC: '01/03/2020 08:41:39',
      CreatedBy: 'Andreas Iversen',
      IPAddress: '10.113.52.148'
    }, {
      NodeNumber: 17268.0,
      Name: 'Maalfrid',
      Status: 'Down',
      LastSeen: '2020-02-28T13:45:36',
      LastLatency: 279,
      LastSeenUTC: '28/02/2020 13:45:36',
      CreatedBy: 'Andreas Iversen',
      IPAddress: '10.112.221.20'
    }];
  }
}
