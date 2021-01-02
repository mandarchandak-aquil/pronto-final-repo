import { TestBed } from '@angular/core/testing';

import { AuthServicess } from './auth.service';

describe('AuthServicess', () => {
  let service: AuthServicess;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthServicess);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
