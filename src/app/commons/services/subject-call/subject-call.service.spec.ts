import { TestBed } from '@angular/core/testing';

import { SubjectCallService } from './subject-call.service';

describe('SubjectCallService', () => {
  let service: SubjectCallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubjectCallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
