import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Dashboard02PolicyDetailsPaymentHistoryComponent } from './dashboard02-policy-details-payment-history.component';

const routes: Routes = [{ path: 'policy-payment-history', component: Dashboard02PolicyDetailsPaymentHistoryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Dashboard02PolicyDetailsPaymentHistoryRoutingModule { }
