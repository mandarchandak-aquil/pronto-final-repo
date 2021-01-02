import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Dashboard05PaymentSettingsRoutingModule } from './dashboard05-payment-settings-routing.module';
import { Dashboard05PaymentSettingsComponent } from './dashboard05-payment-settings.component';
import { LayoutModule } from '../../layout/layout.module';


@NgModule({
  declarations: [Dashboard05PaymentSettingsComponent],
  imports: [
    CommonModule,
    Dashboard05PaymentSettingsRoutingModule,
    LayoutModule
  ]
})
export class Dashboard05PaymentSettingsModule { }
