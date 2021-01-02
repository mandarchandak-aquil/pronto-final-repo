import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductWatercraftInsuranceComponent } from './product-watercraft-insurance.component';

const routes: Routes = [{ path: 'watercraft-insurance', component: ProductWatercraftInsuranceComponent }];
// const routes: Routes = [
//   { path: 'watercraft-insurance/en', component: ProductWatercraftInsuranceComponent },
//   { path: 'watercraft-insurance/es', component: ProductWatercraftInsuranceComponent }
// ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductWatercraftInsuranceRoutingModule { }
