import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMotorcycleInsuranceComponent } from './product-motorcycle-insurance.component';

describe('ProductMotorcycleInsuranceComponent', () => {
  let component: ProductMotorcycleInsuranceComponent;
  let fixture: ComponentFixture<ProductMotorcycleInsuranceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductMotorcycleInsuranceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductMotorcycleInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
