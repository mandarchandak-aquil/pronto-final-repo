import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dashboard08ChoosePolicyComponent } from './dashboard08-choose-policy.component';

describe('Dashboard08ChoosePolicyComponent', () => {
  let component: Dashboard08ChoosePolicyComponent;
  let fixture: ComponentFixture<Dashboard08ChoosePolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dashboard08ChoosePolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dashboard08ChoosePolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
