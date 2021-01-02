import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';


import {onlyNumberValidator} from '../../../commons/validators/only-number.validator';
import {onlyLetterAndSpacesValidator} from '../../../commons/validators/only-letter-and-spaces.validator';
import {zipCodeValidator} from '../../../commons/validators/zip-code.validator';
import {vinNumberValidator} from '../../../commons/validators/vin-number.validator';
import {onlyLetterSlashAndSpacesValidator} from '../../../commons/validators/only-letter-slash-and-spaces.validator';

import { CommonService } from '../../../commons/services/common/common.service';
import { OneinkVehicleFormService } from '../oneink-vehicle-form.service';

import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import { oneInkService } from '../../../commons/services/one-ink/one-ink.service';
import { oneInkDropdownService } from '../../../commons/services/one-ink/one-ink-dropdowns.service';
import { oneInkDriverFormService } from '../oneink-driver-form.service';
@Component({
  selector: 'app-vehicle-add',
  templateUrl: './vehicle-add.component.html',
  styleUrls: ['./vehicle-add.component.css']
})
export class VehicleAddComponent implements OnInit {
  unsubscribe: Subject<void>;
  form: FormGroup;
  lienholderForm: FormGroup;
  vehicleCoveragesForm: FormGroup;
  
  onlyLettersAndSpacesRequiredValidator : any;
  isReadOnlyVin : boolean = false;
  isClicked: boolean = false;
  isVinValid: boolean = false;
  index : any = null;
  oneinc_vehicle : any;


  comprehensiveList :any=[]

  collisionList :any=[]
  rentalRembusmentList :any=[]
  typeOfUseList :any=[]

   stateList:any=[];

  vehicleDummy=[];
  public qouteId;

  json_vehicle:any;
  constructor(public oneInkDriverForm:oneInkDriverFormService,private oneinkdropdown:oneInkDropdownService,private oneInkService:oneInkService,public router: Router,  private formBuilder: FormBuilder, public api_common : CommonService, private activeroute:ActivatedRoute, public oneInkVehicleForm:OneinkVehicleFormService) { 
    this.index=this.activeroute.snapshot.paramMap.get('index');
    this.unsubscribe = new Subject();
    this.json_vehicle = JSON.parse(localStorage.getItem("oneinc_vehicle"));
   
  
    this.vehicleForm();
  }
  ngOnInit(): void {
  
    console.log(this.index,"this.index")
    this.qouteId=localStorage.getItem('oneink_qouteId');
  this.coverageLimitOptionDefinition();
  this.getuseDropdown();
  this.getState();
    if(localStorage.getItem('oneinc_vehicle') != undefined || localStorage.getItem('oneinc_vehicle') != null){
      this.oneinc_vehicle = JSON.parse(localStorage.getItem('oneinc_vehicle'));
      // console.log(this.oneinc_vehicle , "Local oneinc_vehicle");
    }

    if(this.oneInkVehicleForm.vehicle_array$ == undefined || this.oneInkVehicleForm.vehicle_array$ == null){
      this.oneInkVehicleForm.getVehicleForm();

      if(this.oneinc_vehicle && this.oneinc_vehicle['vehicle']){
        this.oneInkVehicleForm.assignLocalToVehicle(this.oneinc_vehicle.vehicle);
      }

      // console.log(this.oneInkVehicleForm.vehicle_array$.value , "oneInkVehicleForm");
    }

  

    if(this.index)
    {
      this.form.patchValue((<FormArray>this.oneInkVehicleForm.vehicle_array$.controls['vehicle']).at(this.index).value)
    }


  }
  
