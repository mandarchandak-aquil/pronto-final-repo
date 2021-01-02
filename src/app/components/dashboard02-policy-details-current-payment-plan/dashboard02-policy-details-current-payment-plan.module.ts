import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Dashboard02PolicyDetailsCurrentPaymentPlanRoutingModule } from './dashboard02-policy-details-current-payment-plan-routing.module';
import { Dashboard02PolicyDetailsCurrentPaymentPlanComponent } from './dashboard02-policy-details-current-payment-plan.component';

import { NgbModule, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LayoutModule } from '../../layout/layout.module';

@NgModule({
  declarations: [Dashboard02PolicyDetailsCurrentPaymentPlanComponent],
  imports: [
    CommonModule,
    LayoutModule,
    Dashboard02PolicyDetailsCurrentPaymentPlanRoutingModule
  ]
})
export class Dashboard02PolicyDetailsCurrentPaymentPlanModule { }
