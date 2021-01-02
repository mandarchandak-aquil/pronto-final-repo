import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndependentAgentRoutingModule } from './independent-agent-routing.module';
import { IndependentAgentComponent } from './independent-agent.component';
import { LayoutModule } from '../../layout/layout.module';

@NgModule({
  declarations: [IndependentAgentComponent],
  imports: [
    CommonModule,
    LayoutModule,
    IndependentAgentRoutingModule
  ]
})
export class IndependentAgentModule { }
