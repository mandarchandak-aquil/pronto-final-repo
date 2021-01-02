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
  selector: 'app-dashboard08-choose-policy',
  templateUrl: './dashboard08-choose-policy.component.html',
  styleUrls: ['./dashboard08-choose-policy.component.css']
})
export class Dashboard08ChoosePolicyComponent implements OnInit {

  loading : boolean = false;
  policy
  policyNo;
  policySelected
  PolicyStatus
  driverList
  vehicleList

  constructor(public router: ActivatedRoute,public routers :Router,public api_sub : SubjectCallService,public dash : DashboardService, public BeyontecFormService: BeyontecDashFormService,private fb: FormBuilder, public api_common: CommonService, public api_form : BeyontecService,) { }

  ngOnInit(): void {

    
    $(".cst_mCst_scroll_Desk").mCustomScrollbar({
      theme: "dark"
    });
    
    
    this.policy = []
    if(localStorage.getItem('policyDetailList') != undefined || localStorage.getItem('policyDetailList') != null){
      this.policySelected = JSON.parse(localStorage.getItem('policyDetailList'));
      this.policy = JSON.parse(localStorage.getItem('policyDetailList'));
      console.log("policySelected", this.policySelected);

      // console.log(this.policySelected, "policyDetailList")
      this.PolicyStatus = this.policySelected['status'];
      console.log("PolicyStatus", this.PolicyStatus);

      this.setPolicy();
    }
    this.policyNo = localStorage.getItem('policyNumber');
    
  }


  setPolicy(){
    (<any>$('[data-tooltip="tooltip"]')).tooltip();
  
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

      
    }

  }

  onlanguageChange(newValue){
    // console.log(newValue, "new language");
   
    this.api_sub.sendMessage(1);
  }
}
