import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClaimTexasRoutingModule } from './claim-texas-routing.module';
import { ClaimTexasComponent } from './claim-texas.component';
import { LayoutModule } from '../../layout/layout.module';
import { NgSelectModule } from '@ng-select/ng-select';
import {  ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [ClaimTexasComponent],
  imports: [
    CommonModule,
    ClaimTexasRoutingModule,
    LayoutModule,
    NgSelectModule,
    ReactiveFormsModule
  ]
})
export class ClaimTexasModule { }
