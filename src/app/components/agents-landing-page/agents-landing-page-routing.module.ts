import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgentsLandingPageComponent } from './agents-landing-page.component';

const routes: Routes = [{ path: ':slug', component: AgentsLandingPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentsLandingPageRoutingModule { }
