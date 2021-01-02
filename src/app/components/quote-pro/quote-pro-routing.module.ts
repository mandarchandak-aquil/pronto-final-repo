import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuoteProComponent } from './quote-pro.component';
import { Quote01Component } from './quote01/quote01.component';
import { ProQuotationComponent } from './pro-quotation//quote03.component';
import { ProFirstResolver } from '../../commons/resolver/qoute-pro-first-resolver.service';
import { ProQuatationResolver } from '../../commons/resolver/qoute-pro-quatation.service.';
import { Quote01AdditionalDriverComponent } from './quote01-additional-driver/quote01-additional-driver.component';
import { Quote02AdditionalVehicleComponent } from './quote02-additional-vehicle/quote02-additional-vehicle.component';
import { AddViolationsComponent } from './add-violations/add-violations.component';
import { QuoteCoveragesNewComponent } from './quote-coverages new/quote-coverages.component';
import { QuoteUnderwritingComponent } from './quote-underwriting/quote-underwriting.component';
import { QuoteProThanksComponent } from './quote-pro-thanks/quote-pro-thanks.component';
import { QuotePurchaseComponent } from './quote-purchase/quote-purchase.component';

const routes: Routes = [
  { path: '', component: QuoteProComponent },
  { path: '01',pathMatch:'postfix', component: Quote01Component ,resolve: {
    location: ProFirstResolver
  }},
  { path: 'quotation',pathMatch:'postfix', component: ProQuotationComponent ,resolve: {
    qoute: ProFirstResolver
  }},
  { path: 'additional-driver',pathMatch:'postfix', component: Quote01AdditionalDriverComponent ,resolve: {
    location: ProFirstResolver
  }},
  { path: 'additional-vehicle',pathMatch:'postfix', 
  component: Quote02AdditionalVehicleComponent,resolve: {
    location: ProFirstResolver
  } },
  { path: 'add-violations',pathMatch:'postfix', 
  component: AddViolationsComponent ,resolve: {
    location: ProFirstResolver
  }},
  { path: 'thanks',pathMatch:'postfix', 
  component: QuoteProThanksComponent ,resolve: {
    location: ProFirstResolver
  }},
  // { path: 'coverage',pathMatch:'postfix', 
  // component: QuoteCoveragesComponent ,resolve: {
  //   location: ProFirstResolver
  // }},
  { path: 'coverage',pathMatch:'postfix', 
  component: QuoteCoveragesNewComponent ,resolve: {
    location: ProFirstResolver
  }},
  { path: 'underwritting',pathMatch:'postfix', 
  component: QuoteUnderwritingComponent ,resolve: {
    location: ProFirstResolver
  }},
  { path: 'purchase',pathMatch:'postfix', 
  component: QuotePurchaseComponent,resolve: {
    location: ProFirstResolver
  }},
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuoteProRoutingModule { }
