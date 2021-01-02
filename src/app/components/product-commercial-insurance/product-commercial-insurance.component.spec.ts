import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCommercialInsuranceComponent } from './product-commercial-insurance.component';

describe('ProductCommercialInsuranceComponent', () => {
  let component: ProductCommercialInsuranceComponent;
  let fixture: ComponentFixture<ProductCommercialInsuranceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCommercialInsuranceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCommercialInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
