import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Dashboard02PolicyProofRoutingModule } from './dashboard02-policy-proof-routing.module';
import { Dashboard02PolicyProofComponent } from './dashboard02-policy-proof.component';
import { LayoutModule } from '../../layout/layout.module';

@NgModule({
  declarations: [Dashboard02PolicyProofComponent],
  imports: [
    CommonModule,
    Dashboard02PolicyProofRoutingModule,
    LayoutModule
  ]
})
export class Dashboard02PolicyProofModule { }
