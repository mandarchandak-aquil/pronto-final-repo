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
  selector: 'app-undisclosed-include-driver',
  templateUrl: './undisclosed-include-driver.component.html',
  styleUrls: ['./undisclosed-include-driver.component.css']
})
export class UndisclosedIncludeDriverComponent implements OnInit {

    maritalStatus:any=[];
  driver_suffix:any=[];
  relation_applicant:any=[];
  LicenseType:any=[];
  state_list:any=[];
  qouteId;
  unsubscribe: Subject<void>;
  include_driver:FormGroup;
  index:any='';
  isEdit:string='';
 age:any='';
  constructor(public oneInkService:oneInkService,private oneinkdropdown:oneInkDropdownService,private activeroute:ActivatedRoute,public oneInkDriverForm:oneInkDriverFormService,public router: Router,   private readonly fb: FormBuilder) { 
    
    this.unsubscribe = new Subject();
    this.getMaritalStatus();
    this.getSuffix();
   this.getrelationToApplicant();
   this.getdriverLicenseType();
   this.getState();
  }

  ngOnInit(): void {
    this.index=this.activeroute.snapshot.paramMap.get('current_index');
    this.isEdit=this.activeroute.snapshot.paramMap.get('edit');
    console.log(this.index && this.isEdit=='no',"isEdit",this.index)
    this.qouteId=localStorage.getItem('oneink_qouteId');
   this.include_driver_form();
   if(this.index && this.isEdit=='no')
   {
     this.assignValue()
   }
this.setUpLicenseTypeChanges();
this.setUpLicenseStateChanges();
this.setupAge()
this.oneInkDriverForm.drivers_array$.valueChanges.subscribe(value => { 
  this.oneInkDriverForm.saveResponse(value.driver, "driver")
});
  }
  assignValue()
  {
    
   var undisclosed_primary_data=JSON.parse(localStorage.getItem('oneink_undisclosedDrivers'));
   console.log(undisclosed_primary_data[this.index],"undisclosed_primary_data[this.index]")
   var formated_dob=(undisclosed_primary_data[this.index]['person']['dateOfBirth']).split('-')[1]+'/'+(undisclosed_primary_data[this.index]['person']['dateOfBirth']).split('-')[2]+'/'+(undisclosed_primary_data[this.index]['person']['dateOfBirth']).split('-')[0]
    
this.include_driver.get('firstName').setValue(undisclosed_primary_data[this.index]['person']['firstName']);
this.include_driver.get('middleName').setValue(undisclosed_primary_data[this.index]['person']['middleName']);
this.include_driver.get('lastName').setValue(undisclosed_primary_data[this.index]['person']['lastName']);
this.include_driver.get('dob').setValue(formated_dob);
this.include_driver.get('gender').setValue(undisclosed_primary_data[this.index]['person']['gender']);
this.include_driver.controls['license'].get('licenseNumber').setValue(undisclosed_primary_data[this.index]['licenseNumber'])

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
      firstName: [, onlyLettersAndSpacesRequiredValidator],
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
    this.oneInkService.error_msg='';
    if(this.index && this.isEdit=='no')
    {
      this.addNewDriver();
    }else{
      this.updateNewDriver();
    }
  
  }
  addNewDriver()
  {

  var includeformmodel=this.include_driver.value;
  var formated_bod=(includeformmodel['dob']).split('/')[2]+'-'+(includeformmodel['dob']).split('/')[0]+'-'+(includeformmodel['dob']).split('/')[1]
       
   var model= {
      "driverLicense": {
        "details": {
          "licenseType": includeformmodel['license']['licenseType'] ? includeformmodel['license']['licenseType'] :undefined,
          "issueState": includeformmodel['license']['licenseState'] ? includeformmodel['license']['licenseState'] :undefined,
          "number": includeformmodel['license']['licenseNumber']
        },
        "status": "active"
      },
   
      "employmentInfo": {
        
      },
      "person": {
        "firstName": includeformmodel['firstName'],
        "middleName": includeformmodel['middleName'],
        "lastName": includeformmodel['lastName'],
        "dateOfBirth": formated_bod,
        "gender":includeformmodel['gender'],
        "family": {
          "maritalStatus": includeformmodel['maritalStatus'],
          "relationToApplicant": includeformmodel['relation']
        }
      },
      "priorInsurance": {
        "hasPriorInsurance": false
      }
    }  
 if(includeformmodel['license']['licenseType']!='unlicensed')
    {
      model['drivingExperience']= {
        "usLicensed": {
          "firstLicensedDate": new Date(includeformmodel['license']['licenseDate']).toISOString()
          
        }
      }
    }
    this.oneInkService.CreateUndisclosedDriver(model).pipe(takeUntil(this.unsubscribe)).subscribe(add_driver => 
      {
        if(add_driver['errors']==undefined)
        {
        var formval_main:any=JSON.parse(localStorage.getItem('undisclosedForm'));
        var link_model:any=
        {
          'quoteId':Number(localStorage.getItem('oneink_qouteId')),
          'driver':add_driver['id'],
          'undisclosedDriverLink':
          {
            "undisclosedDriverId":formval_main[this.index].driverId,
          }
        };
        console.log('link_model',link_model)
        this.oneInkService.LinkIncludeDriver(link_model).pipe(takeUntil(this.unsubscribe)).subscribe(link_include_driver => 
          {
            console.log('link_include_driver',link_include_driver);
            if(link_include_driver==null )
        {
            this.handelNextNavigation_new();
            this.oneInkDriverForm.generateDriver();
            var len:any=((<FormArray>this.oneInkDriverForm.drivers_array$.controls['driver']).length-1);          
            (<FormArray>this.oneInkDriverForm.drivers_array$.controls['driver']).at(len).patchValue(this.include_driver.value);
            (<FormArray>((<FormArray>this.oneInkDriverForm.drivers_array$.controls['driver']).at(len))).get('from_api').setValue('yes');
         
          }
          else
          {
            this.oneInkService.error_msg=link_include_driver['errors'][0]['message'];
          }
          });
    }
    else
    {
      this.oneInkService.error_msg=add_driver['errors'][0]['message'];
    }
  });
  }

handelNextNavigation_new()
{
 
  var formval:any=JSON.parse(localStorage.getItem('undisclosedForm'));
  if(this.index==formval.length-1)
  {
    localStorage.setItem('undisclosedFlowDone',"yes");
    this.router.navigate(['/one-ink/quote-summary']);
  }
for(var i=Number(this.index)+1;i<formval.length;i++)
{
 console.log(formval[i])
   if(formval[i].driverAction=='includeDriver')
   {
    localStorage.setItem('undisclosedFlowDone',"no");
     this.router.navigate(['/one-ink/undisclosed-include',{'current_index':i,"edit":'no'}]);
     
      return 0;
   }
   
   else if(formval[i].driverAction=='excludeDriver')
   {
    localStorage.setItem('undisclosedFlowDone',"no");
    this.router.navigate(['/one-ink/undisclosed-exclude',{'current_index':i,"edit":'no'}]);
   
    return 0;
   }
   else if(formval[i].driverAction=='rejectDriver')
   {
    var reject_model:any=
    {
      'quoteId':localStorage.getItem('oneink_qouteId'),
      'excludedDriverId': formval[i].driverId,
      'model':
       {"rejectionReason":formval[i].rejectReason,"rejectionNote":formval[i].rejectNote}
    }
    this.oneInkService.RejectDriver(reject_model).pipe(takeUntil(this.unsubscribe)).subscribe(result => 
      {
     console.log(result,"oneInkService new");
  });
   
  }
  if(i==formval.length-1)
  {
    localStorage.setItem('undisclosedFlowDone',"yes");
    this.router.navigate(['/one-ink/quote-summary']);
  }
}
 

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
