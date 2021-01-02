import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UndisclosedExcludeDriverComponent } from './undisclosed-exclude-driver.component';

describe('UndisclosedExcludeDriverComponent', () => {
  let component: UndisclosedExcludeDriverComponent;
  let fixture: ComponentFixture<UndisclosedExcludeDriverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UndisclosedExcludeDriverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UndisclosedExcludeDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
