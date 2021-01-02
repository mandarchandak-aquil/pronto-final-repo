import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import { BeyondtecContinueQuoteRoutingModule } from './beyondtec-continue-quote-routing.module';
import { BeyondtecContinueQuoteComponent } from './beyondtec-continue-quote.component';
import {  ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '../../layout/layout.module';

@NgModule({
  declarations: [BeyondtecContinueQuoteComponent],
  imports: [
    CommonModule,
    LayoutModule,
    ReactiveFormsModule,
    BeyondtecContinueQuoteRoutingModule,
    NgSelectModule,
    NgbModule
  ]
})
export class BeyondtecContinueQuoteModule { }
