import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoadsideAssistanceInsuranceRoutingModule } from './product-roadside-assistance-insurance-routing.module';
import { ProductRoadsideAssistanceInsuranceComponent } from './product-roadside-assistance-insurance.component';
import { LayoutModule } from '../../layout/layout.module';

@NgModule({
  declarations: [ProductRoadsideAssistanceInsuranceComponent],
  imports: [
    CommonModule,
    ProductRoadsideAssistanceInsuranceRoutingModule,
    LayoutModule
  ]
})
export class ProductRoadsideAssistanceInsuranceModule { }
