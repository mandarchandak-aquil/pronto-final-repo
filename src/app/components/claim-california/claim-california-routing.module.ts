import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClaimCaliforniaComponent } from './claim-california.component';

const routes: Routes = [{ path: 'claim-california', component: ClaimCaliforniaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClaimCaliforniaRoutingModule { }
