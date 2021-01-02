import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductMotorcycleInsuranceComponent } from './product-motorcycle-insurance.component';

const routes: Routes = [
  { path: 'motorcycle-insurance', component: ProductMotorcycleInsuranceComponent }
];
// const routes: Routes = [
//   { path: 'motorcycle-insurance/es', component: ProductMotorcycleInsuranceComponent },
//   { path: 'motorcycle-insurance/en', component: ProductMotorcycleInsuranceComponent }
// ];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductMotorcycleInsuranceRoutingModule {
  
 }
