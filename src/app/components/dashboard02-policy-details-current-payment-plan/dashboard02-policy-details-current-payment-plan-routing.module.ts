import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Dashboard02PolicyDetailsCurrentPaymentPlanComponent } from './dashboard02-policy-details-current-payment-plan.component';

const routes: Routes = [{ path: 'policy-details-current-payment-plan', component: Dashboard02PolicyDetailsCurrentPaymentPlanComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Dashboard02PolicyDetailsCurrentPaymentPlanRoutingModule { }
