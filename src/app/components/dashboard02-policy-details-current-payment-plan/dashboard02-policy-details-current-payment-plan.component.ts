import { Component, OnInit } from '@angular/core';
import { SubjectCallService } from '../../commons/services/subject-call/subject-call.service';
import { Router,ActivatedRoute } from '@angular/router';
import { DashboardService } from '../../commons/services/dashboard/dashboard.service';
import { BeyontecDashFormService } from '../dashboard-service/beyontec-dash-form.service';
import { FormArray, FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-dashboard02-policy-details-current-payment-plan',
  templateUrl: './dashboard02-policy-details-current-payment-plan.component.html',
  styleUrls: ['./dashboard02-policy-details-current-payment-plan.component.css']
})
export class Dashboard02PolicyDetailsCurrentPaymentPlanComponent implements OnInit {
  loading : boolean = true;
  policy;
  installmentInfoList : any =[];
  constructor(public router: ActivatedRoute,public routers :Router,public api_sub : SubjectCallService,public dash : DashboardService, public BeyontecFormService: BeyontecDashFormService,private fb: FormBuilder) { }

  ngOnInit(): void {
    $(".cst_mCst_scroll_Desk").mCustomScrollbar({
      theme:"dark"
    });
    
    if(localStorage.getItem('policyDetailList')!= undefined || localStorage.getItem('policyDetailList')!= null)
    {
      this.policy = JSON.parse(localStorage.getItem('policyDetailList'));
      console.log(this.policy);
    
      for(var i = 0 ; i  < this. policy.installmentInfoList.length;i++){
        console.log(Math.abs(this.policy.installmentInfoList[i].installmentAmountDue));
        this.installmentInfoList.push({ 
          "installmentAmountDue"  :  Math.abs(this.policy.installmentInfoList[i].installmentAmountDue),
          "installmentDue" :   this.policy.installmentInfoList[i].installmentDue,
          "paymentStatus" : this.policy.installmentInfoList[i].paymentStatus
      });
    }
    this.loading = false;
  }
  }
}
