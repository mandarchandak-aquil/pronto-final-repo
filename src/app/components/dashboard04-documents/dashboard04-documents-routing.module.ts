import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Dashboard04DocumentsComponent } from './dashboard04-documents.component';

const routes: Routes = [
  { path: 'documents', component: Dashboard04DocumentsComponent },
  { path: 'documents/:policyNo', component: Dashboard04DocumentsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Dashboard04DocumentsRoutingModule { }
