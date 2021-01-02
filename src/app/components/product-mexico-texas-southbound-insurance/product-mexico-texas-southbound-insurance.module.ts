import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductMexicoTexasSouthboundInsuranceRoutingModule } from './product-mexico-texas-southbound-insurance-routing.module';
import { ProductMexicoTexasSouthboundInsuranceComponent } from './product-mexico-texas-southbound-insurance.component';
import { LayoutModule } from '../../layout/layout.module';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [ProductMexicoTexasSouthboundInsuranceComponent],
  imports: [
    CommonModule,
    ProductMexicoTexasSouthboundInsuranceRoutingModule,
    LayoutModule,
    NgbAccordionModule
  ]
})
export class ProductMexicoTexasSouthboundInsuranceModule { }
