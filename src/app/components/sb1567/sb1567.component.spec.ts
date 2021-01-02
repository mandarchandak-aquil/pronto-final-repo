import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Sb1567Component } from './sb1567.component';

describe('Sb1567Component', () => {
  let component: Sb1567Component;
  let fixture: ComponentFixture<Sb1567Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Sb1567Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sb1567Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
