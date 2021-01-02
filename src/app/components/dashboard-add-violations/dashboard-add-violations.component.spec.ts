import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAddViolationsComponent } from './dashboard-add-violations.component';

describe('DashboardAddViolationsComponent', () => {
  let component: DashboardAddViolationsComponent;
  let fixture: ComponentFixture<DashboardAddViolationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardAddViolationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardAddViolationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
