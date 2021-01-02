import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LayoutModule } from '../../layout/layout.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgSelectModule } from '@ng-select/ng-select';

import { Dashboard07EditCoverageRoutingModule } from './dashboard07-edit-coverage-routing.module';
import { Dashboard07EditCoverageComponent } from './dashboard07-edit-coverage.component';


@NgModule({
  declarations: [Dashboard07EditCoverageComponent],
  imports: [
    CommonModule,
    Dashboard07EditCoverageRoutingModule,
    ReactiveFormsModule, FormsModule,
    LayoutModule,
    BsDatepickerModule,
    NgSelectModule
  ]
})
export class Dashboard07EditCoverageModule { }
