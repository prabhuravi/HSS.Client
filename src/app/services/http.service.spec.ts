import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { HttpService } from './http.service';
import { AuthenticationService } from '@kognifai/poseidon-authenticationservice';
import { ConfigurationService } from '@kognifai/poseidon-ng-configurationservice';
import { ConfirmationService } from 'primeng/api';
import { MockConfirmationService } from './mock.confirmation.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const MockConfigurationObj = {
  config: {
    apiCollection: {}
  }
};
class MockAuthenticationService {

}
class MockHttpClient {

}
describe('HttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: ConfigurationService, useValue: MockConfigurationObj },
      { provide: ConfirmationService, useClass: MockConfirmationService },
      { provide: AuthenticationService, useClass: MockAuthenticationService },
      { provide: HttpClient, useClass: MockHttpClient }
    ],
    schemas: [NO_ERRORS_SCHEMA]
  }));

  it('should be created', () => {
    const service: HttpService = TestBed.get(HttpService);
    expect(service).toBeTruthy();
  });
});
