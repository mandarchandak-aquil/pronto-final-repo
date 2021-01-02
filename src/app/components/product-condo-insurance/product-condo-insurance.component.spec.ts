import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCondoInsuranceComponent } from './product-condo-insurance.component';

describe('ProductCondoInsuranceComponent', () => {
  let component: ProductCondoInsuranceComponent;
  let fixture: ComponentFixture<ProductCondoInsuranceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCondoInsuranceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCondoInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
