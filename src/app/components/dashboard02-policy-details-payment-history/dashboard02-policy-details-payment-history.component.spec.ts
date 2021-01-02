import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dashboard02PolicyDetailsPaymentHistoryComponent } from './dashboard02-policy-details-payment-history.component';

describe('Dashboard02PolicyDetailsPaymentHistoryComponent', () => {
  let component: Dashboard02PolicyDetailsPaymentHistoryComponent;
  let fixture: ComponentFixture<Dashboard02PolicyDetailsPaymentHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dashboard02PolicyDetailsPaymentHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dashboard02PolicyDetailsPaymentHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
