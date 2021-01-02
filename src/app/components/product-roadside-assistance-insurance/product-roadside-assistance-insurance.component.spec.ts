import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRoadsideAssistanceInsuranceComponent } from './product-roadside-assistance-insurance.component';

describe('ProductRoadsideAssistanceInsuranceComponent', () => {
  let component: ProductRoadsideAssistanceInsuranceComponent;
  let fixture: ComponentFixture<ProductRoadsideAssistanceInsuranceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductRoadsideAssistanceInsuranceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductRoadsideAssistanceInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
