import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { OperationalPlanService } from './operational-plan.service';
import { ConfigurationService } from '@kognifai/poseidon-ng-configurationservice';
import { HttpService } from './http.service';

const MockConfigurationObj = {
  config: {
    apiCollection: {}
  }
};
class MockHttpService {

}

describe('OperationalPlanService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: ConfigurationService, useValue: MockConfigurationObj },
      { provide: HttpService, useClass: MockHttpService }
    ],
    schemas: [NO_ERRORS_SCHEMA]
  }));

  it('should be created', () => {
    const service: OperationalPlanService = TestBed.get(OperationalPlanService);
    expect(service).toBeTruthy();
  });
});