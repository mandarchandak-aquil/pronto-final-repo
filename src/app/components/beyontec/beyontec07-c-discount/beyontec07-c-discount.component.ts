import { Component, OnInit, Injectable,Input } from '@angular/core';
import { BeyontecService } from '../../../commons/services/beyontec/beyontec.service';
import {FormControl, FormGroup, ReactiveFormsModule, FormsModule, FormBuilder, Validators, FormArray} from '@angular/forms';
import { CommonService } from '../../../commons/services/common/common.service';
import { BeyontecFormService } from '../beyontec-form.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-beyontec07-c-discount',
  templateUrl: './beyontec07-c-discount.component.html',
  styleUrls: ['./beyontec07-c-discount.component.css']
})
export class Beyontec07CDiscountComponent implements OnInit {


  @Input() full_pay =  "";
  @Input() auto_pay = "";
  @Input() paymentPlan =  "";

  minutesQuote
  minutesQuoteSelected
  loading : boolean =false;
  discounts;

  constructor(public router: Router, public api_form : BeyontecService, private formBuilder: FormBuilder, public api_common : CommonService, public BeyontecFormService:BeyontecFormService,) { }

  ngOnInit(): void {
    // this.getInit();

    if(localStorage.getItem('beyontec_minutesQuote') != undefined || localStorage.getItem('beyontec_minutesQuote') != null){
      this.minutesQuote = JSON.parse(localStorage.getItem('beyontec_minutesQuote'));
    // if(this.minutesQuote.programs)
      this.minutesQuoteSelected = this.minutesQuote.choice
      this.full_pay = Number(this.minutesQuoteSelected.numPayment) > 1 ? "no" : "yes" ;
      this.auto_pay = this.minutesQuoteSelected.translateName == "Autopay" ? "yes" : "no";

      // console.log(Number(this.minutesQuoteSelected.numPayment), 'generateToken');
    }
    if(localStorage.getItem('discounts') != undefined || localStorage.getItem('discounts') != null){
      this.discounts  = JSON.parse(localStorage.getItem('discounts'));
      this.paymentPlan = this.discounts.paymentPlan;
    }
    
    // this.full_pay = "yes";
    // this.auto_pay = "yes";
    // let discounts = JSON.parse(localStorage.getItem('discounts'));
    // if(discounts != undefined || discounts != null){
    //   this.full_pay = discounts.full_pay;
    //   this.auto_pay = discounts.auto_pay;
    // }
  }


  onSubmit(){

    if(this.auto_pay == 'yes'){
      document.getElementById("openModalAutoPayMethod").click();
    }else{
      // console.log(111)
      this.loading = true;
      let discounts = {
        "full_pay" : this.full_pay,
        "auto_pay" : this.auto_pay
      }
      localStorage.setItem('discounts', JSON.stringify(discounts));
      this.loading= false;
      this.router.navigate(['beyontec/08']);
    }
    
   
  }


  onSubmitAuto(){
    console.log(this.paymentPlan, 'paymentPlan')
    // let beyontech_drivers =  JSON.parse(localStorage.getItem('beyontech_drivers'));
    // console.log(this.paymentPlan, 'beyontech_drivers')

      this.loading = true;
      let discounts = {
        "full_pay" : this.full_pay,
        "auto_pay" : this.auto_pay,
        'paymentPlan' : this.paymentPlan
      }
      localStorage.setItem('discounts', JSON.stringify(discounts));
      this.loading= false;
      this.router.navigate(['beyontec/08']);
   
  }


  getInit(){
    // this.selectState =[];
    // this.vehicleFinancedLeased=[];

    // this.api_common.getTocken().subscribe((data: {}) => {
    //   // console.log(data, 'generateToken');
    //   let dataReq = {
    //     "token": data['token'],
    //     "companyProductCd": "PTXNSA"
    //   }
    //   // console.log(this.zipdata);
    //   this.api_common.getDropdown(dataReq).subscribe((dataDrop: {}) => {
    //     // console.log(dataDrop);
    //     Object.keys(dataDrop['stateLicensed'][0]).forEach(key => {
    //       this.selectState.push({ key: key, value: dataDrop['stateLicensed'][0][key] });
    //     });
    //     // console.log(this.selectState, "selectState");

    //   });
    // });

    // this.minutesQuote = JSON.parse(localStorage.getItem('beyontec_minutesQuote'));
    // this.driverList = JSON.parse(localStorage.getItem('beyontech_drivers'));

    // if(this.minutesQuote == undefined || this.minutesQuote == null){
    //   this.router.navigate(['beyontec/04']);
    // }else{
    //   this.productQuoteId = this.minutesQuote.productQuoteId;
    // }

    // if(this.driverList== undefined || this.driverList== null){
    //   this.router.navigate(['beyontec/01']);
    // }else{
    //   this.quoteFor = this.driverList[0]['firstName']+" "+this.driverList[0]['lastName']
    //   // this.setDriver();
    // }
    
  }

}
