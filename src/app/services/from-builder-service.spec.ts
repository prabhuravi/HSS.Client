/*
 * KONGSBERG PROPRIETARY. This document and its accompanying elements, contain KONGSBERG information which is proprietary and confidential.
Any disclosure, copying, distribution or use is prohibited if not otherwise explicitly agreed with KONGSBERG in writing.
Any authorized reproduction, in whole or in part, must include this legend. © [year of creation] KONGSBERG – All rights reserved.
 */
import { TestBed } from '@angular/core/testing';

import { FromBuilderServiceService } from './from-builder-service';

describe('FromBuilderServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FromBuilderServiceService = TestBed.get(FromBuilderServiceService);
    expect(service).toBeTruthy();
  });
});
