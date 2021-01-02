import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Dashboard01NotificationsComponent } from './dashboard01-notifications.component';


const routes: Routes = [{ path: 'notifications', component: Dashboard01NotificationsComponent },];

@NgModule({
  imports: [RouterModule.forChild(routes),

  ],
  exports: [RouterModule]
})
export class Dashboard01NotificationsRoutingModule { }
