import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FindAnAgentComponent } from './find-an-agent.component';

const routes: Routes = [{ path: '', component: FindAnAgentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FindAnAgentRoutingModule { }
