import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../commons/services/dashboard/dashboard.service';
import jwt_decode from "jwt-decode";
@Component({
  selector: 'app-dashboard06-account-setting',
  templateUrl: './dashboard06-account-setting.component.html',
  styleUrls: ['./dashboard06-account-setting.component.css']
})
export class Dashboard06AccountSettingComponent implements OnInit {
 setting;
 decoded
 loading : boolean = true;
  constructor(public dash : DashboardService) { }
dataReq;
  ngOnInit(): void {
  var token =  sessionStorage.getItem('token');
  console.log('token',token);
  this.decoded = jwt_decode(token);
                  console.log('decoded',);
   
        $(".cst_mCst_scroll_Desk").mCustomScrollbar({
        theme:"dark"
      });
      
    this.userAccountSetting();
  }
ChangeuserAccountSetting(setting){
  this.dataReq = {
      "user_id": this.decoded.id,
      "setting" :setting
    }
    this.dash.ChangeuserAccountSetting(this.dataReq).subscribe((data: {}) => {
    if(data['status'] == 'success'){
    this.setting =data['user_setting'];
    }
       console.log("useraccountsettings",data['user_setting']);
    
    });
}

  userAccountSetting(){

    this.dataReq = {
      "user_id":this.decoded.id
    }
    this.dash.userAccountSetting(this.dataReq).subscribe((data: {}) => {
    if(data['status'] == 'success'){
    this.setting =data['user_setting'];
    }
       console.log("useraccountsettings",data['user_setting']);
      this.loading = false;
    });
  }

}
