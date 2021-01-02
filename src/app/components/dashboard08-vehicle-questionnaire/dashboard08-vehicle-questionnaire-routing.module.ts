import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Dashboard08VehicleQuestionnaireComponent } from './dashboard08-vehicle-questionnaire.component';

const routes: Routes = [{ path: 'renewal-summary/vehicle-questionnaire', component: Dashboard08VehicleQuestionnaireComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Dashboard08VehicleQuestionnaireRoutingModule { }
