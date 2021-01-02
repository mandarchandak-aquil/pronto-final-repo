import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductMexicoTexasSouthboundInsuranceComponent } from './product-mexico-texas-southbound-insurance.component';

const routes: Routes = [
  { path: 'mexico-texas-southbound-insurance', component: ProductMexicoTexasSouthboundInsuranceComponent }
];
// const routes: Routes = [
//   { path: 'mexico-texas-southbound-insurance/en', component: ProductMexicoTexasSouthboundInsuranceComponent },
//   { path: 'mexico-texas-southbound-insurance/es', component: ProductMexicoTexasSouthboundInsuranceComponent }
// ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductMexicoTexasSouthboundInsuranceRoutingModule { }
