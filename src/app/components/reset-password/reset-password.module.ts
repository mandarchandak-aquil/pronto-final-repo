import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResetPasswordRoutingModule } from './reset-password-routing.module';
import { ResetPasswordComponent } from './reset-password.component';
import { LayoutModule } from '../../layout/layout.module';
import {  ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [ResetPasswordComponent],
  imports: [
    CommonModule,
    LayoutModule,
    ReactiveFormsModule,
    ResetPasswordRoutingModule
  ]
})
export class ResetPasswordModule { }
