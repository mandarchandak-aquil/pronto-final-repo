import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './layout/auth/auth.component';
import { AdminComponent } from './layout/admin/admin.component';
import { AuthGuard } from './commons/guards/auth.guard';
const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
    
      { path: '', loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule) },

     { path: 'login', loadChildren: () => import('./components/login/login.module').then(module => module.LoginModule) },
     { path: 'en/mobile-app', loadChildren: () => import('./components/mobile-app/mobile-app.module').then(m => m.MobileAppModule) },
     { path: 'es/mobile-app', loadChildren: () => import('./components/mobile-app/mobile-app.module').then(m => m.MobileAppModule) },


     { path: 'en/claims', loadChildren: () => import('./components/claims/claims.module').then(m => m.ClaimsModule) },
      { path: 'es/claims', loadChildren: () => import('./components/claims/claims.module').then(m => m.ClaimsModule) },
     { path: 'en/claims', loadChildren: () => import('./components/claim-texas/claim-texas.module').then(m => m.ClaimTexasModule) },
       { path: 'en/claims', loadChildren: () => import('./components/claim-florida/claim-florida.module').then(m => m.ClaimFloridaModule) },
      { path: 'en/claims', loadChildren: () => import('./components/claim-center-california/claim-center-california.module').then(m => m.ClaimCenterCaliforniaModule) },
      { path: 'en/claims', loadChildren: () => import('./components/claim-california/claim-california.module').then(m => m.ClaimCaliforniaModule) },
      
      { path: 'es/claims', loadChildren: () => import('./components/claim-texas/claim-texas.module').then(m => m.ClaimTexasModule) },
      { path: 'es/claims', loadChildren: () => import('./components/claim-florida/claim-florida.module').then(m => m.ClaimFloridaModule) },
     { path: 'es/claims', loadChildren: () => import('./components/claim-center-california/claim-center-california.module').then(m => m.ClaimCenterCaliforniaModule) },
     { path: 'es/claims', loadChildren: () => import('./components/claim-california/claim-california.module').then(m => m.ClaimCaliforniaModule) },


      { path: 'dashboard', loadChildren: () => import('./components/dashboard01-notifications/dashboard01-notifications.module').then(m => m.Dashboard01NotificationsModule),
        canActivate: [AuthGuard]
        },
       { path: 'dashboard', loadChildren: () => import('./components/dashboard02-my-policies/dashboard02-my-policies.module').then(m => m.Dashboard02MyPoliciesModule),
        canActivate: [AuthGuard] },
       { path: 'dashboard', loadChildren: () => import('./components/dashboard02-policy-details/dashboard02-policy-details.module').then(m => m.Dashboard02PolicyDetailsModule),
        canActivate: [AuthGuard] },
       { path: 'dashboard', loadChildren: () => import('./components/dashboard03-claim-center/dashboard03-claim-center.module').then(m => m.Dashboard03ClaimCenterModule),
        canActivate: [AuthGuard] },
       { path: 'dashboard', loadChildren: () => import('./components/dashboard04-documents/dashboard04-documents.module').then(m => m.Dashboard04DocumentsModule),
        canActivate: [AuthGuard] },
       { path: 'dashboard', loadChildren: () => import('./components/dashboard05-payment-settings/dashboard05-payment-settings.module').then(m => m.Dashboard05PaymentSettingsModule),
        canActivate: [AuthGuard] },
       { path: 'dashboard', loadChildren: () => import('./components/dashboard06-account-setting/dashboard06-account-setting.module').then(m => m.Dashboard06AccountSettingModule),
        canActivate: [AuthGuard] },
        { path: 'dashboard', loadChildren: () => import('./components/dashboard07-policydetails/dashboard07-policydetails.module').then(m => m.Dashboard07PolicydetailsModule),
        canActivate: [AuthGuard] },
        { path: 'dashboard', loadChildren: () => import('./components/dashboard07-addriver/dashboard07-addriver.module').then(m => m.Dashboard07AddriverModule),
        canActivate: [AuthGuard] },
        { path: 'dashboard', loadChildren: () => import('./components/dashboard-ammedment/dashboard-ammedment.module').then(m => m.DashboardAmmedmentModule),
        canActivate: [AuthGuard] 
      },
      { path: 'dashboard', loadChildren: () => import('./components/dashboard-add-violations/dashboard-add-violations.module').then(m => m.DashboardAddViolationsModule),
      canActivate: [AuthGuard] },
      { path: 'dashboard', loadChildren: () => import('./components/dashboard07-edit-coverage/dashboard07-edit-coverage.module').then(m => m.Dashboard07EditCoverageModule),
      canActivate: [AuthGuard] },


      { path: 'dashboard', loadChildren: () => import('./components/dashboard08-renewal-summary/dashboard08-renewal-summary.module').then(m => m.Dashboard08RenewalSummaryModule),canActivate: [AuthGuard]  },
      { path: 'dashboard', loadChildren: () => import('./components/dashboard08-discount/dashboard08-discount.module').then(m => m.Dashboard08DiscountModule), canActivate: [AuthGuard]   },
      { path: 'dashboard', loadChildren: () => import('./components/dashboard08-vehicle-questionnaire/dashboard08-vehicle-questionnaire.module').then(m => m.Dashboard08VehicleQuestionnaireModule), canActivate: [AuthGuard] },
      { path: 'dashboard', loadChildren: () => import('./components/dashboard08-choose-policy/dashboard08-choose-policy.module').then(m => m.Dashboard08ChoosePolicyModule),

      canActivate: [AuthGuard]  },
      { path: 'dashboard', loadChildren: () => import('./components/dashboard02-policy-details-payment/dashboard02-policy-details-payment.module').then(m => m.Dashboard02PolicyDetailsPaymentModule), canActivate: [AuthGuard]  },
      { path: 'dashboard', loadChildren: () => import('./components/dashboard02-policy-details-payment-history/dashboard02-policy-details-payment-history.module').then(m => m.Dashboard02PolicyDetailsPaymentHistoryModule), canActivate: [AuthGuard]  },
      { path: 'dashboard', loadChildren: () => import('./components/dashboard02-policy-details-paymentplans/dashboard02-policy-details-paymentplans.module').then(m => m.Dashboard02PolicyDetailsPaymentplansModule), canActivate: [AuthGuard]  },
      { path: 'dashboard', loadChildren: () => import('./components/dashboard02-policy-details-payment-add/dashboard02-policy-details-payment-add.module').then(m => m.Dashboard02PolicyDetailsPaymentAddModule), canActivate: [AuthGuard]  },
      { path: 'dashboard', loadChildren: () => import('./components/dashboard02-policy-details-payment-manage/dashboard02-policy-details-payment-manage.module').then(m => m.Dashboard02PolicyDetailsPaymentManageModule), canActivate: [AuthGuard] },
      { path: 'dashboard', loadChildren: () => import('./components/dashboard02-policy-details-confirm-payment/dashboard02-policy-details-confirm-payment.module').then(m => m.Dashboard02PolicyDetailsConfirmPaymentModule) , canActivate: [AuthGuard]},
      { path: 'dashboard', loadChildren: () => import('./components/dashboard02-policy-details-current-payment-plan/dashboard02-policy-details-current-payment-plan.module').then(m => m.Dashboard02PolicyDetailsCurrentPaymentPlanModule), canActivate: [AuthGuard] },
      { path: 'dashboard', loadChildren: () => import('./components/dashboard02-policy-proof/dashboard02-policy-proof.module').then(m => m.Dashboard02PolicyProofModule), canActivate: [AuthGuard] },
      { path: 'es/helpcenter', loadChildren: () => import('./components/helpcenter/helpcenter.module').then(m => m.HelpcenterModule) },
        { path: 'en/helpcenter', loadChildren: () => import('./components/helpcenter/helpcenter.module').then(m => m.HelpcenterModule) },

      // { path: 'claims', loadChildren: () => import('./components/claims/claims.module').then(m => m.ClaimsModule) },
      // { path: 'claims', loadChildren: () => import('./components/claim-texas/claim-texas.module').then(m => m.ClaimTexasModule) },
      // { path: 'claims', loadChildren: () => import('./components/claim-florida/claim-florida.module').then(m => m.ClaimFloridaModule) },
      // { path: 'claims', loadChildren: () => import('./components/claim-center-california/claim-center-california.module').then(m => m.ClaimCenterCaliforniaModule) },
      // { path: 'claims', loadChildren: () => import('./components/claim-california/claim-california.module').then(m => m.ClaimCaliforniaModule) },

      // { path: 'dashboard', loadChildren: () => import('./components/dashboard01-notifications/dashboard01-notifications.module').then(m => m.Dashboard01NotificationsModule) },
      //  { path: 'dashboard', loadChildren: () => import('./components/dashboard02-my-policies/dashboard02-my-policies.module').then(m => m.Dashboard02MyPoliciesModule) },
      // { path: 'dashboard', loadChildren: () => import('./components/dashboard02-policy-details/dashboard02-policy-details.module').then(m => m.Dashboard02PolicyDetailsModule) },
      // { path: 'dashboard', loadChildren: () => import('./components/dashboard03-claim-center/dashboard03-claim-center.module').then(m => m.Dashboard03ClaimCenterModule) },
      // { path: 'dashboard', loadChildren: () => import('./components/dashboard04-documents/dashboard04-documents.module').then(m => m.Dashboard04DocumentsModule) },
      // { path: 'dashboard', loadChildren: () => import('./components/dashboard05-payment-settings/dashboard05-payment-settings.module').then(m => m.Dashboard05PaymentSettingsModule) },
      // { path: 'dashboard', loadChildren: () => import('./components/dashboard06-account-setting/dashboard06-account-setting.module').then(m => m.Dashboard06AccountSettingModule) },
      { path: 'en/independent-agent', loadChildren: () => import('./components/independent-agent/independent-agent.module').then(m => m.IndependentAgentModule) },
      { path: 'es/independent-agent', loadChildren: () => import('./components/independent-agent/independent-agent.module').then(m => m.IndependentAgentModule) },

      { path: 'en/sitemap', loadChildren: () => import('./components/sitemap/sitemap.module').then(m => m.SitemapModule) },
      { path: 'es/sitemap', loadChildren: () => import('./components/sitemap/sitemap.module').then(m => m.SitemapModule) },

      { path: 'reset-password', loadChildren: () => import('./components/reset-password/reset-password.module').then(m => m.ResetPasswordModule) },
      { path: 'forgot-password', loadChildren: () => import('./components/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule) },

      { path: 'quick-pay-login', loadChildren: () => import('./components/quick-pay-login/quick-pay-login.module').then(m => m.QuickPayLoginModule) },
      { path: 'get-a-quote', loadChildren: () => import('./components/get-a-quote/get-a-quote.module').then(m => m.GetAQuoteModule) },
      { path: 'en/health-insurance', loadChildren: () => import('./components/health-insurance/health-insurance.module').then(m => m.HealthInsuranceModule) },
      { path: 'es/health-insurance', loadChildren: () => import('./components/health-insurance/health-insurance.module').then(m => m.HealthInsuranceModule) },
 
      { path: 'en/privacy-policy', loadChildren: () => import('./components/privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyModule) },
     { path: 'es/privacy-policy', loadChildren: () => import('./components/privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyModule) },
     
     { path: 'en/texas-personal-auto-policy', loadChildren: () => import('./components/personal-auto-policy-form/personal-auto-policy-form.module').then(m => m.PersonalAutoPolicyFormModule) },
     { path: 'es/texas-personal-auto-policy', loadChildren: () => import('./components/personal-auto-policy-form/personal-auto-policy-form.module').then(m => m.PersonalAutoPolicyFormModule) },
     { path: 'en/sb1567', loadChildren: () => import('./components/sb1567/sb1567.module').then(m => m.Sb1567Module) },
     { path: 'es/sb1567', loadChildren: () => import('./components/sb1567/sb1567.module').then(m => m.Sb1567Module) },
     { path: 'es/sb1567-sign', loadChildren: () => import('./components/sb1567-sign/sb1567-sign.module').then(m => m.Sb1567SignModule) },
     { path: 'en/sb1567-sign', loadChildren: () => import('./components/sb1567-sign/sb1567-sign.module').then(m => m.Sb1567SignModule) },
     { path: 'en/security-policy', loadChildren: () => import('./components/security-policy/security-policy.module').then(m => m.SecurityPolicyModule) },
     { path: 'es/security-policy', loadChildren: () => import('./components/security-policy/security-policy.module').then(m => m.SecurityPolicyModule) },
     { path: 'es/terms-of-use', loadChildren: () => import('./components/terms-of-use/terms-of-use.module').then(m => m.TermsOfUseModule) },
     { path: 'en/terms-of-use', loadChildren: () => import('./components/terms-of-use/terms-of-use.module').then(m => m.TermsOfUseModule) },

     { path: 'en/pharmacy-card', loadChildren: () => import('./components/pharmacy-card/pharmacy-card.module').then(m => m.PharmacyCardModule) },
     { path: 'es/pharmacy-card', loadChildren: () => import('./components/pharmacy-card/pharmacy-card.module').then(m => m.PharmacyCardModule) },

    { path: 'en/agency-locator', loadChildren: () => import('./components/find-an-agent/find-an-agent.module').then(m => m.FindAnAgentModule) },
    { path: 'es/agency-locator', loadChildren: () => import('./components/find-an-agent/find-an-agent.module').then(m => m.FindAnAgentModule) },
    { path: 'agentdetail', loadChildren: () => import('./components/agents-landing-page/agents-landing-page.module').then(m => m.AgentsLandingPageModule) },
  
  
    { path: 'en/product', loadChildren: () => import('./components/auto-insurance/auto-insurance.module').then(m => m.AutoInsuranceModule) },
    { path: 'en/product', loadChildren: () => import('./components/product-motorcycle-insurance/product-motorcycle-insurance.module').then(m => m.ProductMotorcycleInsuranceModule) },
    { path: 'en/product', loadChildren: () => import('./components/product-rv-insurance/product-rv-insurance.module').then(m => m.ProductRvInsuranceModule) },
    { path: 'en/product', loadChildren: () => import('./components/product-boat-insurance/product-boat-insurance.module').then(m => m.ProductBoatInsuranceModule) },
    { path: 'en/product', loadChildren: () => import('./components/product-watercraft-insurance/product-watercraft-insurance.module').then(m => m.ProductWatercraftInsuranceModule) },
     { path: 'en/product', loadChildren: () => import('./components/product-roadside-assistance-insurance/product-roadside-assistance-insurance.module').then(m => m.ProductRoadsideAssistanceInsuranceModule) },
     { path: 'en/product', loadChildren: () => import('./components/product-home-insurance/product-home-insurance.module').then(m => m.ProductHomeInsuranceModule) },
     { path: 'en/product', loadChildren: () => import('./components/product-renters-insurance/product-renters-insurance.module').then(m => m.ProductRentersInsuranceModule) },
     { path: 'en/product', loadChildren: () => import('./components/product-mobile-home-insurance/product-mobile-home-insurance.module').then(m => m.ProductMobileHomeInsuranceModule) },
     { path: 'en/product', loadChildren: () => import('./components/product-medicare-advantage-insurance/product-medicare-advantage-insurance.module').then(m => m.ProductMedicareAdvantageInsuranceModule) },
     { path: 'en/product', loadChildren: () => import('./components/product-supplemental-health-insurance/product-supplemental-health-insurance.module').then(m => m.ProductSupplementalHealthInsuranceModule) },
     { path: 'en/product', loadChildren: () => import('./components/product-mexico-insurance/product-mexico-insurance.module').then(m => m.ProductMexicoInsuranceModule) },
     { path: 'en/product', loadChildren: () => import('./components/product-commercial-insurance/product-commercial-insurance.module').then(m => m.ProductCommercialInsuranceModule) },
     { path: 'en/product', loadChildren: () => import('./components/product-commercial-insurance/product-commercial-insurance.module').then(m => m.ProductCommercialInsuranceModule) },
     { path: 'en/product', loadChildren: () => import('./components/product-mexico-texas-northbound-insurance/product-mexico-texas-northbound-insurance.module').then(m => m.ProductMexicoTexasNorthboundInsuranceModule) },
     { path: 'en/product', loadChildren: () => import('./components/product-mexico-texas-northbound-quote/product-mexico-texas-northbound-quote.module').then(m => m.ProductMexicoTexasNorthboundQuoteModule) },
     { path: 'en/product', loadChildren: () => import('./components/product-mexico-texas-southbound-insurance/product-mexico-texas-southbound-insurance.module').then(m => m.ProductMexicoTexasSouthboundInsuranceModule) },
     { path: 'en/product', loadChildren: () => import('./components/product-mexico-texas-southbound-quote/product-mexico-texas-southbound-quote.module').then(m => m.ProductMexicoTexasSouthboundQuoteModule) },
     { path: 'en/product', loadChildren: () => import('./components/product-mexico-california-insurance/product-mexico-california-insurance.module').then(m => m.ProductMexicoCaliforniaInsuranceModule) },
     { path: 'en/product', loadChildren: () => import('./components/product-mexico-california-quote/product-mexico-california-quote.module').then(m => m.ProductMexicoCaliforniaQuoteModule) },
     { path: 'en/product', loadChildren: () => import('./components/product-mexico-texas-insurance/product-mexico-texas-insurance.module').then(m => m.ProductMexicoTexasInsuranceModule) },
   
  
     { path: 'es/product', loadChildren: () => import('./components/auto-insurance/auto-insurance.module').then(m => m.AutoInsuranceModule) },
     { path: 'es/product', loadChildren: () => import('./components/product-motorcycle-insurance/product-motorcycle-insurance.module').then(m => m.ProductMotorcycleInsuranceModule) },
     { path: 'es/product', loadChildren: () => import('./components/product-rv-insurance/product-rv-insurance.module').then(m => m.ProductRvInsuranceModule) },
     { path: 'es/product', loadChildren: () => import('./components/product-boat-insurance/product-boat-insurance.module').then(m => m.ProductBoatInsuranceModule) },
     { path: 'es/product', loadChildren: () => import('./components/product-watercraft-insurance/product-watercraft-insurance.module').then(m => m.ProductWatercraftInsuranceModule) },
     { path: 'es/product', loadChildren: () => import('./components/product-roadside-assistance-insurance/product-roadside-assistance-insurance.module').then(m => m.ProductRoadsideAssistanceInsuranceModule) },
     { path: 'es/product', loadChildren: () => import('./components/product-home-insurance/product-home-insurance.module').then(m => m.ProductHomeInsuranceModule) },
     { path: 'es/product', loadChildren: () => import('./components/product-renters-insurance/product-renters-insurance.module').then(m => m.ProductRentersInsuranceModule) },
     { path: 'es/product', loadChildren: () => import('./components/product-mobile-home-insurance/product-mobile-home-insurance.module').then(m => m.ProductMobileHomeInsuranceModule) },
     { path: 'es/product', loadChildren: () => import('./components/product-condo-insurance/product-condo-insurance.module').then(m => m.ProductCondoInsuranceModule) },
     { path: 'en/product', loadChildren: () => import('./components/product-condo-insurance/product-condo-insurance.module').then(m => m.ProductCondoInsuranceModule) },

     { path: 'es/product', loadChildren: () => import('./components/product-medicare-advantage-insurance/product-medicare-advantage-insurance.module').then(m => m.ProductMedicareAdvantageInsuranceModule) },
     { path: 'es/product', loadChildren: () => import('./components/product-supplemental-health-insurance/product-supplemental-health-insurance.module').then(m => m.ProductSupplementalHealthInsuranceModule) },
     { path: 'es/product', loadChildren: () => import('./components/product-mexico-insurance/product-mexico-insurance.module').then(m => m.ProductMexicoInsuranceModule) },
     { path: 'es/product', loadChildren: () => import('./components/product-commercial-insurance/product-commercial-insurance.module').then(m => m.ProductCommercialInsuranceModule) },
      { path: 'es/product', loadChildren: () => import('./components/product-commercial-insurance/product-commercial-insurance.module').then(m => m.ProductCommercialInsuranceModule) },
      { path: 'es/product', loadChildren: () => import('./components/product-mexico-texas-northbound-insurance/product-mexico-texas-northbound-insurance.module').then(m => m.ProductMexicoTexasNorthboundInsuranceModule) },
    { path: 'es/product', loadChildren: () => import('./components/product-mexico-texas-northbound-quote/product-mexico-texas-northbound-quote.module').then(m => m.ProductMexicoTexasNorthboundQuoteModule) },
     { path: 'es/product', loadChildren: () => import('./components/product-mexico-texas-southbound-insurance/product-mexico-texas-southbound-insurance.module').then(m => m.ProductMexicoTexasSouthboundInsuranceModule) },
    { path: 'es/product', loadChildren: () => import('./components/product-mexico-texas-southbound-quote/product-mexico-texas-southbound-quote.module').then(m => m.ProductMexicoTexasSouthboundQuoteModule) },
     { path: 'es/product', loadChildren: () => import('./components/product-mexico-california-insurance/product-mexico-california-insurance.module').then(m => m.ProductMexicoCaliforniaInsuranceModule) },
    { path: 'es/product', loadChildren: () => import('./components/product-mexico-california-quote/product-mexico-california-quote.module').then(m => m.ProductMexicoCaliforniaQuoteModule) },
     { path: 'es/product', loadChildren: () => import('./components/product-mexico-texas-insurance/product-mexico-texas-insurance.module').then(m => m.ProductMexicoTexasInsuranceModule) },

   
      { path: 'es/contact', loadChildren: () => import('./components/contact/contact.module').then(m => m.ContactModule) },
      { path: 'en/contact', loadChildren: () => import('./components/contact/contact.module').then(m => m.ContactModule) },



      { path: 'beyontec', loadChildren: () => import('./components/beyontec/beyontec.module').then(m => m.BeyontecModule) },
      { path: 'beyondtec-continue-quote/state/:state/email/:email/quoteId/:quoteId', loadChildren: () => import('./components/beyondtec-continue-quote/beyondtec-continue-quote.module').then(m => m.BeyondtecContinueQuoteModule) },
      { path: 'quote-pro', loadChildren: () => import('./components/quote-pro/quote-pro.module').then(m => m.QuoteProModule) },
      { path: 'one-ink', loadChildren: () => import('./components/one-ink/one-ink.module').then(m => m.OneInkModule) },
       { path: 'en/updates', loadChildren: () => import('./components/corona-update/corona-update.module').then(m => m.CoronaUpdateModule) },
       { path: 'es/updates', loadChildren: () => import('./components/corona-update/corona-update.module').then(m => m.CoronaUpdateModule) },

       { path: 'auth', loadChildren: () => import('./components/signup/signup.module').then(m => m.SignupModule) },
          
    ]
  },
  { path: '404-error', loadChildren: () => import('./components/error404/error404.module').then(m => m.Error404Module) },
  
  
 
  
  
 
  

  { path: '**', redirectTo: '404-error', pathMatch: 'full' }
];



@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', initialNavigation: 'enabled', scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
