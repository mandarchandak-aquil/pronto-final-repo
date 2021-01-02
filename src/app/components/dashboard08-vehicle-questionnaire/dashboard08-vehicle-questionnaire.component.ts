import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { SubjectCallService } from '../../commons/services/subject-call/subject-call.service';
import { Router,ActivatedRoute } from '@angular/router';
import { DashboardService } from '../../commons/services/dashboard/dashboard.service';
import { BeyontecDashFormService } from '../dashboard-service/beyontec-dash-form.service';
import { FormArray, FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { CommonService } from '../../commons/services/common/common.service';
import { BeyontecService } from '../../commons/services/beyontec/beyontec.service';


type data = {
  title: string;
}[];


@Component({
  selector: 'app-dashboard08-vehicle-questionnaire',
  templateUrl: './dashboard08-vehicle-questionnaire.component.html',
  styleUrls: ['./dashboard08-vehicle-questionnaire.component.css']
})
export class Dashboard08VehicleQuestionnaireComponent implements OnInit {

  loading : boolean = false;
  policy
  policyNo;
  policySelected
  PolicyStatus
  driverList
  vehicleList

  json_questionnaire : any;
  public form: FormGroup;
  public arrayItems: data = [];
  private formFields = [];
  private tooltipData = [];
  private ansData = [];
  private ansData1 = [];
  private ansFormating= [];
  quoteFor;

  constructor(public router: ActivatedRoute,public routers :Router,public api_sub : SubjectCallService,public dash : DashboardService, public BeyontecFormService: BeyontecDashFormService,private fb: FormBuilder, public api_common: CommonService, public api_form : BeyontecService,) { }

  ngOnInit(): void {

    
    $(".cst_mCst_scroll_Desk").mCustomScrollbar({
      theme: "dark"
    });
    
    
    this.form = this.fb.group({
      queArray: this.fb.array([])
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
    this.getQuestionary();
    this.getInit();

    if(localStorage.getItem('beyontec_questionnaire') != undefined || localStorage.getItem('beyontec_questionnaire') != null){
      // console.log(JSON.parse(localStorage.getItem('beyontec_questionnaire')))
      this.assignLocal(JSON.parse(localStorage.getItem('beyontec_questionnaire')).queArray);
    }

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


  getInit(){
    this.driverList = JSON.parse(localStorage.getItem('beyontech_drivers'));
    if(this.driverList== undefined || this.driverList== null){
      this.routers.navigate(['dashboard/my-policies']);
    }else{
      this.quoteFor = this.driverList[0]['firstName']+" "+this.driverList[0]['lastName']
    }
  }


  assignLocal(values)
  {
    console.log(values,"json data")
    var i=0;
    values.forEach(element => {
       
    this.addQuestion();
    (<FormArray>this.form.controls['queArray']).at(i).patchValue(element);
        i++;  
    });
  
    console.log(this.form, "form patch")
   
  }


  addQuestion(){
	  let fg = this.fb.group({
      answer: ['', [Validators.required]],
      description : [''],
    });
	  this.queFormArray.push(fg);	  
  }

  get queFormArray() {
    return this.form.get("queArray") as FormArray;
  }


  getQuestionary(){
    this.loading = true;
    this.api_form.questionaryAnswer().subscribe((dataQ: {}) => {

      console.log(dataQ);

      this.formFields = dataQ['qsn']; 
      this.tooltipData = dataQ['tooltip']; 
      this.ansData = dataQ['ans']; 
      this.ansData1 = dataQ['ans1']; 
      this.ansFormating = dataQ['ansFormating'];
    

      if(dataQ['status'] == 200 && this.formFields){
        this.loading = false;
        if(localStorage.getItem('beyontec_questionnaire') == undefined || localStorage.getItem('beyontec_questionnaire') == null){
          this.formFields.map(field => {
              this.addQuestion();
            });   
          
        }
          
      }
    

    });
  }



  onSubmit(){
    let val = this.form.value;
    
    console.log(val)

    let givenAns = [];
    val['queArray'].map(field => {
      // console.log(field['answer'], 'answer');
      givenAns.push(field['answer']);
    });

    let cnt = 0;
    for(let i=0; i<this.ansData.length; i++){
      // console.log(givenAns[i], " given----- ",this.ansData[i] , "Actual")
      if(givenAns[i] == this.ansData[i] || givenAns[i] == this.ansData1[i] ){
        cnt++;
      }
    }
    console.log(cnt, this.formFields.length);
 
  if(cnt == this.formFields.length){
      localStorage.setItem("beyontec_questionnaire", JSON.stringify(this.form.value));
      this.routers.navigate(['dashboard/renewal-summary/choose-policy']);
  }else{
    console.log(1111)
    document.getElementById('openModalProviderAnsError').click();
  }
   
  }

  onlanguageChange(newValue){
    // console.log(newValue, "new language");
   
    this.api_sub.sendMessage(1);
  }
}
