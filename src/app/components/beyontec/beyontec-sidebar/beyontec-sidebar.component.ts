import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BeyontecFormService } from '../beyontec-form.service';
import { Router } from '@angular/router';
import { FormArray } from '@angular/forms';
import { MalihuScrollbarService } from 'ngx-malihu-scrollbar';


@Component({
  selector: 'beyontec-sidebar',
  templateUrl: './beyontec-sidebar.component.html',
  styleUrls: ['./beyontec-sidebar.component.css']
})
export class BeyontecSidebarComponent implements OnInit {
  json_vehicle:any;
  json_drivers:any;
  json_coverage:any;
  vehicle_not_available:boolean=true;
  driver_not_available:boolean=true;
  isMinQ : boolean = false;
  beyontech_nusr : boolean = false;
  isMinQuote : boolean = false;
  countVehicle : any;
  countDriver : any;
  vehicleLength : any;
  constructor( public BeyontecFormService:BeyontecFormService,private router: Router,public cd:ChangeDetectorRef, private mScrollbarService: MalihuScrollbarService,) { }

  ngOnInit(): void {

    this.beyontech_nusr = JSON.parse(localStorage.getItem("beyontech_nusr"));
    this.isMinQuote = JSON.parse(localStorage.getItem("isMinQuote"));
    
    this.json_vehicle = JSON.parse(localStorage.getItem("beyontech_vehicles"));
    this.json_drivers = JSON.parse(localStorage.getItem("beyontech_drivers"));
    this.json_coverage = JSON.parse(localStorage.getItem("beyontec_coverage"));
    // console.log(this.beyontech_nusr,"beyontech_nusr")
    
    // if(localStorage.getItem('beyontech_nusr')){
    //   if(this.BeyontecFormService.drivers_array$){
    //     this.BeyontecFormService.drivers_array$.reset();
    //   }
    //   if(this.BeyontecFormService.vehicles_array$){
    //     this.BeyontecFormService.vehicles_array$.reset();
    //   }
    //   if(this.BeyontecFormService.coverage_array$){
    //     this.BeyontecFormService.coverage_array$.reset();
    //   }      
    // }
    
      // this.isMinQ = JSON.parse(localStorage.getItem("isMinQuote"));;
    
    // console.log(this.isMinQ)
  }
  ngAfterViewInit()
  {

    

    if(this.json_vehicle!=undefined && this.json_vehicle!=null && this.BeyontecFormService.vehicles_array$==undefined)
    {
      this.BeyontecFormService.getVehicleForm();
      this.BeyontecFormService.assignLocalToVehicle(this.json_vehicle);
      
    }
    if(this.json_drivers!=undefined && this.json_drivers!=null && this.BeyontecFormService.drivers_array$==undefined)
    {
      this.BeyontecFormService.getDriverForm();
      this.BeyontecFormService.assignLocalToDriver(this.json_drivers);
    }
    if(this.json_coverage!=undefined && this.json_coverage!=null && this.BeyontecFormService.coverage_array$==undefined)
    {
      this.BeyontecFormService.getCoverageForm();
      this.BeyontecFormService.coverage_array$.get('pip').setValue(this.json_coverage.pip)
      this.BeyontecFormService.coverage_array$.get('umpd').setValue(this.json_coverage.umpd)
      this.BeyontecFormService.coverage_array$.get('umbi').setValue(this.json_coverage.umbi)
      this.BeyontecFormService.coverage_array$.get('pd').setValue(this.json_coverage.pd)
      this.BeyontecFormService.coverage_array$.get('rqEffDt').setValue(this.json_coverage.rqEffDt)
    }

    if(this.json_vehicle!=undefined && this.json_vehicle!=null)
    {
      this.vehicleLength=this.BeyontecFormService.vehicles_array$.value.vehicle.length;
    }else{
      this.vehicleLength= 0;
    }
    
    // console.log(this.BeyontecFormService.vehicles_array$.value.vehicle.length, 'vehicles_array')
      // this.isMinQ = JSON.parse(localStorage.getItem("isMinQuote"));
   
    

    this.cd.detectChanges();
    // this.driver_not_available=this.BeyontecFormService.drivers_array$.value.driver.length > 0 ? false:true;
    // this.vehicle_not_available=this.BeyontecFormService.vehicles_array$.value.vehicle.length > 0 ? false:true;

    this.mScrollbarService.initScrollbar('#myElementId', { axis: 'y', theme: 'dark-thick', scrollButtons: { enable: true } });
    
    }
    ngOnChanges()
    {
      
    } 
  edit_driver(i)
  {
   
    this.router.navigate(['/beyontec/03-b',{index:i}]);
    
  }
  add_driver()
  {

    const control = (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']);
    // console.log(control.value, "add new driver")
    this.countDriver = 0;
    control.value.forEach(element => {
      // console.log(element, "add_new_Vehicle element")
      // console.log(element.include, "add_new_Vehicle element include")
      if (element.driver_include) {
        this.countDriver++;
      }
      // console.log(this.countDriver, "include count")
      // 
    });

    if(this.countDriver < 5){
      this.router.navigate(['/beyontec/03-b']);
    }else{
      alert("Can not Add More Than 5 Driver");
    }
    
  }
  edit_vehicle(i)
  {
    this.router.navigate(['/beyontec/02-b', { index: i }]);
  }
  add_vehicle()
  {
    const control = (<FormArray>this.BeyontecFormService.vehicles_array$.controls['vehicle']);
    this.countVehicle = 0;
    control.value.forEach(element => {
      if(element.include){
        this.countVehicle++;
      }
      
    });

    // console.log(this.countVehicle, "include count Vehicle")

    if(this.countVehicle < 4){
      this.router.navigate(['/beyontec/02-b']);
    }else{
      alert("Can not Add More Than 4 Vehicle");
    }
    // 
  }

  edit_coverage(){
    this.router.navigate(['/beyontec/04']);
  }

  driver_list()
  {
    this.router.navigate(['/beyontec/03-a']);
  }

  vehicle_list(){
    this.router.navigate(['/beyontec/02-a']);
  }
}
