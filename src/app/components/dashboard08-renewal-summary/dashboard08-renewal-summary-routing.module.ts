import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Dashboard08RenewalSummaryComponent } from './dashboard08-renewal-summary.component';

const routes: Routes = [{ path: 'renewal-summary', component: Dashboard08RenewalSummaryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Dashboard08RenewalSummaryRoutingModule { }
