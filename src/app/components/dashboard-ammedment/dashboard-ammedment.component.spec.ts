import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAmmedmentComponent } from './dashboard-ammedment.component';

describe('DashboardAmmedmentComponent', () => {
  let component: DashboardAmmedmentComponent;
  let fixture: ComponentFixture<DashboardAmmedmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardAmmedmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardAmmedmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
