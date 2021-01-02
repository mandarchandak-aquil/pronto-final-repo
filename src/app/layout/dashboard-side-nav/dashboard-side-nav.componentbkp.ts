import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../commons/services/dashboard/dashboard.service';
import { SubjectCallService } from '../../commons/services/subject-call/subject-call.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-dashboard-side-nav',
  templateUrl: './dashboard-side-nav.component.html',
  styleUrls: ['./dashboard-side-nav.component.css']
})
export class DashboardSideNavComponent implements OnInit {

   constructor(public dashservice : DashboardService, public api_sub : SubjectCallService) { }
length;
notificationarray : any =[];
setting;
subscription: Subscription;
dataReq;
dataReqnot;
  ngOnInit(): void {
    this.subscription = this.api_sub.getnotificationvalue().subscribe(message => {
      this.length = message.notification_length;
      console.log(message.notification_length,'message');
    });
    // console.log('this.length',this.length);
   if(localStorage.getItem('notificationlength')){
      this.length =  localStorage.getItem('notificationlength');
     }else{
       this.length =  this.dashservice.notification_length;

     }
   
  this.userNotifications();
  }
  userNotifications(){

  }
    sub(){
     

    }
  slides = [
    {
      img:"assets/images/dash-nav-notification.png",
       mobimg:"assets/images/dash-nav-notification_mob.png",
      link:"/dashboard/notifications",
      name: "Notifications"
    },
    {
      img:"assets/images/dash-nav-policy.png",
      mobimg:"assets/images/dash-nav-policy_mob.png",
      link:"/dashboard/my-policies",
      name: "My Policies"
    },
    {
      img:"assets/images/dash-nav-claim.png",
        mobimg:"assets/images/dash-nav-claim_mob.png",
      link:"/dashboard/claim-center",
      name: "Claim Center"
    },
    {
      img:"assets/images/dash-nav-documents.png",
      mobimg:"assets/images/dash-nav-documents_mob.png",
      link:"/dashboard/documents",
      name: "Documents"
    },
    {
      img:"assets/images/dash-nav-payment.png",
       mobimg:"assets/images/dash-nav-payment_mob.png",
      link:"/dashboard/payment-settings",
      name: "Payment Settings"
    },
    {
      img:"assets/images/dash-nav-setting.png",
       mobimg:"assets/images/dash-nav-setting_mob.png",
      link:"/dashboard/account-setting",
      name: "Account Settings"
    }
  ]



  slideConfig = {
    "slidesToShow": 3,
    "slidesToScroll":3,
    "nextArrow": false,
    "prevArrow": false,
    "infinite": false,
    "draggable" : false,
    "foucsOnSelect" : false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll:1,
          "nextArrow": "<i class='fa fa-angle-right'></i>",
          "prevArrow": "<i class='fa fa-angle-left'></i>",
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          slidesToScroll:1,
          "nextArrow": "<i class='fa fa-angle-right'></i>",
          "prevArrow": "<i class='fa fa-angle-left'></i>",
        }
      },
      {
        breakpoint: 360,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          "nextArrow": "<i class='fa fa-angle-right'></i>",
          "prevArrow": "<i class='fa fa-angle-left'></i>",
        }
      }
    ]
  };

  userNotificationsbkp(){
    this.dataReqnot = {
      "language_id":  sessionStorage.getItem('lg'),
    }
    this.dashservice.notificationBox(this.dataReqnot).subscribe((data: {}) => {
      // console.log(data);
      if(data['status'] == 'success'){
   
        var noti = data['notification'];
        var notification = JSON.parse(noti.notificaions);
       // this.length = notification.length;
          // console.log('this.length',this.length);
      
      } 
    });
  }
 

    // userNotifications(){

    //  this.dataReq = {
    //       "user_id" : 2
    //     }
    //     this.dashservice.userNotifications(this.dataReq).subscribe((data: {}) => {
        // console.log(data);
    //     if(data['status'] == 'success'){

    //     this.setting = data['user_notification'];
    //     this.length = data['length'];
        // console.log('this.lengthsidebar', this.length );
      
    //     }    
    //     });

    // }

}
