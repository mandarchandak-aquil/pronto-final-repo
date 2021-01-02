import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardAddViolationsRoutingModule } from './dashboard-add-violations-routing.module';
import { DashboardAddViolationsComponent } from './dashboard-add-violations.component';
import { LayoutModule } from '../../layout/layout.module';
import {  ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MomentModule } from 'ngx-moment';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [DashboardAddViolationsComponent],
  imports: [
    CommonModule,
    DashboardAddViolationsRoutingModule,
    LayoutModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    MomentModule,
    BsDatepickerModule.forRoot()
  ]
})
export class DashboardAddViolationsModule { }
