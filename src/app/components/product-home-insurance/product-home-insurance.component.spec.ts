import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductHomeInsuranceComponent } from './product-home-insurance.component';

describe('ProductHomeInsuranceComponent', () => {
  let component: ProductHomeInsuranceComponent;
  let fixture: ComponentFixture<ProductHomeInsuranceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductHomeInsuranceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductHomeInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
