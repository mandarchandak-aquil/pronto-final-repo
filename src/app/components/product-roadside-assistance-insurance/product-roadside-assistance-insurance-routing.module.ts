import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductRoadsideAssistanceInsuranceComponent } from './product-roadside-assistance-insurance.component';

const routes: Routes = [{ path: 'roadside-assistance', component: ProductRoadsideAssistanceInsuranceComponent }];
// const routes: Routes = [
//   { path: 'roadside-assistance/en', component: ProductRoadsideAssistanceInsuranceComponent },
//   { path: 'roadside-assistance/es', component: ProductRoadsideAssistanceInsuranceComponent }
// ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoadsideAssistanceInsuranceRoutingModule { }
