import { TestBed } from '@angular/core/testing';

import { ConnectivityControlService } from './connectivity-control.service';

xdescribe('ConnectivityControlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConnectivityControlService = TestBed.get(ConnectivityControlService);
    expect(service).toBeTruthy();
  });
});
