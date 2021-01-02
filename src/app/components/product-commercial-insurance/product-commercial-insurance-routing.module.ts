import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductCommercialInsuranceComponent } from './product-commercial-insurance.component';

const routes: Routes = [
  { path: 'commercial-insurance', component: ProductCommercialInsuranceComponent }
];
// const routes: Routes = [
//   { path: 'commercial-insurance/en', component: ProductCommercialInsuranceComponent },
//   { path: 'commercial-insurance/es', component: ProductCommercialInsuranceComponent }
// ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductCommercialInsuranceRoutingModule { }
