import { Component, OnInit, Injectable,Input, ViewChild, ɵConsole } from '@angular/core';
import { BeyontecService } from '../../../commons/services/beyontec/beyontec.service';
import {FormControl, FormGroup, ReactiveFormsModule, FormsModule, FormBuilder, Validators, FormArray} from '@angular/forms';
import {NgbDateAdapter, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { NgbDateStruct, NgbCalendar, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '../../../commons/services/common/common.service';
import { BeyontecFormService } from '../beyontec-form.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-beyontec10',
  templateUrl: './beyontec10.component.html',
  styleUrls: ['./beyontec10.component.css']
})
export class Beyontec10Component implements OnInit {
  // selectState = [
  //   {id: 1, state: 'Texas'},
  //   {id: 2, state: 'Alabama'},
  //   {id: 3, state: 'Alaska'},
  //   {id: 4, state: 'Arizona'},
  //   {id: 5, state: 'Arkansas'},
  //   {id: 6, state: 'California'},
  //   {id: 7, state: 'Colorado'},
  //   {id: 8, state: 'Conneticut'},
  //   {id: 9, state: 'Delaware'},
  //   {id: 10, state: 'District of Columbia'},
  //   {id: 11, state: 'Florida'},
  //   {id: 12, state: 'Georgia'},
  //   {id: 13, state: 'Hawaii'},
  //   {id: 14, state: 'Idaho'},
  // ];

  selectMonth = [
    {key: 1, value: '01'},
    {key: 2, value: '02'},
    {key: 3, value: '03'},
    {key: 4, value: '04'},
    {key: 5, value: '05'},
    {key: 6, value: '06'},
    {key: 7, value: '07'},
    {key: 8, value: '08'},
    {key: 9, value: '09'},
    {key: 10, value: '10'},
    {key: 11, value: '11'},
    {key: 12, value: '12'},
  ];

  selectYear = [
    {key: 20, value: '2020'},
    {key: 21, value: '2021'},
    {key: 22, value: '2022'},
    {key: 23, value: '2023'},
    {key: 24, value: '2024'},
    {key: 25, value: '2025'},
    {key: 26, value: '2026'},
    {key: 27, value: '2027'},
    {key: 28, value: '2028'},
    {key: 29, value: '2029'},
    {key: 30, value: '2030'},
  ];
  form: FormGroup;
  json_driver : any;
  isClicked: boolean = false;
  dropArr: any;
  selectState :any[];
  index:any;
  minutesQuote: any;
  driverList: any;
  vehicleList: any;
  editIndex :number;
  quoteFor = '';
  productQuoteId = '';
  minutesQuoteSelected : any;
  loading : boolean = false;
  authorizeCheck = true;
  transactionError : any;
  invalidCC: boolean;
  stateList: any[];
  is_mode_of_payment : boolean = false;
  beyontec_fullQuote: any;
  expandedLength
  limitedLength
  paymentPrograms
  mode_of_payment : any = [
    {
      "key" : "cc",
      "value": "Credit Card",
      "img": "./assets/images/payment/payment-icon-credit-card.png"
    },
    {
      "key" : "paypal",
      "value": "Paypal",
      "img": "./assets/images/payment/payment-icon-paypal.png"
    },
    {
      "key" : "gpay",
      "value": "Google Pay",
      "img": "./assets/images/payment/payment-icon-Gpay.png"
    },
    {
      "key" : "applepay",
      "value": "Apple Pay",
      "img": "./assets/images/payment/payment-icon-apple-pay.png"
    }
  ];

  PAYMENT_TYPES = {
    '6MthNonEFT_EXP': 'Pay by Month',
    '6MthPIF_EXP': 'Pay in Full',
    '1Mth_EXP': 'Pay in Full',
    '2Mth_EXP': 'Pay in Full',
    '3Mth_EXP': 'Pay in Full',
    '6MthPIF_LTD': 'Pay in Full',
    '6MthNonEFT_LTD': 'Pay by Month',
    '6MthEFT_EXP': 'Autopay',
    '6MthEFT_LTD': 'Autopay',
  }

  esignUrl : any;
  discounts : any;
  @Input() paymentPlan =  "";
  @Input() routingNo =  ""; 
  @Input() accountNo =  ""; 
  @Input() bankName =  "";  

  constructor(public router: Router, public api_form : BeyontecService, private formBuilder: FormBuilder, public api_common : CommonService, public BeyontecFormService:BeyontecFormService, private activeroute:ActivatedRoute, private readonly fb: FormBuilder) { }

