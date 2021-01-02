import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Error404RoutingModule } from './error404-routing.module';
import { Error404Component } from './error404.component';
import { LayoutModule } from '../../layout/layout.module';


@NgModule({
  declarations: [Error404Component],
  imports: [
    CommonModule,
    Error404RoutingModule,
    LayoutModule
  ]
})
export class Error404Module { }
