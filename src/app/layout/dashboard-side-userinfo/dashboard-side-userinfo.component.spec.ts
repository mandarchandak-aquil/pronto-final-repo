import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSideUserinfoComponent } from './dashboard-side-userinfo.component';

describe('DashboardSideUserinfoComponent', () => {
  let component: DashboardSideUserinfoComponent;
  let fixture: ComponentFixture<DashboardSideUserinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardSideUserinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardSideUserinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
