import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductCondoInsuranceComponent } from './product-condo-insurance.component';

const routes: Routes = [
  { path: 'condo-insurance', component: ProductCondoInsuranceComponent }
];
// const routes: Routes = [
//   { path: 'condo-insurance/en', component: ProductCondoInsuranceComponent },
//   { path: 'condo-insurance/es', component: ProductCondoInsuranceComponent }
// ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductCondoInsuranceRoutingModule { }
