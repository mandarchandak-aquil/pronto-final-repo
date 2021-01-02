import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LayoutModule } from '../../layout/layout.module';


import { Dashboard08DiscountRoutingModule } from './dashboard08-discount-routing.module';
import { Dashboard08DiscountComponent } from './dashboard08-discount.component';


@NgModule({
  declarations: [Dashboard08DiscountComponent],
  imports: [
    CommonModule,
    Dashboard08DiscountRoutingModule,
    LayoutModule,
    NgbModule,
    BsDatepickerModule.forRoot(),
    NgSelectModule,
    ReactiveFormsModule, 
    FormsModule
  ]
})
export class Dashboard08DiscountModule { }
