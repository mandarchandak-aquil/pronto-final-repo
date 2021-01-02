
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { oneInkDriverFormService } from '../oneink-driver-form.service';
import { OneinkVehicleFormService } from '../oneink-vehicle-form.service';
@Component({
  selector: 'oneink-sidebar',
  templateUrl: './oneink-sidebar.component.html',
  styleUrls: ['./oneink-sidebar.component.scss']
})
export class OneinkSidebarComponent implements OnInit {

  json_vehicle:any;
  json_drivers:any;
  json_coverage:any;
  vehicle_not_available:boolean=true;
  driver_not_available:boolean=true;

  constructor(public OneinkVehicleForm:OneinkVehicleFormService, public oneInkDriverForm:oneInkDriverFormService,private router: Router,public cd:ChangeDetectorRef) { }

  ngOnInit(): void {
    this.json_vehicle = JSON.parse(localStorage.getItem("oneinc_vehicle"));
    this.json_drivers = JSON.parse(localStorage.getItem("oneink_drivers"));
    this.json_coverage = JSON.parse(localStorage.getItem("beyontec_coverage"));
    
    //console.log(this.oneInkDriverForm.vehicles_array$,"BeyontecFormService")
 
   
  }
  ngAfterViewInit()
  {
 if(this.json_vehicle!=undefined && this.json_vehicle!=null && this.OneinkVehicleForm.vehicle_array$==undefined)
    {
      this.OneinkVehicleForm.getVehicleForm();
    this.OneinkVehicleForm.assignLocalToVehicle(this.json_vehicle.vehicle);
    }
    if(this.json_drivers!=undefined && this.json_drivers!=null && this.oneInkDriverForm.drivers_array$==undefined)
    {
      this.oneInkDriverForm.getDriverForm();
    this.oneInkDriverForm.assignLocalToDriver(this.json_drivers);
    }
    // if(this.json_coverage!=undefined && this.json_coverage!=null && this.BeyontecFormService.coverage_array$==undefined)
    // {
    //   this.BeyontecFormService.getCoverageForm();
    //   this.BeyontecFormService.coverage_array$.get('pip').setValue(this.json_coverage.pip)
    //   this.BeyontecFormService.coverage_array$.get('umpd').setValue(this.json_coverage.umpd)
    //   this.BeyontecFormService.coverage_array$.get('umbi').setValue(this.json_coverage.umbi)
    //   this.BeyontecFormService.coverage_array$.get('pd').setValue(this.json_coverage.pd)
    //   this.BeyontecFormService.coverage_array$.get('rqEffDt').setValue(this.json_coverage.rqEffDt)
    // }
    }
    ngOnChanges()
    {
      
    } 
  edit_driver(index)
  {
    if(index==0)
    {
      this.router.navigate(['/one-ink/primary-details']);
    }
    else
    {
      this.router.navigate(['/one-ink/include-driver', { index: index }]);
    }
  }
  add_driver()
  {
    this.router.navigate(['/one-ink/include-driver']);
  }
  edit_vehicle(index)
  {
   
      this.router.navigate(['/one-ink/02-b', { index: index }]);
    
  }
  add_vehicle()
  {
    this.router.navigate(['/one-ink/02-b']);
  }
}












// <div class="summary-rail-section" *ngIf="BeyontecFormService.vehicles_array$!=undefined">
// <div class="summaryHead text-color-3">Vehicles</div>
// <form   [formGroup]="BeyontecFormService.vehicles_array$" >
  
    
//   <div formArrayName="vehicle" 
//   *ngFor="let row of BeyontecFormService.vehicles_array$.get('vehicle').controls ; let index=index"   class="summary-rail-item">

// <div *ngIf="row.get('include').value">
//   <div class="summarysubHead mng-btnEdit">{{row.get('year').value }} {{row.get('make').value }} {{row.get('model').value }}
//     <button (click)="edit_vehicle(index)" class="btn btnEdit"><img class="icon w-100 mCS_img_loaded" src="./assets/images/icon-edit.svg" alt=""></button>
//   </div>
//   <div class="response-list gray-color-2">
//     <div class="response-item">{{row.get('type_of_coverage').value}} </div>
//     <!-- <div class="response-item">Liability Only</div> -->
//   </div>
//   </div>
// </div>
// </form>
// <div class="btnRow pl-0">
// <button type="button" (click)="add_vehicle()"  class="btn btn-text-link link-color-2">+ Add another Vehicle</button>
// </div>
// </div>
// <div class="summary-rail-section" *ngIf="BeyontecFormService.coverage_array$!=undefined">
// <div class="summaryHead text-color-3 mng-btnEdit">Coverage Limit
//   <button class="btn btnEdit"><img class="icon w-100 mCS_img_loaded" src="./assets/images/icon-edit.svg" alt=""></button>
// </div>
// <div class="summary-rail-item">
//   <div class="response-list listSZ-md">
//     <div class="response-item">Effective: {{BeyontecFormService.coverage_array$.value.rqEffDt}}<br>
//     <!-- Expires: 11/9/2020</div> -->
//     </div>
//     <div class="response-item">Bodily Injury: {{BeyontecFormService.coverage_array$.value.bi}}</div>
//     <div class="response-item">Uninsured Motorist<br>
//     Bodily Injury: {{BeyontecFormService.coverage_array$.value.umbi}}</div>
//     <div class="response-item">Personal Injury Protection:  {{BeyontecFormService.coverage_array$.value.pip}}</div>
//     <!-- <div class="response-item">Medical Payments: Rejected</div> -->
//   </div>
// </div>
// </div>