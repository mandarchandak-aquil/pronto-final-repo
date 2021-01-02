import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductCondoInsuranceRoutingModule } from './product-condo-insurance-routing.module';
import { ProductCondoInsuranceComponent } from './product-condo-insurance.component';
import { LayoutModule } from '../../layout/layout.module';

@NgModule({
  declarations: [ProductCondoInsuranceComponent],
  imports: [
    CommonModule,
    ProductCondoInsuranceRoutingModule,
    LayoutModule
  ]
})
export class ProductCondoInsuranceModule { }
