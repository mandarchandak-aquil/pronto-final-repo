

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
@Injectable()
export class QuoteProFormService {
  first_form:FormGroup;
  vehicle_array:FormGroup;
  driver_array:FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly http: HttpClient,
    public datepipe: DatePipe
  ) { }

  getFirstForm(data) {
      console.log(moment(data['form'].dob).format('MM/DD/YYYY'),"moment")
  this.first_form=  this.fb.group({
id:[data['form'].id==null?'' : data['form'].id ],
disableValidation:[data['form'].disableValidation==null?'' : data['form'].disableValidation ],
firstName:[data['form'].firstName==null?'' : data['form'].firstName ,data['fields']['firstName'].required==true ? Validators.required :''],
lastName:[data['form'].lastName==null?'' : data['form'].lastName,data['fields']['lastName'].required==true ? Validators.required :'' ],  
address:[data['form'].address==null?'' : data['form'].address,data['fields']['lastName'].required==true ? Validators.required :''  ],   
unit:[data['form'].unit==null?'' : data['form'].unit ,data['fields']['unit'].required==true ? Validators.required :''],  
state:[data['form'].state==null?'' : data['form'].state ,data['fields']['state'].required==true ? Validators.required :''],
zipCode:[data['form'].zipCode==null?'' : data['form'].zipCode ,data['fields']['zipCode'].required==true ? Validators.required :''],
phone:[data['form'].phone==null?'' : data['form'].phone ,data['fields']['phone'].required==true ? Validators.required :''],
email:[data['form'].email==null?'' : data['form'].email ,data['fields']['email'].required==true ? Validators.required :''],
county:[data['form'].county==null?'' : data['form'].county ,[Validators.required]],
city:[data['form'].city==null?'' : data['form'].city ,[Validators.required]],
//dob:[data['form'].dob==null?'' : this.datepipe.transform(data['form'].dob, 'MM/dd/yyyy') ,data['fields']['dob'].required==true ? Validators.required :''],
//driver:this.fb.array([this.generateDriver(data['fields']['driver'],data['form']['driver'])]),
dob:[data['form'].dob==null?'' : moment(data['form'].dob).format('MM/DD/YYYY') ,[Validators.required]],
 driver:this.generateDriver(data['fields']['driver'],data['form']['driver']),
yearsAtAddress:[data['form'].yearsAtAddress==null?'' : data['form'].yearsAtAddress ,data['fields']['yearsAtAddress'].required==true ? Validators.required :''],
monthsAtAddress:[data['form'].monthsAtAddress==null?'' : data['form'].monthsAtAddress ,data['fields']['monthsAtAddress'].required==true ? Validators.required :''],
howHeard:[data['form'].howHeard==null?'' : data['form'].howHeard ,data['fields']['howHeard'].required==true ? Validators.required :''],
quote:this.generateQuote(data['fields']['quote'],data['form']['quote']),
sr22:[data['form'].sr22==null?'' : data['form'].sr22 ,data['fields']['sr22'].required==true ? Validators.required :''],
vehicle:this.generateVehicle(data['fields']['vehicle'],data['form']['vehicle']),
addressType:[data['form'].addressType==null?'' : data['form'].addressType ,data['fields']['addressType'].required==true ? Validators.required :''],
      });
    //return group;
  }


  
  generateQuote(fields:any,values:any)
  {
    console.log(values.nonOwner,"owner23",fields)
const quote:any = this.fb.group({
  nonOwner:[values.nonOwner==null?'' : values.nonOwner, fields.nonOwner.required==true ? Validators.required :''],
agreeNonOwner:[values.agreeNonOwner==null?'' : values.agreeNonOwner, fields.agreeNonOwner.required==true ? Validators.required :''],
currentlyInsured:[values.currentlyInsured==null?'' : values.currentlyInsured, fields.currentlyInsured.required==true ? Validators.required :''],
noPrior:[values.noPrior==null?'' : values.noPrior, fields.noPrior.required==true ? Validators.required :''],
priorCarrier:[values.priorCarrier==null?'' : values.priorCarrier, fields.priorCarrier.required==true ? Validators.required :''],
priorLimits:[values.priorLimits==null?'' : values.priorLimits, fields.priorLimits.required==true ? Validators.required :''],
priorPolicyNumber:[values.priorPolicyNumber==null?'' : values.priorPolicyNumber, fields.priorPolicyNumber.required==true ? Validators.required :''],
priorExp:[values.priorExp==null?'' : values.priorExp, fields.priorExp.required==true ? Validators.required :''],
yearsInsured:[values.yearsInsured==null?'' : values.yearsInsured, fields.yearsInsured.required==true ? Validators.required :''],
monthsInsured:[values.monthsInsured==null?'0' : values.monthsInsured, fields.monthsInsured.required==true ? Validators.required :''],
priorClaims:[values.priorClaims==null?'' : values.priorClaims, fields.priorClaims.required==true ? Validators.required :''],
lastClaimDate:[values.lastClaimDate==null?'' : values.lastClaimDate, fields.lastClaimDate.required==true ? Validators.required :''],
paperLessDisc:[values.paperLessDisc==null?'' : values.paperLessDisc, fields.paperLessDisc.required==true ? Validators.required :''],

});

    return quote;
  }
  generateDriver(fields:any,values:any)
    {
  console.log(values,'fields',fields.educationLevel.required,"values")
  const drivers:any = this.fb.group({
    gender:[values.gender==null?'' : values.gender, fields.gender.required==true ? Validators.required :''],
    maritalStatus:[values.maritalStatus==null?'' : values.maritalStatus, fields.maritalStatus.required==true ? Validators.required :''],
    licType:[values.licType==null?'' : values.licType, fields.licType.required==true ? Validators.required :''],
    state:[''],
    stateLicensed:[''],
    strictValidation:[values.strictValidation==null?'' : values.strictValidation, fields.strictValidation.required==true ? Validators.required :''],
    educationLevel:[values.educationLevel==null?'' : values.educationLevel, fields.educationLevel.required==true ? Validators.required :''],
    occupation:[values.occupation==null?'' : values.occupation, fields.occupation.required==true ? Validators.required :''],
    firstName:[values.firstName==null?'' : values.firstName, fields.firstName.required==true ? Validators.required :''],
    lastName:[values.lastName==null?'' : values.lastName, fields.lastName.required==true ? Validators.required :''],
    dob:[values.dob==null?'' :  this.datepipe.transform(values.dob, 'MM/dd/yyyy'), fields.dob.required==true ? Validators.required :''],
    licSusRev:[values.licSusRev==null?'' : values.licSusRev, fields.licSusRev.required==true ? Validators.required :''],
    driverNumber:[values.driverNumber==null?'' : values.driverNumber, fields.driverNumber.required==true ? Validators.required :''],
    excluded:[values.excluded==null?'' : values.excluded, fields.excluded.required==true ? Validators.required :''],
    relationship:[values.relationship==null?'' : values.relationship, fields.relationship.required==true ? Validators.required :''],
    sr22:[values.sr22==null?'' : values.sr22, fields.sr22.required==true ? Validators.required :''],
    anyViolations:[values.anyViolations==null?'' : values.anyViolations, fields.anyViolations.required==true ? Validators.required :''],    
  });

      return drivers;
    }
  
    generateVehicle(fields:any,values:any)
    {
  console.log(values.year,"generateVehicle",fields.year.required)
  const vehicle:any = this.fb.group({
    id:[values.id==null?'' : values.id, fields.id.required==true ? Validators.required :''],
    isLastVehicle:[values.isLastVehicle==null?'' : values.isLastVehicle, fields.isLastVehicle.required==true ? Validators.required :''],
    addAnotherVehicle:[values.addAnotherVehicle==null?'' : values.addAnotherVehicle, fields.addAnotherVehicle.required==true ? Validators.required :''],
    vehicleNumber:[values.vehicleNumber==null?'' : values.vehicleNumber, fields.vehicleNumber.required==true ? Validators.required :''],
    isoVinNumber:[values.isoVinNumber==null?'' : values.isoVinNumber, fields.isoVinNumber.required==true ? Validators.required :''],
    actualValue:[values.actualValue==null?'' : values.actualValue, fields.actualValue.required==true ? Validators.required :''],
    costNew:[values.costNew==null?'' : values.costNew, fields.costNew.required==true ? Validators.required :''],
    strictValidation:[values.strictValidation==null?'' : values.strictValidation, fields.strictValidation.required==true ? Validators.required :''],
    imsControl:[values.imsControl==null?'' : values.imsControl, fields.imsControl.required==true ? Validators.required :''],
    quickLookup:[values.quickLookup==null?'' : values.quickLookup, fields.quickLookup.required==true ? Validators.required :''],
    fullLookup:[values.fullLookup==null?'' : values.fullLookup, fields.fullLookup.required==true ? Validators.required :''],
    vinNumber:[values.vinNumber==null?'' : values.vinNumber, fields.vinNumber.required==true ? Validators.required :''],
    year:[values.year==null?'' : values.year, fields.year.required==true ? Validators.required :''],
    make:[values.make==null?'' : values.make, fields.make.required==true ? Validators.required :''],
    modelDescription:[values.modelDescription==null?'' : values.modelDescription, fields.modelDescription.required==true ? Validators.required :''],
    trimCode:[values.trimCode==null?'' : values.trimCode, fields.trimCode.required==true ? Validators.required :''],
    styleCode:[values.styleCode==null?'' : values.styleCode, fields.styleCode.required==true ? Validators.required :''],
    engine:[values.engine==null?'' : values.engine, fields.engine.required==true ? Validators.required :''],
    usecode:[values.usecode==null?'' : values.usecode, fields.usecode.required==true ? Validators.required :''],
    lengthOwned:[values.lengthOwned==null?'' : values.lengthOwned, fields.lengthOwned.required==true ? Validators.required :''],
    dailyMiles:[values.dailyMiles==null?'' : values.dailyMiles, fields.dailyMiles.required==true ? Validators.required :''],
    miles1Way:[values.miles1Way==null?'' : values.miles1Way, fields.miles1Way.required==true ? Validators.required :''],
    annualMiles:[values.annualMiles==null?'' : values.annualMiles, fields.annualMiles.required==true ? Validators.required :''],
    rideSharing:[values.rideSharing==null?'' : values.rideSharing, fields.rideSharing.required==true ? Validators.required :''],
    ownership:[values.ownership==null?'' : values.ownership, fields.ownership.required==true ? Validators.required :''],
    lienHolder:[values.lienHolder==null?'' : values.lienHolder, fields.lienHolder.required==true ? Validators.required :''],
    lhname:[values.lhname==null?'' : values.lhname, fields.lhname.required==true ? Validators.required :''],
    lhaddress1:[values.lhaddress1==null?'' : values.lhaddress1, fields.lhaddress1.required==true ? Validators.required :''],
    lhzipcode:[values.lhzipcode==null?'' : values.lhzipcode, fields.lhzipcode.required==true ? Validators.required :''],
    lhcity:[''],
    lhstate:[values.lhstate==null?'' : values.lhstate, fields.lhstate.required==true ? Validators.required :''],
  });
  
      return vehicle;
    }
   
    // additional vehicle

  generateVehicleArray()
  {
    this.vehicle_array = this.fb.group({
      vehicles: this.fb.array([]),
    });
  }
  create_vehicle()
  {
    var control = <FormArray>this.vehicle_array.controls.vehicles;


    control.push(
    this.fb.group({
      id:['', [Validators.required ]],
      isLastVehicle:[''],
      addAnotherVehicle:[''],
      vehicleNumber:[''],
      isoVinNumber:['',],
      actualValue:[''],
      costNew:[''],
      strictValidation:[''],
      imsControl:[''],
      quickLookup:[''],
      fullLookup:[''],
      vinNumber:[''],
      year:[''],
      make:[''],
      modelDescription:[''],
      trimCode:[''],
      styleCode:[''],
      engine:[''],
      usecode:[''],
      lengthOwned:[''],
      dailyMiles:[''],
      miles1Way:[''],
      annualMiles:[''],
      rideSharing:[''],
      ownership:[''],
      lienHolder:[''],
      lhname:[''],
      lhaddress1:[''],
      lhzipcode:[''],
      lhcity:[''],
      lhstate:[''],
    })
  
    )
  

  }
  assignLocalToVahicle()
  {
    var control = <FormArray>this.vehicle_array.controls.vehicles;
   var json:any= JSON.parse(sessionStorage.getItem('dataV3'))['vehicles'];
   
    if (json != '') {
    var i=0;
      json.forEach(element => {
        console.log(json,"element");
        this.create_vehicle();
        (<FormArray>this.vehicle_array.controls['vehicles']).at(i).patchValue(element);
      i++;
         
      });
  
  }
}
// end additonal vehicle

