import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductHomeInsuranceComponent } from './product-home-insurance.component';

const routes: Routes = [{ path: 'home-insurance', component: ProductHomeInsuranceComponent }
];
// const routes: Routes = [
//   { path: 'home-insurance/es', component: ProductHomeInsuranceComponent },
//   { path: 'home-insurance/en', component: ProductHomeInsuranceComponent }
// ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductHomeInsuranceRoutingModule { }
