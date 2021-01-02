import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dashboard02PolicyDetailsPaymentManageComponent } from './dashboard02-policy-details-payment-manage.component';

describe('Dashboard02PolicyDetailsPaymentManageComponent', () => {
  let component: Dashboard02PolicyDetailsPaymentManageComponent;
  let fixture: ComponentFixture<Dashboard02PolicyDetailsPaymentManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dashboard02PolicyDetailsPaymentManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dashboard02PolicyDetailsPaymentManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
