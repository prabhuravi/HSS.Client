import { TestBed } from '@angular/core/testing';

import { InatallationService } from './inatallation.service';

describe('InatallationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InatallationService = TestBed.get(InatallationService);
    expect(service).toBeTruthy();
  });
});
