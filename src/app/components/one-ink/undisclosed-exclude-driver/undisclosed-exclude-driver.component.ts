import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
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
import { excludedDriverMaxDOBValidator } from '../../../commons/validators/excluded-driver-max-dob.validator copy';
import { oneInkExcludeDriverFormService } from '../oneink-exclude-driver-form.service';
@Component({
  selector: 'app-undisclosed-exclude-driver',
  templateUrl: './undisclosed-exclude-driver.component.html',
  styleUrls: ['./undisclosed-exclude-driver.component.css']
})
export class UndisclosedExcludeDriverComponent implements OnInit {
  @ViewChild('error_component') error_component;
 maritalStatus:any=[];
  driver_suffix:any=[];
  relation_applicant:any=[];
 
  qouteId;
  unsubscribe: Subject<void>;
  excludedDriverForm:FormGroup;
  index:any='';
  isEdit;
 age:any='';
  constructor(private oneInkExcludeDriver:oneInkExcludeDriverFormService,public oneInkService:oneInkService,private oneinkdropdown:oneInkDropdownService,private activeroute:ActivatedRoute,public oneInkDriverForm:oneInkDriverFormService,public router: Router,   private readonly fb: FormBuilder) { 
    this.unsubscribe = new Subject();
    this.getMaritalStatus();
    this.getSuffix();
   this.getrelationToApplicant();
   

  }

