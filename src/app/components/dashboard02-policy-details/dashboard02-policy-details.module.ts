import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LayoutModule } from '../../layout/layout.module';
import { Dashboard02PolicyDetailsRoutingModule } from './dashboard02-policy-details-routing.module';
import { Dashboard02PolicyDetailsComponent } from './dashboard02-policy-details.component';

import { OnlypatternDirective } from '../../commons/directive/dashboard/onlypattern.directive';


@NgModule({
  declarations: [
    Dashboard02PolicyDetailsComponent,
    OnlypatternDirective
  ],
  imports: [
    CommonModule,
    Dashboard02PolicyDetailsRoutingModule,
    LayoutModule,
    NgbModule,
    BsDatepickerModule.forRoot(),
    NgSelectModule,
    ReactiveFormsModule, 
    FormsModule
  ]
})
export class Dashboard02PolicyDetailsModule { }
