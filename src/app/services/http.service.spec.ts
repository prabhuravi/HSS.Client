/*
 * KONGSBERG PROPRIETARY. This document and its accompanying elements, contain KONGSBERG information which is proprietary and confidential.
Any disclosure, copying, distribution or use is prohibited if not otherwise explicitly agreed with KONGSBERG in writing.
Any authorized reproduction, in whole or in part, must include this legend. © [year of creation] KONGSBERG – All rights reserved.
 */
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
