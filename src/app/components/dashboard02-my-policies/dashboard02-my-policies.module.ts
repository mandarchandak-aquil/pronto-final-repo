import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Dashboard02MyPoliciesRoutingModule } from './dashboard02-my-policies-routing.module';
import { Dashboard02MyPoliciesComponent } from './dashboard02-my-policies.component';
import { LayoutModule } from '../../layout/layout.module';

@NgModule({
  declarations: [Dashboard02MyPoliciesComponent],
  imports: [
    CommonModule,
    Dashboard02MyPoliciesRoutingModule,
    LayoutModule
  ]
})
export class Dashboard02MyPoliciesModule { }
