import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Dashboard02MyPoliciesComponent } from './dashboard02-my-policies.component';

const routes: Routes = [{ path: 'my-policies', component: Dashboard02MyPoliciesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Dashboard02MyPoliciesRoutingModule { }
