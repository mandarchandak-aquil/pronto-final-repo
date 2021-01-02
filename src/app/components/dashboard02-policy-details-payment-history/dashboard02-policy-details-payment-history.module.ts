import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Dashboard02PolicyDetailsPaymentHistoryRoutingModule } from './dashboard02-policy-details-payment-history-routing.module';
import { Dashboard02PolicyDetailsPaymentHistoryComponent } from './dashboard02-policy-details-payment-history.component';
import { LayoutModule } from '../../layout/layout.module';
import { NgbModule, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [Dashboard02PolicyDetailsPaymentHistoryComponent],
  imports: [
    CommonModule,
    LayoutModule,
    NgSelectModule,
    ReactiveFormsModule,
    BsDatepickerModule,
    Dashboard02PolicyDetailsPaymentHistoryRoutingModule
  ]
})
export class Dashboard02PolicyDetailsPaymentHistoryModule { }
