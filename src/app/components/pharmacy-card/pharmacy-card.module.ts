import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PharmacyCardRoutingModule } from './pharmacy-card-routing.module';
import { PharmacyCardComponent } from './pharmacy-card.component';
import { LayoutModule } from '../../layout/layout.module';

@NgModule({
  declarations: [PharmacyCardComponent],
  imports: [
    CommonModule,
    LayoutModule,
    PharmacyCardRoutingModule
  ]
})
export class PharmacyCardModule { }
