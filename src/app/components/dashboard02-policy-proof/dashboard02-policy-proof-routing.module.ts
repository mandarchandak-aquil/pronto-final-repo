import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Dashboard02PolicyProofComponent } from './dashboard02-policy-proof.component';

const routes: Routes = [{ path: 'policy-proof', component: Dashboard02PolicyProofComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Dashboard02PolicyProofRoutingModule { }
