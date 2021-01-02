
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
import {onlyNumberValidator} from '../../commons/validators/only-number.validator';
import {zipCodeValidator} from '../../commons/validators/zip-code.validator';
import {onlyLetterSlashAndSpacesValidator} from '../../commons/validators/only-letter-slash-and-spaces.validator';
import {validateAfterCurrentDate} from '../../commons/validators/after-current-date.validator';

@Injectable({
  providedIn: 'root'
})
export class OneinkVehicleFormService {
  public vehicle_array$: FormGroup;
  public coverage_array$ : FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly http: HttpClient
  ) { }

  ngOnInit(){}

  getVehicleForm()
  {
    this.vehicle_array$ = this.fb.group({
      vehicle: this.fb.array([]),
    });
  }


  generateVehicle()
  {
    var control = <FormArray>this.vehicle_array$.controls.vehicle;

    const onlyLettersAndSpacesRequiredValidator = Validators.compose([
      Validators.required,
      onlyLetterAndSpacesValidator
    ]);

  // console.log(control,"in generate vehicle")
      control.push(
          this.fb.group({
            vin: ['', Validators.required],
            year: ['', Validators.compose([Validators.required,onlyNumberValidator])],
            make: ['', onlyLettersAndSpacesRequiredValidator],
            model: ['', Validators.required],
            bodyType: ['', onlyLettersAndSpacesRequiredValidator],
            usageType: ['', Validators.compose([onlyLetterSlashAndSpacesValidator,Validators.required ])],
            leased: [false, Validators.required],
      
            lienholder:this.fb.group({
              name: ['', onlyLettersAndSpacesRequiredValidator],
              address: ['', Validators.required],
              city: ['', onlyLettersAndSpacesRequiredValidator],
              state: ['', onlyLetterAndSpacesValidator],
              zipCode: ['', Validators.compose([Validators.required, zipCodeValidator])],
              type: ['', onlyLettersAndSpacesRequiredValidator]
            }),
      
            vehicleCoverages:this.fb.group({
              comprehensive: [''],
              collision: [''],
              rentalReimburse: ['']
            })
          }));
    

    
  }


  assignLocalToVehicle(json)
  {
    
    var control = <FormArray>this.vehicle_array$.controls.vehicle;

    if (json != '') {
    var i=0;
      json.forEach(element => {
        // console.log(element,"element")
        this.generateVehicle();
        (<FormArray>this.vehicle_array$.controls['vehicle']).at(i).patchValue(element);
        i++;
      });

  }

  }


  getVehicleCoveragesForm(){
    this.coverage_array$ = this.fb.group({
      propertyDamage: ['', Validators.required],
      personalInjuryProtection: ['', Validators.required],
      workLossExclusion: ['', Validators.required],
      NDSTravelClub: ['', Validators.required],
      quoteEffectiveDate: ['', Validators.compose([
        Validators.required,
        validateAfterCurrentDate
      ])],
    });
  }

  assignLocalToVehicleCoverages(json){
    console.log(json, "json")
    if (json != '') {
      this.getVehicleCoveragesForm();
      this.coverage_array$.patchValue(json);
    }

    console.log(this.coverage_array$.value, "coverage_array value")
  }


}
