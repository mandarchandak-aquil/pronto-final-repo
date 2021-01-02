import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dashboard07AddriverComponent } from './dashboard07-addriver.component';

describe('Dashboard07AddriverComponent', () => {
  let component: Dashboard07AddriverComponent;
  let fixture: ComponentFixture<Dashboard07AddriverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dashboard07AddriverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dashboard07AddriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
