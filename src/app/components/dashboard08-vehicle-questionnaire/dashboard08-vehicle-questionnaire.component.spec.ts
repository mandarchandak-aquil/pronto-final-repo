import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dashboard08VehicleQuestionnaireComponent } from './dashboard08-vehicle-questionnaire.component';

describe('Dashboard08VehicleQuestionnaireComponent', () => {
  let component: Dashboard08VehicleQuestionnaireComponent;
  let fixture: ComponentFixture<Dashboard08VehicleQuestionnaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dashboard08VehicleQuestionnaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dashboard08VehicleQuestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
