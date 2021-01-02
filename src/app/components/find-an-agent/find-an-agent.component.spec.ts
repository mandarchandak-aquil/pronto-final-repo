import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindAnAgentComponent } from './find-an-agent.component';

describe('FindAnAgentComponent', () => {
  let component: FindAnAgentComponent;
  let fixture: ComponentFixture<FindAnAgentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindAnAgentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindAnAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
