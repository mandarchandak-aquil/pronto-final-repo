import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClaimFloridaRoutingModule } from './claim-florida-routing.module';
import { ClaimFloridaComponent, CustomAdapter, CustomDateParserFormatter } from './claim-florida.component';
import { LayoutModule } from '../../layout/layout.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import {  ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ClaimFloridaComponent],
  imports: [
    CommonModule,
    ClaimFloridaRoutingModule,
    LayoutModule,
    NgSelectModule,
    NgbModule,
    ReactiveFormsModule
  ],
  
  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})
export class ClaimFloridaModule { }
