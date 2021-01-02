import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dashboard02MyPoliciesComponent } from './dashboard02-my-policies.component';

describe('Dashboard02MyPoliciesComponent', () => {
  let component: Dashboard02MyPoliciesComponent;
  let fixture: ComponentFixture<Dashboard02MyPoliciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dashboard02MyPoliciesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dashboard02MyPoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
