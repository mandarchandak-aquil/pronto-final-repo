import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Beyontec08Component } from './beyontec08.component';

describe('Beyontec08Component', () => {
  let component: Beyontec08Component;
  let fixture: ComponentFixture<Beyontec08Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Beyontec08Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Beyontec08Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
