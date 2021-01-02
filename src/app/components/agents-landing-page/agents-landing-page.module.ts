import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentsLandingPageRoutingModule } from './agents-landing-page-routing.module';
import { AgentsLandingPageComponent } from './agents-landing-page.component';
import { LayoutModule } from '../../layout/layout.module';
import { AgmCoreModule } from '@agm/core';
@NgModule({
  declarations: [AgentsLandingPageComponent],
  imports: [
    CommonModule,
    AgentsLandingPageRoutingModule,
    LayoutModule,
     AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBLRlv4LRU1MCTkVHNkmVA1CLQndp4PPcg',
      // libraries: ['places']
    })
  ]
})
export class AgentsLandingPageModule { }
