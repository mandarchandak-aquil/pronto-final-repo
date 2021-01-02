import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductSupplementalHealthInsuranceComponent } from './product-supplemental-health-insurance.component';

const routes: Routes = [{ path: 'supplemental-health-insurance', component: ProductSupplementalHealthInsuranceComponent }];
// const routes: Routes = [
//   { path: 'supplemental-health-insurance/en', component: ProductSupplementalHealthInsuranceComponent },
//   { path: 'supplemental-health-insurance/es', component: ProductSupplementalHealthInsuranceComponent }
// ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductSupplementalHealthInsuranceRoutingModule { }
