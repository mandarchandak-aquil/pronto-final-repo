import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AutoInsuranceComponent } from './auto-insurance.component';
// const routes: Routes = [
//   { path: 'auto-insurance', component: AutoInsuranceComponent }
// ];

const routes: Routes = [
  { path: 'auto-insurance', component: AutoInsuranceComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutoInsuranceRoutingModule { }
