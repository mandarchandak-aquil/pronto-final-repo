import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductCommercialInsuranceRoutingModule } from './product-commercial-insurance-routing.module';
import { ProductCommercialInsuranceComponent } from './product-commercial-insurance.component';
import { LayoutModule } from '../../layout/layout.module';

@NgModule({
  declarations: [ProductCommercialInsuranceComponent],
  imports: [
    CommonModule,
    ProductCommercialInsuranceRoutingModule,
    LayoutModule
  ]
})
export class ProductCommercialInsuranceModule { }
