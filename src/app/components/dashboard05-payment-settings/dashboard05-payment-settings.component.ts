import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../commons/services/dashboard/dashboard.service';
import { SubjectCallService } from '../../commons/services/subject-call/subject-call.service';
@Component({
  selector: 'app-dashboard05-payment-settings',
  templateUrl: './dashboard05-payment-settings.component.html',
  styleUrls: ['./dashboard05-payment-settings.component.css']
})
export class Dashboard05PaymentSettingsComponent implements OnInit {
loading : boolean = true;
    constructor(public dash : DashboardService,public api_sub : SubjectCallService) { }
setting;
dataReq;
dataReq1;
dataReq2;
token;
oneinc;
productInfoListone;
source;
cardlist: any = [];
  ngOnInit(): void {
    this.source = JSON.parse(sessionStorage.getItem('userdata'));
    console.log('this.source',this.source);
    this.beyondtecPayments();
    this.oneincPayments();
   
        $(".cst_mCst_scroll_Desk").mCustomScrollbar({
        theme:"dark"
      });
  
    this.paymentsettings();
   
  }
  onlanguageChange(newValue){
    // console.log(newValue, "new language");
   
    this.api_sub.sendMessage(1);
  }
   

  beyondtecPayments(){
    this.dash.verifyToken().subscribe((data: {}) => {
      if (data['token']) {
        this.token = '';
        this.token = data['token'];
        this.dataReq = {
          "emailId": this.source.email,
          "token": this.token
        }
       this.dash.beyondtecPayments(this.dataReq).subscribe((data: {}) => {
        console.log('beyondtecPayments',JSON.stringify(data));
         if(data['message'] == 'SUCCESS' ){
           var samplecard = data;
         
         for(let i = 0 ;i<samplecard['ccDetails'].length;i++ ){
          var year = samplecard['ccDetails'][i].expDate.toString();
           this.cardlist[i] = {"cardNo": samplecard['ccDetails'][i].ccNo,
           "expiry":year[0]+year[1]+'/'+year[2]+year[3],
            "name" : samplecard['ccDetails'][i].nameOnCard,
            "defaultPayMode" :samplecard['ccDetails'][i].defaultPayMode,
            "payRefId" :samplecard['ccDetails'][i].payRefId,
          };
         }
          console.log('beyondtec',this.cardlist);  
          this.loading = false;
         }else{
          this.loading = false;
         }
            
       });
      }
    });
   }
   payaccountremove(payRefId){
    let data = {
      "payRefId": payRefId 
    }
  this.dash.payaccountadd(data).subscribe((data: {}) => {
    console.log('data',data);
    if(data['message'] == 'SUCCESS'){

   // this.routers.navigate(['/dashboard/policy-details']);
    }
    });
}

   oneincPayments(){
     if(this.source.oneincPolicy){
    var datainp = {
      "phoneNumber": this.source.mobile,
      "garageAddressZipCode": "",
      "mailingAddressZipCode": ""
    };
    this.dash.oneincPolicyList(datainp).subscribe((data: {}) => {
      if(data[0].policyId){
    this.dataReq = {
      "policyId" : data[0].policyId,
    }
       this.dash.oneincPayments(this.dataReq).subscribe((data: {}) => {
        console.log('oneincPayments',JSON.stringify(data));
        this.productInfoListone = data;
        this.oneinc  = data;
         if(data['currentReccuringPaymentInformation']){
           var datasample = data['savedPaymentsInformation'];
           var datanewcard = [];
           for(let i = 0 ;i<datasample.length;i++ ){
            

             var newdata =datasample[i]['details']; 
             console.log('datasample',newdata);
            
             var year = newdata['expirationYear'].toString();
             //var   year = ConvertStringToNumber(newdata['expirationYear']);
            console.log(typeof  newdata['expirationYear'],newdata['expirationYear']);
            let re = /\*/gi;
            datanewcard[i] = {
              "cardNo": newdata.number.replace(re,'X'),
             "name" : newdata['cardHolderName'],
             "expiry":newdata['expirationMonth']+'/'+year[2]+year[3],
             "defaultPayMode" : true,
           };
          
      
           }
           this.cardlist = [...this.cardlist,...datanewcard];
           console.log('oneinc',this.cardlist);  
         }  
       });
      }
      });
     }
   }
  //  defaultpay(payRefId){
  //   console.log('payRefId',payRefId);
  //   this.dash.verifyToken().subscribe((data: {}) => {
  //     if (data['token']) {
  //       this.token = '';
  //       this.token = data['token'];
  //       var inputdefault = {
  //         "token" : this.token,
  //         "payRefId" : 400,
  //         "emailId": "rajivk@beyontec.com",
  //       }
  //       this.dash.defaultpay(inputdefault).subscribe((data: {}) => {
  //         console.log(data);
  //       });
  //     }
  //   });
  //  }
   paymentremove(payRefId){
    console.log(payRefId);
        var input = {
          "payRefId" : payRefId
        }
        console.log(input);
        this.dash.paymentremove(input).subscribe((data: {}) => {
          console.log(data);
        });
 
   }
    removecard(bank,cardtype){
     this.dataReq = {
          "cardBank":bank,
          "cardType":cardtype,
          "user_id" : 2
        }
        this.dash.paymentsettingsdelete(this.dataReq).subscribe((data: {}) => {
        if(data['status'] == 'success'){
        this.setting =data['payment_settings'];
        }    

           //console.log("payment_settings",data['payment_settings']);
        
        });
    }

    defaultpaymentsettings(bank,cardtype){
 this.dataReq1 = {
      "cardBank":bank,
      "cardType":cardtype,
      "user_id" : 2
    }
    this.dash.defaultpaymentsettings(this.dataReq1).subscribe((data: {}) => {
    if(data['status'] == 'success'){
    this.setting =data['payment_settings'];
    }    

      console.log("payment_settings",data);
    
    });
} 
  paymentsettings(){
    this.dataReq2 = {
      "user_id": 2
    }
    this.dash.paymentsettings(this.dataReq2).subscribe((data: {}) => {
    if(data['status'] == 'success'){
    this.setting =data['payment_settings'];
    }    

       //console.log("payment_settings",data['payment_settings']);
    
    });

}
}
