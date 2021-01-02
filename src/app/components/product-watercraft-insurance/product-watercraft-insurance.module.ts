import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductWatercraftInsuranceRoutingModule } from './product-watercraft-insurance-routing.module';
import { ProductWatercraftInsuranceComponent } from './product-watercraft-insurance.component';
import { LayoutModule } from '../../layout/layout.module';

@NgModule({
  declarations: [ProductWatercraftInsuranceComponent],
  imports: [
    CommonModule,
    ProductWatercraftInsuranceRoutingModule,
    LayoutModule
  ]
})
export class ProductWatercraftInsuranceModule { }
