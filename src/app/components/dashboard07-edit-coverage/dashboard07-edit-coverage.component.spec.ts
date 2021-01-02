import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dashboard07EditCoverageComponent } from './dashboard07-edit-coverage.component';

describe('Dashboard07EditCoverageComponent', () => {
  let component: Dashboard07EditCoverageComponent;
  let fixture: ComponentFixture<Dashboard07EditCoverageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dashboard07EditCoverageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dashboard07EditCoverageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
