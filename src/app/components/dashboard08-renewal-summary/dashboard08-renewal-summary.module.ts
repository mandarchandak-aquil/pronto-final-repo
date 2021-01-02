import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LayoutModule } from '../../layout/layout.module';

import { Dashboard08RenewalSummaryRoutingModule } from './dashboard08-renewal-summary-routing.module';
import { Dashboard08RenewalSummaryComponent } from './dashboard08-renewal-summary.component';


@NgModule({
  declarations: [Dashboard08RenewalSummaryComponent],
  imports: [
    CommonModule,
    Dashboard08RenewalSummaryRoutingModule,
    LayoutModule,
    NgbModule,
    BsDatepickerModule.forRoot(),
    NgSelectModule,
    ReactiveFormsModule, 
    FormsModule
  ]
})
export class Dashboard08RenewalSummaryModule { }
