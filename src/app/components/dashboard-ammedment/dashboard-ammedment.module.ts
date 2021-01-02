import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardAmmedmentRoutingModule } from './dashboard-ammedment-routing.module';
import { DashboardAmmedmentComponent } from './dashboard-ammedment.component';
import { LayoutModule } from '../../layout/layout.module';
import {  ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [DashboardAmmedmentComponent],
  imports: [
    CommonModule,
    DashboardAmmedmentRoutingModule,
    LayoutModule,
    ReactiveFormsModule
  ]
})
export class DashboardAmmedmentModule { }
