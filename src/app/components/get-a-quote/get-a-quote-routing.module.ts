import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GetAQuoteComponent } from './get-a-quote.component';

const routes: Routes = [
  { path: '', component: GetAQuoteComponent },
  { path: ':agent', component: GetAQuoteComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GetAQuoteRoutingModule { }
