import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Dashboard08DiscountComponent } from './dashboard08-discount.component';

const routes: Routes = [{ path: 'renewal-summary/discounts', component: Dashboard08DiscountComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Dashboard08DiscountRoutingModule { }
