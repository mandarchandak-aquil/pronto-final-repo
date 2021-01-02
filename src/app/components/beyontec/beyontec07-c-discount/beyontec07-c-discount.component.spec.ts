import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Beyontec07CDiscountComponent } from './beyontec07-c-discount.component';

describe('Beyontec07CDiscountComponent', () => {
  let component: Beyontec07CDiscountComponent;
  let fixture: ComponentFixture<Beyontec07CDiscountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Beyontec07CDiscountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Beyontec07CDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
