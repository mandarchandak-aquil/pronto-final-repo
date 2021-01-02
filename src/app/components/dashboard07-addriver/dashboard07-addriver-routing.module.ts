import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Dashboard07AddriverComponent } from './dashboard07-addriver.component';

const routes: Routes = [
  { 
    path: 'policy-details/add-driver', 
    component: Dashboard07AddriverComponent 
  },
  // { 
  //   path: 'policy-details/edit-driver', 
  //   component: Dashboard07AddriverComponent 
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Dashboard07AddriverRoutingModule { }
