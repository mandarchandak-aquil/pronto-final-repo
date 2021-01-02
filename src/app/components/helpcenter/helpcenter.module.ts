import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HelpcenterRoutingModule } from './helpcenter-routing.module';
import { HelpcenterComponent } from './helpcenter.component';

import { LayoutModule } from '../../layout/layout.module';
@NgModule({
  declarations: [HelpcenterComponent],
  imports: [
    CommonModule,
    HelpcenterRoutingModule,
    LayoutModule
  ]
})
export class HelpcenterModule { }
