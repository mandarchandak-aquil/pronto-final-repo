import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductHomeInsuranceRoutingModule } from './product-home-insurance-routing.module';
import { ProductHomeInsuranceComponent } from './product-home-insurance.component';
import { LayoutModule } from '../../layout/layout.module';

@NgModule({
  declarations: [ProductHomeInsuranceComponent],
  imports: [
    CommonModule,
    NgbAccordionModule,
    ProductHomeInsuranceRoutingModule,
    LayoutModule
  ]
})
export class ProductHomeInsuranceModule { }
