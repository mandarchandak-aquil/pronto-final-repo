import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Beyontec07BComponent } from './beyontec07-b.component';

describe('Beyontec07BComponent', () => {
  let component: Beyontec07BComponent;
  let fixture: ComponentFixture<Beyontec07BComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Beyontec07BComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Beyontec07BComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
