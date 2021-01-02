import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dashboard02PolicyDetailsCurrentPaymentPlanComponent } from './dashboard02-policy-details-current-payment-plan.component';

describe('Dashboard02PolicyDetailsCurrentPaymentPlanComponent', () => {
  let component: Dashboard02PolicyDetailsCurrentPaymentPlanComponent;
  let fixture: ComponentFixture<Dashboard02PolicyDetailsCurrentPaymentPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dashboard02PolicyDetailsCurrentPaymentPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dashboard02PolicyDetailsCurrentPaymentPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
