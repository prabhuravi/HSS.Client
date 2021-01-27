import { TestBed } from '@angular/core/testing';

import { PrepareInstallationService } from './prepare-installation.service';

describe('PrepareInstallationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrepareInstallationService = TestBed.get(PrepareInstallationService);
    expect(service).toBeTruthy();
  });
});
