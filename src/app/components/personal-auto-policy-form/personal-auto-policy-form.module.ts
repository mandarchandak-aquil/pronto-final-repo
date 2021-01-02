import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonalAutoPolicyFormRoutingModule } from './personal-auto-policy-form-routing.module';
import { PersonalAutoPolicyFormComponent } from './personal-auto-policy-form.component';
import { LayoutModule } from '../../layout/layout.module';

@NgModule({
  declarations: [PersonalAutoPolicyFormComponent],
  imports: [
    CommonModule,
    PersonalAutoPolicyFormRoutingModule,
    LayoutModule
  ]
})
export class PersonalAutoPolicyFormModule { }