  ngOnInit(): void {
    (<any>$('[data-tooltip="tooltip"]')).tooltip();
    this.getInit();
    
    
    this.discounts =  JSON.parse(localStorage.getItem('discounts'));

    this.paymentPlan = this.discounts.paymentPlan;

    this.json_driver= JSON.parse(localStorage.getItem("beyontech_drivers"))
    if(!this.BeyontecFormService.drivers_array$)
    {
      this.BeyontecFormService.getDriverForm();
      this.BeyontecFormService.assignLocalToDriver(this.json_driver);
    }
    this.BeyontecFormService.drivers_array$.valueChanges.subscribe(value => { 
      this.BeyontecFormService.saveResponse(value.driver, "driver")
    });
    console.log(this.BeyontecFormService.drivers_array$,"arrr");


    this.getConditionalValidation();

  }

  getInit(){
    (<any>$('[data-tooltip="tooltip"]')).tooltip();
    this.selectState =[];
    // this.selectYear=[];
    // this.vehicleFinancedLeased=[];

    this.api_common.getTocken().subscribe((data: {}) => {
      // console.log(data, 'generateToken');
      let dataReq = {
        "token": data['token'],
        "companyProductCd": "PTXNSA"
      }
      // console.log(this.zipdata);
      this.api_common.getDropdown(dataReq).subscribe((dataDrop: {}) => {
        console.log(dataDrop);
        Object.keys(dataDrop['stateLicensed'][0]).forEach(key => {
          this.selectState.push({ key: key, value: dataDrop['stateLicensed'][0][key] });
        });

        // Object.keys(dataDrop['stateLicensed'][0]).forEach(key => {
        //   this.selectState.push({ key: key, value: dataDrop['stateLicensed'][0][key] });
        // });
        // console.log(this.selectState, "selectState");

      });
    });

    this.minutesQuote = JSON.parse(localStorage.getItem('beyontec_minutesQuote'));
    this.driverList = JSON.parse(localStorage.getItem('beyontech_drivers'));

    if(localStorage.getItem("beyontec_fullQuote") != undefined || localStorage.getItem("beyontec_fullQuote") != null){
      this.beyontec_fullQuote = JSON.parse(localStorage.getItem("beyontec_fullQuote"));

      console.log(this.beyontec_fullQuote, 'beyontec_fullQuote')

      this.productQuoteId = this.beyontec_fullQuote.productQuoteId;


      if (this.beyontec_fullQuote.programs.expanded != null) { this.expandedLength = Object.keys(this.beyontec_fullQuote.programs.expanded.payPlans).length; }
      else { this.expandedLength = 0; }

      if (this.beyontec_fullQuote.programs.limited != null) { this.limitedLength = Object.keys(this.beyontec_fullQuote.programs.limited.payPlans).length; }
      else { this.limitedLength = 0; }


      // console.log(this.expandedLength, " expandedLength ----------- " + this.limitedLength + " limitedLength")
      let key;
      let program;
      this.paymentPrograms = {};
      for (program of Object.keys(this.beyontec_fullQuote.programs || {})) {
        // console.log(program, "program");
        // console.log(this.beyontec_fullQuote.programs[program], "program payPlans");
        this.paymentPrograms[program] = [];

        if (this.beyontec_fullQuote.programs[program] != null) {
          for (key of Object.keys(this.beyontec_fullQuote.programs[program].payPlans || {})) {
            if (program === 'limited' || program === 'expanded') {
              const payPlan = this.beyontec_fullQuote.programs[program].payPlans[key];
              payPlan.name = key;
              payPlan.translateName = this.PAYMENT_TYPES[key];
              // console.log(payPlan.translateName, "payPlan.translateName")
              payPlan.pluralMonth = (key.charAt(0) === '6' && key.search('EFT') > -1) ?
                "month" : key.charAt(0) + ' months'
              payPlan.pluralMonth = key.charAt(0) === '1' ? '1 month' : payPlan.pluralMonth;
              payPlan.showMonth = payPlan.pluralMonth !== '6 months';
              if (payPlan.pluralMonth === '6 months') {
                payPlan.pluralMonth = "One-Time Payment"
              } else if (payPlan.pluralMonth === 'month') {
                payPlan.pluralMonth = "Down payment"
              }
              payPlan.monthPolicy = key.charAt(0) + ' ' + "Month";
              payPlan.monthlyPayment = (key.charAt(0) === '6' && key.search('EFT') > -1)
                ? payPlan.monthlyPayment.replace(',', '')
                : payPlan.downPayment.replace(',', '');
              payPlan.totalPremium = (key.charAt(0) === '6' && key.search('EFT') > -1)
                ? payPlan.totalPremium.replace(',', '')
                : payPlan.totalPremium.replace(',', '');
              payPlan.downPayment = (key.charAt(0) === '6' && key.search('EFT') > -1)
                ? payPlan.downPayment.replace(',', '')
                : payPlan.totalPremium.replace(',', '');
              this.paymentPrograms[program].push(payPlan);
            }
          }
        }
      }

      if(this.expandedLength == 1){
        this.minutesQuoteSelected = this.paymentPrograms.expanded[0];
      }else if(this.limitedLength == 1){
        this.minutesQuoteSelected = this.paymentPrograms.limited[0];
      }

      console.log(this.paymentPrograms, 'paymentPrograms')
      // this.beyontec_fullQuote.
    }

    // if(this.minutesQuote == undefined || this.minutesQuote == null){
    //   this.router.navigate(['beyontec/04']);
    // }else{
    //   this.productQuoteId = this.minutesQuote.productQuoteId;

    //   // if(this.minutesQuote.programs)
    //   this.minutesQuoteSelected = this.minutesQuote.choice
    //   console.log(this.minutesQuoteSelected, "selectState");
    // }

    if(this.driverList== undefined || this.driverList== null){
      this.router.navigate(['beyontec/01']);
    }else{
      this.quoteFor = this.driverList[0]['firstName']+" "+this.driverList[0]['lastName']
      // this.setDriver();
    }

    this.form = this.formBuilder.group({
      psd:[''],
      isdrivingLicence:[''],
      unit : [''],
      firstName : ['',[Validators.required, Validators.min(1)]],
      middleName : ['',[Validators.min(1)]],
      lastName : ['',[Validators.required, Validators.min(1)]],
      email : ['',[Validators.required]],
      phone1 : ['',[Validators.required, Validators.min(3)]],
      phone2 : ['',[Validators.required, Validators.min(3)]],
      phone3 : ['',[Validators.required, Validators.min(4)]],
      phoneNumber : [''],
      dob : ['',[Validators.required]],
      isMale : ['',[Validators.required]],
      isMarried : ['',[Validators.required]],
      relationship : [''],
      licenseType : [''],
      stateLicense : [''],
      countryLicense : [''],
      licenseNum : [''],
      sr22 : [''],
      zip : ['',[Validators.required]],
      county : ['',[Validators.required]],
      yearsLicensed : [''],
      suffix : [''],
      street : ['',[Validators.required]],
      aptNumber : [''],
      city : ['',[Validators.required]],
      state : ['',[Validators.required]],
      occupation : [''],
      employer : [''],
      mobilePhone : [''],
      workPhone : [''],
      isAnytickets: [''],
      violationsArray : this.formBuilder.array([]),
      isPrimaryDriver : [true],
      isExcluded : [''],
      driver_include:[''],
      driver_from_api:[''],
      isBillingAddressSame:[''],
      billingAddress:[''],
      billingCity:[''],
      billingState:[''],
      billingZip:[''],
      mode_of_payment:[null,[Validators.required]],
      cno1:['',[Validators.required]],
      cno2:['',[Validators.required]],
      cno3:['',[Validators.required]],
      cno4:['',[Validators.required]],
      cardMonth:['',[Validators.required]],
      cardYear:['',[Validators.required]],
      cardCvv:['',[Validators.required]],
    });

    this.setDriver();
    this.getDropdown();
  }



