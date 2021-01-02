import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Dashboard02PolicyDetailsConfirmPaymentComponent } from './dashboard02-policy-details-confirm-payment.component';

const routes: Routes = [{ path: 'policy-details-confirm-payment', component: Dashboard02PolicyDetailsConfirmPaymentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Dashboard02PolicyDetailsConfirmPaymentRoutingModule { }
