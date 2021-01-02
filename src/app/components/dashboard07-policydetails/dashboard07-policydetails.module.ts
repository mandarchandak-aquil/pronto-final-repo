import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { Dashboard07PolicydetailsRoutingModule } from './dashboard07-policydetails-routing.module';
import { Dashboard07PolicydetailsComponent } from './dashboard07-policydetails.component';
import {  ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '../../layout/layout.module';
@NgModule({
  declarations: [Dashboard07PolicydetailsComponent],
  imports: [
    CommonModule,
    Dashboard07PolicydetailsRoutingModule,
    LayoutModule,
    ReactiveFormsModule,
    NgSelectModule
  ]
})
export class Dashboard07PolicydetailsModule { }
