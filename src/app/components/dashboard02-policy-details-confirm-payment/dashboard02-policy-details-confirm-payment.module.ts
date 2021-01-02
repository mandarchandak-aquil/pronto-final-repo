import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Dashboard02PolicyDetailsConfirmPaymentRoutingModule } from './dashboard02-policy-details-confirm-payment-routing.module';
import { Dashboard02PolicyDetailsConfirmPaymentComponent } from './dashboard02-policy-details-confirm-payment.component';

import { NgbModule, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LayoutModule } from '../../layout/layout.module';

@NgModule({
  declarations: [Dashboard02PolicyDetailsConfirmPaymentComponent],
  imports: [
    CommonModule,
    NgSelectModule,
    LayoutModule,
    ReactiveFormsModule,
    Dashboard02PolicyDetailsConfirmPaymentRoutingModule
  ]
})
export class Dashboard02PolicyDetailsConfirmPaymentModule { }
