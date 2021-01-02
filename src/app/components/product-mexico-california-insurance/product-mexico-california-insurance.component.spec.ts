import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMexicoCaliforniaInsuranceComponent } from './product-mexico-california-insurance.component';

describe('ProductMexicoCaliforniaInsuranceComponent', () => {
  let component: ProductMexicoCaliforniaInsuranceComponent;
  let fixture: ComponentFixture<ProductMexicoCaliforniaInsuranceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductMexicoCaliforniaInsuranceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductMexicoCaliforniaInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
