import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Quote01Component } from './quote01.component';

describe('Quote01Component', () => {
  let component: Quote01Component;
  let fixture: ComponentFixture<Quote01Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Quote01Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Quote01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
