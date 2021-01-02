import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { B01Component } from './b01/b01.component';
import { Beyontec02AComponent } from './beyontec02-a/beyontec02-a.component';
import { Beyontec02BComponent } from './beyontec02-b/beyontec02-b.component';
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

const routes: Routes = [
  // { path: '', component: QuoteProComponent },
  { path: '01', pathMatch:'prefix', component: B01Component },
  { path: 'voilation-detail', pathMatch:'prefix', component: BeyontecManageViolationsComponent },
  { path: '02-a', pathMatch:'prefix', component: Beyontec02AComponent },
  { path: '02-b', pathMatch:'prefix', component: Beyontec02BComponent },
  { path: '03-a', pathMatch:'prefix', component: Beyontec03AComponent },
  { path: '03-b', pathMatch:'prefix', component: Beyontec03BComponent },
  { path: '04', pathMatch:'prefix', component: Beyontec04Component },
  { path: '05', pathMatch:'prefix', component: Beyontec05Component },
  { path: '06', pathMatch:'prefix', component: Beyontec06Component },
  { path: '07', pathMatch:'prefix', component: Beyontec07Component },
  { path: '07-a', pathMatch:'prefix', component: Beyontec07AComponent },
  { path: '07-b', pathMatch:'prefix', component: Beyontec07BComponent },
  { path: '07-c', pathMatch:'prefix', component: Beyontec07CDiscountComponent },
  { path: '08', pathMatch:'prefix', component: Beyontec08Component },
  { path: '09', pathMatch:'prefix', component: Beyontec09Component },
  { path: '10', pathMatch:'prefix', component: Beyontec10Component },
  { path: '11', pathMatch:'prefix', component: Beyontec11Component },
  { path: '', redirectTo: '/', pathMatch: 'full' }

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BeyontecRoutingModule { }
