import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Beyontec07Component } from './beyontec07.component';

describe('Beyontec07Component', () => {
  let component: Beyontec07Component;
  let fixture: ComponentFixture<Beyontec07Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Beyontec07Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Beyontec07Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
