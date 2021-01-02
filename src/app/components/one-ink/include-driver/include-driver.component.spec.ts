import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncludeDriverComponent } from './include-driver.component';

describe('IncludeDriverComponent', () => {
  let component: IncludeDriverComponent;
  let fixture: ComponentFixture<IncludeDriverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncludeDriverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncludeDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
