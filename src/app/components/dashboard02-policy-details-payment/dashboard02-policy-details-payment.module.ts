import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Dashboard02PolicyDetailsPaymentRoutingModule } from './dashboard02-policy-details-payment-routing.module';
import { Dashboard02PolicyDetailsPaymentComponent } from './dashboard02-policy-details-payment.component';
import { LayoutModule } from '../../layout/layout.module';
import { NgbModule, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [Dashboard02PolicyDetailsPaymentComponent],
  imports: [
    CommonModule,
    LayoutModule,
    ReactiveFormsModule,
    BsDatepickerModule,
    NgSelectModule,
    Dashboard02PolicyDetailsPaymentRoutingModule
  ]
})
export class Dashboard02PolicyDetailsPaymentModule { }
