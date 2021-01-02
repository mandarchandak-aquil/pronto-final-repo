import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import { LayoutModule } from '../../layout/layout.module';

import { BeyontecRoutingModule } from './beyontec-routing.module';

// service
import { BeyontecFormService } from './beyontec-form.service';

// directive
// import { NumbersOnlyDirective } from '../../commons/directive/beyontec/numbers-only.directive';
// import { DateselectDirective } from '../../commons/directive/beyontec/dateselect.directive';
// import { DobDirective } from '../../commons/directive/all-validation.directive';
// import { CheckEmailDirective } from '../../commons/directive/beyontec/check-email.directive';
// import { OnlyPatternDirective } from '../../commons/directive/beyontec/only-pattern.directive';
import { MomentModule } from 'ngx-moment';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
// pipes
// import { GetDecimalsPipe } from '../../commons/pipes/get-decimals.pipe';

// components
import { B01Component } from './b01/b01.component';
import { Beyontec02AComponent } from './beyontec02-a/beyontec02-a.component';
import { Beyontec02BComponent } from './beyontec02-b/beyontec02-b.component';
import { BeyontecSidebarComponent } from './beyontec-sidebar/beyontec-sidebar.component';
import { BeyontecBreadcrumComponent } from './beyontec-breadcrum/beyontec-breadcrum.component';
import { BeyontecManageViolationsComponent } from './beyontec-manage-violations/beyontec-manage-violations.component';
import { Beyontec03AComponent } from './beyontec03-a/beyontec03-a.component';
import { Beyontec03BComponent } from './beyontec03-b/beyontec03-b.component';
import { Beyontec04Component } from './beyontec04/beyontec04.component';
import { Beyontec05Component } from './beyontec05/beyontec05.component';
import { Beyontec06Component } from './beyontec06/beyontec06.component';
import { Beyontec07Component } from './beyontec07/beyontec07.component';
import { Beyontec07AComponent } from './beyontec07-a/beyontec07-a.component';
import { Beyontec07BComponent } from './beyontec07-b/beyontec07-b.component';
import { Beyontec07CDiscountComponent } from './beyontec07-c-discount/beyontec07-c-discount.component';
import { Beyontec08Component } from './beyontec08/beyontec08.component';
import { Beyontec09Component } from './beyontec09/beyontec09.component';
import { Beyontec10Component } from './beyontec10/beyontec10.component';
import { Beyontec11Component } from './beyontec11/beyontec11.component';



@NgModule({
  declarations: [
    // directives
    // NumbersOnlyDirective, 
    // DateselectDirective,
    // DobDirective,
    // CheckEmailDirective,
    // OnlyPatternDirective,

    // components
    B01Component,
    Beyontec02AComponent,
    Beyontec02BComponent,
    BeyontecSidebarComponent,
    BeyontecBreadcrumComponent,
    BeyontecSidebarComponent, 
    BeyontecManageViolationsComponent,
    Beyontec04Component,
    Beyontec03AComponent,
    Beyontec03BComponent,
    Beyontec05Component,
    Beyontec06Component,
    Beyontec07Component,
    Beyontec07AComponent,
    Beyontec07BComponent,
    Beyontec07CDiscountComponent,
    Beyontec08Component,
    Beyontec09Component,
    Beyontec10Component,
    Beyontec11Component,
    
    
    // GetDecimalsPipe
  ],
  imports: [
    CommonModule,
    BeyontecRoutingModule,
    LayoutModule,
    NgSelectModule,
    ReactiveFormsModule, 
    FormsModule,
    NgbModule,
    MomentModule,
    BsDatepickerModule.forRoot()
  ],
  providers: [
    BeyontecFormService,
  ],
})
export class BeyontecModule { }
