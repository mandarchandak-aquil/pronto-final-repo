import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductBoatInsuranceComponent } from './product-boat-insurance.component';

const routes: Routes = [{ path: 'boat-insurance', component: ProductBoatInsuranceComponent }
];
// const routes: Routes = [
//   { path: 'boat-insurance/es', component: ProductBoatInsuranceComponent },
//   { path: 'boat-insurance/en', component: ProductBoatInsuranceComponent }
// ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductBoatInsuranceRoutingModule { }
