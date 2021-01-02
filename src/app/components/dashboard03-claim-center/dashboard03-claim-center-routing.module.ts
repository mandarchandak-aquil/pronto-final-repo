import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Dashboard03ClaimCenterComponent } from './dashboard03-claim-center.component';

const routes: Routes = [{ path: 'claim-center', component: Dashboard03ClaimCenterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Dashboard03ClaimCenterRoutingModule { }
