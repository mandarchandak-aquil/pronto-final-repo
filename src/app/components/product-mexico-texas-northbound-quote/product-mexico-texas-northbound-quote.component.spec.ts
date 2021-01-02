import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMexicoTexasNorthboundQuoteComponent } from './product-mexico-texas-northbound-quote.component';

describe('ProductMexicoTexasNorthboundQuoteComponent', () => {
  let component: ProductMexicoTexasNorthboundQuoteComponent;
  let fixture: ComponentFixture<ProductMexicoTexasNorthboundQuoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductMexicoTexasNorthboundQuoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductMexicoTexasNorthboundQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
