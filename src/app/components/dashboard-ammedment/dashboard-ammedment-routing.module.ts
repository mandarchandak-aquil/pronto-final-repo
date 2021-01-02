import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardAmmedmentComponent } from './dashboard-ammedment.component';

const routes: Routes = [{ path: 'ammedment', component: DashboardAmmedmentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardAmmedmentRoutingModule { }
