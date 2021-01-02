import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRentersInsuranceComponent } from './product-renters-insurance.component';

describe('ProductRentersInsuranceComponent', () => {
  let component: ProductRentersInsuranceComponent;
  let fixture: ComponentFixture<ProductRentersInsuranceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductRentersInsuranceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductRentersInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
