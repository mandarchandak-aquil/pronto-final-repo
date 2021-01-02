import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Sb1567SignRoutingModule } from './sb1567-sign-routing.module';
import { Sb1567SignComponent } from './sb1567-sign.component';
import { LayoutModule } from '../../layout/layout.module';

@NgModule({
  declarations: [Sb1567SignComponent],
  imports: [
    CommonModule,
    Sb1567SignRoutingModule,
    LayoutModule
  ]
})
export class Sb1567SignModule { }
