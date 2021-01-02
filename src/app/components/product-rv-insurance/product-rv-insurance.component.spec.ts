import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRvInsuranceComponent } from './product-rv-insurance.component';

describe('ProductRvInsuranceComponent', () => {
  let component: ProductRvInsuranceComponent;
  let fixture: ComponentFixture<ProductRvInsuranceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductRvInsuranceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductRvInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
