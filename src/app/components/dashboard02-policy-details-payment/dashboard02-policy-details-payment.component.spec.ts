import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dashboard02PolicyDetailsPaymentComponent } from './dashboard02-policy-details-payment.component';

describe('Dashboard02PolicyDetailsPaymentComponent', () => {
  let component: Dashboard02PolicyDetailsPaymentComponent;
  let fixture: ComponentFixture<Dashboard02PolicyDetailsPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dashboard02PolicyDetailsPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dashboard02PolicyDetailsPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
