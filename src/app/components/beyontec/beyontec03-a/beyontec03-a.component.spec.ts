import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Beyontec03AComponent } from './beyontec03-a.component';

describe('Beyontec03AComponent', () => {
  let component: Beyontec03AComponent;
  let fixture: ComponentFixture<Beyontec03AComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Beyontec03AComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Beyontec03AComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
