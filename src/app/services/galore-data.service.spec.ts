import { TestBed } from '@angular/core/testing';

import { GaloreDataService } from './galore-data.service';

describe('GaloreDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GaloreDataService = TestBed.get(GaloreDataService);
    expect(service).toBeTruthy();
  });
});
