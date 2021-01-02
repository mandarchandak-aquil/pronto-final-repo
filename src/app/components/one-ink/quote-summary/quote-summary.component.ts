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
  selector: 'app-quote-summary',
  templateUrl: './quote-summary.component.html',
  styleUrls: ['./quote-summary.component.css']
})
export class QuoteSummaryComponent implements OnInit {
  coveragesDictionary:any;
  coveragesView:any=[];
  coverage_limit_option:any;
  payPlanFormGroup:FormGroup
   unsubscribe: Subject<void>;
   drivers:{};
   vehicles:{};
   coverages:{};
   currentPayPlan:any;
   payPlans:any=[];
   qoute=[];
   discounts = [];
   policyDiscounts = [];
   vehicleDiscounts = [];
   driverDiscounts = [];
   qoute_snapshot_data:any;
   qoute_model;
   qouteId;
   subtotalVehiclePremium;
    constructor(private oneInkService:oneInkService,public oneInkDriverForm:oneInkDriverFormService,private oneinkdropdown:oneInkDropdownService,public router: Router,  private fb: FormBuilder, public api_common : CommonService, public oneInkVehicleForm:OneinkVehicleFormService) {
      this.unsubscribe = new Subject();
      this.qoute_model=JSON.parse(localStorage.getItem('oneink_fullQoute'));
      this.coveragesDictionary = {
        pd: {
         
          titleTranslation: 'Property Damage',
          coverageSelected: ''
        },
        pip: {
         
          titleTranslation: 'Personal Injury Protection',
          coverageSelected: ''
        },
        rm: {
        
          titleTranslation: 'Roadside Membership',
          coverageSelected: 'enrolled'
        },
        nsd: {
         
          titleTranslation: 'NSD Travel Club',
          coverageSelected: ''
        },
        comp: {
          
          titleTranslation: 'Comprehensive',
          coverageSelected:''
        },
        coll: {
        
          titleTranslation: 'Collision',
          coverageSelected: ''
        },
        rent: {
         
          titleTranslation: 'Rental ReimburseRental Reimburse',
          coverageSelected: ''
        }
      };
    }
    ngOnInit(): void {
      this.qouteId=localStorage.getItem('oneink_qouteId');
      this.payPlanFormGroup = this.fb.group({
        payPlan: ['', Validators.required]
      });
    

     this.payPlanOption();
    
     this.getAllData();
     this.qoute_data();
    
     this.payPlanFormGroup.controls.payPlan.valueChanges.pipe(takeUntil(this.unsubscribe)).subscribe(payPlanId => {
      this.currentPayPlan = this.payPlans.filter(payPlan => {
        return (`${payPlan.payPlanId}-${payPlan.autoPayStatus}`) === payPlanId;
      });
      this.setcurrentPayPlan(this.currentPayPlan[0]);
      this.qouteSnapsot();
      console.log(this.currentPayPlan,"this.currentPayPlan");

    this.payPlans['']
    });
    }
    setPayPlan(payPlanId: string, autoPayStatus: string) {
      const payPlanToSet = `${payPlanId}-${autoPayStatus}`;
      this.payPlanFormGroup.controls.payPlan.reset(payPlanToSet);
    }
    
    getPlan(i)
    {
     
      this.payPlans[i]['checked']=true;
      console.log(this.payPlans[i]['checked'],"getPlan");
    }
    ngAfterViewInit()
    {
     
      
    }
    qoute_data()
    {
      var item={};
      item['quoteId']=localStorage.getItem('oneink_qouteId');
      item['type']='New Business';
    item['effectiveDate'] = this.qoute_model['effectiveDate'];
    item['today'] = new Date();
    item['edoc']=this.qoute_model['documentDeliveryMethod']
    item['expirationDate'] = this.calculateExpirationDate(item['effectiveDate'], 6);
    this.qoute.push(item);
   console.log(this.qoute,"this.qoute") 
  }

  calculateExpirationDate(startingDate: Date, termLength: number) {
    console.log(startingDate,"startingDate") 
    const expirationDateToSet = new Date(startingDate);
    expirationDateToSet.setMonth(expirationDateToSet.getMonth() + termLength);
    return expirationDateToSet;
  }
   getAllData()
   {
    
     this.drivers=this.qoute_model['drivers'];
     this.vehicles=this.qoute_model['vehicles'];
   }
    payPlanOption()
    {
  
      this.oneInkService.payPlanOption().pipe(takeUntil(this.unsubscribe)).subscribe(result => 
        {
          this.payPlans=result;
          //  const isPayPlanSaved = this.quoteService.quotePayPlanId.value && this.quoteService.quotePayPlanId.value !== '';
    //  if (isPayPlanSaved && this.quoteService.quoteAutoPayStatus.value !== '') {
    //    this.setPayPlan(this.quoteService.quotePayPlanId.value, this.quoteService.quoteAutoPayStatus.value);
    //  } else {
       const manualPayment: any = this.payPlans.find(plan =>
        plan.autoPayStatus === 'none' && plan.numberOfPaymentsIncludingDownpayment !== 1
      );
      console.log(result,"payPlanOption",manualPayment);  
      this.setPayPlan(manualPayment.payPlanId, manualPayment.autoPayStatus);
       
   // }
        
    });
  }
  qouteSnapsot()
  {
  
    this.oneInkService.qouteSnapsot().pipe(takeUntil(this.unsubscribe)).subscribe(result => 
      {
       this.qoute_snapshot_data=result;
       this.setUpCoverage();
      localStorage.setItem('oneink_guid',result['guid']);
      console.log(result,"qouteSnapsot");   
  });
}

