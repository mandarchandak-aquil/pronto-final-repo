import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dashboard07PolicydetailsComponent } from './dashboard07-policydetails.component';

describe('Dashboard07PolicydetailsComponent', () => {
  let component: Dashboard07PolicydetailsComponent;
  let fixture: ComponentFixture<Dashboard07PolicydetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dashboard07PolicydetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dashboard07PolicydetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
