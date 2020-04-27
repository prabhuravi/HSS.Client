import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConnectivityMonitoringService } from './connectivity-monitoring.service';

class MockHttpService {

}

describe('ConnectivityMonitoringService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: HttpClient, useClass: MockHttpService }
    ],
    schemas: [NO_ERRORS_SCHEMA]
  }));

  it('should be created', () => {
    const service: ConnectivityMonitoringService = TestBed.get(ConnectivityMonitoringService);
    expect(service).toBeTruthy();
  });
});
