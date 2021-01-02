import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HealthInsuranceComponent } from './health-insurance.component';

const routes: Routes = [{ path: '', component: HealthInsuranceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HealthInsuranceRoutingModule { }
