import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { CommonService } from '../../../commons/services/common/common.service';
import { OneinkVehicleFormService } from '../oneink-vehicle-form.service';

import {validateAfterCurrentDate} from '../../../commons/validators/after-current-date.validator';
import { oneInkDropdownService } from '../../../commons/services/one-ink/one-ink-dropdowns.service';
import { Subject } from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import { oneInkDriverFormService } from '../oneink-driver-form.service';
import { oneInkService } from '../../../commons/services/one-ink/one-ink.service';
@Component({
  selector: 'app-vehicle-coverage',
  templateUrl: './vehicle-coverage.component.html',
  styleUrls: ['./vehicle-coverage.component.css']
})
export class VehicleCoverageComponent implements OnInit {
  unsubscribe: Subject<void>;
  form: FormGroup;
  isClicked: boolean = false;
  oneinc_vehicle_coverages : any;
  final_driver_array=[];
  final_vehicle_array=[];
  pdList = [];
  // [
  //   {key:'1000', value:'1000'},
  // ];

  nsdtcList =[];
  //  [
  //   {key:'no coverage', value:'No Coverage'},
  //   {key:'family plan', value:'Family Plan'},
  //   {key:'individual plan', value:'Individual Plan'},
  // ];

  wlexList =[];
  //  [
  //   {key:'declined', value:'Declined'},
  //   {key:'named insured only', value:'Named Insured Only'},
  //   {key:'named insured and resident relatives', value:'Named Insured and Resident Relatives'},
  // ];

  pepList = [];
  coverage_limit_option:any=[];
  // [
  //   {key:'0 ded.', value:'$0 ded.'},
  //   {key:'250 ded. named insured only', value:'$250 ded. Named Insured Only'},
  //   {key:'250 ded. named insured and resident relatives', value:'$250 ded. Named Insured and Resident Relatives'},
  //   {key:'500 ded. named insured only', value:'$500 ded. Named Insured Only'},
  //   {key:'500 ded. named insured and resident relatives', value:'$500 ded. Named Insured and Resident Relatives'},
  //   {key:'1000 ded. named insured only', value:'$1000 ded. Named Insured Only'},
  //   {key:'1000 ded. named insured and resident relatives', value:'$1000 ded. Named Insured and Resident Relatives'},
  // ];

  qouteId;
  constructor(public oneInkService:oneInkService,public oneInkDriverForm:oneInkDriverFormService,private oneinkdropdown:oneInkDropdownService,public router: Router,  private fb: FormBuilder, public api_common : CommonService, public oneInkVehicleForm:OneinkVehicleFormService) {
    this.unsubscribe = new Subject();
    this.coverageLimitOptionDefinition();
    this.getworkLoss();
    this.getnsd();
    
    this.vehicleForm();
    
    
    
  }

