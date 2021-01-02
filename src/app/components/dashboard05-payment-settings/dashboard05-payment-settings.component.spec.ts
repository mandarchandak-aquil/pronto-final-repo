import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dashboard05PaymentSettingsComponent } from './dashboard05-payment-settings.component';

describe('Dashboard05PaymentSettingsComponent', () => {
  let component: Dashboard05PaymentSettingsComponent;
  let fixture: ComponentFixture<Dashboard05PaymentSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dashboard05PaymentSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dashboard05PaymentSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
