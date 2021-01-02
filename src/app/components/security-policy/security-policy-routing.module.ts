import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SecurityPolicyComponent } from './security-policy.component';

const routes: Routes = [{ path: '', component: SecurityPolicyComponent }];
// const routes: Routes = [
//   { path: 'en', component: SecurityPolicyComponent },
//   { path: 'es', component: SecurityPolicyComponent }
// ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityPolicyRoutingModule { }
