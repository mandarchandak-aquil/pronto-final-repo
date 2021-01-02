import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dashboard02PolicyDetailsPaymentAddRoutingModule } from './dashboard02-policy-details-payment-add-routing.module';
import { Dashboard02PolicyDetailsPaymentAddComponent } from './dashboard02-policy-details-payment-add.component';
import { LayoutModule } from '../../layout/layout.module';
import { NgbModule, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
@NgModule({
  declarations: [Dashboard02PolicyDetailsPaymentAddComponent],
  imports: [
    CommonModule,
    LayoutModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    Dashboard02PolicyDetailsPaymentAddRoutingModule
  ]
})
export class Dashboard02PolicyDetailsPaymentAddModule { }
