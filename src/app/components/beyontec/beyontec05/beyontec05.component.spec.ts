import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Beyontec05Component } from './beyontec05.component';

describe('Beyontec05Component', () => {
  let component: Beyontec05Component;
  let fixture: ComponentFixture<Beyontec05Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Beyontec05Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Beyontec05Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
