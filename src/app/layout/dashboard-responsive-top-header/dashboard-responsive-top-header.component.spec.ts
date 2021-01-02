import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardResponsiveTopHeaderComponent } from './dashboard-responsive-top-header.component';

describe('DashboardResponsiveTopHeaderComponent', () => {
  let component: DashboardResponsiveTopHeaderComponent;
  let fixture: ComponentFixture<DashboardResponsiveTopHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardResponsiveTopHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardResponsiveTopHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
