import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductSupplementalHealthInsuranceRoutingModule } from './product-supplemental-health-insurance-routing.module';
import { ProductSupplementalHealthInsuranceComponent } from './product-supplemental-health-insurance.component';
import { LayoutModule } from '../../layout/layout.module';

@NgModule({
  declarations: [ProductSupplementalHealthInsuranceComponent],
  imports: [
    CommonModule,
    ProductSupplementalHealthInsuranceRoutingModule,
    LayoutModule
  ]
})
export class ProductSupplementalHealthInsuranceModule { }
