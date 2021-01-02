import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PharmacyCardComponent } from './pharmacy-card.component';

const routes: Routes = [{ path: '', component: PharmacyCardComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PharmacyCardRoutingModule { }
