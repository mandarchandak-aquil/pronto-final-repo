import { Component, OnInit } from '@angular/core';
import { BeyontecFormService } from '../beyontec-form.service';
import { Router } from '@angular/router';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-beyontec02-a',
  templateUrl: './beyontec02-a.component.html',
  styleUrls: ['./beyontec02-a.component.css']
})
export class Beyontec02AComponent implements OnInit {
  json_vehicle: any;
  json_vehicle_local:any;
  include_count: number = 0;
  exclude_count: number = 0;
  count = 0;

  constructor(public BeyontecFormService: BeyontecFormService, public router: Router) { }
  ngOnInit(): void {
    console.log(this.BeyontecFormService.vehicles_array$, "arrr")
    
    this.json_vehicle_local = JSON.parse(localStorage.getItem("beyontech_vehicles"));
    if(this.json_vehicle_local!=undefined && this.json_vehicle_local!=null)
    {
      this.BeyontecFormService.getVehicleForm();
    
      this.BeyontecFormService.assignLocalToVehicle(this.json_vehicle_local)
    }
    else
    {
      this.json_vehicle = JSON.parse(localStorage.getItem("hrddata")).vehicles;
      if (!this.BeyontecFormService.vehicles_array$) {
        this.BeyontecFormService.getVehicleForm();
        this.BeyontecFormService.assignVehicle(this.json_vehicle);
      }
    }
   
    

    this.BeyontecFormService.vehicles_array$.valueChanges.subscribe(value => { 
      this.BeyontecFormService.saveResponse(value.vehicle, "vehicle")
    });

    const control = (<FormArray>this.BeyontecFormService.vehicles_array$.controls['vehicle']);
    this.count = 0;
    control.value.forEach(element => {
      if(element.include){
        this.count++;
      }
      console.log(this.count, "include count")
    });

    this.get_vehicle_count();

  }
  submit() {
    // console.log(this.BeyontecFormService.vehicles_array$.value);

    let includecount = 0;
    // console.log(this.BeyontecFormService.vehicles_array$.value, "foreach");
    this.BeyontecFormService.vehicles_array$.value.vehicle.forEach(element => {
      console.log(element, "element")
      if (element.include) {
        includecount++;
      }
    });
    console.log(includecount, "include_count")
    if(includecount > 0){
      this.router.navigate(['/beyontec/03-a']);
    }else{
      document.getElementById("openModalnoVehiclies").click();
      // alert('Please Select Atlest One Vehicle To Continue')
    }
    
  }
  get_vehicle_count() {
    console.log(this.BeyontecFormService.vehicles_array$.value, "foreach");
    this.BeyontecFormService.vehicles_array$.value.vehicle.forEach(element => {

      if (element.include) {
        this.include_count++;
      }
      else {
        this.exclude_count++;
      }

      return 0;
    });
    console.log(this.include_count, "include_count", this.exclude_count, "exclude_count")
  }
  
  add_new_Vehicle() {

    
    const control = (<FormArray>this.BeyontecFormService.vehicles_array$.controls['vehicle']);
    // console.log(control.value, "add_new_Vehicle")
    let count = 0;
    control.value.forEach(element => {
      // console.log(element, "add_new_Vehicle element")
      // console.log(element.include, "add_new_Vehicle element include")
      if(element.include){
        count++;
      }
      // console.log(count, "include count")
      // 
    });
    
    if(count < 4){
      this.router.navigate(['/beyontec/02-b']);
    }else{
      document.getElementById("openModalmoreVehiclies").click();
      // alert(1111)
    }
    
  }
  add_Vehicle(i, event) {
    
    const control = (<FormArray>this.BeyontecFormService.vehicles_array$.controls['vehicle']);
      this.count = 0;
      
      control.value.forEach(element => {
        if(element.include){
          this.count++;
         
        }
        console.log(this.count, "include count")
      });

    // console.log(event.target.checked)
    if (!event.target.checked) {

      // alert(1111)
      if (!(<FormArray>this.BeyontecFormService.vehicles_array$.controls['vehicle']).at(i).get('from_api').value) {
        const control = (<FormArray>this.BeyontecFormService.vehicles_array$.controls['vehicle']);
        control.removeAt(i);
        // return 0;
      }
      else {
        (<FormArray>this.BeyontecFormService.vehicles_array$.controls['vehicle']).at(i).get('include').setValue(false)
        // return 0;
      }

      // this.ngOnInit();
     
      this.include_count= 0;
      control.value.forEach(element => {
        if(element.include){
          this.include_count++;
        }
        console.log(this.include_count, "include_count count")
      });
      return 0;

    }
    else {
      // alert(22222);
      (<FormArray>this.BeyontecFormService.vehicles_array$.controls['vehicle']).at(i).get('include').setValue(false)
      this.router.navigate(['/beyontec/02-b', { index: i }]);
    }
    // this.get_vehicle_count();
  }


  add_Vehicle1(i, event) {
    (<FormArray>this.BeyontecFormService.vehicles_array$.controls['vehicle']).at(i).get('include').setValue(false)

    const control = (<FormArray>this.BeyontecFormService.vehicles_array$.controls['vehicle']);
    this.count = 0;
    control.value.forEach(element => {
      if(element.include){
        this.count++;
      }
      console.log(this.count, "include count")
    });

    if(this.count < 4){
      // (<FormArray>this.BeyontecFormService.vehicles_array$.controls['vehicle']).at(i).get('include').setValue(true);
      this.router.navigate(['/beyontec/02-b', { index: i }]);
    }

  }


  edit_Vehicle(i) {
    this.router.navigate(['/beyontec/02-b', { index: i }]);
  }
}
