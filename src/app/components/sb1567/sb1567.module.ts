import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Sb1567RoutingModule } from './sb1567-routing.module';
import { Sb1567Component } from './sb1567.component';
import { LayoutModule } from '../../layout/layout.module';

@NgModule({
  declarations: [Sb1567Component],
  imports: [
    CommonModule,
    Sb1567RoutingModule,
    LayoutModule
  ]
})
export class Sb1567Module { }
