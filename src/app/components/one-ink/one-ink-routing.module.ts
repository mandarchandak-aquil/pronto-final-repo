import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserInfoComponent } from './user-info/user-info.component';
import { PrimaryDriverDetailsComponent } from './primary-driver-details/primary-driver-details.component';
import { VehicleCoverageComponent } from './vehicle-coverage/vehicle-coverage.component';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { VehicleAddComponent } from './vehicle-add/vehicle-add.component';

import { DriverListComponent } from './driver-list/driver-list.component';
import { IncludeDriverComponent } from './include-driver/include-driver.component';
import { UnderwrittingComponent } from './underwritting/underwritting.component';
import { QuoteSummaryComponent } from './quote-summary/quote-summary.component';
import { UndisclosedExcludeDriverComponent } from './undisclosed-exclude-driver/undisclosed-exclude-driver.component';
import { UndisclosedDriversListComponent } from './undisclosed-drivers-list/undisclosed-drivers-list.component';
import { UndisclosedIncludeDriverComponent } from './undisclosed-include-driver/undisclosed-include-driver.component';
import { PaymentComponent } from './payment/payment.component';
const routes: Routes = [
  { path: 'user-info',pathMatch:'postfix', 
  component:UserInfoComponent },
  { path: 'primary-details', 
  component:PrimaryDriverDetailsComponent },
  { path: 'driver-list',pathMatch:'postfix', 
  component:DriverListComponent },
  { path: 'include-driver',pathMatch:'postfix', 
  component:IncludeDriverComponent },
  { path: 'underwritting',pathMatch:'postfix', 
  component:UnderwrittingComponent },
  { path: '02-b',pathMatch:'postfix', 
  component:VehicleAddComponent },
  { path: '02-c',pathMatch:'postfix', 
  component:VehicleListComponent },
  { path: '03',pathMatch:'postfix', 
  component:VehicleCoverageComponent },
  { path: 'quote-summary',pathMatch:'postfix', 
  component:QuoteSummaryComponent },
  { path: 'undisclosed-include',pathMatch:'postfix', 
  component:UndisclosedIncludeDriverComponent },
  { path: 'undisclosed-exclude',pathMatch:'postfix', 
  component:UndisclosedExcludeDriverComponent },
  { path: 'undisclosed-list',pathMatch:'postfix', 
  component:UndisclosedDriversListComponent },
  { path: 'payment',pathMatch:'postfix', 
  component:PaymentComponent },

  
  // { path: '05',pathMatch:'postfix', 
  // component:PrimaryDriverDetailsComponent },
  // { path: '06',pathMatch:'postfix', 
  // component:PrimaryDriverDetailsComponent }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OneInkRoutingModule { }












