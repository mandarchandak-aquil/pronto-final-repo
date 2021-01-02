import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneinkStepperComponent } from './oneink-stepper.component';

describe('OneinkStepperComponent', () => {
  let component: OneinkStepperComponent;
  let fixture: ComponentFixture<OneinkStepperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneinkStepperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneinkStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
