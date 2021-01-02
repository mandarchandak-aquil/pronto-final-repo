import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductMexicoInsuranceRoutingModule } from './product-mexico-insurance-routing.module';
import { ProductMexicoInsuranceComponent } from './product-mexico-insurance.component';
import { LayoutModule } from '../../layout/layout.module';

@NgModule({
  declarations: [ProductMexicoInsuranceComponent],
  imports: [
    CommonModule,
    ProductMexicoInsuranceRoutingModule,
    LayoutModule
  ]
})
export class ProductMexicoInsuranceModule { }
