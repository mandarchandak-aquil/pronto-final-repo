import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductBoatInsuranceRoutingModule } from './product-boat-insurance-routing.module';
import { ProductBoatInsuranceComponent } from './product-boat-insurance.component';
import { LayoutModule } from '../../layout/layout.module';

@NgModule({
  declarations: [ProductBoatInsuranceComponent],
  imports: [
    CommonModule,
    ProductBoatInsuranceRoutingModule,
    LayoutModule
  ]
})
export class ProductBoatInsuranceModule { }
