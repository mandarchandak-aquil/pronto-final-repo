import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Dashboard02PolicyDetailsPaymentAddComponent } from './dashboard02-policy-details-payment-add.component';

const routes: Routes = [{ path: 'policy-details-payment-add', component: Dashboard02PolicyDetailsPaymentAddComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Dashboard02PolicyDetailsPaymentAddRoutingModule { }
