import { TestBed } from '@angular/core/testing';

import { WhitelistCountriesService } from './whitelist-countries.service';

describe('WhitelistCountriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WhitelistCountriesService = TestBed.get(WhitelistCountriesService);
    expect(service).toBeTruthy();
  });
});