  coverageLimitOptionDefinition()
  {
    this.oneinkdropdown.getcoverageLimitOptionDefinition().pipe(takeUntil(this.unsubscribe)).subscribe(result => 
      {
        console.log(result,"getcoverageLimitOptionDefinition")
        var coverages:any=result;
       this.comprehensiveList=this.mapComprehensiveCar(coverages,'comp')
       this.collisionList=this.mapComprehensiveCar(coverages,'coll')
       const rejectRentalReimbursement = {
        name: 'Reject',
        id: 'reject'
      };
      this.rentalRembusmentList = [];
      this.rentalRembusmentList.push(rejectRentalReimbursement);
       var response:any=this.mapComprehensiveCar(coverages,'rent')
      this.rentalRembusmentList = this.rentalRembusmentList.concat(response);
  });
  }
  private mapComprehensiveCar(coverages,type){
    return  coverages
    .filter(coverageToFilter => coverageToFilter.type === type && !coverageToFilter.isInactive)
    .map((coverage: any) => {
      return coverage
    });
  }
  private mapCollisionCar(coverages,type){
    return  coverages
    .filter(coverageToFilter => coverageToFilter.type === type && !coverageToFilter.isInactive)
    .map((coverage: any) => {
      return coverage
    });
  }
  private mapRentalCar(coverages,type){
    return  coverages
    .filter(coverageToFilter => coverageToFilter.type === type && !coverageToFilter.isInactive)
    .map((coverage: any) => {
      return coverage
    });
  }

  getuseDropdown()
  {
   
   
    this.oneinkdropdown.getvehicleUse().pipe(takeUntil(this.unsubscribe)).subscribe(result => 
      {
       console.log(result,"getvehicleUse")
       var jsonToBeUsed = [];
      for (var type in result) {
       var item = {};
       item['id'] = type;
       item['name'] = result[type];
       jsonToBeUsed.push(item);
      }
this.typeOfUseList=jsonToBeUsed;
  });
  
  }
  getState()
{
  this.oneInkService.getusState().pipe(takeUntil(this.unsubscribe)).subscribe(result => 
    {
      this.stateList=result;
      var jsonToBeUsed = [];
      for (var type in result) {
       var item = {};
       item['value'] = type;
       item['name'] = result[type]['displayName'];
       jsonToBeUsed.push(item);
   }
  this.stateList=jsonToBeUsed;
 
});
}
getVinValues()
{
  console.log(this.form.get('vin').value,"VinVerify")
  this.oneInkService.VinVerify(this.form.get('vin').value).pipe(takeUntil(this.unsubscribe)).subscribe(result => 
    {
     console.log(result,"VinVerify")
     this.form.get('year').setValue(result[0]['year']);
     this.form.get('make').setValue(result[0]['make']);
     this.form.get('model').setValue(result[0]['model']);
     this.form.get('bodyType').setValue(result[0]['bodyStyle']);
});
  // this.form.controls.vin.valueChanges.pipe(takeUntil(this.unsubscribe)).subscribe(newVin => {
   
  //   if (this.vinNumberForm.controls.vin.valid) {
  //     this.vinIsValid.emit(true);
  //     this.showVerifyButton = true;
  //   } else {
  //     this.vinIsValid.emit(false);
  //   }
  // });
}
  vehicleForm(){
    this.onlyLettersAndSpacesRequiredValidator = Validators.compose([
      Validators.required,
      onlyLetterAndSpacesValidator
    ]);

    this.form = this.formBuilder.group({
      vin: ['', Validators.compose([
        Validators.required,
        vinNumberValidator
      ])],
      year: ['', Validators.compose([
        Validators.required,
        onlyNumberValidator
      ])],
      make: ['', this.onlyLettersAndSpacesRequiredValidator],
      model: ['', Validators.required],
      bodyType: ['', this.onlyLettersAndSpacesRequiredValidator],
      usageType: ['', Validators.compose([
        onlyLetterSlashAndSpacesValidator,
        Validators.required
      ])],
      leased: [false, Validators.required],

      lienholder:this.formBuilder.group({
        name: ['', this.onlyLettersAndSpacesRequiredValidator],
        address: ['', Validators.required],
        city: ['', this.onlyLettersAndSpacesRequiredValidator],
        state: ['', onlyLetterAndSpacesValidator],
        zipCode: ['', Validators.compose([
          Validators.required,
          zipCodeValidator
        ])],
        type: ['', this.onlyLettersAndSpacesRequiredValidator]
      }),

      vehicleCoverages:this.formBuilder.group({
        comprehensive: [''],
        collision: [''],
        rentalReimburse: ['']
      })
    });
    
    this.getConditionalValidation();
    this.form.get('leased').setValue('no');
    // console.log(this.form.value, "form")
    // console.log(this.form.controls['lienholder'].get('name').value, "---------lienholder")
  }

