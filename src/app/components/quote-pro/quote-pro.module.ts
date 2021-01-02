import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';


import { LayoutModule } from '../../layout/layout.module';
import { QuoteProRoutingModule } from './quote-pro-routing.module';
import { QuoteProComponent } from './quote-pro.component';
import { StepperComponent } from './stepper/stepper.component';
import { ProSidebarComponent } from './pro-sidebar/pro-sidebar.component';
import { Quote01Component } from './quote01/quote01.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { QuoteProFormService } from './quote-pro-form.service';


//share module
import { NgSelectModule } from '@ng-select/ng-select';
import { qouteproService } from '../../commons/services/qoute-pro/qoute-pro.service';
import { JsonApiService } from '@quotepro/aq3';
import { ProQuotationComponent } from './pro-quotation//quote03.component';
import { ProFirstResolver } from '../../commons/resolver/qoute-pro-first-resolver.service';
import { ProQuatationResolver } from '../../commons/resolver/qoute-pro-quatation.service.';
import { Quote01AdditionalDriverComponent } from './quote01-additional-driver/quote01-additional-driver.component';
import { Quote02AdditionalVehicleComponent } from './quote02-additional-vehicle/quote02-additional-vehicle.component';
import { ProValidationDirective } from '../../commons/directive/qoute-pro/pro-validation.directive';
import { AddViolationsComponent } from './add-violations/add-violations.component';
import { QuoteCoveragesComponent } from './quote-coverages/quote-coverages.component';
import { QuoteCoveragesNewComponent } from './quote-coverages new/quote-coverages.component';
import { QuoteUnderwritingComponent } from './quote-underwriting/quote-underwriting.component';
import { QuoteProThanksComponent } from './quote-pro-thanks/quote-pro-thanks.component';
import { QuotePurchaseComponent } from './quote-purchase/quote-purchase.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptor } from '../../core/interceptor/loader.interceptor';
@NgModule({
  declarations: [QuoteProComponent,StepperComponent,ProSidebarComponent,Quote01Component
    ,ProQuotationComponent,Quote01AdditionalDriverComponent,Quote02AdditionalVehicleComponent
  ,ProValidationDirective,AddViolationsComponent,QuoteCoveragesComponent,QuoteCoveragesNewComponent
,QuoteUnderwritingComponent,QuoteProThanksComponent,QuotePurchaseComponent
],
  imports: [
    CommonModule,
    NgSelectModule,
    QuoteProRoutingModule,
    
    LayoutModule,ReactiveFormsModule,FormsModule
  ],
  providers: [QuoteProFormService,DatePipe,qouteproService,JsonApiService,ProFirstResolver,ProQuatationResolver,{ provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }],

  entryComponents:[QuoteProComponent]
})
export class QuoteProModule { }
