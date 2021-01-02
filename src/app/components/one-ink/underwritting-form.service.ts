

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
export class oneInkUnderWrittingFormService implements OnInit {
   public underwritting_array$: FormGroup;
  constructor(
    private readonly fb: FormBuilder,
    private readonly http: HttpClient
  ) { }
  ngOnInit()
  {
    
  }

  
// Driver Section ===============================================================================

  getUnderWrittingForm()
  {
    this.underwritting_array$ = this.fb.group({
      question: this.fb.array([]),
    });
  }
 
 
  generateQuestion()
  {
    var control = <FormArray>this.underwritting_array$.controls.question;

    const onlyLettersAndSpacesRequiredValidator = Validators.compose([
      Validators.required,
      onlyLetterAndSpacesValidator
    ]);
      control.push(
          this.fb.group({
            guid: [''],
            value:['',[Validators.required]],
            extraInformation:[''],
            noteIsRequiredIfNo: [''],
            noteIsRequiredIfYes: [''],
            occupationCategoryId: [''],
            occupationId: [''],
            questionContent: [''],
            questionId: [''],
            type: ['']
          }));
    

    
  }

  assignLocalToQuastions(json)
  {
    
    var control = <FormArray>this.underwritting_array$.controls.question;

    if (json != '') {
    var i=0;
      json.forEach(element => {
        
        this.generateQuestion();
        (<FormArray>this.underwritting_array$.controls['question']).at(i).patchValue(element);
      
          i++;
      });

  }

   }
  // Driver Section End===============================================================================

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
