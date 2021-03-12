import { TestBed } from '@angular/core/testing';

import { OperatorBookingService } from './operator-booking.service';

describe('OperatorBookingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OperatorBookingService = TestBed.get(OperatorBookingService);
    expect(service).toBeTruthy();
  });
});
