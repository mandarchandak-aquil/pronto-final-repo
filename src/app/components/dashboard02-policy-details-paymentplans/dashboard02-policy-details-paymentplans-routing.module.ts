import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Dashboard02PolicyDetailsPaymentplansComponent } from './dashboard02-policy-details-paymentplans.component';

const routes: Routes = [{ path: 'policy-paymentplans', component: Dashboard02PolicyDetailsPaymentplansComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Dashboard02PolicyDetailsPaymentplansRoutingModule { }
