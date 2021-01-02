import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dashboard08DiscountComponent } from './dashboard08-discount.component';

describe('Dashboard08DiscountComponent', () => {
  let component: Dashboard08DiscountComponent;
  let fixture: ComponentFixture<Dashboard08DiscountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dashboard08DiscountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dashboard08DiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
