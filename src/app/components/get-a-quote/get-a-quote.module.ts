import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../../layout/layout.module';
import { GetAQuoteRoutingModule } from './get-a-quote-routing.module';
import { GetAQuoteComponent } from './get-a-quote.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [GetAQuoteComponent],
  imports: [
    CommonModule,
    LayoutModule,
    GetAQuoteRoutingModule,
    NgSelectModule
  ]
})
export class GetAQuoteModule { }
