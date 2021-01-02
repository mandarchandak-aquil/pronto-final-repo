import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Dashboard01NotificationsRoutingModule } from './dashboard01-notifications-routing.module';
import { Dashboard01NotificationsComponent } from './dashboard01-notifications.component';
import { LayoutModule } from '../../layout/layout.module';


@NgModule({
  declarations: [Dashboard01NotificationsComponent],
  imports: [
    CommonModule,
    Dashboard01NotificationsRoutingModule,
    LayoutModule,
  ]
})
export class Dashboard01NotificationsModule { }
