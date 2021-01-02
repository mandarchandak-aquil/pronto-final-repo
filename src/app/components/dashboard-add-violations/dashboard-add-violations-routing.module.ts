import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardAddViolationsComponent } from './dashboard-add-violations.component';

const routes: Routes = [
  { path: 'policy-details/add-driver/add-violations', component: DashboardAddViolationsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardAddViolationsRoutingModule { }
