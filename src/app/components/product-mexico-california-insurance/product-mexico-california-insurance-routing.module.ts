import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductMexicoCaliforniaInsuranceComponent } from './product-mexico-california-insurance.component';

const routes: Routes = [
  { path: 'mexico-california-insurance', component: ProductMexicoCaliforniaInsuranceComponent }
];
// const routes: Routes = [
//   { path: 'mexico-california-insurance/en', component: ProductMexicoCaliforniaInsuranceComponent },
//   { path: 'mexico-california-insurance/es', component: ProductMexicoCaliforniaInsuranceComponent }
// ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductMexicoCaliforniaInsuranceRoutingModule { }
