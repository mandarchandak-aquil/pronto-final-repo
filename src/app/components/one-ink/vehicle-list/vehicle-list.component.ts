import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, FormsModule, FormBuilder, Validators, FormArray} from '@angular/forms';
import { CommonService } from '../../../commons/services/common/common.service';
import {Injectable} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { OneinkVehicleFormService } from '../oneink-vehicle-form.service';
import { oneInkDriverFormService } from '../oneink-driver-form.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  @ViewChild('delete_vehicle_dialog') delete_vehicle_dialog: ElementRef<HTMLElement>;
  isClicked: boolean = false;
  vehicle_list : any=[];
  qouteId:any;
  delete_vehicle_index;
  constructor(public oneInkDriverForm:oneInkDriverFormService,public router: Router,  private formBuilder: FormBuilder, public api_common : CommonService, private activeroute:ActivatedRoute, public oneInkVehicleForm:OneinkVehicleFormService, private readonly fb: FormBuilder) { }

  ngOnInit(): void {
    this.qouteId=localStorage.getItem('oneink_qouteId');
    if(this.oneInkVehicleForm.vehicle_array$ != undefined || this.oneInkVehicleForm.vehicle_array$ != null){
      this.vehicle_list=this.oneInkVehicleForm.vehicle_array$.value.vehicle
     // console.log(this.vehicle_list, "vehicle_list 11111111")
    }
    else{
      this.vehicle_list= JSON.parse(localStorage.getItem('oneinc_vehicle')).vehicle;

      if(this.vehicle_list){
        this.oneInkVehicleForm.getVehicleForm();
        this.oneInkVehicleForm.assignLocalToVehicle(this.vehicle_list);
      }
  //   console.log(this.vehicle_list, "vehicle_list 22222222")
    }
    
    this.form_oninit();
  }

  form_oninit(){

  }

  add_one_vehicle()
  {
    this.router.navigate(['/one-ink/02-b']);
  }

  edit_vehicle(i){
    console.log(i)
    this.router.navigate(['/one-ink/02-b', { index: i }]);
  }


 

  open_delete_popup(index)
  {
    console.log(index,"iddddd");
    this.delete_vehicle_index=index;
   
    let el: HTMLElement = this.delete_vehicle_dialog.nativeElement;
    el.click();
  }
  delete_model_click()
  {
    this.delete_vehicle(this.delete_vehicle_index)
  }
  
  delete_vehicle(i){

    var len:any=((<FormArray>this.oneInkVehicleForm.vehicle_array$.controls['vehicle']).length-1); 
    console.log(len, "len")
  
    const control = (<FormArray>this.oneInkVehicleForm.vehicle_array$.controls['vehicle']);
    control.removeAt(i);
    localStorage.setItem("oneinc_vehicle", JSON.stringify(this.oneInkVehicleForm.vehicle_array$.value))

    if(len == 0){
      this.router.navigate(['/one-ink/02-b']);
    }
    
      this.vehicle_list=this.oneInkVehicleForm.vehicle_array$.value.vehicle;
      
  }
  onSubmit(){
    this.router.navigate(['/one-ink/03']);
  }

}
