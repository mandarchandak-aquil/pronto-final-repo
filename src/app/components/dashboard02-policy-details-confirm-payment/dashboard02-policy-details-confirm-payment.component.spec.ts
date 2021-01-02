import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dashboard02PolicyDetailsConfirmPaymentComponent } from './dashboard02-policy-details-confirm-payment.component';

describe('Dashboard02PolicyDetailsConfirmPaymentComponent', () => {
  let component: Dashboard02PolicyDetailsConfirmPaymentComponent;
  let fixture: ComponentFixture<Dashboard02PolicyDetailsConfirmPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dashboard02PolicyDetailsConfirmPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dashboard02PolicyDetailsConfirmPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
