import { Component, OnInit } from '@angular/core';
import { BeyontecService } from '../../commons/services/beyontec/beyontec.service';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule, FormBuilder, Validators, FormArray } from '@angular/forms';
import { CommonService } from '../../commons/services/common/common.service';
import { BeyontecDashFormService } from '../dashboard-service/beyontec-dash-form.service';
import { Router } from '@angular/router';
import * as moment from 'moment';


@Component({
  selector: 'app-dashboard07-edit-coverage',
  templateUrl: './dashboard07-edit-coverage.component.html',
  styleUrls: ['./dashboard07-edit-coverage.component.css', '../../commons/styles.css']
})
export class Dashboard07EditCoverageComponent implements OnInit {


  
  isClicked: boolean = false;
  dropArr: any;
  umbiList: any[];
  umpdList: any[];
  pipList: any[];
  pd: any[];
  bi: any[];
  json_coverage : any;
  loading : boolean = false;
  dateToday : any;
  maxDate;
  minDate;
  bsConfig = {
    containerClass: 'theme-red',
    // minDate :new Date(Date.now()),
    // maxDate :new Date(Date.now()),
    isAnimated: true,
    adaptivePosition: true,
    showWeekNumbers: false,
    returnFocusToInput: true,
    dateInputFormat: 'MM/DD/YYYY',
  };
  datepickerModel;
  bsValue;
  form : FormGroup;

  // umbiList = [
  //     {id: 1, name: 'Reject'},
  //     {id: 2, name: '$30,000/$60,000'},
  //   ];
  
  //   umpdlist = [
  //     {id: 1, name: 'Reject'},
  //     {id: 2, name: '$25,000'},
  //   ];
  
  //   piplist = [
  //     {id: 1, name: 'Reject'},
  //     {id: 2, name: '$2,500'},
  //   ];


  constructor(public router: Router, public api_form: BeyontecService, private formBuilder: FormBuilder, public api_common: CommonService, public BeyontecFormService: BeyontecDashFormService,) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      pip: ['',[Validators.required]],
      umpd: ['',[Validators.required]],
      umbi: ['',[Validators.required]],
      pd: [''],
      bi: [''],
      rqEffDt: ['',[Validators.required]]
    })


    if(!this.BeyontecFormService.coverage_array$){
      this.json_coverage = JSON.parse(localStorage.getItem("beyontec_coverage"));
      this.BeyontecFormService.getCoverageForm();
      this.BeyontecFormService.coverage_array$.patchValue(this.json_coverage)
    }

    this.onInit();
  }

  onInit(){
      this.loading = true;
      let dataReq = {
        "companyProductCd": "PTXNSA"
      }
      // console.log(this.zipdata);
      this.api_common.getDropdown(dataReq).subscribe((dataDrop: {}) => {

        this.dropArr = dataDrop
        // console.log("getDropdown", this.dropArr);
        this.getDropdowns(this.dropArr)
      });
    

    
      let reqTocken = 
      {
        "token": 'qqq'
      }
      this.api_common.getServerDate(reqTocken).subscribe((dataTime: {}) => {
        console.log(dataTime, 'dataTime');
        this.maxDate = new Date(dataTime['date']); 
        this.maxDate.setDate(this.maxDate.getDate() + 35);
        this.minDate = new Date(dataTime['date']); 
        this.dateToday = dataTime['date'];
      });

  
  }

  getdate(e){
    // console.log(e, 'dob');
    if(e != null){
      var currenDate = moment(e).format("MM/DD/YYYY");
      this.BeyontecFormService.coverage_array$.get('rqEffDt').setValue(currenDate);
    }
  }

  ngAfterViewInit(){
    
  }

  getDropdowns(dropArr) {

    console.log('dropArr dropArr dropArr dropArr dropArr', dropArr)
    if (dropArr) {
      this.loading = false;
      // console.log(dropArr.umbi);
      this.umbiList = [];
      Object.keys(dropArr.umbi[0]).forEach(key => {
        this.umbiList.push({ key: key, value: dropArr.umbi[0][key] });
      });
      // // console.log(this.umbiList);

      this.umpdList = [];
      Object.keys(dropArr.umpd[0]).forEach(key => {
        this.umpdList.push({ key: key, value: dropArr.umpd[0][key] });
      });

      this.pipList = [];
      Object.keys(dropArr.pip[0]).forEach(key => {
        this.pipList.push({ key: key, value: dropArr.pip[0][key] });
      });


      this.pd = [];
      Object.keys(dropArr.propertyDamage[0]).forEach(key => {
        this.pd.push({ key: key, value: dropArr.propertyDamage[0][key] });
      });

      this.bi = [];
      Object.keys(dropArr.bodilyInjury[0]).forEach(key => {
        this.bi.push({ key: key, value: dropArr.bodilyInjury[0][key] });
      });

      // console.log(this.pd, this.bi)

    }

  }

  focusOutRqEff(val){
    // console.log(val)
    if(val != ''){
     
    var startDate : any = null;

    // var currenDate = moment(new Date()).format("MM/DD/YYYY");


    var currenDate = this.dateToday;

    startDate = moment(val, "MM/DD/YYYY");
    // var startDate1 = moment(this.BeyontecFormService.coverage_array$.get('rqEffDt').value, "DD/MM/YYYY").day();
    var endDate = moment(currenDate, "MM/DD/YYYY");
    // let dateDiff = endDate - startDate;
    let k = startDate.diff(endDate, 'days');
    // let l = endDate.diff(startDate, 'days')
    // console.log(currenDate, 'currenDate')
    // console.log(startDate, 'startDate')
    // console.log(endDate, 'endDate')


    console.log(k, 'dateDiff k')
    
    if(k < 36 && k > -1){
      // console.log(1111);
      // 
    }else{
      // alert(2222)
      
      document.getElementById('openModalButtonPolicyStart').click();

      this.BeyontecFormService.coverage_array$.get('rqEffDt').setValue('');
      document.getElementById('rqEffDt').focus();
      
    }

  }
  }


  onSubmit() {

    // (<FormArray>this.BeyontecFormService.coverage_array$.controls['coverage_array']).get('pd').setValue(this.pd[0].key);
    // (<FormArray>this.BeyontecFormService.coverage_array$.controls['coverage_array']).get('bi').setValue(this.bi[0].key);
    this.BeyontecFormService.coverage_array$.get('pd').setValue(this.pd[0].key)
    this.BeyontecFormService.coverage_array$.get('bi').setValue(this.bi[0].key)

    if (this.BeyontecFormService.coverage_array$.get('umbi').value == "") {
      this.BeyontecFormService.coverage_array$.get('umbi').setValue(0)
    }
    if (this.BeyontecFormService.coverage_array$.get('umpd').value == "") {
      this.BeyontecFormService.coverage_array$.get('umpd').setValue(0)
    }
    if (this.BeyontecFormService.coverage_array$.get('pip').value == "") {
      this.BeyontecFormService.coverage_array$.get('pip').setValue(0)
    }
    // console.log();

    // console.log(<FormArray>this.BeyontecFormService.coverage_array$.value);
    localStorage.setItem("beyontec_coverage", JSON.stringify(<FormArray>this.BeyontecFormService.coverage_array$.value));


    this.router.navigate(['dashboard/policy-details'])
    // this.getMinuteQuote();

  }

}