  getDropdown(){
    this.api_common.getTocken().subscribe((data: {}) => {
      // console.log(data, 'generateToken');
      let dataReq = {
        "token": data['token'],
        "companyProductCd": "PTXNSA"
      }
      // console.log(this.zipdata);
      this.api_common.getDropdown(dataReq).subscribe((dataDrop: {}) => {
        if (dataDrop) {
          // console.log(dataDrop)
          this.stateList = [];
          Object.keys(dataDrop['stateLicensed'][0]).forEach(key => {
            this.stateList.push({ key: key, value: dataDrop['stateLicensed'][0][key] });
          });

          // this.genderList=[]
          // Object.keys(dataDrop['gender'][0]).forEach(key => {
          //   this.genderList.push({ key: key, value: dataDrop['gender'][0][key] });
          // });

          // this.maritalStatusList=[]
          // Object.keys(dataDrop['maritalStatus'][0]).forEach(key => {
          //   this.maritalStatusList.push({ key: key, value: dataDrop['maritalStatus'][0][key] });
          // });

          // console.log(this.maritalStatusList,"this.maritalStatusList")

        }
      });
    });


    // let countyArr = JSON.parse(localStorage.getItem('insuranceFor')).countyList;
    // this.countieList = [];
    // if(countyArr){
    //   Object.keys(countyArr).forEach(key => {
    //     this.countieList.push({ key: key, value: countyArr[key] });
    //   });
    // }
    
    // console.log(this.countieList, 'this.countieList')
    // this.countieList.push({key : "1", value : 'FAYETTE'})
  }



