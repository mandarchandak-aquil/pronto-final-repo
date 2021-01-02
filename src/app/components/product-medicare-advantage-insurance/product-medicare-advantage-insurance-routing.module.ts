import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductMedicareAdvantageInsuranceComponent } from './product-medicare-advantage-insurance.component';

const routes: Routes = [
  { path: 'medicare-advantage-insurance', component: ProductMedicareAdvantageInsuranceComponent }
];
// const routes: Routes = [
//   { path: 'medicare-advantage-insurance/en', component: ProductMedicareAdvantageInsuranceComponent },
//   { path: 'medicare-advantage-insurance/es', component: ProductMedicareAdvantageInsuranceComponent }
// ];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductMedicareAdvantageInsuranceRoutingModule { }
