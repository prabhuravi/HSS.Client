import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { ConnectivityControlService } from './connectivity-control.service';
import { ConfigurationService } from '@kognifai/poseidon-ng-configurationservice';
import { HttpService } from './http.service';

const MockConfigurationObj = {
  config: {
    apiCollection: {}
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

  it('should be created', () => {
    const service: ConnectivityControlService = TestBed.get(ConnectivityControlService);
    expect(service).toBeTruthy();
  });
});
