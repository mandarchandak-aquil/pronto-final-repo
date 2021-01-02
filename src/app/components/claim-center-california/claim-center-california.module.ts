import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClaimCenterCaliforniaRoutingModule } from './claim-center-california-routing.module';
import { ClaimCenterCaliforniaComponent } from './claim-center-california.component';
import { LayoutModule } from '../../layout/layout.module';

@NgModule({
  declarations: [ClaimCenterCaliforniaComponent],
  imports: [
    CommonModule,
    ClaimCenterCaliforniaRoutingModule,
    LayoutModule
  ]
})
export class ClaimCenterCaliforniaModule { }
