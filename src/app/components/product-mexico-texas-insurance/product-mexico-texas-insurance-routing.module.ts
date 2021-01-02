import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductMexicoTexasInsuranceComponent } from './product-mexico-texas-insurance.component';

const routes: Routes = [
  { path: 'mexico-texas-insurance', component: ProductMexicoTexasInsuranceComponent }
];
// const routes: Routes = [
//   { path: 'mexico-texas-insurance/en', component: ProductMexicoTexasInsuranceComponent },
//   { path: 'mexico-texas-insurance/es', component: ProductMexicoTexasInsuranceComponent }
// ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductMexicoTexasInsuranceRoutingModule { }
