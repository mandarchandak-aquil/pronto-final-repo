
import { Component, OnInit } from '@angular/core';
import { oneInkDriverFormService } from '../oneink-driver-form.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

import {insuredDriverMaxDOBValidator} from '../../../commons/validators/insured-driver-max-dob.validator';
import {validateMinDateOfBirth} from '../../../commons/validators/min-date-birth.validator';
import {validateBeforeCurrentDate} from '../../../commons/validators/before-current-date.validator';
import {onlyLetterAndSpacesValidator} from '../../../commons/validators/only-letter-and-spaces.validator';
import {floridaLicenseValidator} from '../../../commons/validators/florida-license.validator';

import { Subject } from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import { oneInkDropdownService } from '../../../commons/services/one-ink/one-ink-dropdowns.service';
import { oneInkService } from '../../../commons/services/one-ink/one-ink.service';
@Component({
  selector: 'app-include-driver',
  templateUrl: './include-driver.component.html',
  styleUrls: ['./include-driver.component.css']
})
export class IncludeDriverComponent implements OnInit {
  maritalStatus:any=[];
  driver_suffix:any=[];
  relation_applicant:any=[];
  json_driver_local:any=[];
  LicenseType:any=[];
  state_list:any=[];
  qouteId;
  unsubscribe: Subject<void>;
  include_driver:FormGroup;
  index:any='';
 age:any='';
  constructor(private oneInkService:oneInkService,private oneinkdropdown:oneInkDropdownService,private activeroute:ActivatedRoute,public oneInkDriverForm:oneInkDriverFormService,public router: Router,   private readonly fb: FormBuilder) { 
    this.index=this.activeroute.snapshot.paramMap.get('index');
    this.unsubscribe = new Subject();
    this.getMaritalStatus();
    this.getSuffix();
   this.getrelationToApplicant();
   this.getdriverLicenseType();
   this.getState();
  }

