import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Sb1567SignComponent } from './sb1567-sign.component';

describe('Sb1567SignComponent', () => {
  let component: Sb1567SignComponent;
  let fixture: ComponentFixture<Sb1567SignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Sb1567SignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sb1567SignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
