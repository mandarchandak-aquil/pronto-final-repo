import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductRentersInsuranceComponent } from './product-renters-insurance.component';

const routes: Routes = [{ path: 'renters-insurance', component: ProductRentersInsuranceComponent }];
// const routes: Routes = [
//   { path: 'renters-insurance/en', component: ProductRentersInsuranceComponent },
//   { path: 'renters-insurance/es', component: ProductRentersInsuranceComponent }
// ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRentersInsuranceRoutingModule { }
