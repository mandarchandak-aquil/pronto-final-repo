import { Component, OnInit } from '@angular/core';
import { oneInkDriverFormService } from '../oneink-driver-form.service';
import { Router } from '@angular/router';
import { FormArray, Validators } from '@angular/forms';
import { oneInkDropdownService } from '../../../commons/services/one-ink/one-ink-dropdowns.service';
import { oneInkService } from '../../../commons/services/one-ink/one-ink.service';
import { getLocaleDateFormat } from '@angular/common';
import { Subject } from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import { floridaLicenseValidator } from '../../../commons/validators/florida-license.validator';
@Component({
  selector: 'app-primary-driver-details',
  templateUrl: './primary-driver-details.component.html',
  styleUrls: ['./primary-driver-details.component.css']
})
export class PrimaryDriverDetailsComponent implements OnInit {
  maritalStatus:any=[];
  driver_suffix:any=[];
  relation_applicant:any=[];
  json_driver_local:any=[];
  LicenseType:any=[];
  state_list:any=[];
  qouteId;
  age:any='';
  unsubscribe: Subject<void>;
  constructor(private oneInkService:oneInkService,public oneInkDriverForm:oneInkDriverFormService,public router: Router,private oneinkdropdown:oneInkDropdownService,private oneink:oneInkService) { 
    this.unsubscribe = new Subject();
    this.getMaritalStatus();
    this.getSuffix();
   this.getrelationToApplicant();
   this.getdriverLicenseType();
   this.getState();
  }
  ngOnInit(): void {
    this.qouteId=localStorage.getItem('oneink_qouteId');
    this.json_driver_local = JSON.parse(localStorage.getItem("oneink_drivers"));
    if(this.json_driver_local!=undefined && this.json_driver_local!=null)
    { 
      this.oneInkDriverForm.getDriverForm();
      this.oneInkDriverForm.assignLocalToDriver(this.json_driver_local)
      console.log(this.oneInkDriverForm.drivers_array$,"ifdrivers_array")
    }
    else
    {
        this.oneInkDriverForm.getDriverForm();
        this.oneInkDriverForm.generateDriver();
        this.getLocalData();
        console.log(this.oneInkDriverForm.drivers_array$,"elsedrivers_array")
    }
    console.log(this.oneInkDriverForm.drivers_array$,"drivers_array")
this.oneInkDriverForm.drivers_array$.valueChanges.subscribe(value => { 
  this.oneInkDriverForm.saveResponse(value.driver, "driver")
});
this.setUpLicenseFirstTime();
this.setUpLicenseStateFirstTime();
this.setUpLicenseTypeChanges();
this.setUpLicenseStateChanges();
this.setupAge();
(<FormArray>((<FormArray>this.oneInkDriverForm.drivers_array$.controls['driver']).at(0))).get('relation').setValue("applicant");
  }
  setupAge()
  {
    
    var dob=(<FormArray>this.oneInkDriverForm.drivers_array$.controls['driver']).at(0).get('dob');
    const dateOfBirth = dob.value;
    if (dateOfBirth) {
       this.setAge(dateOfBirth); 
     }
   (<FormArray>this.oneInkDriverForm.drivers_array$.controls['driver']).at(0).get('dob').
    valueChanges.pipe(takeUntil(this.unsubscribe)).subscribe(newDate => {
    
      if (newDate  && dob.valid) {
        this.setAge(newDate);
      } else {
        this.age = '';
      }
    });
   
  }
  private setAge(dateOfBirth: Date) {
    const todayDate = new Date();
    const dateDifference = todayDate.getTime() - new Date(dateOfBirth).getTime();
    if(new Date(dateDifference).getUTCFullYear())
    {
      this.age = Math.abs(new Date(dateDifference).getUTCFullYear() - 1970);
    }
    
  }
  private setUpLicenseTypeChanges() {
    var licenseState=(<FormArray>((<FormArray>this.oneInkDriverForm.drivers_array$.controls['driver']).at(0))).controls['license'].get('licenseState');
var licenseNumber=(<FormArray>((<FormArray>this.oneInkDriverForm.drivers_array$.controls['driver']).at(0))).controls['license'].get('licenseNumber');
var licenseDate=(<FormArray>((<FormArray>this.oneInkDriverForm.drivers_array$.controls['driver']).at(0))).controls['license'].get('licenseDate');

  (<FormArray>((<FormArray>this.oneInkDriverForm.drivers_array$.controls['driver']).at(0))).controls['license'].get('licenseType')
.valueChanges.pipe(takeUntil(this.unsubscribe)).subscribe(newLicenseType => {
 
  console.log(newLicenseType)
      if (newLicenseType !== undefined) {
       
        if (newLicenseType === 'international') {
          licenseState.reset();
         licenseState.disable();
         licenseNumber.enable();
         licenseDate.enable();
        } else if (newLicenseType === 'unlicensed') {
         licenseState.reset();
         licenseNumber.reset();
         licenseDate.reset();
         licenseState.disable();
         licenseNumber.disable();
         licenseDate.disable();
        } 
        else {
         licenseState.enable();
         licenseNumber.enable();
         licenseDate.enable();
        }
      }
      (<FormArray>((<FormArray>this.oneInkDriverForm.drivers_array$.controls['driver']).at(0))).controls['license'].updateValueAndValidity();
    });
  }
  private setUpLicenseFirstTime() {
    var licenseState=(<FormArray>((<FormArray>this.oneInkDriverForm.drivers_array$.controls['driver']).at(0))).controls['license'].get('licenseState');
var licenseNumber=(<FormArray>((<FormArray>this.oneInkDriverForm.drivers_array$.controls['driver']).at(0))).controls['license'].get('licenseNumber');
var licenseDate=(<FormArray>((<FormArray>this.oneInkDriverForm.drivers_array$.controls['driver']).at(0))).controls['license'].get('licenseDate');

  var newLicenseType=(<FormArray>((<FormArray>this.oneInkDriverForm.drivers_array$.controls['driver']).at(0))).controls['license'].get('licenseType').value;

 
  console.log(newLicenseType)
      if (newLicenseType !== undefined) {
       
        if (newLicenseType === 'international') {
          licenseState.reset();
         licenseState.disable();
         licenseNumber.enable();
         licenseDate.enable();
        } else if (newLicenseType === 'unlicensed') {
         licenseState.reset();
         licenseNumber.reset();
         licenseDate.reset();
         licenseState.disable();
         licenseNumber.disable();
         licenseDate.disable();
        } 
        else {
         licenseState.enable();
         licenseNumber.enable();
         licenseDate.enable();
        }
      }
      (<FormArray>((<FormArray>this.oneInkDriverForm.drivers_array$.controls['driver']).at(0))).controls['license'].updateValueAndValidity();
   
  }
  private setUpLicenseStateFirstTime() {
    var licenseNumber=(<FormArray>((<FormArray>this.oneInkDriverForm.drivers_array$.controls['driver']).at(0))).controls['license'].get('licenseNumber');
   var  newState=(<FormArray>((<FormArray>this.oneInkDriverForm.drivers_array$.controls['driver']).at(0))).controls['license'].get('licenseState').value;
      if (newState === 'fl') {
        licenseNumber.setValidators(Validators.compose([
          Validators.required,
          floridaLicenseValidator
        ]));
        licenseNumber.updateValueAndValidity();
      } else {
        licenseNumber.setValidators(Validators.compose([
          Validators.required,
          Validators.maxLength(13)
        ]));
        licenseNumber.updateValueAndValidity();
      }
  
  }
  private setUpLicenseStateChanges() {
    var licenseNumber=(<FormArray>((<FormArray>this.oneInkDriverForm.drivers_array$.controls['driver']).at(0))).controls['license'].get('licenseNumber');
    (<FormArray>((<FormArray>this.oneInkDriverForm.drivers_array$.controls['driver']).at(0))).controls['license'].get('licenseState')
    .valueChanges.pipe(takeUntil(this.unsubscribe)).subscribe(newState => {
      if (newState === 'fl') {
        licenseNumber.setValidators(Validators.compose([
          Validators.required,
          floridaLicenseValidator
        ]));
        licenseNumber.updateValueAndValidity();
      } else {
        licenseNumber.setValidators(Validators.compose([
          Validators.required,
          Validators.maxLength(13)
        ]));
        licenseNumber.updateValueAndValidity();
      }
    });
  }
  getLocalData()
  {
    var local_user_info=JSON.parse(localStorage.getItem('oneink_userInfo'));
    (<FormArray>((<FormArray>this.oneInkDriverForm.drivers_array$.controls['driver']).at(0))).controls['license'].get('licenseState').setValue('fl');
    console.log( (<FormArray>((<FormArray>this.oneInkDriverForm.drivers_array$.controls['driver']).at(0))).controls['license'].get('licenseState').value,"local_user_info['firstName']");
   
    (<FormArray>this.oneInkDriverForm.drivers_array$.controls['driver']).at(0).get('firstName').setValue(local_user_info['firstName']);
    (<FormArray>this.oneInkDriverForm.drivers_array$.controls['driver']).at(0).get('lastName').setValue(local_user_info['lastName']);
   
  }
  filterDropdown(result)
  {
    console.log(result)
    var jsonToBeUsed = [];
    for (var type in result) {
     var item = {};
     item['id'] = type;
     item['name'] = result[type]['displayName'];
     jsonToBeUsed.push(item);
   
 }
 return jsonToBeUsed;
  }
  getGender()
  {

    this.oneinkdropdown.getGender().pipe(takeUntil(this.unsubscribe)).subscribe(result => 
      {
        
       //this.maritalStatus=result;
     
   this.maritalStatus=this.filterDropdown(result);
  });
}
getMaritalStatus()
{

  this.oneinkdropdown.getMaritalStatus().pipe(takeUntil(this.unsubscribe)).subscribe(result => 
    {
      var jsonToBeUsed = [];
      for (var type in result) {
       var item = {};
       item['id'] = type;
       item['name'] = result[type];
       jsonToBeUsed.push(item);
     
   }
   console.log(jsonToBeUsed,"jsonToBeUsed")
 this.maritalStatus=jsonToBeUsed;
});
}

getSuffix()
  {

    this.oneinkdropdown.getdriverNameSuffix().pipe(takeUntil(this.unsubscribe)).subscribe(result => 
      {
   this.driver_suffix=this.filterDropdown(result);;
  });
}
getrelationToApplicant()
  {

    this.oneinkdropdown.getrelationToApplicant().pipe(takeUntil(this.unsubscribe)).subscribe(result => 
      {
        
  
   this.relation_applicant=this.filterDropdown(result);
   console.log(this.relation_applicant,"relation_applicant")
  });
}
getdriverLicenseType()
  {

    this.oneinkdropdown.getdriverLicenseType().pipe(takeUntil(this.unsubscribe)).subscribe(result => 
      {
     
   this.LicenseType=this.filterDropdown(result);
  
  });
}
getState()
{
  this.oneInkService.getusState().pipe(takeUntil(this.unsubscribe)).subscribe(result => 
    {
      this.state_list=result;
      var jsonToBeUsed = [];
      for (var type in result) {
       var item = {};
       item['value'] = type;
       item['name'] = result[type]['displayName'];
       jsonToBeUsed.push(item);
   }
  this.state_list=jsonToBeUsed;
 
});
}
  submit()
  {
    console.log(this.oneInkDriverForm.drivers_array$)
    this.router.navigate(['/one-ink/driver-list']);
  }
  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
