import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRvInsuranceRoutingModule } from './product-rv-insurance-routing.module';
import { ProductRvInsuranceComponent } from './product-rv-insurance.component';
import { LayoutModule } from '../../layout/layout.module';

@NgModule({
  declarations: [ProductRvInsuranceComponent],
  imports: [
    CommonModule,
    ProductRvInsuranceRoutingModule,
    LayoutModule
  ]
})
export class ProductRvInsuranceModule { }
