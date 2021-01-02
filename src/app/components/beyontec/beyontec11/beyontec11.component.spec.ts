import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Beyontec11Component } from './beyontec11.component';

describe('Beyontec11Component', () => {
  let component: Beyontec11Component;
  let fixture: ComponentFixture<Beyontec11Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Beyontec11Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Beyontec11Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
