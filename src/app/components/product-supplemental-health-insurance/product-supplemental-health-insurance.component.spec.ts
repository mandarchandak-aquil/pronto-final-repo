import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSupplementalHealthInsuranceComponent } from './product-supplemental-health-insurance.component';

describe('ProductSupplementalHealthInsuranceComponent', () => {
  let component: ProductSupplementalHealthInsuranceComponent;
  let fixture: ComponentFixture<ProductSupplementalHealthInsuranceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSupplementalHealthInsuranceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSupplementalHealthInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
