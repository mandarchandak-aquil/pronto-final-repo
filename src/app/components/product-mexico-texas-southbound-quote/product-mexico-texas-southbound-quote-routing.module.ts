import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductMexicoTexasSouthboundQuoteComponent } from './product-mexico-texas-southbound-quote.component';

const routes: Routes = [
  { path: 'mexico-texas-southbound-quote', component: ProductMexicoTexasSouthboundQuoteComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductMexicoTexasSouthboundQuoteRoutingModule { }
