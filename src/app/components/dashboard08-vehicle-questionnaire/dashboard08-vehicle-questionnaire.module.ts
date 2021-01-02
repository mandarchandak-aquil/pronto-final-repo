import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LayoutModule } from '../../layout/layout.module';

import { Dashboard08VehicleQuestionnaireRoutingModule } from './dashboard08-vehicle-questionnaire-routing.module';
import { Dashboard08VehicleQuestionnaireComponent } from './dashboard08-vehicle-questionnaire.component';


@NgModule({
  declarations: [Dashboard08VehicleQuestionnaireComponent],
  imports: [
    CommonModule,
    Dashboard08VehicleQuestionnaireRoutingModule,
    LayoutModule,
    NgbModule,
    BsDatepickerModule.forRoot(),
    NgSelectModule,
    ReactiveFormsModule, 
    FormsModule
  ]
})
export class Dashboard08VehicleQuestionnaireModule { }
