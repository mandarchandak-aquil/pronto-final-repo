import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductWatercraftInsuranceComponent } from './product-watercraft-insurance.component';

describe('ProductWatercraftInsuranceComponent', () => {
  let component: ProductWatercraftInsuranceComponent;
  let fixture: ComponentFixture<ProductWatercraftInsuranceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductWatercraftInsuranceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductWatercraftInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
