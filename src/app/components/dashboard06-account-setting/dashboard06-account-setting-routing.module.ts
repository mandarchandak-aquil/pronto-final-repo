import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Dashboard06AccountSettingComponent } from './dashboard06-account-setting.component';

const routes: Routes = [{ path: 'account-setting', component: Dashboard06AccountSettingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Dashboard06AccountSettingRoutingModule { }
