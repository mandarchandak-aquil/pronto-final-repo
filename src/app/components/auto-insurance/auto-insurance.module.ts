import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { AutoInsuranceRoutingModule } from './auto-insurance-routing.module';
import { AutoInsuranceComponent } from './auto-insurance.component';
import { LayoutModule } from '../../layout/layout.module';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
// import { SafeHtmlPipe } from '../../commons/pipes/safe-html.pipe';

@NgModule({
  declarations: [AutoInsuranceComponent],
  imports: [
    CommonModule,
    AutoInsuranceRoutingModule,
    NgbAccordionModule, 
    LayoutModule,
    NgSelectModule
  ]
})
export class AutoInsuranceModule { }
