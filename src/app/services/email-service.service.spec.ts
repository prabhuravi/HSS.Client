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
