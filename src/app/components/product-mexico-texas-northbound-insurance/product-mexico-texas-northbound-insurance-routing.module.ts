import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductMexicoTexasNorthboundInsuranceComponent } from './product-mexico-texas-northbound-insurance.component';

const routes: Routes = [
  { path: 'mexico-texas-northbound-insurance', component: ProductMexicoTexasNorthboundInsuranceComponent }
];
// const routes: Routes = [
//   { path: 'mexico-texas-northbound-insurance/en', component: ProductMexicoTexasNorthboundInsuranceComponent },
//   { path: 'mexico-texas-northbound-insurance/es', component: ProductMexicoTexasNorthboundInsuranceComponent }
// ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductMexicoTexasNorthboundInsuranceRoutingModule { }
