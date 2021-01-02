import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductMedicareAdvantageInsuranceRoutingModule } from './product-medicare-advantage-insurance-routing.module';
import { ProductMedicareAdvantageInsuranceComponent } from './product-medicare-advantage-insurance.component';
import { LayoutModule } from '../../layout/layout.module';

@NgModule({
  declarations: [ProductMedicareAdvantageInsuranceComponent],
  imports: [
    CommonModule,
    ProductMedicareAdvantageInsuranceRoutingModule,
    LayoutModule
  ]
})
export class ProductMedicareAdvantageInsuranceModule { }
