import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductRvInsuranceComponent } from './product-rv-insurance.component';

const routes: Routes = [{ path: 'rv-insurance', component: ProductRvInsuranceComponent }];
// const routes: Routes = [
//   { path: 'rv-insurance/en', component: ProductRvInsuranceComponent },
//   { path: 'rv-insurance/es', component: ProductRvInsuranceComponent }
// ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRvInsuranceRoutingModule { }
