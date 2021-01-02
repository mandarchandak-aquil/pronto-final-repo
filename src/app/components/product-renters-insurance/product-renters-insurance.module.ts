import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRentersInsuranceRoutingModule } from './product-renters-insurance-routing.module';
import { ProductRentersInsuranceComponent } from './product-renters-insurance.component';
import { LayoutModule } from '../../layout/layout.module';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [ProductRentersInsuranceComponent],
  imports: [
    CommonModule,
    ProductRentersInsuranceRoutingModule,
    NgbAccordionModule,
    LayoutModule

  ]
})
export class ProductRentersInsuranceModule { }
