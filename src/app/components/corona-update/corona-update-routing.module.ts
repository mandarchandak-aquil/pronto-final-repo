import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoronaUpdateComponent } from './corona-update.component';

const routes: Routes = [
  { path: ':page_url', component: CoronaUpdateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoronaUpdateRoutingModule { 
}
