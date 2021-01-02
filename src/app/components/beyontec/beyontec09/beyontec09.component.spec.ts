import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Beyontec09Component } from './beyontec09.component';

describe('Beyontec09Component', () => {
  let component: Beyontec09Component;
  let fixture: ComponentFixture<Beyontec09Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Beyontec09Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Beyontec09Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
