import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {  ReactiveFormsModule } from '@angular/forms';
import { OnlyPatternDirective } from '../commons/directive/product/only-pattern.directive';
import { CheckEmailDirective } from '../commons/directive/product/check-email.directive';
import { DobDirective, emptyvaluecheckDirective } from '../commons/directive/all-validation.directive';
import { TrustpilotComponent } from './trustpilot/trustpilot.component';
import { PreLoaderComponent } from './pre-loader/pre-loader.component';
import { MatchHeightDirective } from '../commons/directive/match-height.directive';

import { PhoneMaskDirective } from './phone-mask.directive';
import { TimeMaskDirective } from './time-mask.directive';
import { ModalGetAQuoteComponent } from './modal-get-a-quote/modal-get-a-quote.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FooterQuoteComponent } from './footer-quote/footer-quote.component';
import { CounterSectionComponent } from './counter-section/counter-section.component';
import { DashboardResponsiveTopHeaderComponent } from './dashboard-responsive-top-header/dashboard-responsive-top-header.component';
import { DashboardSideNavComponent } from './dashboard-side-nav/dashboard-side-nav.component';
import { DashboardSideUserinfoComponent } from './dashboard-side-userinfo/dashboard-side-userinfo.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';

import { FormsModule } from '@angular/forms';
import { AdsComponent } from './ads/ads.component';

// import { CountoModule }  from 'angular2-counto';

// import { SafeHtmlPipe } from '../commons/pipes/safe-html.pipe';
import { AgmCoreModule } from '@agm/core';
import { PageLoaderComponent } from './page-loader/page-loader.component';
import { SidebarComponent } from './sidebar/sidebar.component';



import { SocialLoginModule, AuthServiceConfig, AuthService } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";
import { AuthServicess } from '../commons/services/auth/auth.service';

 
 
let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('17452641767-in9u0dcekbqgnpcg01vu1chvqujemvh1.apps.googleusercontent.com')
    
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("922498758279436")
  }
]);
 
export function provideConfig() {
  return config;
}
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SlickCarouselModule,
    MalihuScrollbarModule.forRoot(),
    HttpClientModule,
      FormsModule,
        ReactiveFormsModule,
    // CountoModule 
     AgmCoreModule.forRoot({
          apiKey: 'AIzaSyBLRlv4LRU1MCTkVHNkmVA1CLQndp4PPcg',
          libraries: ["places"]
        }),
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    FooterQuoteComponent,
    CounterSectionComponent,
    DashboardResponsiveTopHeaderComponent,
    DashboardSideNavComponent,
    DashboardSideUserinfoComponent,
    HttpClientModule,
    ModalGetAQuoteComponent,
    TrustpilotComponent,
    PhoneMaskDirective,
    DobDirective,
    TimeMaskDirective,
    FormsModule,
    PreLoaderComponent,
    OnlyPatternDirective,
    CheckEmailDirective,
    AdsComponent,
    PageLoaderComponent,
    SidebarComponent,
    emptyvaluecheckDirective,
    MatchHeightDirective
    // CountoModule 
    // SafeHtmlPipe
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    ModalGetAQuoteComponent,
     OnlyPatternDirective,
     CheckEmailDirective,
     DobDirective,
     PhoneMaskDirective,
     TimeMaskDirective,
     TrustpilotComponent,
     PreLoaderComponent,
    FooterQuoteComponent,
    CounterSectionComponent,
    DashboardResponsiveTopHeaderComponent,
    DashboardSideNavComponent,
    DashboardSideUserinfoComponent,
    AdsComponent,
    PageLoaderComponent,
    SidebarComponent,
    emptyvaluecheckDirective,
    MatchHeightDirective
    
    // SafeHtmlPipe
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    AuthService
  ],
})
export class LayoutModule { 

}
