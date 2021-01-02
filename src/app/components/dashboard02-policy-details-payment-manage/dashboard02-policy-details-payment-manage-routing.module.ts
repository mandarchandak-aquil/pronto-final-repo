import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Dashboard02PolicyDetailsPaymentManageComponent } from './dashboard02-policy-details-payment-manage.component';

const routes: Routes = [{ path: 'policy-details-payment-manage', component: Dashboard02PolicyDetailsPaymentManageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Dashboard02PolicyDetailsPaymentManageRoutingModule { }
