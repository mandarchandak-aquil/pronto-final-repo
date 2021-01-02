import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClaimCaliforniaRoutingModule } from './claim-california-routing.module';
import { ClaimCaliforniaComponent } from './claim-california.component';
import { LayoutModule } from '../../layout/layout.module';
import { NgSelectModule } from '@ng-select/ng-select';
import {  ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [ClaimCaliforniaComponent],
  imports: [
    CommonModule,
    ClaimCaliforniaRoutingModule,
    LayoutModule,
    NgSelectModule,
    ReactiveFormsModule
  ]
})
export class ClaimCaliforniaModule { }
