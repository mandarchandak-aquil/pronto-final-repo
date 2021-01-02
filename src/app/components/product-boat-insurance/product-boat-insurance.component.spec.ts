import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBoatInsuranceComponent } from './product-boat-insurance.component';

describe('ProductBoatInsuranceComponent', () => {
  let component: ProductBoatInsuranceComponent;
  let fixture: ComponentFixture<ProductBoatInsuranceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductBoatInsuranceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductBoatInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
