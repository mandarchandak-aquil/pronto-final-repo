import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProductMotorcycleInsuranceRoutingModule } from './product-motorcycle-insurance-routing.module';
import { ProductMotorcycleInsuranceComponent } from './product-motorcycle-insurance.component';
import { LayoutModule } from '../../layout/layout.module';

@NgModule({
  declarations: [ProductMotorcycleInsuranceComponent],
  imports: [
    CommonModule,
    ProductMotorcycleInsuranceRoutingModule,
    LayoutModule,
    
  ]
})
export class ProductMotorcycleInsuranceModule { }
