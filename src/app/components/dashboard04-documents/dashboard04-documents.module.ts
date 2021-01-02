import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Dashboard04DocumentsRoutingModule } from './dashboard04-documents-routing.module';
import { Dashboard04DocumentsComponent } from './dashboard04-documents.component';
import { LayoutModule } from '../../layout/layout.module';


@NgModule({
  declarations: [Dashboard04DocumentsComponent],
  imports: [
    CommonModule,
    Dashboard04DocumentsRoutingModule,
    LayoutModule
  ]
})
export class Dashboard04DocumentsModule { }
