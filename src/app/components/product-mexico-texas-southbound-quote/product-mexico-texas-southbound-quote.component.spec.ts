import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMexicoTexasSouthboundQuoteComponent } from './product-mexico-texas-southbound-quote.component';

describe('ProductMexicoTexasSouthboundQuoteComponent', () => {
  let component: ProductMexicoTexasSouthboundQuoteComponent;
  let fixture: ComponentFixture<ProductMexicoTexasSouthboundQuoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductMexicoTexasSouthboundQuoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductMexicoTexasSouthboundQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
