import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TermsOfUseRoutingModule } from './terms-of-use-routing.module';
import { TermsOfUseComponent } from './terms-of-use.component';
import { LayoutModule } from '../../layout/layout.module';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [TermsOfUseComponent],
  imports: [
    CommonModule,
    TermsOfUseRoutingModule,
    LayoutModule,
    NgbAccordionModule
  ]
})
export class TermsOfUseModule { }