// start additional driver

generateDriverArray()
{
  this.driver_array = this.fb.group({
    drivers: this.fb.array([]),
  });
}
create_Driver()
{
  var control = <FormArray>this.driver_array.controls.drivers;


  control.push(
  this.fb.group({
    "id":[''],
    "IsLastDriver":[''],
    "driverNumber":[''],
    "firstName":[''],
    "middleInitial":[''],
    "lastName":[''],
    "excluded":[''],
    "relationship":[''],
    "gender": [''],
    "dob":[''],
    "occupation":[''],
        "maritalStatus": [''],
        "licType":[''],
        "datelicenced": [''],
        "stateLicensed":[''],
        "licenseNo":[''],
        "educationLevel":[''],
        "licSusRev": [''],
        "sr22": [''],
        "dsr22Case":[''],
        "dsr22Date":[''],
        "dsr22Reason":[''],
        "anyViolations": [false]
  })
  )


}
assignLocalToDriver()
{
  var control = <FormArray>this.driver_array.controls.drivers;
 var json:any= JSON.parse(sessionStorage.getItem('dataV3'))['drivers'];
 
  if (json != '') {
  var i=0;
    json.forEach(element => {
      console.log(json,"element");
      this.create_Driver();
      (<FormArray>this.driver_array.controls['drivers']).at(i).patchValue(element);
    i++;
       
    });

}
}

}
