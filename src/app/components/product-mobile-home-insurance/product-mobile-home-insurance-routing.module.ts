import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductMobileHomeInsuranceComponent } from './product-mobile-home-insurance.component';

const routes: Routes = [
  { path: 'mobile-home-insurance', component: ProductMobileHomeInsuranceComponent }
];

// const routes: Routes = [
//   { path: 'mobile-home-insurance/en', component: ProductMobileHomeInsuranceComponent },
//   { path: 'mobile-home-insurance/es', component: ProductMobileHomeInsuranceComponent }
// ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductMobileHomeInsuranceRoutingModule { }
