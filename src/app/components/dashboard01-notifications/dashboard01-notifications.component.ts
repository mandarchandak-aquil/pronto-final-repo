import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import * as moment from 'moment';
import { DashboardService } from '../../commons/services/dashboard/dashboard.service';
import { AuthServicess } from '../../commons/services/auth/auth.service';
import { SubjectCallService } from '../../commons/services/subject-call/subject-call.service';
import { BeyontecDashFormService } from '../dashboard-service/beyontec-dash-form.service';
import { Router,ActivatedRoute } from '@angular/router';
import { FormArray } from '@angular/forms';
@Component({
  selector: 'app-dashboard01-notifications',
  templateUrl: './dashboard01-notifications.component.html',
  styleUrls: ['./dashboard01-notifications.component.css'],
  providers: [DatePipe]
})
export class Dashboard01NotificationsComponent implements OnInit {
   loading :boolean = true; 


    constructor(private datePipe: DatePipe,public dashservice : DashboardService,public auth:AuthServicess, public api_sub : SubjectCallService, public BeyontecFormService: BeyontecDashFormService,public router : Router) { }
setting: any = [];

currentDate
dataReq={};
token;
productInfoList;
newreq;
 length;
 notificationarray : any = [];
 dataReqnot;
 project_path  = null;
 file_path = null;
 date;
 dateToday;
 userdata;
 notificationpolicy : any = [];
notificationlist : any = [];
oneincPolicyList1 : any = [];
source;
  ngOnInit(): void {
    this.currentDate = new Date();
    var date = moment(this.dateToday, "MM/DD/YYYY");;
   // this.date = moment().format("DD/MM/YYYY");
   this.userdata = JSON.parse(sessionStorage.getItem('userdata'));
    
    //console.log(this.date,'23/11/2020',k );

  
        $(".cst_mCst_scroll_Desk").mCustomScrollbar({
          theme:"dark"
        });
     
    this.notificationBox();
    this.documentsListStable();
    this.userNotifications();
    //this.servertime();
  }

  // servertime()
  // {

  //   this.dashservice.verifyToken().subscribe((data: {}) => {
  //     var tokn = data['token'];
  //     this.token = 
  //     {
  //         "token" :  data['token']
  //     }
  //   this.dashservice.servertime(this.token).subscribe((data: {}) => {
  //     this.dateToday =   data['date'][3]+data['date'][4]+'/'+data['date'][0]+data['date'][1]+'/'+data['date'][6]+data['date'][7]+data['date'][8]+data['date'][9];
  //     //console.log('this.dateToday',this.dateToday);
  //     var currenDate = moment(this.dateToday, "DD/MM/YYYY");

  //     this.dataReq = {
  //       "emailId": this.userdata.email,
  //       "token": tokn

  //     }
  //     this.dashservice.policyListstable(this.dataReq).subscribe((data: {}) => {
  //      // console.log('pronto',JSON.stringify(data));
  //       if (data['message'] == "SUCCESS") {
         
  //         this.productInfoList = data['productInfoList'];
  //            for(let j = 0;j< this.productInfoList.length;j++){
  //             console.log('his.productInfoList.length',this.productInfoList.length);
  //     var newdata = moment(this.productInfoList[j].toDate, "DD/MM/YYYY");
  //         let k = currenDate.diff(newdata, 'days');  
        
  //         if(k <= 15 && k >= -15){
           
  //           this.notificationpolicy.push(this.productInfoList[j]); 
  //           console.log('date['+j+']',currenDate,newdata,k);
  //         }
       
  //            }
  //         this.loading = false;
  //         //console.log('notificationpolicy',  this.notificationpolicy);
        

  //       }
  //     });
   
  //   });
  // });

  // }
  documentsListStable() {

    this.dashservice.verifyToken().subscribe((data: {}) => {
      if (data['token']) {
        this.token = '';
        this.token = data['token'];
        this.dataReq = {
          "emailId": "nilisha.mane@prontoinsurance.com",
          "token": this.token
        }
        this.dashservice.policyListstable(this.dataReq).subscribe((data: {}) => {
         // console.log('pronto',JSON.stringify(data));
          if (data['message'] == "SUCCESS") {
            this.productInfoList = data['productInfoList'];
            this.loading = false;
            //console.log('productInfoList', this.productInfoList);
          

          }
        });
      }
    });

  }

  notificationBox(){
    this.dataReqnot = {
      "language_id":  sessionStorage.getItem('lg'),
    }
    this.dashservice.notificationBox(this.dataReqnot).subscribe((data: {}) => {
     // console.log(data);
      if(data['status'] == 'success'){
        this.loading = false;
        var noti = data['notification'];
        var notification = JSON.parse(noti.notificaions);
        var notificationurl = JSON.parse(noti.notifications_url);
        //console.log('notification',notification[0]);
       for(var i = 0;i<notification.length;i++){
        if(notification[i] != null){
         this.notificationarray.push({'text':notification[i],'id':i+1,'url':notificationurl[i]});
         
        }
        }
      
      } 
    });
  }
  userNotifications(){
let tok =sessionStorage.getItem('token');
console.log('this.dataReq',tok);
     this.dataReq = {
          "token" : tok
    
        }
        console.log('this.dataReq',this.dataReq);
        this.dashservice.userNotifications(this.dataReq).subscribe((data: {}) => {
       // console.log(data);
        if(data['status'] == 'success'){
          this.setting = data['user_notification'];
         
        //this.setting = data['user_notification'];
        this.length = data['length'];
        var len = this.notificationarray.length+this.setting.length;
         localStorage.setItem('notificationlength', len);
         this.dashservice.notification_length = len;
         this.api_sub.setnotificationvalue(len);
     
         console.log('len', len);
        console.log('this.setting',this.setting);
          //console.log('this.length',this.length);
       this.notifications();
        }    
        });

    }

onlanguageChange(newValue){
    // console.log(newValue, "new language");
   
    this.api_sub.sendMessage(1);
  }
    notifications(){
        var servicenew =  this.dashservice;
  for (let value of this.setting) {
          var newreq = {
          "notification_id" : value.notification_id
        }
         

        this.dashservice.Notifications(newreq).subscribe((data: {}) => {
       
        if(data['status'] == 'success'){
        this.setting =data['user_notification'];
      if(this.project_path){
          this.project_path =  data['project_path'];
          this.file_path =  data['path'];
               // console.log("user_notification", this.project_path);  
          }
        this.notificationlist.push(data['user_notification']);
        
        }    

     this.loading = false;
        
        });
      }
      
    }

    getDetails(policyNo){
      console.log(policyNo, "policyNo")
      localStorage.setItem('policyNumber', policyNo);
      localStorage.removeItem("beyontech_drivers")
      localStorage.removeItem("beyontech_vehicles")
      localStorage.removeItem("includeAmended")
      localStorage.removeItem("excludeAmended")
      localStorage.removeItem("amendedVehicle")
      if(policyNo.substr(0,3) == 'PR-'){
        this.policyDetailStable(policyNo);
      }else if(policyNo.substr(0,3) == 'PFV'){
        this.source = JSON.parse(sessionStorage.getItem('userdata'));
        this.oneincPolicyList1(policyNo);
      }
    }
  
  
    policyDetailStable(policyNo){
      this.loading = true;
      console.log('policyno', policyNo);
      var data ={
        "policyNo" : policyNo
      }
      this.dashservice.policyDetailStable(data).subscribe((data: {}) => {
        this.loading = false;
        if(data['message'] == 'SUCCESS'){
          let driver = [];
          driver.push(data['primaryDriver']);
          driver[0].isExcluded = false;
          driver[0].driver_include = true;
          data['additionalDrivers'].forEach(element => {
            driver.push(element);
          });
          this.BeyontecFormService.getDriverForm();
          this.BeyontecFormService.assignLocalToDriver(driver);
          this.BeyontecFormService.getVehicleForm();
          this.BeyontecFormService.assignVehiclereplica(data['vehicles']);
          localStorage.setItem("beyontech_drivers", JSON.stringify((<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).value));
          localStorage.setItem("beyontech_vehicles", JSON.stringify((<FormArray>this.BeyontecFormService.vehicles_array$.controls['vehicle']).value));
          localStorage.setItem('policyDetailList',JSON.stringify(data));
          this.router.navigate(['/dashboard/policy-details']);
        }else{
          console.log(data,"Error MSG")
        }
        });
    }


}
