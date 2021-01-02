import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndependentAgentComponent } from './independent-agent.component';

const routes: Routes = [
  { path: '', component: IndependentAgentComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndependentAgentRoutingModule { }
