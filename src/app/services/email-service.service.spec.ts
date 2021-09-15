/*
 * KONGSBERG PROPRIETARY. This document and its accompanying elements, contain KONGSBERG information which is proprietary and confidential.
Any disclosure, copying, distribution or use is prohibited if not otherwise explicitly agreed with KONGSBERG in writing.
Any authorized reproduction, in whole or in part, must include this legend. © [year of creation] KONGSBERG – All rights reserved.
 */
import { TestBed } from '@angular/core/testing';

import { EmailServiceService } from './email-service.service';
import { HttpService } from './http.service';

describe('EmailServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpService]
  }));

  // it('should be created', () => {
  //   const service: EmailServiceService = TestBed.get(EmailServiceService);
  //   expect(service).toBeTruthy();
  // });
});
