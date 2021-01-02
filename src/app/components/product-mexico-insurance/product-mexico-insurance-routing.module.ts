import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductMexicoInsuranceComponent } from './product-mexico-insurance.component';

const routes: Routes = [
  { path: 'mexico-auto-insurance', component: ProductMexicoInsuranceComponent }
];
// const routes: Routes = [
//   { path: 'mexico-auto-insurance/en', component: ProductMexicoInsuranceComponent },
//   { path: 'mexico-auto-insurance/es', component: ProductMexicoInsuranceComponent }
// ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductMexicoInsuranceRoutingModule { }
