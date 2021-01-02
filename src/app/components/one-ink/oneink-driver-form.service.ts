

import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { map, elementAt } from 'rxjs/operators';
import { Observable } from 'rxjs';


import {insuredDriverMaxDOBValidator} from '../../commons/validators/insured-driver-max-dob.validator';
import {validateMinDateOfBirth} from '../../commons/validators/min-date-birth.validator';
import {validateBeforeCurrentDate} from '../../commons/validators/before-current-date.validator';
import {onlyLetterAndSpacesValidator} from '../../commons/validators/only-letter-and-spaces.validator';
import {floridaLicenseValidator} from '../../commons/validators/florida-license.validator';

@Injectable()
export class oneInkDriverFormService implements OnInit {
   public drivers_array$: FormGroup;
  public violation_array$: FormGroup;
  constructor(
    private readonly fb: FormBuilder,
    private readonly http: HttpClient
  ) { }
  ngOnInit()
  {
    
  }

  
// Driver Section ===============================================================================

  getDriverForm()
  {
    this.drivers_array$ = this.fb.group({
      driver: this.fb.array([]),
    });
  }
 
 
  generateDriver()
  {
    var control = <FormArray>this.drivers_array$.controls.driver;

    const onlyLettersAndSpacesRequiredValidator = Validators.compose([
      Validators.required,
      onlyLetterAndSpacesValidator
    ]);
  console.log(control,"in generateDriver")
      control.push(
          this.fb.group({
            from_api:['no'],
            firstName: ['',[Validators.required, onlyLettersAndSpacesRequiredValidator]],
            middleName: ['', onlyLetterAndSpacesValidator],
            lastName: ['',[Validators.required, onlyLettersAndSpacesRequiredValidator]],
            suffix: [''],
            dob: ['', Validators.compose([
              Validators.required,
              validateBeforeCurrentDate,
              validateMinDateOfBirth,
              insuredDriverMaxDOBValidator
            ])],
            maritalStatus: ['', Validators.required],
            gender: ['', Validators.required],
            relation: [{value: 'applicant', disabled: false}],
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
              licenseState: ['', Validators.required],
             
            }),
            violationsArray : this.fb.array([]),
            AccidentsArray : this.fb.array([]),
          }));
    

    
  }
  assignLocalToDriver(json)
  {
    
    var control = <FormArray>this.drivers_array$.controls.driver;

    if (json != '') {
    var i=0;
      json.forEach(element => {
        console.log(element,"element")
        
        this.generateDriver();
        (<FormArray>this.drivers_array$.controls['driver']).at(i).patchValue(element);
      
          console.log(i ,"and",element.violationsArray)
          // this.generateViolation(i,element.violationsArray);
            this.assignViolation(element.violationsArray,i);
            this.assignAccident(element.AccidentsArray,i);
            i++;
      });

  }

  }
  // Driver Section End===============================================================================

  // Violation Section===============================================================================
 
  generateViolation(index,values)
  {
  console.log(index,"index")
  console.log(values,"values")
  // (<FormArray>((<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(index))).controls['violationsArray']
  var control = (<FormArray>((<FormArray>this.drivers_array$.controls['driver']).at(index))).controls['violationsArray'];
  //console.log(control,"index")
  control.push(
    this.fb.group({
      violation_date: [values.violation_date],
      violation_desc: [values.violation_desc ],
    
    }));
  }
  assignViolation(values: any, driver_index) {
    var control = (<FormArray>((<FormArray>this.drivers_array$.controls['driver']).at(driver_index))).controls['violationsArray'];
    if (values != '') {

      let i = 0;
      values.forEach(element => {
        control.push(
          this.fb.group({
            code: [element.code == null ? i : element.code],
            date: [element.date == null ? '' : element.date],
            name: [element.name == null ?  '' : element.name],
            violation_date: [element.violation_date== null ? '' : element.violation_date],
            violation_desc: [element.violation_desc== null ? '' : element.violation_desc],
          }));
          i++;
      });
    }
  }
// Violation Section End===============================================================================
  // accident Section===============================================================================

  generateAccident(index,values)
  {
  
  // (<FormArray>((<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(index))).controls['violationsArray']
  var control = (<FormArray>((<FormArray>this.drivers_array$.controls['driver']).at(index))).controls['AccidentsArray'];
  console.log(control,"index")
  console.log(values,"values")
  control.push(
    this.fb.group({
      accident_date: [values.accident_date],
      accident_desc: [values.accident_desc ]
    }));
  }
  assignAccident(values: any, driver_index) {
    var control = (<FormArray>((<FormArray>this.drivers_array$.controls['driver']).at(driver_index))).controls['AccidentsArray'];
    if (values != '') {

      let i = 0;
      values.forEach(element => {
        control.push(
          this.fb.group({
            accident_date: [element.accident_date== null ? '' : element.accident_date],
            accident_desc: [element.accident_desc== null ? '' : element.accident_desc],
           
          }));
          i++;
      });
    }
  }

// accident Section End===============================================================================
  


  //local storage store arrays
  saveResponse(masterData: any,type) {
  if (type=="vehicle") {
    localStorage.setItem('beyontech_vehicles', JSON.stringify(masterData));
    // var a =localStorage.getItem('beyontec');
    // console.log(a,"localStorage")
  }
  if (type=="driver") {
    localStorage.setItem('oneink_drivers', JSON.stringify(masterData));
    // var a =localStorage.getItem('beyontec');
    // console.log(a,"localStorage")
  }

  }

}
