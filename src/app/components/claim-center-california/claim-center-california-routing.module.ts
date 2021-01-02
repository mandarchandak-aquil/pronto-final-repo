import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClaimCenterCaliforniaComponent } from './claim-center-california.component';

const routes: Routes = [{ path: 'claim-center-california', component: ClaimCenterCaliforniaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClaimCenterCaliforniaRoutingModule { }
