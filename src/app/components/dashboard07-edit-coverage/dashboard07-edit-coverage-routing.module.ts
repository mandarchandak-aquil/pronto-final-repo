import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Dashboard07EditCoverageComponent } from './dashboard07-edit-coverage.component';

const routes: Routes = [{ path: 'policy-details/edit-coverage', component: Dashboard07EditCoverageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Dashboard07EditCoverageRoutingModule { }
