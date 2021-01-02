import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Sb1567Component } from './sb1567.component';

const routes: Routes = [{ path: '', component: Sb1567Component }];
// const routes: Routes = [
//   { path: 'en', component: Sb1567Component },
//   { path: 'es', component: Sb1567Component }
// ];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Sb1567RoutingModule { }
