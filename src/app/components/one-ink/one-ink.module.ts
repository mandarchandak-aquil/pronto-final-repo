import { LayoutModule } from '../../layout/layout.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

//share module
import { NgSelectModule } from '@ng-select/ng-select';
import { OneInkRoutingModule } from './one-ink-routing.module';
import { OneinkSidebarComponent } from './oneink-sidebar/oneink-sidebar.component';
import { OneinkStepperComponent } from './oneink-stepper/oneink-stepper.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { PrimaryDriverDetailsComponent } from './primary-driver-details/primary-driver-details.component';
import { VehicleCoverageComponent } from './vehicle-coverage/vehicle-coverage.component';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { VehicleAddComponent } from './vehicle-add/vehicle-add.component';
import { IncludeDriverComponent } from './include-driver/include-driver.component';
import { DriverListComponent } from './driver-list/driver-list.component';

// Service
import { oneInkDriverFormService } from './oneink-driver-form.service';
import { oneInkDropdownService } from '../../commons/services/one-ink/one-ink-dropdowns.service';
import { oneInkService } from '../../commons/services/one-ink/one-ink.service';
import { UnderwrittingComponent } from './underwritting/underwritting.component';
import { QuoteSummaryComponent } from './quote-summary/quote-summary.component';
import { oneInkUnderWrittingFormService } from './underwritting-form.service';
import { DialogComponent } from '../../commons/components/dialog/dialog.component';
import { UndisclosedDriversListComponent } from './undisclosed-drivers-list/undisclosed-drivers-list.component';
import { UndisclosedExcludeDriverComponent } from './undisclosed-exclude-driver/undisclosed-exclude-driver.component';
import { UndisclosedIncludeDriverComponent } from './undisclosed-include-driver/undisclosed-include-driver.component';
import { oneInkExcludeDriverFormService } from './oneink-exclude-driver-form.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { OneInkInterceptor } from './oneink.interceptor';
import { PaymentComponent } from './payment/payment.component';
import { oneInkPaymentService } from '../../commons/services/one-ink/one-ink-payment.service';


@NgModule({
  declarations: [
    UserInfoComponent,
    DialogComponent,
    UnderwrittingComponent,
    PrimaryDriverDetailsComponent,
    OneinkStepperComponent,
    OneinkSidebarComponent, 
    UserInfoComponent, 
    PrimaryDriverDetailsComponent, 
    VehicleCoverageComponent,
    VehicleListComponent, 
    VehicleAddComponent,
    DriverListComponent,
    IncludeDriverComponent,
PrimaryDriverDetailsComponent,OneinkStepperComponent
    ,OneinkSidebarComponent,
     UserInfoComponent, PrimaryDriverDetailsComponent, DriverListComponent,
      IncludeDriverComponent,
      QuoteSummaryComponent,
      UndisclosedDriversListComponent,
      UndisclosedExcludeDriverComponent,
        UndisclosedIncludeDriverComponent,
        PaymentComponent,
  ],
  imports: [
    CommonModule,
    OneInkRoutingModule,
    NgSelectModule,
    LayoutModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  providers: [
    oneInkDriverFormService,
    oneInkDropdownService,
    oneInkService,
    oneInkUnderWrittingFormService,
    oneInkExcludeDriverFormService,
    oneInkPaymentService,
    ,{ provide: HTTP_INTERCEPTORS, useClass: OneInkInterceptor, multi: true }
  ],
})
export class OneInkModule { }














