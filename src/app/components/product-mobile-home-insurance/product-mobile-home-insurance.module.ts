import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductMobileHomeInsuranceRoutingModule } from './product-mobile-home-insurance-routing.module';
import { ProductMobileHomeInsuranceComponent } from './product-mobile-home-insurance.component';
import { LayoutModule } from '../../layout/layout.module';

@NgModule({
  declarations: [ProductMobileHomeInsuranceComponent],
  imports: [
    CommonModule,
    ProductMobileHomeInsuranceRoutingModule,
    LayoutModule
  ]
})
export class ProductMobileHomeInsuranceModule { }
