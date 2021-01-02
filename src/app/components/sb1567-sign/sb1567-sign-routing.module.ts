import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Sb1567SignComponent } from './sb1567-sign.component';

// const routes: Routes = [{ path: '', component: Sb1567SignComponent }];
const routes: Routes = [
  { path: 'en', component: Sb1567SignComponent },
  { path: 'es', component: Sb1567SignComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Sb1567SignRoutingModule { }
