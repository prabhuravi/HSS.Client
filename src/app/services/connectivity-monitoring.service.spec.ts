import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { ConnectivityMonitoringService } from './connectivity-monitoring.service';
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

describe('ConnectivityMonitoringService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: ConfigurationService, useValue: MockConfigurationObj },
      { provide: HttpService, useClass: MockHttpService }
    ],
    schemas: [NO_ERRORS_SCHEMA]
  }));

  // it('should be created', () => {
  //   const service: ConnectivityMonitoringService = TestBed.get(ConnectivityMonitoringService);
  //   expect(service).toBeTruthy();
  // });
});
