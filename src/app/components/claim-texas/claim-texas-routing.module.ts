import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClaimTexasComponent } from './claim-texas.component';

const routes: Routes = [{ path: 'claim-texas', component: ClaimTexasComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClaimTexasRoutingModule { }
