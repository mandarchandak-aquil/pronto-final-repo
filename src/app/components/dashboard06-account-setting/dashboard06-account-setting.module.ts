import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Dashboard06AccountSettingRoutingModule } from './dashboard06-account-setting-routing.module';
import { Dashboard06AccountSettingComponent } from './dashboard06-account-setting.component';
import { LayoutModule } from '../../layout/layout.module';


@NgModule({
  declarations: [Dashboard06AccountSettingComponent],
  imports: [
    CommonModule,
    Dashboard06AccountSettingRoutingModule,
    LayoutModule
  ]
})
export class Dashboard06AccountSettingModule { }
