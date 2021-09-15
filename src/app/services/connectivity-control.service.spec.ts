/*
 * KONGSBERG PROPRIETARY. This document and its accompanying elements, contain KONGSBERG information which is proprietary and confidential.
Any disclosure, copying, distribution or use is prohibited if not otherwise explicitly agreed with KONGSBERG in writing.
Any authorized reproduction, in whole or in part, must include this legend. © [year of creation] KONGSBERG – All rights reserved.
 */
import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { ConnectivityControlService } from './connectivity-control.service';
import { ConfigurationService } from '@kognifai/poseidon-ng-configurationservice';
import { HttpService } from './http.service';

const MockConfigurationObj = {
  config: {
    apiCollection: {
      VesselConfiguration: {
        domainURL: 'https://hgstest.kognif.ai',
        path: '/VesselConfig/api/VesselConfiguration',
        endpoints: {}
      },
      VesselLinkQuality: {
        domainURL: 'https://hgstest.kognif.ai',
        path: '/VesselLinkQualityAPIService/API/VesselLinkQuality',
        endpoints: {}
      },
      OperationalPlan: {
        domainURL: 'https://hgstest.kognif.ai',
        path: '/OperationPlanAPI/api/OperationalPlan',
        endpoints: {}
      }
    }
  }
};
class MockHttpService {

}

describe('ConnectivityControlService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: ConfigurationService, useValue: MockConfigurationObj },
      { provide: HttpService, useClass: MockHttpService }
    ],
    schemas: [NO_ERRORS_SCHEMA]
  }));

  // it('should be created', () => {
  //   const service: ConnectivityControlService = TestBed.get(ConnectivityControlService);
  //   expect(service).toBeTruthy();
  // });
});
