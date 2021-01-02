import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../../layout/layout.module';
import { HealthInsuranceRoutingModule } from './health-insurance-routing.module';
import { HealthInsuranceComponent } from './health-insurance.component';


@NgModule({
  declarations: [HealthInsuranceComponent],
  imports: [
    CommonModule,
    LayoutModule,
    HealthInsuranceRoutingModule
  ]
})
export class HealthInsuranceModule { }
