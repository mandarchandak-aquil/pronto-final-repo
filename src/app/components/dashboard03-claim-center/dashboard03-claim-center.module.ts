import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Dashboard03ClaimCenterRoutingModule } from './dashboard03-claim-center-routing.module';
import { Dashboard03ClaimCenterComponent } from './dashboard03-claim-center.component';
import { LayoutModule } from '../../layout/layout.module';


@NgModule({
  declarations: [Dashboard03ClaimCenterComponent],
  imports: [
    CommonModule,
    Dashboard03ClaimCenterRoutingModule,
    LayoutModule
  ]
})
export class Dashboard03ClaimCenterModule { }
