import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndependentAgentComponent } from './independent-agent.component';

describe('IndependentAgentComponent', () => {
  let component: IndependentAgentComponent;
  let fixture: ComponentFixture<IndependentAgentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndependentAgentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndependentAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
