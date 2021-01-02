import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UndisclosedIncludeDriverComponent } from './undisclosed-include-driver.component';

describe('UndisclosedIncludeDriverComponent', () => {
  let component: UndisclosedIncludeDriverComponent;
  let fixture: ComponentFixture<UndisclosedIncludeDriverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UndisclosedIncludeDriverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UndisclosedIncludeDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
