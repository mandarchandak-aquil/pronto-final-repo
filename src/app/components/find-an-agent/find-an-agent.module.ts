import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FindAnAgentRoutingModule } from './find-an-agent-routing.module';
import { FindAnAgentComponent } from './find-an-agent.component';

import { LayoutModule } from '../../layout/layout.module';

// Forms module
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [FindAnAgentComponent],
  imports: [
    CommonModule,
    FindAnAgentRoutingModule,
    LayoutModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBLRlv4LRU1MCTkVHNkmVA1CLQndp4PPcg',
      // libraries: ['places']
    })
  ]
})
export class FindAnAgentModule { }
