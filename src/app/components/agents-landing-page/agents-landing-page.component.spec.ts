import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentsLandingPageComponent } from './agents-landing-page.component';

describe('AgentsLandingPageComponent', () => {
  let component: AgentsLandingPageComponent;
  let fixture: ComponentFixture<AgentsLandingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentsLandingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentsLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
