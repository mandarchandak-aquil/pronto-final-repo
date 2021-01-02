import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DashboardService } from '../../commons/services/dashboard/dashboard.service';
import { SubjectCallService } from '../../commons/services/subject-call/subject-call.service';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard02-policy-details-payment-add',
  templateUrl: './dashboard02-policy-details-payment-add.component.html',
  styleUrls: ['./dashboard02-policy-details-payment-add.component.css']
})
export class Dashboard02PolicyDetailsPaymentAddComponent implements OnInit {
  loading : boolean =true;
  showcreditcard : boolean = true;
  invalidcreditcard : boolean = false;
  bankaccount = '1';
  eftpayment: FormGroup;
  ccpayment: FormGroup;
  source;
  policy;
  year = [
    {
      "key": "20",
      "value": "2020"
    },
    {
      "key": "21",
      "value": "2021"
    },
    {
      "key": "22",
      "value": "2022"
    },
    {
      "key": "23",
      "value": "2023"
    },
    {
      "key": "24",
      "value": "2024"
    },
    {
      "key": "25",
      "value": "2025"
    },
    {
      "key": "26",
      "value": "2026"
    },
    {
      "key": "27",
      "value": "2027"
    },
    {
      "key": "28",
      "value": "2028"
    },
    {
      "key": "29",
      "value": "2029"
    },
    {
      "key": "30",
      "value": "2030"
    },
  ];
  month = [
    {
      "key": "01",
      "value": "01"
    },
    {
      "key": "02",
      "value": "02"
    },
    {
      "key": "03",
      "value": "03"
    },
    {
      "key": "04",
      "value": "04"
    },
    {
      "key": "05",
      "value": "05"
    },
    {
      "key": "06",
      "value": "06"
    },
    {
      "key": "07",
      "value": "07"
    },
    {
      "key": "08",
      "value": "08"
    },
    {
      "key": "09",
      "value": "09"
    },
    {
      "key": "10",
      "value": "10"
    },
    {
      "key": "11",
      "value": "11"
    },
    {
      "key": "12",
      "value": "12"
    },
  ];
  constructor(public dash : DashboardService,public api_sub : SubjectCallService,private formBuilder: FormBuilder,public routers :Router) { }

  ngOnInit(): void {

    $(".cst_mCst_scroll_Desk").mCustomScrollbar({
      theme:"dark"
    });
    
    if(localStorage.getItem('policyDetailList')!= undefined || localStorage.getItem('policyDetailList')!= null)
    {
      this.policy = JSON.parse(localStorage.getItem('policyDetailList'));
      
      if(this.policy.policyTerm == '6MthEFT_EXP'  || this.policy.policyTerm == '6MthEFT_LTD'){
        this.bankaccount = '0';

      }
      console.log('this.policy.policyTerm',this.policy.policyTerm);
    }
    this.source = JSON.parse(sessionStorage.getItem('userdata'));
    this.loading = false;
    this.eftpayment = this.formBuilder.group({
      "requestType": ['eft'],
      "emailId": [this.source.email],
      "ccDetails": [[]],
      "eft": this.formBuilder.group({
        "routingNo": ['',Validators.required],
        "accountNo": ['',Validators.required],
        "accountType": [''],
        "bankName": ['',Validators.required],
        "defaultPayMode": false
      }),
    });
    this.ccpayment = this.formBuilder.group({
      "requestType": ['cc'],
      "emailId": [this.source.email],
      "ccDetails": this.formBuilder.group({
        "ccNo1": ['',[Validators.required,Validators.minLength(4)]],
        "ccNo2": ['',[Validators.required,Validators.minLength(4)]],
        "ccNo3": ['',[Validators.required,Validators.minLength(4)]],
        "ccNo4": ['',[Validators.required,Validators.minLength(4)]],
        "ccNo" : [],
        "nameOnCard": ['',Validators.required],
        "month": ['',Validators.required],
        "year": ['',Validators.required],
        "expDate": [''],
        "cvv": ['',[Validators.required,Validators.minLength(3)]],
        "address": ['',Validators.required],
        "postalCode": ['',[Validators.required,Validators.minLength(4)]],
        "defaultPayMode": false,
      }),
      "eft": [[]],
    });
  
    this.getConditionalValidation();
  }

  getConditionalValidation(){
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
  onSubmit(){

    if(this.showcreditcard == true){
      console.log('this.ccpayment',this.ccpayment.value);
      let form =this.ccpayment.value;
      //let c2 = form.ccNo1.concat(form.ccNo2);
      let c2 =form.ccDetails.ccNo1+''+form.ccDetails.ccNo2+''+form.ccDetails.ccNo3+''+form.ccDetails.ccNo4;
      console.log(form.ccDetails.ccNo1+''+form.ccDetails.ccNo2+''+form.ccDetails.ccNo3+''+form.ccDetails.ccNo4) 
      form.ccDetails.ccNo =  c2;
      let exp = form.ccDetails.month+''+form.ccDetails.year;
      form.ccDetails.expDate =  exp;
      console.log('form sss',JSON.stringify(form));
      
      this.dash.payaccountadd(form).subscribe((data: {}) => {
        console.log('data',data);
        if(data['messageId'] == 'AUTH0005'){
         
        this.ccpayment.reset(); 
        this.routers.navigate(['/dashboard/payment-settings']);
        }else if(data['messageId'] == 'E00027'){
          this.invalidcreditcard = true;
        }
        });
    }else if(this.showcreditcard == false){
      console.log('this.eftpayment',this.eftpayment.value);
      this.dash.payaccountadd(this.eftpayment.value).subscribe((data: {}) => {
        console.log('data',data);
        if(data['message'] == 'SUCCESS'){
         
        this.ccpayment.reset(); 
        this.routers.navigate(['/dashboard/policy-details']);
        }
        });
    }
  }
  closesocial(){
    this.invalidcreditcard = false;
  }
  //changing credit card and bank account
  changetype(type){
    if(type == 1){
      this.showcreditcard = true;
    }else if(type == 0){
      this.showcreditcard = false;
    }

  }

}
