import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dashboard08RenewalSummaryComponent } from './dashboard08-renewal-summary.component';

describe('Dashboard08RenewalSummaryComponent', () => {
  let component: Dashboard08RenewalSummaryComponent;
  let fixture: ComponentFixture<Dashboard08RenewalSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dashboard08RenewalSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dashboard08RenewalSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
