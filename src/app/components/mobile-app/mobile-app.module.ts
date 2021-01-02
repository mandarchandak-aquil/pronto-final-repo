import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MobileAppRoutingModule } from './mobile-app-routing.module';
import { MobileAppComponent } from './mobile-app.component';
import { LayoutModule } from '../../layout/layout.module';

@NgModule({
  declarations: [MobileAppComponent],
  imports: [
    CommonModule,
    LayoutModule,
    MobileAppRoutingModule
  ]
})
export class MobileAppModule { }
