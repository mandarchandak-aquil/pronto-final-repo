import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Dashboard08ChoosePolicyComponent } from './dashboard08-choose-policy.component';

const routes: Routes = [{ path: 'renewal-summary/choose-policy', component: Dashboard08ChoosePolicyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Dashboard08ChoosePolicyRoutingModule { }