  getConditionalValidation(){
    this.form.get('leased').valueChanges
        .subscribe(value => {
        console.log(value,"leasedvalue");
          if(value == 'no') {
                this.form.controls['lienholder'].get('name').disable();
            this.form.controls['lienholder'].get('address').disable();
            this.form.controls['lienholder'].get('city').disable();
            this.form.controls['lienholder'].get('state').disable();
            this.form.controls['lienholder'].get('zipCode').disable();
            this.form.controls['lienholder'].get('type').disable();

             } else {
            
            this.form.controls['lienholder'].get('name').enable();
            this.form.controls['lienholder'].get('address').enable();
            this.form.controls['lienholder'].get('city').enable();
            this.form.controls['lienholder'].get('state').enable();
            this.form.controls['lienholder'].get('zipCode').enable();
            this.form.controls['lienholder'].get('type').enable();
             }
          this.form.controls.lienholder.updateValueAndValidity(); 
          console.log(this.form.controls.lienholder)
        }
    );
  }


  vinVerify(val)
  {

    let a = this.check_exist(val);
    console.log(a);
    if(!a){
      if(val){
        this.oneInkService.VinVerify(val).pipe(takeUntil(this.unsubscribe)).subscribe(result => 
          {
           console.log(result,"VinVerify in main")
           this.isVinValid=true;
           this.form.get('year').setValue(result[0]['year']);
           this.form.get('make').setValue(result[0]['make']);
           this.form.get('model').setValue(result[0]['model']);
           this.form.get('bodyType').setValue(result[0]['bodyStyle']);
      });
     
        }
    }
    else{
      alert('Vehicle already Exist..!');
      this.form.get('vin').setValue('');
      this.isVinValid=false;
    }


  }

  onSubmit(val)
  {
    console.log(this.form,"val")
    if(!this.index){
      this.addnewvehicle(val);
    }else{
      this.updatevehicle(val);
    }
  }
  addnewvehicle(val) {
    this.oneInkVehicleForm.generateVehicle();
    var len:any=((<FormArray>this.oneInkVehicleForm.vehicle_array$.controls['vehicle']).length-1);          
    (<FormArray>this.oneInkVehicleForm.vehicle_array$.controls['vehicle']).at(len).patchValue(val);
    localStorage.setItem("oneinc_vehicle", JSON.stringify(this.oneInkVehicleForm.vehicle_array$.value))
    this.router.navigate(['/one-ink/02-c']);
  }


  updatevehicle(val){
    (<FormArray>this.oneInkVehicleForm.vehicle_array$.controls['vehicle']).at(this.index).patchValue(val);
    localStorage.setItem("oneinc_vehicle", JSON.stringify(this.oneInkVehicleForm.vehicle_array$.value))
    this.router.navigate(['/one-ink/02-c']);
  }

  check_exist(val){
    // console.log(val, "Check Value")
    var exist:boolean=false;
if(this.oneInkVehicleForm.vehicle_array$)
{
  let vehicleList = this.oneInkVehicleForm.vehicle_array$.value;
    // console.log(vehicleList.vehicle, "vehicleList");

    vehicleList.vehicle.forEach(element => {
        // console.log(element, "element");
        if(element.vin==val)
        {
          exist=true;
          return 0;
        }
      });
}
else
{
  exist=false;
}
      // console.log((<FormArray>this.oneInkVehicleForm.vehicle_array$.controls['vehicle']).value);
  
    return exist;
  }
  
  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
