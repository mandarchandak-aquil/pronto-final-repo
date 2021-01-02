import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Quote03Component } from './quote03.component';

describe('Quote03Component', () => {
  let component: Quote03Component;
  let fixture: ComponentFixture<Quote03Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Quote03Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Quote03Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
