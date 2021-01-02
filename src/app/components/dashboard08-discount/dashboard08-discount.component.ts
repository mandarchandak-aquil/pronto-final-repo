import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { SubjectCallService } from '../../commons/services/subject-call/subject-call.service';
import { Router,ActivatedRoute } from '@angular/router';
import { DashboardService } from '../../commons/services/dashboard/dashboard.service';
import { BeyontecDashFormService } from '../dashboard-service/beyontec-dash-form.service';
import { FormArray, FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { CommonService } from '../../commons/services/common/common.service';
import { BeyontecService } from '../../commons/services/beyontec/beyontec.service';

@Component({
  selector: 'app-dashboard08-discount',
  templateUrl: './dashboard08-discount.component.html',
  styleUrls: ['./dashboard08-discount.component.css']
})
export class Dashboard08DiscountComponent implements OnInit {

  loading : boolean = false;
  @Input() full_pay =  "";
  @Input() auto_pay = "";
  @Input() paymentPlan =  "";
  // minutesQuote
  // minutesQuoteSelected
  // loading : boolean =false;
  discounts;
  policySelected;
  PolicyStatus;
  driverList
  vehicleList
  policy
  policyNo;

  constructor(public router: ActivatedRoute,public routers :Router,public api_sub : SubjectCallService,public dash : DashboardService, public BeyontecFormService: BeyontecDashFormService,private fb: FormBuilder, public api_common: CommonService, public api_form : BeyontecService,) { }

  ngOnInit() {


    $(".cst_mCst_scroll_Desk").mCustomScrollbar({
      theme: "dark"
    });
    
    this.policy = []
  
    this.policyNo = localStorage.getItem('policyNumber');

    if(localStorage.getItem('discounts') != undefined || localStorage.getItem('discounts') != null){
      this.discounts  = JSON.parse(localStorage.getItem('discounts'));
      this.paymentPlan = this.discounts.paymentPlan;
    }

    if(localStorage.getItem('policyDetailList') != undefined || localStorage.getItem('policyDetailList') != null){
      this.policySelected = JSON.parse(localStorage.getItem('policyDetailList'));
      this.policy = JSON.parse(localStorage.getItem('policyDetailList'));
      console.log("policySelected", this.policySelected);

      // console.log(this.policySelected, "policyDetailList")
      this.PolicyStatus = this.policySelected['status'];
      console.log("PolicyStatus", this.PolicyStatus);

      this.setPolicy();
    }


  }


  setPolicy(){
    if(localStorage.getItem("beyontech_drivers") != undefined || localStorage.getItem("beyontech_drivers") != null || localStorage.getItem("beyontech_vehicles") != undefined || localStorage.getItem("beyontech_vehicles") != null){

        let dl = JSON.parse(localStorage.getItem("beyontech_drivers") );
        let vl = JSON.parse(localStorage.getItem("beyontech_vehicles") );

        if (!this.BeyontecFormService.drivers_array$) {
          // console.log(1111);
          this.BeyontecFormService.getDriverForm();
          this.BeyontecFormService.assignLocalToDriver(dl);
        }

        if (!this.BeyontecFormService.vehicles_array$) {
          // console.log(3333)
          this.BeyontecFormService.getVehicleForm();
          this.BeyontecFormService.assignVehiclereplica1(vl);
        }
        
        this.vehicleList = vl;
        this.driverList = dl;

        $.getScript('assets/js/sitescripts.js');
    }

   
  }

  onlanguageChange(newValue){
    // console.log(newValue, "new language");
   
    this.api_sub.sendMessage(1);
  }


  onSubmit(){
    if(this.auto_pay == 'yes'){
      document.getElementById("openModalAutoPayMethod").click();
    }else{
      this.loading = true;
      let discounts = {
        "full_pay" : this.full_pay,
        "auto_pay" : this.auto_pay
      }
      localStorage.setItem('discounts', JSON.stringify(discounts));
      this.loading= false;
      this.routers.navigate(['dashboard/renewal-summary/vehicle-questionnaire']);
    }
  }

  onSubmitAuto(){
    console.log(this.paymentPlan, 'paymentPlan')
    // let beyontech_drivers =  JSON.parse(localStorage.getItem('beyontech_drivers'));
    // console.log(this.paymentPlan, 'beyontech_drivers')

      this.loading = true;
      let discounts = {
        "full_pay" : this.full_pay,
        "auto_pay" : this.auto_pay,
        'paymentPlan' : this.paymentPlan
      }
      localStorage.setItem('discounts', JSON.stringify(discounts));
      this.loading= false;
      this.routers.navigate(['dashboard/renewal-summary/vehicle-questionnaire']);
   
  }

}
