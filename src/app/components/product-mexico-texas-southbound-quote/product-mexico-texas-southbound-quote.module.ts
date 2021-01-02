import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductMexicoTexasSouthboundQuoteRoutingModule } from './product-mexico-texas-southbound-quote-routing.module';
import { ProductMexicoTexasSouthboundQuoteComponent } from './product-mexico-texas-southbound-quote.component';
import { LayoutModule } from '../../layout/layout.module';

@NgModule({
  declarations: [ProductMexicoTexasSouthboundQuoteComponent],
  imports: [
    CommonModule,
    ProductMexicoTexasSouthboundQuoteRoutingModule,
    LayoutModule
  ]
})
export class ProductMexicoTexasSouthboundQuoteModule { }
