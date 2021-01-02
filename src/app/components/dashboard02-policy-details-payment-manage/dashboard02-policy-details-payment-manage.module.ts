import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Dashboard02PolicyDetailsPaymentManageRoutingModule } from './dashboard02-policy-details-payment-manage-routing.module';
import { Dashboard02PolicyDetailsPaymentManageComponent } from './dashboard02-policy-details-payment-manage.component';

import { LayoutModule } from '../../layout/layout.module';
import { NgbModule, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SlickCarouselModule } from 'ngx-slick-carousel';
@NgModule({
  declarations: [Dashboard02PolicyDetailsPaymentManageComponent],
  imports: [
    CommonModule,
    LayoutModule,
    NgSelectModule,
    ReactiveFormsModule,
    Dashboard02PolicyDetailsPaymentManageRoutingModule,
    SlickCarouselModule
  ]
})
export class Dashboard02PolicyDetailsPaymentManageModule { }
