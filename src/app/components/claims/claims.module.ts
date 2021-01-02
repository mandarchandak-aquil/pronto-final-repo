import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClaimsRoutingModule } from './claims-routing.module';
import { ClaimsComponent } from './claims.component';

import { LayoutModule } from '../../layout/layout.module';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [ClaimsComponent],
  imports: [
    CommonModule,
    ClaimsRoutingModule,
    LayoutModule,
    NgbAccordionModule
  ]
})
export class ClaimsModule { }
