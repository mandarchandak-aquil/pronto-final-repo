import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMexicoTexasInsuranceComponent } from './product-mexico-texas-insurance.component';

describe('ProductMexicoTexasInsuranceComponent', () => {
  let component: ProductMexicoTexasInsuranceComponent;
  let fixture: ComponentFixture<ProductMexicoTexasInsuranceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductMexicoTexasInsuranceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductMexicoTexasInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
