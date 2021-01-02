import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductMexicoTexasNorthboundQuoteRoutingModule } from './product-mexico-texas-northbound-quote-routing.module';
import { ProductMexicoTexasNorthboundQuoteComponent } from './product-mexico-texas-northbound-quote.component';
import { LayoutModule } from '../../layout/layout.module';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [ProductMexicoTexasNorthboundQuoteComponent],
  imports: [
    CommonModule,
    ProductMexicoTexasNorthboundQuoteRoutingModule,
    LayoutModule,
    NgbAccordionModule
  ]
})
export class ProductMexicoTexasNorthboundQuoteModule { }
