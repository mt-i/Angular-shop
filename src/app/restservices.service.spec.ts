import { TestBed } from '@angular/core/testing';

import { RestservicesService } from './restservices.service';

describe('RestservicesService', () => {
  let service: RestservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestservicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
