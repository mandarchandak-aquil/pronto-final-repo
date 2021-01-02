import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UndisclosedDriversListComponent } from './undisclosed-drivers-list.component';

describe('UndisclosedDriversListComponent', () => {
  let component: UndisclosedDriversListComponent;
  let fixture: ComponentFixture<UndisclosedDriversListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UndisclosedDriversListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UndisclosedDriversListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
