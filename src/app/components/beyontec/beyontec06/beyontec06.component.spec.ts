import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Beyontec06Component } from './beyontec06.component';

describe('Beyontec06Component', () => {
  let component: Beyontec06Component;
  let fixture: ComponentFixture<Beyontec06Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Beyontec06Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Beyontec06Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
