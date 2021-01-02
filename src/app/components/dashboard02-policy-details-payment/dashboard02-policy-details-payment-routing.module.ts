import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Dashboard02PolicyDetailsPaymentComponent } from './dashboard02-policy-details-payment.component';

const routes: Routes = [{ path: 'policy-details-payment', component: Dashboard02PolicyDetailsPaymentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Dashboard02PolicyDetailsPaymentRoutingModule { }
