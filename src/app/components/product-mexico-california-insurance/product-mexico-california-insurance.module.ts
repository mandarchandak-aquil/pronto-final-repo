import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductMexicoCaliforniaInsuranceRoutingModule } from './product-mexico-california-insurance-routing.module';
import { ProductMexicoCaliforniaInsuranceComponent } from './product-mexico-california-insurance.component';
import { LayoutModule } from '../../layout/layout.module';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [ProductMexicoCaliforniaInsuranceComponent],
  imports: [
    CommonModule,
    ProductMexicoCaliforniaInsuranceRoutingModule,
    LayoutModule,
    NgbAccordionModule
  ]
})
export class ProductMexicoCaliforniaInsuranceModule { }
