import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMexicoCaliforniaQuoteComponent } from './product-mexico-california-quote.component';

describe('ProductMexicoCaliforniaQuoteComponent', () => {
  let component: ProductMexicoCaliforniaQuoteComponent;
  let fixture: ComponentFixture<ProductMexicoCaliforniaQuoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductMexicoCaliforniaQuoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductMexicoCaliforniaQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
