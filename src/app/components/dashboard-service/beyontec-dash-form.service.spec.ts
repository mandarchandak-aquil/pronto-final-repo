import { TestBed } from '@angular/core/testing';

import { BeyontecDashFormService } from './beyontec-dash-form.service';

describe('BeyontecDashFormService', () => {
  let service: BeyontecDashFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BeyontecDashFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
