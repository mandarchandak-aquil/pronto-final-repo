import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../commons/services/dashboard/dashboard.service';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { SubjectCallService } from '../../commons/services/subject-call/subject-call.service';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-dashboard02-policy-details-confirm-payment',
  templateUrl: './dashboard02-policy-details-confirm-payment.component.html',
  styleUrls: ['./dashboard02-policy-details-confirm-payment.component.css']
})
export class Dashboard02PolicyDetailsConfirmPaymentComponent implements OnInit {
  loading : boolean = true;
  policy;
  cardlist : any = [];
  source;
  continue : boolean = false;
  payrefid;
  form;
  constructor(public router : Router,public dash : DashboardService, private formBuilder: FormBuilder,public sub :SubjectCallService) { }

  ngOnInit(): void {
    $(".cst_mCst_scroll_Desk").mCustomScrollbar({
      theme:"dark"
    });
    
    if(localStorage.getItem('policyDetailList')!= undefined || localStorage.getItem('policyDetailList')!= null)
    {
      this.policy = JSON.parse(localStorage.getItem('policyDetailList'));
     
    }
    this.form =   JSON.parse(localStorage.getItem('paymentdetails'));
    console.log('this.form',this.form.currentDate);
    this.loading = false;
    this.beyondtecPayments();
  }
  pay(){
    console.log(' this.form', this.form);
    this.dash.payservicespolicy(this.form).subscribe((data: {}) => {
      console.log('payservicespolicy',data);
      if(data['message']== 'Successful.'){
        this.router.navigate(['/dashboard/my-policies']);
      }
    });
  }
  close(){
    this.continue = false;
  }
  onSubmit(){
    this.continue = true;
    console.log(' this.form', this.form);
    let car ={
      "requestType": "INSTPAY",
      "policyNo": this.policy.policyNumber,
      "sourceId": "WebApp",
      "agentId": this.policy.agentInfo.code,
      "purchase": {
        "paymentType": "CC",
        "amount": 0,
        "recurring": "N",
        "ccDetails": {
          "payRefId": this.payrefid
        }
      }
    };

  }
  beyondtecPayments(){
    this.source = JSON.parse(sessionStorage.getItem('userdata'));

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
                this.payrefid = samplecard['ccDetails'][i].payRefId
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
