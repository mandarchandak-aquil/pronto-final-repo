import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DashboardService } from '../../commons/services/dashboard/dashboard.service';
import { SubjectCallService } from '../../commons/services/subject-call/subject-call.service';
import { Router,ActivatedRoute } from '@angular/router';
import { SlickCarouselComponent } from "ngx-slick-carousel";

@Component({
  selector: 'app-dashboard02-policy-details-payment-manage',
  templateUrl: './dashboard02-policy-details-payment-manage.component.html',
  styleUrls: ['./dashboard02-policy-details-payment-manage.component.css']
})
export class Dashboard02PolicyDetailsPaymentManageComponent implements OnInit {
  @ViewChild("slickModal") slickModal: SlickCarouselComponent;
  loading : boolean = true;
  source;
  payrefid;
  cardlist : any =[];
  constructor(public dash : DashboardService,public api_sub : SubjectCallService,private formBuilder: FormBuilder,public routers :Router) { }

  ngOnInit(): void {
   
    $(".cst_mCst_scroll_Desk").mCustomScrollbar({
      theme:"dark"
    });
    
    this.source = JSON.parse(sessionStorage.getItem('userdata'));
    this. beyondtecPayments();
  

  }
  //delete 
  slideConfig = {
    'arrows' : false,
    'dots': true,
    'infinite': true,
    'slidesToShow': 1,
    'slidesToScroll':1,
    'speed': 1000,
    'autoplay': false,
    'autoplaySpeed': 1000,
    'centerPadding': '0',
    'useTransform': true,
    //fade: true,
    'cssEase': 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',
  };
 
 


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
   payaccountdefaultpay(payRefId){
     console.log(payRefId,'payRefId');
    let  dataReq ={
      "emailId": this.source.email,
      "payRefId": payRefId
    }
    this.dash.payaccountdefaultpay(dataReq).subscribe((data: {}) => {
      if(data['messageId'] == 'AUTH0005' || data['messageId'] == 'AUTH0008' || data['messageId'] == 'AUTH0010' || data['messageId'] == 'AUTH0014'){
        location.reload();

      }
    });
   }
   payaccountremove(payRefId){
    let data = {
      "payRefId": payRefId 
    }
    console.log(data);
    console.log(payRefId);
  this.dash.payaccountremove(data).subscribe((data: {}) => {
    console.log('data',data);
    if(data['message'] == 'SUCCESS'){
      location.reload();
    }
    });
}
}