  getPaymentTranslation(payPlan: any) {
    if (payPlan.autoPayStatus !== 'none') {
      return payPlan.autoPayStatus === 'eft'
        ? 'Bank Account Autopay'
        : 'Credit Card Autopay';
    } else {
      return payPlan.numberOfPaymentsIncludingDownpayment.toString() === '1'
        ? 'Full Pay'
        : 'Manual Payment';
    }
  }
  getMonthlyPaymentsFromPayPlan(payPlan): number {
    return payPlan.totalPremiumAndFee / (payPlan.numberOfPaymentsIncludingDownpayment || 1);
  }

  getTotalPremiumFromPayPlan(payPlan): number {
    const fees = payPlan.fees
      .map(fee => fee.amount)
      .reduce((previousFee, currentFee) => previousFee + currentFee, 0);
    return payPlan.totalPremiumAndFee - fees;
  }
  setcurrentPayPlan(payPlan) {
    this.discounts = payPlan.discounts;
    console.log(payPlan,"setcurrentPayPlan",payPlan.discounts)
    this.discounts.forEach(discount => {
      if (discount.level === 'driver') {
        if (!this.driverDiscounts.some(driverDiscount => driverDiscount.name === discount.name)) {
          this.driverDiscounts.push(discount);
        }
      } else if (discount.level === 'vehicle') {
        if (!this.vehicleDiscounts.some(vehicleDiscount => vehicleDiscount.name === discount.name)) {
          this.vehicleDiscounts.push(discount);
        }
      } else if (discount.level === 'policy') {
        if (!this.policyDiscounts.some(policyDiscount => policyDiscount.name === discount.name)) {
          this.policyDiscounts.push(discount);
        }
      }
    });
  }
  private setSubtotal(payPlan) {
    this.subtotalVehiclePremium = payPlan.vehiclePremiums
      .map(vehiclePremium => vehiclePremium.subtotalPremium)
      .reduce((accumulatedSubtotal, vehicleSubtotal) => accumulatedSubtotal + vehicleSubtotal, 0);
      console.log(this.subtotalVehiclePremium,"subtotalVehiclePremium");
  }
setUpCoverage()
{
  this.coveragesView=[];
  this.coverage_limit_option=JSON.parse(localStorage.getItem('oneink_coverage_limit_option'));
  var oneink_coverage=JSON.parse(localStorage.getItem('oneink_coverage'));
//   console.log(coverage_limit_option,"coverage_limit_option")
//   var propertyDamage= coverage_limit_option.filter(coverageToFilter =>coverageToFilter.type === 'pd'
// && coverageToFilter.id === oneink_coverage['propertyDamage']
// && !coverageToFilter.isInactive)
// .map((coverage: any) => {
//   return coverage.name
// });

// var personalInjuryProtection= coverage_limit_option.filter(coverageToFilter =>coverageToFilter.type === 'pip'
// && coverageToFilter.id === oneink_coverage['personalInjuryProtection']
// && !coverageToFilter.isInactive)
// .map((coverage: any) => {
//   return coverage.name
// });
  
var  rm= this.qoute_snapshot_data.roadsideAssistanceType === 'noCoverage'
? 'enrolled'
: this.qoute_snapshot_data.roadsideAssistanceType;
this.coveragesDictionary['nsd']['coverageSelected']= rm;
this.arrangeCoverageInfo(this.currentPayPlan[0])
this.setSubtotal(this.currentPayPlan[0]);
//console.log(this.currentPayPlan[0],"coverage_limit_option");
  // var coverage_list:any=[];
  // var item = {};
  // item['Name']= 'Property Damage';
  // item['limit']= propertyDamage;
  // item['options']= '';
  // item['vehicles']= '$391.00';
  // coverage_list.push(item);
  // item=[];

  // item['Name']= 'Personal Injury Protection';
  // item['limit']= personalInjuryProtection;
  // item['options']= '';
  // item['vehicles']= '$391.00';
  // coverage_list.push(item);
  // item=[];

  // item['Name']= 'Roadside Membership';
  // item['limit']= rm;
  // item['options']= '';
  // item['vehicles']= '';
  // coverage_list.push(item);
  // item=[];

  // item['Name']= 'NSD Travel Club';
  // item['limit']= oneink_coverage['NDSTravelClub'];
  // item['options']= '';
  // item['vehicles']= '';
  // coverage_list.push(item);
  // item=[];

  // item['Name']= 'Comprehensive';
  // item['limit']= '10000';
  // item['options']= '';
  // item['vehicles']= '$391.00';
  // coverage_list.push(item);
  // item=[];

  // item['Name']= 'Collision';
  // item['limit']= '10000';
  // item['options']= '';
  // item['vehicles']= '$391.00';
  // coverage_list.push(item);
  // item=[];

  // item['Name']= 'Rental Reimburse';
  // item['limit']= '10000';
  // item['options']= '';
  // item['vehicles']= '$391.00';
  // coverage_list.push(item);
  // item=[];

  //  this.coverages=coverage_list;     
  //   console.log(this.coverages,"new_array")
  
}

private arrangeCoverageInfo(payPlan) {
 
  payPlan.vehiclePremiums.map(vehiclePremium => vehiclePremium.coverages)
    .reduce(this.reduceAmountsInCoverages.bind(this), [])
    .forEach(this.setCoveragesDictionary.bind(this));
    this.parseCoveragesToViewCoverages();
    //console.log(this.coveragesDictionary,"arrangeCoverageInfo")
  
}

private reduceAmountsInCoverages(previousCoverages,
  coverageList) {
coverageList.forEach((specificCoverage, index) => {
if (!previousCoverages[index]) {
previousCoverages[index] = ({
coverageType: specificCoverage.coverageType,
coverageLimitOptionId: specificCoverage.coverageLimitOptionId,
premiumAmount: specificCoverage.premiumAmount
});
} else {
previousCoverages[index].premiumAmount += specificCoverage.premiumAmount;
}
});
return previousCoverages;
}

private setCoveragesDictionary(coverageFromList) {
  
if (coverageFromList) {
this.coveragesDictionary[coverageFromList.coverageType].coverage = coverageFromList;
}

}
private parseCoveragesToViewCoverages() {
  this.coveragesView = [];
  Object.keys(this.coveragesDictionary).forEach(coverageKey => {
    const coverageViewToAdd = Object.assign(
      {},
      
      this.coveragesDictionary[coverageKey],
      {isOpen: false}
    );
  
    this.coveragesView.push(coverageViewToAdd);
  });
  console.log(this.coveragesView,"coveragesView")
}
getValueFromCoverageId(coverageId: number | string): string {
  var limit;
  if (coverageId) {
    
    const indexToUse = coverageId.toString();
   limit= this.coverage_limit_option.filter(coverageToFilter => coverageToFilter.id === coverageId
&& !coverageToFilter.isInactive)
.map((coverage: any) => {
  return coverage.name
});

   
  }
 
  return limit;
}
CalculateAge(dateOfBirth)
{
  
 
  if (dateOfBirth!=undefined) {
    const todayDate = new Date();
    const dateDifference = todayDate.getTime() - new Date(dateOfBirth).getTime();
    if(new Date(dateDifference).getUTCFullYear())
    {
      return Math.abs(new Date(dateDifference).getUTCFullYear() - 1970);
    }
   }
}
  submit()
  {
    var qoute_model=
    {
      'quoteId':this.qouteId,
      'quotePolicyInfoModel':
      {
        autoPayStatus: this.currentPayPlan[0].autoPayStatus,
       effectiveDate: this.qoute_model['effectiveDate']
       ? this.qoute_model['effectiveDate']
       : '',
       payPlanId: this.currentPayPlan[0].payPlanId,
       termLength: 6,
      }
    }
    this.oneInkService.saveCommanQoute(qoute_model).pipe(takeUntil(this.unsubscribe)).subscribe(result => 
      {
      
        this.router.navigate(['/one-ink/underwritting']);
      console.log(result,"saveCommanQoute");   
       
  });
  }
  save_qoute()
  {
    var qoute_model=
    {
      'quoteId':this.qouteId,
      'quotePolicyInfoModel':
      {
        autoPayStatus: this.currentPayPlan[0].autoPayStatus,
       effectiveDate: this.qoute_model['effectiveDate']
       ? this.qoute_model['effectiveDate']
       : '',
       payPlanId: this.currentPayPlan[0].payPlanId,
       termLength: 6,
      }
    }
    this.oneInkService.saveCommanQoute(qoute_model).pipe(takeUntil(this.unsubscribe)).subscribe(result => 
      {
      
    
  });

  }
    ngOnDestroy() {
      this.unsubscribe.next();
      this.unsubscribe.complete();
    }
  }
  