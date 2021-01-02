import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Beyontec02AComponent } from './beyontec02-a.component';

describe('Beyontec02AComponent', () => {
  let component: Beyontec02AComponent;
  let fixture: ComponentFixture<Beyontec02AComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Beyontec02AComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Beyontec02AComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
