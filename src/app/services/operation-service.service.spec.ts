import { TestBed } from '@angular/core/testing';

import { OperationServiceService } from './operation-service.service';

describe('OperationServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OperationServiceService = TestBed.get(OperationServiceService);
    expect(service).toBeTruthy();
  });
});
