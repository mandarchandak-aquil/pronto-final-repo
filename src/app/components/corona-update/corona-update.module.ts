import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoronaUpdateRoutingModule } from './corona-update-routing.module';
import { CoronaUpdateComponent } from './corona-update.component';
import { LayoutModule } from '../../layout/layout.module';

@NgModule({
  declarations: [CoronaUpdateComponent],
  imports: [
    CommonModule,
    LayoutModule,
    CoronaUpdateRoutingModule
  ]
})
export class CoronaUpdateModule { }
