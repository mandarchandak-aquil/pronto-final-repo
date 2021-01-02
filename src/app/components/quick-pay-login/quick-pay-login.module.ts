import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuickPayLoginRoutingModule } from './quick-pay-login-routing.module';
import { QuickPayLoginComponent } from './quick-pay-login.component';
import {  ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '../../layout/layout.module';
@NgModule({
  declarations: [QuickPayLoginComponent],
  imports: [
    CommonModule,
    QuickPayLoginRoutingModule,
    LayoutModule,
    ReactiveFormsModule
  ]
})
export class QuickPayLoginModule { }
