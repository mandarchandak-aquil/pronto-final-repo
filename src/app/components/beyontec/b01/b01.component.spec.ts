import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { B01Component } from './b01.component';

describe('B01Component', () => {
  let component: B01Component;
  let fixture: ComponentFixture<B01Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ B01Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(B01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
