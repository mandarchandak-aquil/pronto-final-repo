import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Dashboard07PolicydetailsComponent } from './dashboard07-policydetails.component';

const routes: Routes = [
  { path: 'policy-details/add-vehicle', component: Dashboard07PolicydetailsComponent },
  { path: 'policy-details/edit-vehicle', component: Dashboard07PolicydetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Dashboard07PolicydetailsRoutingModule { }
