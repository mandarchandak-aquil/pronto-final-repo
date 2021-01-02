import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Beyontec02BComponent } from './beyontec02-b.component';

describe('Beyontec02BComponent', () => {
  let component: Beyontec02BComponent;
  let fixture: ComponentFixture<Beyontec02BComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Beyontec02BComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Beyontec02BComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
