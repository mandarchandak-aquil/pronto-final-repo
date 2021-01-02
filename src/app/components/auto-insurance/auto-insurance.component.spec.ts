import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoInsuranceComponent } from './auto-insurance.component';

describe('AutoInsuranceComponent', () => {
  let component: AutoInsuranceComponent;
  let fixture: ComponentFixture<AutoInsuranceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoInsuranceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
