import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductMexicoCaliforniaQuoteRoutingModule } from './product-mexico-california-quote-routing.module';
import { ProductMexicoCaliforniaQuoteComponent } from './product-mexico-california-quote.component';
import { LayoutModule } from '../../layout/layout.module';

@NgModule({
  declarations: [ProductMexicoCaliforniaQuoteComponent],
  imports: [
    CommonModule,
    ProductMexicoCaliforniaQuoteRoutingModule,
    LayoutModule
  ]
})
export class ProductMexicoCaliforniaQuoteModule { }
