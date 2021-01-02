import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMexicoInsuranceComponent } from './product-mexico-insurance.component';

describe('ProductMexicoInsuranceComponent', () => {
  let component: ProductMexicoInsuranceComponent;
  let fixture: ComponentFixture<ProductMexicoInsuranceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductMexicoInsuranceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductMexicoInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
