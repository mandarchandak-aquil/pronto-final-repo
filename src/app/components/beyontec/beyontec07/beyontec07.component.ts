import { Component, OnInit, Injectable,Input } from '@angular/core';
import { BeyontecService } from '../../../commons/services/beyontec/beyontec.service';
import {FormControl, FormGroup, ReactiveFormsModule, FormsModule, FormBuilder, Validators, FormArray} from '@angular/forms';
import { CommonService } from '../../../commons/services/common/common.service';
import { BeyontecFormService } from '../beyontec-form.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-beyontec07',
  templateUrl: './beyontec07.component.html',
  styleUrls: ['./beyontec07.component.css']
})
export class Beyontec07Component implements OnInit {


  @Input() agreement = {'statementAgree': false, 'vehicleAgree' : false}

  quoteFor = '';
  productQuoteId = '';
  minutesQuote: any;
  driverList: any;
  vehicleList: any;
  coverageVehicle :any[];
lienCount = 0 ;
  constructor(public router: Router, public api_form : BeyontecService, private formBuilder: FormBuilder, public api_common : CommonService, public BeyontecFormService:BeyontecFormService,) { }

  ngOnInit(){

    // console.log(111, "1111")

    this.minutesQuote = JSON.parse(localStorage.getItem('beyontec_minutesQuote'));
    this.driverList = JSON.parse(localStorage.getItem('beyontech_drivers'));
    this.vehicleList = JSON.parse(localStorage.getItem('beyontech_vehicles'));

    // console.log(this.vehicleList, "vehicleList");


    this.coverageVehicle = [];
    if(this.vehicleList!=undefined && this.vehicleList!=null)
    {
      this.BeyontecFormService.getVehicleForm();
      this.BeyontecFormService.assignLocalToVehicle(this.vehicleList)

      // console.log(this.vehicleList);
      
      this.lienCount = 0;

      this.vehicleList.forEach(resource => {
        // console.log(resource);
        if(resource.include && resource.type_of_coverage != "Liability Only"){
          this.coverageVehicle.push(resource)
        } 

      });
      // console.log(this.coverageVehicle, "coverageVehicle")
    }
    // 

    console.log(this.lienCount, "lienCount")


    if(this.minutesQuote == undefined || this.minutesQuote == null){
      this.router.navigate(['beyontec/04']);
    }else{
      this.productQuoteId = this.minutesQuote.productQuoteId;
    }

    if(this.driverList== undefined || this.driverList== null){
      this.router.navigate(['beyontec/01']);
    }else{
      this.quoteFor = this.driverList[0]['firstName']+" "+this.driverList[0]['lastName']
      // this.setDriver();
    }

    if(JSON.parse(localStorage.getItem('agreement')) != undefined || JSON.parse(localStorage.getItem('agreement')) != null){
        this.agreement = JSON.parse(localStorage.getItem('agreement'));
    }

  }


  handleChange(e, control){
    // console.log(e)
    // console.log(control)
    // console.log(this.agreement)
    localStorage.setItem('agreement', JSON.stringify(this.agreement));
  }

  onSubmit(){
    this.router.navigate(['beyontec/07-c']);
  }

  addLienholder(i, e, val){

    console.log(this.BeyontecFormService.vehicles_array$.value.vehicle, "addLienholder");
    // console.log(e)
    if(val == 1){
      this.router.navigate(['beyontec/07-b', { index: i }]);
      localStorage.setItem('beyontech_vehicles', JSON.stringify(this.BeyontecFormService.vehicles_array$.value.vehicle));
    }else{

      // const control = (<FormArray>this.BeyontecFormService.vehicles_array$.controls['vehicle']);

      const control = <FormArray>this.BeyontecFormService.vehicles_array$.controls['vehicle'];
      // (<FormArray>((<FormArray>this.BeyontecFormService.vehicles_array$.controls['vehicle']).at(i)));
      console.log(control);

      this.vehicleList.forEach(resource => {
        // console.log(resource);
        if(resource.include && resource.type_of_coverage != "Liability Only"){
          this.coverageVehicle.push(resource)
        } 
      });


      // var control = (<FormArray>((<FormArray>this.BeyontecFormService.vehicles_array$.controls['vehicle']).at(i))).controls['lienholder'];
      
      
      // control.removeAt(i);
      // // return 0;

      // localStorage.setItem('beyontech_vehicles', JSON.stringify(this.BeyontecFormService.vehicles_array$.value.vehicle));
    }
  }

  checkInsurable(i, e){
    console.log(i);
    // console.log(this.BeyontecFormService.vehicles_array$.value.vehicle, "Check Insurable");
    this.router.navigate(['beyontec/07-a', { index: i }]);
  }
 
}
