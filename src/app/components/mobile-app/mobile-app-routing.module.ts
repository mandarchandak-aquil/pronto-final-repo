import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MobileAppComponent } from './mobile-app.component';

// const routes: Routes = [{ path: '', component: MobileAppComponent }];
const routes: Routes = [
  { path: '', component: MobileAppComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobileAppRoutingModule { }
