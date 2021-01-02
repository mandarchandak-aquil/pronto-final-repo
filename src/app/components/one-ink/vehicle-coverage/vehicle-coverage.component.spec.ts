import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleCoverageComponent } from './vehicle-coverage.component';

describe('VehicleCoverageComponent', () => {
  let component: VehicleCoverageComponent;
  let fixture: ComponentFixture<VehicleCoverageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleCoverageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleCoverageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
