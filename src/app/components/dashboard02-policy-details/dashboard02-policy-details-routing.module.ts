import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Dashboard02PolicyDetailsComponent } from './dashboard02-policy-details.component';

const routes: Routes = [{ path: 'policy-details', component: Dashboard02PolicyDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Dashboard02PolicyDetailsRoutingModule { }
