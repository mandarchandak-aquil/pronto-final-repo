import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SitemapRoutingModule } from './sitemap-routing.module';
import { SitemapComponent } from './sitemap.component';

import { LayoutModule } from '../../layout/layout.module';
@NgModule({
  declarations: [SitemapComponent],
  imports: [
    CommonModule,
    LayoutModule,
    SitemapRoutingModule
  ]
})
export class SitemapModule { }
