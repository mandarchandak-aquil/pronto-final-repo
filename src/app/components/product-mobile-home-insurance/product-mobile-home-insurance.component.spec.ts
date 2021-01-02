import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMobileHomeInsuranceComponent } from './product-mobile-home-insurance.component';

describe('ProductMobileHomeInsuranceComponent', () => {
  let component: ProductMobileHomeInsuranceComponent;
  let fixture: ComponentFixture<ProductMobileHomeInsuranceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductMobileHomeInsuranceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductMobileHomeInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
