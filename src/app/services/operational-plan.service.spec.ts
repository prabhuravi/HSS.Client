import { TestBed } from '@angular/core/testing';

import { OperationalPlanService } from './operational-plan.service';

describe('OperationalPlanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OperationalPlanService = TestBed.get(OperationalPlanService);
    expect(service).toBeTruthy();
  });
});
