import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMexicoTexasNorthboundInsuranceComponent } from './product-mexico-texas-northbound-insurance.component';

describe('ProductMexicoTexasNorthboundInsuranceComponent', () => {
  let component: ProductMexicoTexasNorthboundInsuranceComponent;
  let fixture: ComponentFixture<ProductMexicoTexasNorthboundInsuranceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductMexicoTexasNorthboundInsuranceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductMexicoTexasNorthboundInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
