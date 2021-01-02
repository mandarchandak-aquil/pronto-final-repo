import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClaimFloridaComponent } from './claim-florida.component';

const routes: Routes = [{ path: 'claim-florida', component: ClaimFloridaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClaimFloridaRoutingModule { }
