import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductMexicoCaliforniaQuoteComponent } from './product-mexico-california-quote.component';

const routes: Routes = [
  { path: 'mexico-california-quote', component: ProductMexicoCaliforniaQuoteComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductMexicoCaliforniaQuoteRoutingModule { }
