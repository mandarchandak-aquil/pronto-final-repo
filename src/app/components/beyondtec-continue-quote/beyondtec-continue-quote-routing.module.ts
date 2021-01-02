import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BeyondtecContinueQuoteComponent } from './beyondtec-continue-quote.component';

const routes: Routes = [{ path: '', component: BeyondtecContinueQuoteComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BeyondtecContinueQuoteRoutingModule { }
