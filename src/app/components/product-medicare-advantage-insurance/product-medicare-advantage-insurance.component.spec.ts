import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMedicareAdvantageInsuranceComponent } from './product-medicare-advantage-insurance.component';

describe('ProductMedicareAdvantageInsuranceComponent', () => {
  let component: ProductMedicareAdvantageInsuranceComponent;
  let fixture: ComponentFixture<ProductMedicareAdvantageInsuranceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductMedicareAdvantageInsuranceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductMedicareAdvantageInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
