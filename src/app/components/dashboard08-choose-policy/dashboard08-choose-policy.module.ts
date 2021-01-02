import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LayoutModule } from '../../layout/layout.module';

import { Dashboard08ChoosePolicyRoutingModule } from './dashboard08-choose-policy-routing.module';
import { Dashboard08ChoosePolicyComponent } from './dashboard08-choose-policy.component';


@NgModule({
  declarations: [Dashboard08ChoosePolicyComponent],
  imports: [
    CommonModule,
    Dashboard08ChoosePolicyRoutingModule,
    LayoutModule,
    NgbModule,
    BsDatepickerModule.forRoot(),
    NgSelectModule,
    ReactiveFormsModule, 
    FormsModule
  ]
})
export class Dashboard08ChoosePolicyModule { }