  setDriver(){

    let a = JSON.parse(localStorage.getItem('beyontech_drivers'));
    // let b = JSON.parse(localStorage.getItem('beyontec_coverage'));
    // console.log(a)
    this.BeyontecFormService.getDriverForm();
    this.BeyontecFormService.assignLocalToDriver(a);

    let control0 = (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(0).value;
    console.log(control0 , "control at 0");
    this.form.patchValue(control0)
  }

  getValueChange(e){
    console.log(e.key)
    if(e.key == 'cc'){

    }else{

    }
  }

  getConditionalValidation(){
    this.form.get('mode_of_payment').valueChanges
        .subscribe(value => {
        // console.log(value);
          if(value != 'cc') {

            // this.is_mode_of_payment =false;

            this.form.get('cno1').clearValidators();           
            this.form.get('cno1').setErrors(null);
            this.form.get('cno1').markAsPristine();

            this.form.get('cno2').clearValidators();           
            this.form.get('cno2').setErrors(null);
            this.form.get('cno2').markAsPristine();

            this.form.get('cno3').clearValidators();            
            this.form.get('cno3').setErrors(null);
            this.form.get('cno3').markAsPristine();

            this.form.get('cno4').clearValidators();            
            this.form.get('cno4').setErrors(null);
            this.form.get('cno4').markAsPristine();

            this.form.get('cardMonth').clearValidators();            
            this.form.get('cardMonth').setErrors(null);
            this.form.get('cardMonth').markAsPristine();

            this.form.get('cardYear').clearValidators();           
            this.form.get('cardYear').setErrors(null);
            this.form.get('cardYear').markAsPristine();

            this.form.get('cardCvv').clearValidators();
            this.form.get('cardCvv').setErrors(null);
            this.form.get('cardCvv').markAsPristine();
            this.form.updateValueAndValidity(); 
          } else {
            // this.is_mode_of_payment =true;
            this.form.get('cno1').setValidators(Validators.required);
            this.form.get('cno2').setValidators(Validators.required);
            this.form.get('cno3').setValidators(Validators.required);
            this.form.get('cno4').setValidators(Validators.required);
            this.form.get('cardMonth').setValidators(Validators.required);
            this.form.get('cardYear').setValidators(Validators.required);
            this.form.get('cardCvv').setValidators(Validators.required);
            this.form.updateValueAndValidity(); 
          }
          
        }
    );
  }

  onSubmitBank(){
    // this.loading = true;
    // console.log(this.bankName, this.accountNo, this.routingNo)
    // if(this.bankName && this.accountNo && this.routingNo){
      this.getPayment();
    // }
    // else{
    //   document.getElementById("openModalAutoPayMethod").click();
    // }
  }

  onSubmit(){
    // console.log(this.paymentPlan)

    if(this.paymentPlan == 'EFT'){
      document.getElementById("openModalAutoPayMethod").click();
    }else{
      this.getPayment()
    }

  }


  getPayment(){
     // this.loading = true;
 console.log(this.form)

 console.log(this.form.get('mode_of_payment').value)


 if(this.form.get('mode_of_payment').value == 'cc'){

   this.onSubmitCC();
   // let dataReq = {
   //   "paymentType": "CC",
   //   "cc": this.form.get('cno1').value+""+this.form.get('cno2').value+""+this.form.get('cno3').value+""+this.form.get('cno4').value,
   //   "nameOnCard": this.form.get('firstName').value+" "+this.form.get('lastName').value,
   //   "expire": this.form.get('cardMonth').value+""+this.form.get('cardYear').value,
   //   "cvv": this.form.get('cardCvv').value,
   //   "amount": this.minutesQuoteSelected.downPayment,
   //   "recurring": this.minutesQuoteSelected.policyFee == 1 ? 'N' : 'Y',
   // }
   // this.api_form.ccPay(dataReq).subscribe((dataResp: {}) => {
   //  console.log(dataResp)
   //  if(dataResp['code'] == 200){
   //   this.router.navigate(['beyontec/11']);
   //  }else{
   //    alert(dataResp['msg'])
   //  }
    
   // });
 }
 else if(this.form.get('mode_of_payment').value == 'paypal'){

   let dataReq = {
     "amount": this.minutesQuoteSelected.downPayment,
   }
   this.api_form.paypalPay(dataReq).subscribe((dataResp: {}) => {
    console.log(dataResp)
    if(dataResp['code'] == 200){
     this.router.navigate(['beyontec/11']);
    }else{
     alert(dataResp['msg'])
   }
    
   });

 }
 else if(this.form.get('mode_of_payment').value == 'gpay'){

   let dataReq = {
     "amount": this.minutesQuoteSelected.downPayment,
   }
   this.api_form.gPay(dataReq).subscribe((dataResp: {}) => {
    console.log(dataResp)
    if(dataResp['code'] == 200){
     this.router.navigate(['beyontec/11']);
    }else{
     alert(dataResp['msg'])
   }
    
   });

 }
 else if(this.form.get('mode_of_payment').value == 'applepay'){
   
   let dataReq = {
     "amount": this.minutesQuoteSelected.downPayment,
   }
   this.api_form.applePay(dataReq).subscribe((dataResp: {}) => {
    console.log(dataResp)
    if(dataResp['code'] == 200){
     this.router.navigate(['beyontec/11']);
    }else{
     alert(dataResp['msg'])
   }
    
   });


 }
 
  }

  onSubmitCC(){
    this.loading = true;
    // document.getElementById("closeAddExpenseModal").click();

    // let dataReq = {
    //   "requestType": "DOWNPAY",
    //     "policyNo": this.productQuoteId,
    //     "agentId": "PI001",
    //     "sourceId": "WEBAPP",
    //     "payPlan": "6MthPIF_LTD",
    //     "purchase": {
    //       "paymentType": "CC",
    //       "amount": "10",
    //       "recurring": "N",
    //       "ccDetails": {
    //         "payRefId": '',
    //         "ccNo": "4111111111111111",
    //         "nameOnCard": "Emily Paikray",
    //         "expDate": "1023",
    //         "cvv": "123",
    //         "address": "Lake View St.",
    //         "postalCode": "12345"
    //       }
    //     }
    //   }

console.log( this.beyontec_fullQuote, 'beyontec_fullQuote')

    


    
    
    this.api_common.getTocken().subscribe((data: {}) => {
      console.log(data, 'generateToken');
      // let dataReqUrl = "https://stableapi.prontoinsurance.com/pay/services/policy?token="+data['token'];
      // console.log(this.zipdata);
      // this.api_form.policyBuyBypass(dataReq, dataReqUrl).subscribe((data1: {}) => {

     
      let dataReq : any = {};

      if(this.paymentPlan == 'EFT'){
        dataReq = {
          "token":data['token'],
          "requestType": this.minutesQuoteSelected.policyFee == 1 ? "FULLPAY" : "DOWNPAY",
          "policyNo": this.beyontec_fullQuote.productQuoteId,
          "agentId": "PI001",
          "sourceId": "WEBAPP",
          "payPlan": this.minutesQuoteSelected.name,
          "purchase": {
            "paymentType": "CC",
            "amount": this.minutesQuoteSelected.downPayment,
            "recurring": this.minutesQuoteSelected.translateName == 'Autopay' ? 'Y' : 'N',
            "ccDetails": {
              "payRefId": '',
              "ccNo": this.form.get('cno1').value+""+this.form.get('cno2').value+""+this.form.get('cno3').value+""+this.form.get('cno4').value,
              "nameOnCard": this.form.get('firstName').value+" "+this.form.get('lastName').value,
              "expDate": this.form.get('cardMonth').value+""+this.form.get('cardYear').value,
              "cvv": this.form.get('cardCvv').value,
              "address": this.form.get('street').value,
              "postalCode": this.form.get('zip').value
            },
            "eft": {
              "payRefId": "",
              "routingNo": this.routingNo,
              "accountNo": this.accountNo,
              "accountType": "27",
              "bankName": this.bankName
            }
          }
        }
      }
      else{
       dataReq = {
          "token":data['token'],
          "requestType": this.minutesQuoteSelected.policyFee == 1 ? "FULLPAY" : "DOWNPAY",
          "policyNo": this.beyontec_fullQuote.productQuoteId,
          "agentId": "PI001",
          "sourceId": "WEBAPP",
          "payPlan": this.minutesQuoteSelected.name,
          "purchase": {
            "paymentType": "CC",
            "amount": this.minutesQuoteSelected.downPayment,
            "recurring": this.minutesQuoteSelected.translateName == 'Autopay' ? 'Y' : 'N',
            "ccDetails": {
              "payRefId": '',
              "ccNo": this.form.get('cno1').value+""+this.form.get('cno2').value+""+this.form.get('cno3').value+""+this.form.get('cno4').value,
              "nameOnCard": this.form.get('firstName').value+" "+this.form.get('lastName').value,
              "expDate": this.form.get('cardMonth').value+""+this.form.get('cardYear').value,
              "cvv": this.form.get('cardCvv').value,
              "address": this.form.get('street').value,
              "postalCode": this.form.get('zip').value
            }
          }
        }
      }
        
        console.log(JSON.stringify(dataReq), 'dataReq string');

      this.api_form.policyBuy(dataReq).subscribe((data1: {}) => {

          console.log(data1, 'data1');
          this.loading = false;

          // if (this.handlePaymentErrors(data1)) {
          //   return;
          // }

          if(data1['results'] > 0){
            localStorage.setItem('beyontech_payStatement', JSON.stringify(data1))
            if(data1['esignUrl'] === 'null'){
              this.router.navigate(['beyontec/11']);
            }else{
              this.esignUrl =  data1['esignUrl'];
              document.getElementById("openModalButtonesign").click();
            }
          }else{
            this.transactionError = data1['message'];
            document.getElementById('openModalTransactionError').click();
          }
          


      });
    }, error => {
      console.error('makeDownPayment failed:', error);
      // this.handlePaymentErrors(error);
    });

  }


  getBillingAddress(e){
    // console.log(e.target.value)
    if(e.target.value == 'yes'){
      this.form.get('billingAddress').setValue(this.form.get('street').value)
      this.form.get('billingCity').setValue(this.form.get('city').value)
      this.form.get('billingState').setValue(this.form.get('state').value)
      this.form.get('billingZip').setValue(this.form.get('zip').value)
    }else{
      this.form.get('billingAddress').setValue('')
      this.form.get('billingCity').setValue('')
      this.form.get('billingState').setValue('')
      this.form.get('billingZip').setValue('')
    }
  }


  onSubmitEsign(){
    document.getElementById("closePurchacePolicyModal").click();
    window.open(this.esignUrl, "_blank");
    this.router.navigate(['beyontec/11']);
  }


  keytab(event, n, i){
    let nextInput = event.target.value
    // console.log(nextInput.length)
    if(i == 1 && nextInput.length == n){
      let inputField: HTMLElement = <HTMLElement>document.querySelector("#cno2");
      inputField.focus();
    }
    if(i == 2 && nextInput.length == n){
      let inputField1: HTMLElement = <HTMLElement>document.querySelector("#cno3");
      inputField1.focus();
    }

    if(i == 3 && nextInput.length == n){
      let inputField1: HTMLElement = <HTMLElement>document.querySelector("#cno4");
      inputField1.focus();
    }

  }


  // private handlePaymentErrors(response) {
  //   if (response.results) {
  //     return false;
  //   }

  //   const codeStr = /\d*$/.exec(response.messageId) || '';
  //   let code = parseInt(codeStr.toString(), 10) || 0;
  //   if (code > 12) {
  //     code = 0;
  //   }

  //   if (code === 6) {
  //     this.showInvalidCreditCardErrorModal();
  //   } else {
  //     this.showInvalidPaymentErrorModal(code);
  //   }
  //   return true;
  // }


  // private showInvalidCreditCardErrorModal() {
  //   alert("Invalid Credit Card")
  // }

  // private showInvalidPaymentErrorModal(code) {
    
  // }


  private invalidCreditCardErrorHandler() {
    this.invalidCC = true;
  }


  beyondtecFullquote(){
    let a = JSON.parse(localStorage.getItem('beyontech_drivers'));
    let b =JSON.parse(localStorage.getItem('beyontec_minutesQuote')); 
    
    var datainput  = {
      "firstname" : a[0]['firstName'],
      "lastname" : a[0]['lastName'],  
      "QuoteNumber" : b['productQuoteId'],
      "State" : a[0]['state'],
      "email" : a[0]['email']
 }
    this.api_form.beyondtecFullquote(datainput).subscribe((data: {}) => {
      if(data[status] == 200){
     
      }
    });
    
  }
  


}
