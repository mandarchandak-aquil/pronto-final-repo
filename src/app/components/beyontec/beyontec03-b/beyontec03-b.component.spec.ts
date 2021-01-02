import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Beyontec03BComponent } from './beyontec03-b.component';

describe('Beyontec03BComponent', () => {
  let component: Beyontec03BComponent;
  let fixture: ComponentFixture<Beyontec03BComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Beyontec03BComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Beyontec03BComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
