import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dashboard02PolicyDetailsPaymentAddComponent } from './dashboard02-policy-details-payment-add.component';

describe('Dashboard02PolicyDetailsPaymentAddComponent', () => {
  let component: Dashboard02PolicyDetailsPaymentAddComponent;
  let fixture: ComponentFixture<Dashboard02PolicyDetailsPaymentAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dashboard02PolicyDetailsPaymentAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dashboard02PolicyDetailsPaymentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
