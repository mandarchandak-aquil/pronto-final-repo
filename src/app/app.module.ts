import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { SlickCarouselModule } from 'ngx-slick-carousel';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthComponent } from './layout/auth/auth.component';
import { AdminComponent } from './layout/admin/admin.component';

import { LayoutModule } from './layout/layout.module';
import { AgmCoreModule } from '@agm/core';
import { BeyontecModule } from './components/beyontec/beyontec.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

// import { OnlyPatternDirective } from './commons/directive/beyontec/only-pattern.directive';
// import { CheckEmailDirective } from './commons/directive/beyontec/check-email.directive';
// import { GetDecimalsPipe } from './commons/pipes/get-decimals.pipe';





// import { HeaderComponent } from './layout/header/header.component';

// import { HeaderComponent } from './header/header.component';
// import { FooterComponent } from './footer/footer.component';
// import { HomeComponent } from './home/home.component';

// import { CounterSectionComponent } from './counter-section/counter-section.component';
// import { AutoInsuranceComponent } from './auto-insurance/auto-insurance.component';
// import { ClaimsComponent } from './claims/claims.component';
// import { SecurityPolicyComponent } from './security-policy/security-policy.component';
// import { LoginComponent } from './login/login.component';
// import { Quote01Component } from './quote01/quote01.component';
// import { FooterQuoteComponent } from './footer-quote/footer-quote.component';
// import { Quote01AdditionalDriverComponent } from './quote01-additional-driver/quote01-additional-driver.component';
// import { Dashboard01NotificationsComponent } from './dashboard01-notifications/dashboard01-notifications.component';
// import { DashboardResponsiveTopHeaderComponent } from './dashboard-responsive-top-header/dashboard-responsive-top-header.component';
// import { DashboardSideNavComponent } from './dashboard-side-nav/dashboard-side-nav.component';
// import { DashboardSideUserinfoComponent } from './dashboard-side-userinfo/dashboard-side-userinfo.component';
// import { Dashboard02MyPoliciesComponent } from './dashboard02-my-policies/dashboard02-my-policies.component';
// import { Dashboard02PolicyDetailsComponent } from './dashboard02-policy-details/dashboard02-policy-details.component';
// import { Dashboard03ClaimCenterComponent } from './dashboard03-claim-center/dashboard03-claim-center.component';
// import { Dashboard04DocumentsComponent } from './dashboard04-documents/dashboard04-documents.component';
// import { Dashboard05PaymentSettingsComponent } from './dashboard05-payment-settings/dashboard05-payment-settings.component';
// import { Dashboard06AccountSettingComponent } from './dashboard06-account-setting/dashboard06-account-setting.component';
// import { Error404Component } from './error404/error404.component';
// import { Quote02VehicleComponent } from './quote02-vehicle/quote02-vehicle.component';
// import { Quote02AdditionalVehicleComponent } from './quote02-additional-vehicle/quote02-additional-vehicle.component';
// import { Quote03Component } from './quote03/quote03.component';
// import { QuoteUnderwritingComponent } from './quote-underwriting/quote-underwriting.component';
// import { QuotePurchaseComponent } from './quote-purchase/quote-purchase.component';
// import { QuoteCoveragesComponent } from './quote-coverages/quote-coverages.component';


 
@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    AdminComponent,
    // OnlypatternDirective,
  
    // OnlyPatternDirective,
    // CheckEmailDirective,
    // GetDecimalsPipe,
    
    // HeaderComponent,
    // HeaderComponent,
    // FooterComponent,
    // HomeComponent,
    // CounterSectionComponent,
    // AutoInsuranceComponent,
    // ClaimsComponent,
    // SecurityPolicyComponent,
    // LoginComponent,
    // Quote01Component,
    // FooterQuoteComponent,
    // Quote01AdditionalDriverComponent,
    // Dashboard01NotificationsComponent,
    // DashboardResponsiveTopHeaderComponent,
    // DashboardSideNavComponent,
    // DashboardSideUserinfoComponent,
    // Dashboard02MyPoliciesComponent,
    // Dashboard02PolicyDetailsComponent,
    // Dashboard03ClaimCenterComponent,
    // Dashboard04DocumentsComponent,
    // Dashboard05PaymentSettingsComponent,
    // Dashboard06AccountSettingComponent,
    // Error404Component,
    // Quote02VehicleComponent,
    // Quote02AdditionalVehicleComponent,
    // Quote03Component,
    // QuoteUnderwritingComponent,
    // QuotePurchaseComponent,
    // QuoteCoveragesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlickCarouselModule,
    MalihuScrollbarModule.forRoot(),
    LayoutModule,
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      // apiKey: 'AIzaSyD2nrtsGljN49kIa_y9F1U1o7KGg2pFf-c'
      apiKey: 'AIzaSyAkXNMHSioMW3OTW-kq-kwYdil5g6Hu-g8'
    }),
    BeyontecModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyD2nrtsGljN49kIa_y9F1U1o7KGg2pFf-c',
    //   libraries: ['places']
    // })
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
