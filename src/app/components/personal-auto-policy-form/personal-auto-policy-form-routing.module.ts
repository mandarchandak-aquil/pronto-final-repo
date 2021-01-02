import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonalAutoPolicyFormComponent } from './personal-auto-policy-form.component';

const routes: Routes = [
  { path: '', component: PersonalAutoPolicyFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalAutoPolicyFormRoutingModule { }
