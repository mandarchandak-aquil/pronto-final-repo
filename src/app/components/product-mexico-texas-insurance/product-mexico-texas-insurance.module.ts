import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductMexicoTexasInsuranceRoutingModule } from './product-mexico-texas-insurance-routing.module';
import { ProductMexicoTexasInsuranceComponent } from './product-mexico-texas-insurance.component';
import { LayoutModule } from '../../layout/layout.module';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [ProductMexicoTexasInsuranceComponent],
  imports: [
    CommonModule,
    ProductMexicoTexasInsuranceRoutingModule,
    LayoutModule,
    NgbAccordionModule
  ]
})
export class ProductMexicoTexasInsuranceModule { }
