import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Beyontec07AComponent } from './beyontec07-a.component';

describe('Beyontec07AComponent', () => {
  let component: Beyontec07AComponent;
  let fixture: ComponentFixture<Beyontec07AComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Beyontec07AComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Beyontec07AComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
