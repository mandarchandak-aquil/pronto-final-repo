import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMexicoTexasSouthboundInsuranceComponent } from './product-mexico-texas-southbound-insurance.component';

describe('ProductMexicoTexasSouthboundInsuranceComponent', () => {
  let component: ProductMexicoTexasSouthboundInsuranceComponent;
  let fixture: ComponentFixture<ProductMexicoTexasSouthboundInsuranceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductMexicoTexasSouthboundInsuranceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductMexicoTexasSouthboundInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
