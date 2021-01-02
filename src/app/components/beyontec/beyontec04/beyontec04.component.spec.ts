import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Beyontec04Component } from './beyontec04.component';

describe('Beyontec04Component', () => {
  let component: Beyontec04Component;
  let fixture: ComponentFixture<Beyontec04Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Beyontec04Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Beyontec04Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
