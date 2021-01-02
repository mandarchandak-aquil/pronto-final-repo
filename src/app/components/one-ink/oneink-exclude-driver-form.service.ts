

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
import { excludedDriverMaxDOBValidator } from '../../commons/validators/excluded-driver-max-dob.validator copy';

@Injectable()
export class oneInkExcludeDriverFormService implements OnInit {
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
    const beforeCurrentDateRequiredValidator = Validators.compose([
      Validators.required,
      validateBeforeCurrentDate,
      validateMinDateOfBirth,
      excludedDriverMaxDOBValidator
    ]);
  console.log(control,"in generateDriver")
      control.push(
          this.fb.group({
            firstName: ['', onlyLettersAndSpacesRequiredValidator],
      middleName: ['', onlyLetterAndSpacesValidator],
      lastName: ['', onlyLettersAndSpacesRequiredValidator],
      suffix: [''],
      dob: ['', beforeCurrentDateRequiredValidator],
      maritalStatus: ['', Validators.required],
      gender: ['', Validators.required],
      relation: ['', Validators.required],
      exclude_driver_id:['']
          }));
    

    
  }
  assignLocalToDriver(json)
  {
    
    var control = <FormArray>this.drivers_array$.controls.driver;

    if (json != '') {
    var i=0;
      json.forEach(element => {
        
        
        this.generateDriver();
        var formated_dob=(element['person']['dateOfBirth']).split('-')[1]+'/'+(element['person']['dateOfBirth']).split('-')[2]+'/'+(element['person']['dateOfBirth']).split('-')[0]
        console.log(formated_dob,"element");
        (<FormArray>this.drivers_array$.controls['driver']).at(i).get('firstName').setValue(element['person']['firstName']);
        (<FormArray>this.drivers_array$.controls['driver']).at(i).get('lastName').setValue(element['person']['lastName']);
        (<FormArray>this.drivers_array$.controls['driver']).at(i).get('middleName').setValue(element['person']['middleName']);
        (<FormArray>this.drivers_array$.controls['driver']).at(i).get('gender').setValue(element['person']['gender']);
        (<FormArray>this.drivers_array$.controls['driver']).at(i).get('maritalStatus').setValue(element['person']['family']['maritalStatus']);
        (<FormArray>this.drivers_array$.controls['driver']).at(i).get('relation').setValue(element['person']['family']['relationToApplicant']);
        (<FormArray>this.drivers_array$.controls['driver']).at(i).get('exclude_driver_id').setValue(element['id']);
        (<FormArray>this.drivers_array$.controls['driver']).at(i).get('dob').setValue(formated_dob);
            i++;
      });

  }

  }
  


  //local storage store arrays
  saveResponse(masterData: any,type) {
 
  if (type=="exclude_driver") {
    localStorage.setItem('oneink_exclude_drivers', JSON.stringify(masterData));
    // var a =localStorage.getItem('beyontec');
    // console.log(a,"localStorage")
  }

  }

}
