import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuickPayLoginComponent } from './quick-pay-login.component';

const routes: Routes = [{ path: '', component: QuickPayLoginComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuickPayLoginRoutingModule { }
