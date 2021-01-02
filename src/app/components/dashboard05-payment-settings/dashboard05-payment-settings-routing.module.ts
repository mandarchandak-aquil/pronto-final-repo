import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Dashboard05PaymentSettingsComponent } from './dashboard05-payment-settings.component';

const routes: Routes = [{ path: 'payment-settings', component: Dashboard05PaymentSettingsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Dashboard05PaymentSettingsRoutingModule { }
