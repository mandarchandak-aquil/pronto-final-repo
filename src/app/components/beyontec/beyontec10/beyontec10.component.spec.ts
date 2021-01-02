import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Beyontec10Component } from './beyontec10.component';

describe('Beyontec10Component', () => {
  let component: Beyontec10Component;
  let fixture: ComponentFixture<Beyontec10Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Beyontec10Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Beyontec10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
