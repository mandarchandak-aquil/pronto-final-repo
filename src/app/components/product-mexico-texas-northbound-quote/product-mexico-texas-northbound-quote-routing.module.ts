import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductMexicoTexasNorthboundQuoteComponent } from './product-mexico-texas-northbound-quote.component';

const routes: Routes = [
  { path: 'mexico-texas-northbound-quote', component: ProductMexicoTexasNorthboundQuoteComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductMexicoTexasNorthboundQuoteRoutingModule { }
