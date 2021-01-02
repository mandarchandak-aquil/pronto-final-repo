import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Quote02AdditionalVehicleComponent } from './quote02-additional-vehicle.component';

describe('Quote02AdditionalVehicleComponent', () => {
  let component: Quote02AdditionalVehicleComponent;
  let fixture: ComponentFixture<Quote02AdditionalVehicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Quote02AdditionalVehicleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Quote02AdditionalVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
