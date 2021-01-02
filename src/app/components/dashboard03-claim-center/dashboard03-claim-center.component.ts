import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../commons/services/dashboard/dashboard.service';
import { SubjectCallService } from '../../commons/services/subject-call/subject-call.service';
@Component({
  selector: 'app-dashboard03-claim-center',
  templateUrl: './dashboard03-claim-center.component.html',
  styleUrls: ['./dashboard03-claim-center.component.css']
})
export class Dashboard03ClaimCenterComponent implements OnInit {

    constructor(public dash : DashboardService,public api_sub : SubjectCallService) { }
dataReq;
claims;
  ngOnInit(): void {
    
        $(".cst_mCst_scroll_Desk").mCustomScrollbar({
        theme:"dark"
      });
      
    this.claimsrequest();
  }
  onlanguageChange(newValue){
    // console.log(newValue, "new language");
   
    this.api_sub.sendMessage(1);
  }

    claimsrequest(){
     this.dataReq = {
          "user_id" : 2
        }
        this.dash.claims(this.dataReq).subscribe((data: {}) => {
        if(data['status'] == 'success'){
        this.claims =data['claims'];
        }    

          console.log("claims",this.claims);
        
        });
    }
  
  
}
