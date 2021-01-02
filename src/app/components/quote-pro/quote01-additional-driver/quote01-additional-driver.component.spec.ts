import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Quote01AdditionalDriverComponent } from './quote01-additional-driver.component';

describe('Quote01AdditionalDriverComponent', () => {
  let component: Quote01AdditionalDriverComponent;
  let fixture: ComponentFixture<Quote01AdditionalDriverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Quote01AdditionalDriverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Quote01AdditionalDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
