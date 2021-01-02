import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../commons/services/dashboard/dashboard.service';
import { SubjectCallService } from '../../commons/services/subject-call/subject-call.service';
import { BeyontecDashFormService } from '../dashboard-service/beyontec-dash-form.service';
import { Router,ActivatedRoute } from '@angular/router';
import { FormArray } from '@angular/forms';
@Component({
  selector: 'app-dashboard02-my-policies',
  templateUrl: './dashboard02-my-policies.component.html',
  styleUrls: ['./dashboard02-my-policies.component.css']
})
export class Dashboard02MyPoliciesComponent implements OnInit {
  loading: boolean = true;
  constructor(public dash: DashboardService, public api_sub: SubjectCallService, public BeyontecFormService: BeyontecDashFormService,public router : Router) { }
  policies;
  dataReq;
  token;
  policyreq;
  productInfoListone;
  source;
  productInfoListnew: any = [];
  showpolicy: boolean = false;
  productInfoList: any = [];
  productInfoListFinal: any = [];
  oneincPolicyList1: any = [];
   oneinc : any = [];
  ngOnInit(): void {
    this.source = JSON.parse(sessionStorage.getItem('userdata'));
    console.log('this.source', this.source, this.source['oneincPolicy']);
    if (this.source['beyondtecPolicy'] != null) {
      console.log('beyond');
      this.documentsListStable();
    }
    if (this.source['oneincPolicy'] != null) {
      console.log('one');
      this.oneincPolicyList();
    }

    jQuery(function ($) {
      if ($(window).width() > 991) {
        $(".cst_mCst_scroll_Desk").mCustomScrollbar({
          theme: "dark"
        });
      }
    });
    

  }
  onlanguageChange(newValue) {
    // console.log(newValue, "new language");

    this.api_sub.sendMessage(1);
  }

  oneincPolicyList() {

    console.log('INNNNNNNNoneinc');
   var datainp = {
      "phoneNumber": this.source.mobile,
      "garageAddressZipCode": "",
      "mailingAddressZipCode": ""
    };
    this.dash.oneincPolicyList(datainp).subscribe((data: {}) => {
      console.log('oneinc', data);
this.productInfoListone = data;
      console.log('listlen', this.productInfoListone[0].policyId);
      for (var i = 0; i < this.productInfoListone.length; i++) {
        console.log('this.productInfoListone[i]',this.productInfoListone[i]);
        var datareq = {
          "policyId": this.productInfoListone[i].policyId,
          "asOfDate": " ",
          "asOfDateKind": " "
        }
        console.log('datareqproductInfoListone',datareq);
        this.dash.oneincPolicySnapshot(datareq).subscribe((data: {}) => {
          
         
            // var parsed_data = JSON.parse(data);
         
            this.oneinc.push({
              "policyNo": data['snapshot'].policy.policyNumber,
              "customerDue": data['snapshot'].policy.totalPremium,
              "fromDate": data['snapshot'].policy.program.payPlan.termPeriod.effectiveDate,
              "toDate": data['snapshot'].policy.program.payPlan.termPeriod.expirationDate,
              "status": data['snapshot'].policy.status.currentStatus
            });
            console.log('this.oneinc',this.oneinc.length);
            this.showpolicy = true;
            this.loading = false;
        });
      }
    });

  }
  documentsListStable() {

    this.dash.verifyToken().subscribe((data: {}) => {
      if (data['token']) {
        this.token = '';
        this.token = data['token'];
        this.dataReq = {
          "emailId": this.source.email,
          "token": this.token
        }
        this.dash.policyListstable(this.dataReq).subscribe((data: {}) => {
          
          if (data['message'] == "SUCCESS") {
            this.productInfoList = data['productInfoList'];
            this.productInfoList = [...this.productInfoList,...this.oneinc];
            this.loading = false;
            console.log('swagger', JSON.stringify(this.productInfoList));
           

          }else{
            this.loading = false;
          }
        });
      }
    });

  }

  trackElement(index: number, prod: any) {

    if (index > 2) {
      console.log(prod);
      return prod;
    }
  }
  show() {
    this.showpolicy = true;
  }
  policie() {
    this.dataReq = {
      "user_id": 2
    }
    this.dash.policies(this.dataReq).subscribe((data: {}) => {
      if (data['status'] == 'success') {
        this.policies = data['policies'];
      }


    });
  }

  getDetails(policyNo){
    console.log(policyNo, "policyNo")
    localStorage.setItem('policyNumber', policyNo);
    localStorage.removeItem("beyontech_drivers")
    localStorage.removeItem("beyontech_vehicles")
    localStorage.removeItem("beyontec_coverage")
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
    this.dash.policyDetailStable(data).subscribe((data: {}) => {
      this.loading = false;
      if(data['message'] == 'SUCCESS'){

        let driver = [];
        driver.push(data['primaryDriver']);
        driver[0].isExcluded = false;
        driver[0].driver_include = true;
        driver[0].driver_from_api = true;
        let i=1;
        data['additionalDrivers'].forEach(element => {
          driver.push(element);
          driver[i].isExcluded = data['additionalDrivers'][i-1]['isExcluded'];
          driver[i].driver_include = !data['additionalDrivers'][i-1]['isExcluded'];
          driver[i].driver_from_api = true;
          i++;
        });

        let coverage = data['primaryDriver']['coverages'];
        let reqDate = data['primaryDriver']['requests']['rqEffDt'];

        console.log(driver, "driver List");

        this.BeyontecFormService.getDriverForm();

        this.BeyontecFormService.assignLocalToDriver(driver);

        this.BeyontecFormService.getVehicleForm();
        this.BeyontecFormService.assignVehiclereplica(data['vehicles']);

        this.BeyontecFormService.getCoverageForm();
        this.BeyontecFormService.coverage_array$.patchValue(coverage)
        this.BeyontecFormService.coverage_array$.get('rqEffDt').setValue(reqDate)

        

        localStorage.setItem("beyontech_drivers", JSON.stringify((<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).value));

        // localStorage.setItem("beyontech_drivers", JSON.stringify((<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).value));

        localStorage.setItem("beyontec_coverage", JSON.stringify(<FormArray>this.BeyontecFormService.coverage_array$.value));
        
        localStorage.setItem("beyontech_vehicles", JSON.stringify((<FormArray>this.BeyontecFormService.vehicles_array$.controls['vehicle']).value));
        localStorage.setItem('policyDetailList',JSON.stringify(data));
        this.router.navigate(['/dashboard/policy-details']);
      }else{
        console.log(data,"Error MSG")
      }
      });
  }
}