  ngOnInit(): void {
    
    this.index=this.activeroute.snapshot.paramMap.get('current_index');
    this.isEdit=this.activeroute.snapshot.paramMap.get('edit');
    console.log(this.index && this.isEdit=='no',"isEdit",this.index)
    this.qouteId=localStorage.getItem('oneink_qouteId');
    this.setUpExcludedDriverForm();
    if(this.index && this.isEdit)
    {
      this.assignValue()
    }
    

this.setupAge()
  }
  assignValue()
  {
    
   var undisclosed_primary_data=JSON.parse(localStorage.getItem('oneink_undisclosedDrivers'));
   console.log(undisclosed_primary_data[this.index],"undisclosed_primary_data[this.index]")
   var formated_dob=(undisclosed_primary_data[this.index]['person']['dateOfBirth']).split('-')[1]+'/'+(undisclosed_primary_data[this.index]['person']['dateOfBirth']).split('-')[2]+'/'+(undisclosed_primary_data[this.index]['person']['dateOfBirth']).split('-')[0]
    
this.excludedDriverForm.get('firstName').setValue(undisclosed_primary_data[this.index]['person']['firstName']);
this.excludedDriverForm.get('middleName').setValue(undisclosed_primary_data[this.index]['person']['middleName']);
this.excludedDriverForm.get('lastName').setValue(undisclosed_primary_data[this.index]['person']['lastName']);
this.excludedDriverForm.get('dob').setValue(formated_dob);
this.excludedDriverForm.get('gender').setValue(undisclosed_primary_data[this.index]['person']['gender']);
if(this.isEdit=='yes')
{
  this.excludedDriverForm.get('exclude_driver_id').setValue(undisclosed_primary_data[this.index]['id']);
}
  }
  setupAge()
  {
    
    var dob=this.excludedDriverForm.get('dob');
    
    const dateOfBirth = dob.value;
   
    if (dateOfBirth!=undefined) {
       this.setAge(dateOfBirth);
     
     }
     this.excludedDriverForm.get('dob').
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
  private setUpExcludedDriverForm() {
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
    this.excludedDriverForm = this.fb.group({
      firstName: ['', onlyLettersAndSpacesRequiredValidator],
      middleName: ['', onlyLetterAndSpacesValidator],
      lastName: ['', onlyLettersAndSpacesRequiredValidator],
      suffix: [''],
      dob: ['', beforeCurrentDateRequiredValidator],
      maritalStatus: ['', Validators.required],
      gender: ['', Validators.required],
      relation: ['', Validators.required],
      exclude_driver_id:['']
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

  submit()
  {
    this.oneInkService.error_msg='';
    if(this.index && this.isEdit=='no')
    {
      this.addNewDriver();
    }
   else if(this.index && this.isEdit=='yes')
    {
      this.updateDriver();
    }
    else{
     
      this.addExcludeDriver();
    }
  
  }
  addNewDriver()
  {

  var includeformmodel=this.excludedDriverForm.value;
  var formated_bod=(includeformmodel['dob']).split('/')[2]+'-'+(includeformmodel['dob']).split('/')[0]+'-'+(includeformmodel['dob']).split('/')[1]
       
   var model= {
     "quoteId":localStorage.getItem('oneink_qouteId'),
     "excludedDriver":
     {
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
      }
    }
    }  
    var formval:any=JSON.parse(localStorage.getItem('undisclosedForm'));
console.log(model,"CreateExcludeDriver")
    this.oneInkService.CreateExcludeDriver(model).pipe(takeUntil(this.unsubscribe)).subscribe(add_exclude_driver => 
      {
        console.log(add_exclude_driver,"CreateExcludeDriver111")
        if(add_exclude_driver['errors']==undefined)
        {
        var link_model:any=
        {
          'quoteId':Number(localStorage.getItem('oneink_qouteId')),
          'excludedDriverId':add_exclude_driver['id'],
          'undisclosedDriverLink':
          {
            "undisclosedDriverId":formval[this.index].driverId,
          }
        };
        this.excludedDriverForm.get('exclude_driver_id').setValue(add_exclude_driver['id']);
        console.log(link_model,"link_model",add_exclude_driver)
        this.oneInkService.LinkExcludeDriver(link_model).pipe(takeUntil(this.unsubscribe)).subscribe(link_exclude_driver => 
          {
            if(link_exclude_driver==null)
            {
            console.log(link_exclude_driver,"link_exclude_driver")
            this.handelNextNavigation_new();
            }
            else
            {
              this.oneInkService.error_msg=link_exclude_driver['errors'][0]['message'];
            }
            
      });
    }
    else
    {
      this.oneInkService.error_msg=add_exclude_driver['errors'][0]['message'];
    }
  });
  }
  handelNextNavigation_new()
{
 
  var formval:any=JSON.parse(localStorage.getItem('undisclosedForm'));
   console.log(Number(this.index)+1,"Number(this.index)+1");
   if(this.index==formval.length-1)
{
  localStorage.setItem('undisclosedFlowDone',"yes");
  this.router.navigate(['/one-ink/quote-summary']);
}

for(var i=Number(this.index)+1;i<formval.length;i++)
{
 
   if(formval[i].driverAction=='includeDriver')
   {
    console.log(formval[i].driverAction,"includeDriver")
    localStorage.setItem('undisclosedFlowDone',"no");
     this.router.navigate(['/one-ink/undisclosed-include',{'current_index':i,"edit":'no'}]);
     
      return 0;
   }
   
   else if(formval[i].driverAction=='excludeDriver')
   {
    console.log(formval[i].driverAction,"excludeDriver")
    localStorage.setItem('undisclosedFlowDone',"no");
    this.router.navigate(['/one-ink/undisclosed-exclude',{'current_index':i,"edit":'no'}]);
   this.ngOnInit();
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
  console.log(i,i==formval.length-1,"i==formval.length-1")
  if(i==formval.length-1)
  {
    localStorage.setItem('undisclosedFlowDone',"yes");
    this.router.navigate(['/one-ink/quote-summary']);
  }
}

}
  addExcludeDriver()
  {
    var includeformmodel=this.excludedDriverForm.value;
    var formated_bod=(includeformmodel['dob']).split('/')[2]+'-'+(includeformmodel['dob']).split('/')[0]+'-'+(includeformmodel['dob']).split('/')[1]
         
     var model= {
       "quoteId":localStorage.getItem('oneink_qouteId'),
       "excludedDriver":
       {
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
        }
      }
      }  
   console.log(model,"CreateExcludeDriver")
      this.oneInkService.CreateExcludeDriver(model).pipe(takeUntil(this.unsubscribe)).subscribe(add_exclude_driver => 
        {
          if(add_exclude_driver['errors']==undefined)
          {
          this.excludedDriverForm.get('exclude_driver_id').setValue(add_exclude_driver['id']);
          this.oneInkExcludeDriver.generateDriver();
          var len:any=((<FormArray>this.oneInkExcludeDriver.drivers_array$.controls['driver']).length-1);          
          (<FormArray>this.oneInkExcludeDriver.drivers_array$.controls['driver']).at(len).patchValue(this.excludedDriverForm.value);
          console.log(add_exclude_driver,"CreateExcludeDriver111",this.oneInkExcludeDriver.drivers_array$);
          this.router.navigate(['/one-ink/undisclosed-list']);
          }
          else
          {
            this.oneInkService.error_msg=add_exclude_driver['errors'][0]['message'];
          }
    },err=>{
      console.log(err,"errrrrrr")
    }
    );
  }
  updateDriver()
  {
   var includeformmodel=this.excludedDriverForm.value;
    var formated_bod=(includeformmodel['dob']).split('/')[2]+'-'+(includeformmodel['dob']).split('/')[0]+'-'+(includeformmodel['dob']).split('/')[1]
         
     var model= {
       "quoteId":localStorage.getItem('oneink_qouteId'),
       'excludedDriverId':includeformmodel['exclude_driver_id'],
       "excludedDriver":
       {
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
        }
      }
      }  
    
   console.log(model,"updateExcludeDriver")
      this.oneInkService.CreateExcludeDriver(model).pipe(takeUntil(this.unsubscribe)).subscribe(edit_exclude_driver => 
        {
          if(edit_exclude_driver['errors']==undefined)
          {
          (<FormArray>this.oneInkExcludeDriver.drivers_array$.controls['driver']).at(this.index).patchValue(this.excludedDriverForm.value);
          console.log(edit_exclude_driver,"CreateExcludeDriver111",this.oneInkExcludeDriver.drivers_array$);
          this.router.navigate(['/one-ink/undisclosed-list']);
        }
        else
        {
          this.oneInkService.error_msg=edit_exclude_driver['errors'][0]['message'];
        }
    });
  }

  
  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