  ngOnInit(): void {
   
    this.json_driver_local = JSON.parse(localStorage.getItem("oneink_drivers"));
    if(this.json_driver_local!=undefined && this.json_driver_local!=null)
    {
      this.oneInkDriverForm.getDriverForm();
      this.oneInkDriverForm.assignLocalToDriver(this.json_driver_local)
    }
    this.qouteId=localStorage.getItem('oneink_qouteId');
   this.include_driver_form();
   if(this.index)
   {
   this.include_driver.patchValue((<FormArray>this.oneInkDriverForm.drivers_array$.controls['driver']).at(this.index).value)
    
 }
 this.oneInkDriverForm.drivers_array$.valueChanges.subscribe(value => { 
  this.oneInkDriverForm.saveResponse(value.driver, "driver")
});
this.setUpLicenseTypeFirstTime();
this.setUpLicenseStateFirstTime();
 this.setUpLicenseTypeChanges();
this.setUpLicenseStateChanges();
this.setupAge()
  }
  setupAge()
  {
    
    var dob=this.include_driver.get('dob');
    
    const dateOfBirth = dob.value;
   
    if (dateOfBirth!=undefined) {
       this.setAge(dateOfBirth);
     
     }
     this.include_driver.get('dob').
    valueChanges.pipe(takeUntil(this.unsubscribe)).subscribe(newDate => {
    console.log(dob.valid,"dob.valid")
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
  include_driver_form()
  {
    const onlyLettersAndSpacesRequiredValidator = Validators.compose([
      Validators.required,
      onlyLetterAndSpacesValidator
    ]);
 this.include_driver=  this.fb.group({
      from_api:['no'],
      firstName: ['', onlyLettersAndSpacesRequiredValidator],
      middleName: ['', onlyLetterAndSpacesValidator],
      lastName: [, onlyLettersAndSpacesRequiredValidator],
      suffix: [''],
      dob: ['', Validators.compose([
        Validators.required,
        validateBeforeCurrentDate,
        validateMinDateOfBirth,
        insuredDriverMaxDOBValidator
      ])],
      maritalStatus: ['', Validators.required],
      gender: ['', Validators.required],
      relation: [{value: 'applicant'}],
      license: this.fb.group({
        licenseType: ['', Validators.required],
        licenseNumber: ['', Validators.compose([
          Validators.required,
          floridaLicenseValidator
        ])],
        licenseDate: ['', Validators.compose([
          Validators.required,
          validateBeforeCurrentDate
        ])],
        licenseLiabilitySR22: [''],
        licenseLiabilityFR44: [''],
        licenseState: ['', Validators.required]
      })
    });
  }
  private setUpLicenseTypeChanges() {
   this.include_driver.controls['license'].get('licenseType').valueChanges.pipe(takeUntil(this.unsubscribe)).subscribe(newLicenseType => {
      if (newLicenseType !== undefined) {
        if (newLicenseType === 'international') {
          this.include_driver.controls['license'].get('licenseState').reset();
          this.include_driver.controls['license'].get('licenseState').disable();
          this.include_driver.controls['license'].get('licenseNumber').enable();
          this.include_driver.controls['license'].get('licenseDate').enable();
        } else if (newLicenseType === 'unlicensed') {
          this.include_driver.controls['license'].get('licenseState').reset();
          this.include_driver.controls['license'].get('licenseNumber').reset();
          this.include_driver.controls['license'].get('licenseDate').reset();
          this.include_driver.controls['license'].get('licenseState').disable();
          this.include_driver.controls['license'].get('licenseNumber').disable();
          this.include_driver.controls['license'].get('licenseDate').disable();
        } else {
          this.include_driver.controls['license'].get('licenseState').enable();
          this.include_driver.controls['license'].get('licenseNumber').enable();
          this.include_driver.controls['license'].get('licenseDate').enable();
        }
      }
    });
  }

  private setUpLicenseStateChanges() {
    this.include_driver.controls['license'].get('licenseState').valueChanges.pipe(takeUntil(this.unsubscribe)).subscribe(newState => {
      if (newState === 'fl') {
        this.include_driver.controls['license'].get('licenseNumber').setValidators(Validators.compose([
          Validators.required,
          floridaLicenseValidator
        ]));
        this.include_driver.controls['license'].get('licenseNumber').updateValueAndValidity();
      } else {
        this.include_driver.controls['license'].get('licenseNumber').setValidators(Validators.compose([
          Validators.required,
          Validators.maxLength(13)
        ]));
        this.include_driver.controls['license'].get('licenseNumber').updateValueAndValidity();
      }
    });
  }
  private setUpLicenseTypeFirstTime() {
    var newLicenseType=this.include_driver.controls['license'].get('licenseType').value;
           if (newLicenseType !== undefined ) {
         if (newLicenseType === 'international') {
           this.include_driver.controls['license'].get('licenseState').reset();
           this.include_driver.controls['license'].get('licenseState').disable();
           this.include_driver.controls['license'].get('licenseNumber').enable();
           this.include_driver.controls['license'].get('licenseDate').enable();
         } else if (newLicenseType === 'unlicensed') {
           this.include_driver.controls['license'].get('licenseState').reset();
           this.include_driver.controls['license'].get('licenseNumber').reset();
           this.include_driver.controls['license'].get('licenseDate').reset();
           this.include_driver.controls['license'].get('licenseState').disable();
           this.include_driver.controls['license'].get('licenseNumber').disable();
           this.include_driver.controls['license'].get('licenseDate').disable();
         } else {
           this.include_driver.controls['license'].get('licenseState').enable();
           this.include_driver.controls['license'].get('licenseNumber').enable();
           this.include_driver.controls['license'].get('licenseDate').enable();
         }
       }
    
   }
 
   private setUpLicenseStateFirstTime() {
    var newState= this.include_driver.controls['license'].get('licenseState').value; 
      if (newState === 'fl') {
         this.include_driver.controls['license'].get('licenseNumber').setValidators(Validators.compose([
           Validators.required,
           floridaLicenseValidator
         ]));
         this.include_driver.controls['license'].get('licenseNumber').updateValueAndValidity();
       } else {
         this.include_driver.controls['license'].get('licenseNumber').setValidators(Validators.compose([
           Validators.required,
           Validators.maxLength(13)
         ]));
         this.include_driver.controls['license'].get('licenseNumber').updateValueAndValidity();
       }
    
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
     if(!this.index){
      this.addNewDriver();
    }else{
      this.updateNewDriver();
    }
  
  }
  addNewDriver()
  {
    this.oneInkDriverForm.generateDriver();
    var len:any=((<FormArray>this.oneInkDriverForm.drivers_array$.controls['driver']).length-1);          
    (<FormArray>this.oneInkDriverForm.drivers_array$.controls['driver']).at(len).patchValue(this.include_driver.value);
    this.router.navigate(['/one-ink/driver-list']);
  }
  updateNewDriver()
  {
    (<FormArray>this.oneInkDriverForm.drivers_array$.controls['driver']).at(this.index).patchValue(this.include_driver.value);
    this.router.navigate(['/one-ink/driver-list']);
  }
  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
