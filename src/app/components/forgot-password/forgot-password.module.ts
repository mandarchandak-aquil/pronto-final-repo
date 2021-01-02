import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { ForgotPasswordComponent } from './forgot-password.component';
import { LayoutModule } from '../../layout/layout.module';
import {  ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [ForgotPasswordComponent],
  imports: [
    CommonModule,
    LayoutModule,
    ForgotPasswordRoutingModule,
    ReactiveFormsModule
    
  ]
})
export class ForgotPasswordModule { }
