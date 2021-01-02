import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dashboard07AddriverRoutingModule } from './dashboard07-addriver-routing.module';
import { Dashboard07AddriverComponent } from './dashboard07-addriver.component';
import { NgSelectModule } from '@ng-select/ng-select';
import {  ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '../../layout/layout.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [Dashboard07AddriverComponent],
  imports: [
    CommonModule,
    Dashboard07AddriverRoutingModule,
    ReactiveFormsModule,
    LayoutModule,
    BsDatepickerModule,
    NgSelectModule,
    BsDatepickerModule.forRoot()
  ]
})
export class Dashboard07AddriverModule { }
