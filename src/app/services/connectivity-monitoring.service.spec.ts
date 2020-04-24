import { TestBed } from '@angular/core/testing';

import { ConnectivityMonitoringService } from './connectivity-monitoring.service';

xdescribe('ConnectivityMonitoringService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConnectivityMonitoringService = TestBed.get(ConnectivityMonitoringService);
    expect(service).toBeTruthy();
  });
});
