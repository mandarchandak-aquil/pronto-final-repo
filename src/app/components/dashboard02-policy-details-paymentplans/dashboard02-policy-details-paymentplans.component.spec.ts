import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dashboard02PolicyDetailsPaymentplansComponent } from './dashboard02-policy-details-paymentplans.component';

describe('Dashboard02PolicyDetailsPaymentplansComponent', () => {
  let component: Dashboard02PolicyDetailsPaymentplansComponent;
  let fixture: ComponentFixture<Dashboard02PolicyDetailsPaymentplansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dashboard02PolicyDetailsPaymentplansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dashboard02PolicyDetailsPaymentplansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
