import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimCenterCaliforniaComponent } from './claim-center-california.component';

describe('ClaimCenterCaliforniaComponent', () => {
  let component: ClaimCenterCaliforniaComponent;
  let fixture: ComponentFixture<ClaimCenterCaliforniaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimCenterCaliforniaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimCenterCaliforniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
