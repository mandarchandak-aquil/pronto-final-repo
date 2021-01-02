
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../commons/services/dashboard/dashboard.service';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { SubjectCallService } from '../../commons/services/subject-call/subject-call.service';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-dashboard02-policy-details-payment',
  templateUrl: './dashboard02-policy-details-payment.component.html',
  styleUrls: ['./dashboard02-policy-details-payment.component.css'],
  providers: [DatePipe]

})
export class Dashboard02PolicyDetailsPaymentComponent implements OnInit {
  loading : boolean =true;
  payform: FormGroup;
  myDate = new Date();
  policy;
  currencies;
  Autopay : boolean =  false;
  continue : boolean =  false;
  cardlist : any = [];
  source;
  samplecard;
  payrefid;
  constructor(private router :Router,public dash : DashboardService, private formBuilder: FormBuilder,private datePipe: DatePipe,public sub :SubjectCallService) { }

  ngOnInit(): void {
  

 	 $(".cst_mCst_scroll_Desk").mCustomScrollbar({
      theme:"dark"
    });
    
    
    this.source = JSON.parse(sessionStorage.getItem('userdata'));
    
    if(localStorage.getItem('policyDetailList')!= undefined || localStorage.getItem('policyDetailList')!= null)
    {
      this.policy = JSON.parse(localStorage.getItem('policyDetailList'));
      
    if(this.policy.policyTerm == '6MthEFT_EXP' || this.policy.policyTerm == '6MthEFT_LTD' ){
      this.Autopay = true;
    }
    
      //this.payform.controls.agentId.setValue(this.policy.agentInfo.code);
    }
    this.payform = this.formBuilder.group({
      requestType: ['INSTPAY'],
      policyNo: [this.policy.policyNumber],
      agentId : [this.policy.agentInfo.code],
      sourceId : ['WEBAPP'],
      currentDate : [''],
      payPlan : [''],
      purchase : this.formBuilder.group({
        paymentType: ['CC'],
        amount: ['',Validators.required],
        recurring: ['N'],
        ccDetails: this.formBuilder.group({
          payRefId : [''],
          ccNo : [],
          nameOnCard : [],
          expDate : [],
          cvv : [],
          address : [],
          postalCode : []
        }),
      }),
    });
    console.log(this.policy,'policy');
    console.log('date', this.datePipe.transform(this.myDate, 'MM/dd/yyyy'));
   
    this.payform.controls.currentDate.setValue(this.datePipe.transform(this.myDate, 'MM/dd/yyyy'));
this.beyondtecPayments();
  } 
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  
  onSubmit(){
 
    localStorage.setItem('paymentdetails',JSON.stringify(this.payform.value));
    this.router.navigate(['/dashboard/policy-details-confirm-payment']);
   
  }
  beyondtecPayments(){
    let  dataReq ={
      "emailId": this.source.email,
    }
         this.dash.beyondtecPayments(dataReq).subscribe((data: {}) => {
          console.log('beyondtecPayments',JSON.stringify(data));
           if(data['message'] == 'SUCCESS' ){
            var samplecard = data;
          
            for(let i = 0 ;i<samplecard['ccDetails'].length;i++ ){
             var year = samplecard['ccDetails'][i].expDate.toString();
             if(samplecard['ccDetails'][i].defaultPayMode == true){
              this.payrefid = samplecard['ccDetails'][i].payRefId;
              console.log('payred', this.payform.get('purchase.ccDetails.payRefId'));
              this.payform.get('purchase.ccDetails.payRefId').setValue(this.payrefid);

             }
             let cardNo = samplecard['ccDetails'][i].ccNo[0]+''+samplecard['ccDetails'][i].ccNo[1]+''+samplecard['ccDetails'][i].ccNo[2]+''+samplecard['ccDetails'][i].ccNo[3];
             let cardNo1 = samplecard['ccDetails'][i].ccNo[5]+''+samplecard['ccDetails'][i].ccNo[6]+''+samplecard['ccDetails'][i].ccNo[7]+''+samplecard['ccDetails'][i].ccNo[8];
             let cardNo2 = samplecard['ccDetails'][i].ccNo[10]+''+samplecard['ccDetails'][i].ccNo[11]+''+samplecard['ccDetails'][i].ccNo[12]+''+samplecard['ccDetails'][i].ccNo[13];
             let cardNo3 = samplecard['ccDetails'][i].ccNo[15]+''+samplecard['ccDetails'][i].ccNo[16]+''+samplecard['ccDetails'][i].ccNo[17]+''+samplecard['ccDetails'][i].ccNo[18];
            console.log(cardNo,cardNo1,cardNo2,cardNo3);
             this.cardlist[i] = {"cardNo": cardNo,
             "cardNo1": cardNo1,
             "cardNo2": cardNo2,
             "cardNo3": cardNo3,
  
              "expiry":year[0]+year[1]+'/'+year[2]+year[3],
               "name" : samplecard['ccDetails'][i].nameOnCard,
               "defaultPayMode" :samplecard['ccDetails'][i].defaultPayMode,
               "payRefId" :samplecard['ccDetails'][i].payRefId,
             };
            }
             console.log('beyondtec',JSON.stringify(data));  
             this.loading = false;
           }else{
            this.loading = false;
           }
              
         });
     
     }
}