  ngOnInit(): void {
    this.qouteId=localStorage.getItem('oneink_qouteId');
    if(localStorage.getItem('oneinc_vehicle_coverages') != undefined || localStorage.getItem('oneinc_vehicle_coverages') != null){
      this.oneinc_vehicle_coverages = JSON.parse(localStorage.getItem('oneinc_vehicle_coverages'));
    }else{
      this.oneinc_vehicle_coverages = '';
    }
 
    if(this.oneInkVehicleForm.vehicle_array$ == undefined || this.oneInkVehicleForm.vehicle_array$ == null){
      this.oneInkVehicleForm.getVehicleCoveragesForm();

      if(this.oneinc_vehicle_coverages){
        this.oneInkVehicleForm.assignLocalToVehicle(this.oneinc_vehicle_coverages);
      }
     
       
      // console.log(this.oneInkVehicleForm.vehicle_array$.value , "oneInkVehicleForm");
    }

    
   
   
  }
  ngAfterViewInit()
  {
    
    setTimeout(() => {
      this.create_driver_array();
      this.create_vehicle_array();
      if(localStorage.getItem('oneink_coverage') != undefined || localStorage.getItem('oneink_coverage') != null){
        this.form.patchValue(JSON.parse(localStorage.getItem('oneink_coverage')));
        var event=[]
        event['id']=this.form.get('workLossExclusion').value;
        console.log(event['id'],"getWorkLossValue");
        this.getWorkLossValue(event);
     }
    }, 4000);
    
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
  getnsd()
  {

    this.oneinkdropdown.getnsdTravelClubType().pipe(takeUntil(this.unsubscribe)).subscribe(result => 
      {
        
      console.log(result,"getnsdTravelClubType");
      this.nsdtcList=this.filterDropdown(result);

        
  });
}

getworkLoss()
{

  this.oneinkdropdown.getworkLossExclusionType().pipe(takeUntil(this.unsubscribe)).subscribe(result => 
    {
      
    console.log(result,"getworkLossExclusionType");
    this.wlexList=this.filterDropdown(result);
      
});
}
coverageLimitOptionDefinition()
{
  this.oneinkdropdown.getcoverageLimitOptionDefinition().pipe(takeUntil(this.unsubscribe)).subscribe(result => 
    {
      this.coverage_limit_option=result;
     
     this.pdList= this.coverage_limit_option.filter(coverageToFilter =>  coverageToFilter.type === 'pd' && !coverageToFilter.isInactive)
      .map((coverage: any) => {
        return coverage
      });
      localStorage.setItem('oneink_coverage_limit_option',JSON.stringify(this.coverage_limit_option));
      console.log(this.coverage_limit_option,"getcoverageLimitOptionDefinition");
});
}
getWorkLossValue(event)
{

this.pepList= this.coverage_limit_option.filter(coverageToFilter =>coverageToFilter.type === 'pip'
&& coverageToFilter.workLossExclusionType === event['id']
&& !coverageToFilter.isInactive)
.map((coverage: any) => {
  return coverage
});
console.log(this.coverage_limit_option,this.pepList);
}
  vehicleForm(){
    this.form= this.fb.group({
      propertyDamage: ['', Validators.required],
      personalInjuryProtection: ['', Validators.required],
      workLossExclusion: ['', Validators.required],
      NDSTravelClub: ['', Validators.required],
      quoteEffectiveDate: ['', Validators.compose([Validators.required, validateAfterCurrentDate])],
    });
  }
  submit_coverage()
  {
    this.oneInkService.error_msg='';
    // console.log(this.form.value,"value")
    this.isQuoteComplete();
     const isQuoteComplete = this.isQuoteComplete();
     this.oneInkDriverForm.drivers_array$.controls['driver'].value.length;
    // console.log(this.driversService.numberOfInsuredDrivers.getValue(),"this.driversService.numberOfInsuredDrivers.getValue()")
     const isValidVehiclesLimit = this.isValidVehiclesLimit();
    
     if(this.form.valid && isQuoteComplete && isValidVehiclesLimit) {
      
       this.createFullQuote();
     }
     else if (!isQuoteComplete) {
      alert('qoute not complete')
    } else if (!isValidVehiclesLimit) {
      alert('invalid vehicle limit')
    }
    }
    createFullQuote() {
      // const coverageList = this.coverageService.createFullQuoteCoverageList(
      //   this.coverageService.personalInjuryProtection.value,
      //   this.coverageService.propertyDamage.value
      // );
      //console.log(coverageList,"coverageList")
      const coverageList = [];
        var item = {};
       item['coverageLimitOptionId'] = this.form.get('personalInjuryProtection').value;
       item['type'] = 'pip';
       coverageList.push(item);
       item = {};
       item['coverageLimitOptionId'] = this.form.get('propertyDamage').value;
       item['type'] = 'pd';
       coverageList.push(item);
       
     const oneink_userInfo=JSON.parse(localStorage.getItem('oneink_userInfo'));
     const insuranceFor=JSON.parse(localStorage.getItem('insuranceFor'));
    const oneink_program_model=JSON.parse(localStorage.getItem('oneink_program_model'))
      const garageAddress:any = {
        address: oneink_userInfo['street'],
        zip: insuranceFor['zipcode'],
        county: insuranceFor['county'],
        state: oneink_userInfo['state'],
        city: oneink_userInfo['city'],
        isAddressVerificationDisabled: false

        
      };

      console.log(garageAddress,"garageAddress");
     const quoteEffectiveDate= new Date(this.form.get('quoteEffectiveDate').value).toISOString();
      const payPlanIdExists = localStorage.getItem('quotePayPlanId') && localStorage.getItem('quotePayPlanId') !== '';
      console.log(payPlanIdExists,"payPlanIdExists");
      const isAutoPayStatusNeeded = payPlanIdExists && localStorage.getItem('quotePayPlanId') !== '';
      console.log(garageAddress,"garageAddress")
      const fullQuote: any = {
        drivers:this.final_driver_array,
        vehicles: this.final_vehicle_array,
        effectiveDate: this.form.get('quoteEffectiveDate').value
          ? quoteEffectiveDate
          : '',
        programVersionId: oneink_program_model['id'],
        coverages: coverageList,
        nsdTravelClubType: this.form.get('NDSTravelClub').value,
        mailingAddress: oneink_userInfo.sameGaragingAddress ? garageAddress :oneink_userInfo.mailingAddress,
        garageAddress:garageAddress,
        termLength: '6',
        payPlanId: payPlanIdExists ? localStorage.getItem('quotePayPlanId') : undefined,
        autoPayStatus: isAutoPayStatusNeeded ? localStorage.getItem('quotePayPlanId') : undefined,
        documentDeliveryMethod: 'eDoc'
      };
      console.log(fullQuote,'oneink_fullQoute')
      localStorage.setItem('oneink_fullQoute',JSON.stringify(fullQuote))
      this.oneInkService.CreateFullQoute(fullQuote).pipe(takeUntil(this.unsubscribe)).subscribe(qoute => 
        {
          if(qoute['errors']==undefined )
          {
          localStorage.setItem('oneink_qouteId',qoute['quoteId']);
          console.log(JSON.stringify(qoute),"CreateFullQoute")
          this.oneInkService.verifyVehicles(qoute['quoteId']).pipe(takeUntil(this.unsubscribe)).subscribe(verify_data => 
            {
              console.log(verify_data,"verify_data")
            
              console.log(verify_data,"verify_data")
              localStorage.setItem('oneink_coverage',JSON.stringify(this.form.value));
              this.router.navigate(['/one-ink/quote-summary']);
         
            });
          }
            else
            {
              this.oneInkService.error_msg=qoute['errors'][0]['message'];
            }
    });
    }
  isQuoteComplete():boolean {
    const mainDriver = this.oneInkDriverForm.drivers_array$;
    const vehicles = this.oneInkVehicleForm.vehicle_array$.controls['vehicle'].value.length;
    console.log(!!mainDriver,vehicles,"isQuoteComplete")
    return !!mainDriver && !!vehicles;
  }
  isValidVehiclesLimit(): boolean {
    const numberOfVehicles = this.oneInkVehicleForm.vehicle_array$.controls['vehicle'].value.length;
    const maxAmountOfVehicles = this.oneInkDriverForm.drivers_array$.controls['driver'].value.length + 1;
    console.log(maxAmountOfVehicles,numberOfVehicles,"isValidVehiclesLimit")
    return (numberOfVehicles <= maxAmountOfVehicles);
  }

  create_driver_array()
  {
  var new_array:any=[];
  var driver_info=this.oneInkDriverForm.drivers_array$.controls['driver'].value;
  const oneink_userInfo=JSON.parse(localStorage.getItem('oneink_userInfo'));
    for(var i=0;i< this.oneInkDriverForm.drivers_array$.controls['driver'].value.length;i++)
    {
     var get_driver={};
         var sr22Fr44String: string;
      if (driver_info[i]['license']['licenseLiabilitySR22']) {
        sr22Fr44String = 'sr22Filing';
      } else if (driver_info[i]['license']['licenseLiabilityFR44']) {
        sr22Fr44String = 'fr44Filing';
      }
      if(i==0)
      {
        get_driver['contact']= {
          "email":  oneink_userInfo['email'],
          "cellPhone": oneink_userInfo['phoneNumber'],
          "homePhone":  oneink_userInfo['phoneNumber'],
          "workPhone":  oneink_userInfo['phoneNumber']
        }
        get_driver['isNamedInsured'] =true;
      }
       get_driver['driverLicense']= {
          "details": {
            "licenseType": driver_info[i]['license']['licenseType'],
            "issueState": driver_info[i]['license']['licenseState'] ? driver_info[i]['license']['licenseState']:undefined,
            "number": driver_info[i]['license']['licenseNumber'] ? driver_info[i]['license']['licenseNumber']:undefined,
           
          },
          "status": "active"
        }
        if(driver_info[i]['license']['licenseType']!='unlicensed')
        {
          get_driver['drivingExperience']= {
            "usLicensed": {
              "firstLicensedDate": new Date(driver_info[i]['license']['licenseDate']).toISOString()
              
            }
          }
        }
      
        get_driver['employmentInfo']= {
        }
         get_driver['financialResponsibilityFiling']= sr22Fr44String;
        var formated_bod=(driver_info[i]['dob']).split('/')[2]+'-'+(driver_info[i]['dob']).split('/')[0]+'-'+(driver_info[i]['dob']).split('/')[1]
        console.log(formated_bod,"formated_bod")
        get_driver['person']= {
                  "firstName":  driver_info[i]['firstName'],
                  "middleName":  driver_info[i]['middleName'],
                  "lastName":  driver_info[i]['lastName'],
                  "dateOfBirth": formated_bod,
                  "gender":  driver_info[i]['gender'],
                  "family": {
                    "maritalStatus": driver_info[i]['maritalStatus'],
                    "relationToApplicant": driver_info[i]['relation']
                  }
                }
                get_driver['priorInsurance'] = {
                          "hasPriorInsurance": false
                        }
        this.final_driver_array.push(get_driver);
    }
    console.log(new_array,"new_array")
  }
  create_vehicle_array()
  {
  var new_vehicle_array:any=[];
  var vehicle_info=this.oneInkVehicleForm.vehicle_array$.controls['vehicle'].value;
  console.log(vehicle_info,"vehicle_info")
    for(var i=0;i< this.oneInkVehicleForm.vehicle_array$.controls['vehicle'].value.length;i++)
    {
     var get_vehicle={};
 
    const coverageList = [];
    var item = {};
   item['coverageLimitOptionId'] = vehicle_info[i]['vehicleCoverages']['collision'];
   item['type'] = 'coll';
   coverageList.push(item);
   item = {};
   item['coverageLimitOptionId'] = vehicle_info[i]['vehicleCoverages']['comprehensive'];
   item['type'] = 'comp';
   coverageList.push(item);
   if(vehicle_info[i]['vehicleCoverages']['rentalReimburse']!='reject')
   {
    item = {};

    item['coverageLimitOptionId'] = vehicle_info[i]['vehicleCoverages']['rentalReimburse'];
    item['type'] = 'rent';
    coverageList.push(item);
   }
      get_vehicle['vehicleIdentification']=
      {
            "year": vehicle_info[i]['year'],
            "make": vehicle_info[i]['make'],
            "model": vehicle_info[i]['model'],
            "bodyStyle": vehicle_info[i]['bodyType'],
            "vin": vehicle_info[i]['vin'],
            "identificationType": "vin"
          }
          get_vehicle['coverages']=coverageList;
          get_vehicle['use']=vehicle_info[i]['usageType'];
          this.final_vehicle_array.push(get_vehicle);
    }
    console.log(this.final_vehicle_array,"new_vehicle_array")
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
