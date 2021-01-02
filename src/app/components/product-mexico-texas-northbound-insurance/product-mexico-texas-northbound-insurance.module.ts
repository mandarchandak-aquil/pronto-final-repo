import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductMexicoTexasNorthboundInsuranceRoutingModule } from './product-mexico-texas-northbound-insurance-routing.module';
import { ProductMexicoTexasNorthboundInsuranceComponent } from './product-mexico-texas-northbound-insurance.component';
import { LayoutModule } from '../../layout/layout.module';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [ProductMexicoTexasNorthboundInsuranceComponent],
  imports: [
    CommonModule,
    ProductMexicoTexasNorthboundInsuranceRoutingModule,
    LayoutModule,
    NgbAccordionModule
  ]
})
export class ProductMexicoTexasNorthboundInsuranceModule { }
