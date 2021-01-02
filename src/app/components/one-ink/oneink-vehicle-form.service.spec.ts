import { TestBed } from '@angular/core/testing';

import { OneinkVehicleFormService } from './oneink-vehicle-form.service';

describe('OneinkVehicleFormService', () => {
  let service: OneinkVehicleFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OneinkVehicleFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
