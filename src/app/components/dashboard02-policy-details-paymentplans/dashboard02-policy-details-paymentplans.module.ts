import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Dashboard02PolicyDetailsPaymentplansRoutingModule } from './dashboard02-policy-details-paymentplans-routing.module';
import { Dashboard02PolicyDetailsPaymentplansComponent } from './dashboard02-policy-details-paymentplans.component';

import { LayoutModule } from '../../layout/layout.module';
import { NgbModule, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
@NgModule({
  declarations: [Dashboard02PolicyDetailsPaymentplansComponent],
  imports: [
    CommonModule,
    LayoutModule,
    NgSelectModule,
    ReactiveFormsModule,
    
    Dashboard02PolicyDetailsPaymentplansRoutingModule
  ]
})
export class Dashboard02PolicyDetailsPaymentplansModule { }
