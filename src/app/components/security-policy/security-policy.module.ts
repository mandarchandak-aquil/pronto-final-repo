import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecurityPolicyRoutingModule } from './security-policy-routing.module';
import { SecurityPolicyComponent } from './security-policy.component';
import { LayoutModule } from '../../layout/layout.module';

@NgModule({
  declarations: [SecurityPolicyComponent],
  imports: [
    CommonModule,
    SecurityPolicyRoutingModule,
    LayoutModule
  ]
})
export class SecurityPolicyModule { }
