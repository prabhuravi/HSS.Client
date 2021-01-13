import { TestBed } from '@angular/core/testing';

import { FromBuilderServiceService } from './from-builder-service';

describe('FromBuilderServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FromBuilderServiceService = TestBed.get(FromBuilderServiceService);
    expect(service).toBeTruthy();
  });
});
