import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { BeyontecService } from '../../../commons/services/beyontec/beyontec.service';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';
import {FormControl, FormGroup, ReactiveFormsModule, FormsModule, FormBuilder, Validators, FormArray} from '@angular/forms';
import { CommonService } from '../../../commons/services/common/common.service';
import { BeyontecFormService } from '../beyontec-form.service';
import { NgbDateStruct, NgbCalendar, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import {Injectable} from '@angular/core';
import {NgbDateAdapter, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { HomepageService } from '../../../commons/services/homepage/homepage.service';



@Component({
  selector: 'app-beyontec06',
  templateUrl: './beyontec06.component.html',
  styleUrls: ['./beyontec06.component.css', '../../../commons/styles.css']
})
export class Beyontec06Component implements OnInit {

 

  loading :boolean = false;

  model: NgbDateStruct;
  date: { year: number, month: number };
  @ViewChild('dp')  dp: NgbDatepicker;
  minutesQuote: any;
  driverList: any;
  // minutesQuote: any;
  form: FormGroup;
  form1: FormGroup;
  addressCheck:any;
  quoteFor = '';
  productQuoteId = '';
  isReadOnlyFname : boolean = false;
  isReadOnlymname : boolean = false;
  isReadOnlylname : boolean = false;
  isReadOnlydln : boolean = false;
  isReadOnlydob : boolean = false;
  isClicked : boolean = false;
  emailError : boolean = false;
  stateList: any[];
  genderList: any[];
  maritalStatusList: any[];
  countieList: any[];
  invalidCounty : boolean = false;
  currentAddress :any;
  suggestAddress :any;
  selectedOption:any;
  intelligentsearch:any;
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
  maxDate;
  minDate;
  datepickerModel;
  bsValue;
  dateToday;
  json_driver;
  maritalStatus = [
    { 
      "key": "S",
      "value": "Single"
    },
    { 
      "key": "M",
      "value": "Married"
    },
  ];
  json_coverage;

  constructor(public router: Router, public api_form : BeyontecService, private formBuilder: FormBuilder, public api_common : CommonService, public BeyontecFormService:BeyontecFormService, public api_page : HomepageService,) { }

  ngOnInit(): void {
    (<any>$('[data-tooltip="tooltip"]')).tooltip()
    this.getDropdown();
    

    this.minutesQuote = JSON.parse(localStorage.getItem('beyontec_minutesQuote'));
    this.driverList = JSON.parse(localStorage.getItem('beyontech_drivers'));
    // this.minutesQuote = JSON.parse(localStorage.getItem('beyontec_minutesQuote'));
    
    this.intelligentsearch = JSON.parse(localStorage.getItem("beyontec_intelligentsearch"));

    // var date = moment().toDate();

    console.log(this.intelligentsearch, "this.intelligentsearch");
    // this.maxDate = moment(date).subtract(18, 'years').toDate();
    // this.mindate = moment(date).subtract(100, 'years').toDate();

    this.form = this.formBuilder.group({
      psd:['',[Validators.required]],
      isdrivingLicence:[''],
      unit : [''],
      firstName : ['',[Validators.required, Validators.min(1)]],
      middleName : ['',[Validators.min(1)]],
      lastName : ['',[Validators.required, Validators.min(1)]],
      email : ['',[Validators.required]],
      phone1 : ['',[Validators.required, Validators.min(3)]],
      phone2 : ['',[Validators.required, Validators.min(3)]],
      phone3 : ['',[Validators.required, Validators.min(4)]],
      phoneNumber : [''],
      dob : ['',[Validators.required]],
      isMale : ['',[Validators.required]],
      isMarried : ['',[Validators.required]],
      relationship : [''],
      licenseType : [''],
      stateLicense : [''],
      countryLicense : [''],
      licenseNum : [''],
      sr22 : [''],
      zip : ['',[Validators.required]],
      county : ['',[Validators.required]],
      yearsLicensed : [''],
      suffix : [''],
      street : ['',[Validators.required]],
      aptNumber : [''],
      city : ['',[Validators.required]],
      state : ['',[Validators.required]],
      occupation : [''],
      employer : [''],
      mobilePhone : [''],
      workPhone : [''],
      isAnytickets: [''],
      violationsArray : this.formBuilder.array([]),
      isPrimaryDriver : [true],
      isExcluded : [''],
      driver_include:[''],
      driver_from_api:[''],
    });


    this.form1 = this.formBuilder.group({
      addressCheck:['2',[Validators.required]],
    });

    

    if(this.minutesQuote == undefined || this.minutesQuote == null){
      this.router.navigate(['beyontec/04']);
    }else{
      this.productQuoteId = this.minutesQuote.productQuoteId;
    }

    if(this.driverList== undefined || this.driverList== null){
      this.router.navigate(['beyontec/01']);
    }else{
      this.quoteFor = this.driverList[0]['firstName']+" "+this.driverList[0]['lastName']
      this.setDriver();
    }

    if(this.intelligentsearch != undefined || this.intelligentsearch != null){
      // this.intelligentsearch.deliveryLine1
      this.form.get('state').setValue(this.intelligentsearch.state);
    }

    this.getServerDate()


  }

  getServerDate(){
    this.api_common.getTocken().subscribe((dataToken: {}) => {
      let reqTocken = 
      {
        "token": dataToken['token']
      }
      this.api_common.getServerDate(reqTocken).subscribe((dataTime: {}) => {
        console.log(dataTime, 'dataTime');
        this.maxDate = new Date(dataTime['date']); 
        this.maxDate.setDate(this.maxDate.getDate() + 35);
        this.minDate = new Date(dataTime['date']); 
        this.dateToday = dataTime['date'];
      });

    });
  }


  getdate(e, ctr){
    // console.log(e, 'dob');
    if(e != null){
      var currenDate = moment(e).format("MM/DD/YYYY");
      this.form.get(ctr).setValue(currenDate);
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

      this.form.get('psd').setValue('');
      document.getElementById('rqEffDt').focus();
      
    }

  }
  }
  
  setDriver(){

    let a = JSON.parse(localStorage.getItem('beyontech_drivers'));
    let b = JSON.parse(localStorage.getItem('beyontec_coverage'));
    // console.log(a)
    this.BeyontecFormService.getDriverForm();
    this.BeyontecFormService.assignLocalToDriver(a);

    let control0 = (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(0).value;
    console.log(control0 , "control at 0");
    this.form.patchValue(control0)

    
    this.form.get('psd').setValue(b.rqEffDt);

    // this.form.patchValue()
    // console.log(this.form , "this.form ")
    // this.form.get('dob').setValue({
    //   year: parseInt(control0.dob.format('YYYY'), 10),
    //   month: parseInt(control0.dob.format('M'), 10),
    //   day: parseInt(control0.dob.format('D'), 10)
    // });

    this.isReadOnlydln = true;
    this.isReadOnlydob = true;
    this.isReadOnlyFname = true;
    this.isReadOnlymname = true;
    this.isReadOnlylname = true;
    // this.form.updateValueAndValidity();


  }

  onSubmit(val){
    
    this.suggestAddress = this.intelligentsearch.deliveryLine1 +" "+this.intelligentsearch.city+ ", "+this.intelligentsearch.state+ " "+this.intelligentsearch.zip;

    this.currentAddress = val.street +" "+ val.city +", "+ val.state +" "+ val.zip;
    //console.log(this.currentAddress , "this.currentAddress       ==================   ", this.suggestAddress, "this.suggestAddress")
    // .state.city.zip..county
    this.addressCheck= 3;
    document.getElementById("openModalButtonAddress").click(); 



    // console.log(val)

    // if(localStorage.getItem('beyontech_drivers') != undefined || localStorage.getItem('beyontech_drivers') != null)
    // {
    //   // console.log((<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(0));
    //   (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(0).patchValue(this.form.value);
    // }

    // this.BeyontecFormService.drivers_array$.updateValueAndValidity();
    // localStorage.setItem("beyontech_drivers", JSON.stringify((<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).value));

    // this.router.navigate(['beyontec/07']);

  }


  getDropdown(){
    this.api_common.getTocken().subscribe((data: {}) => {
      // console.log(data, 'generateToken');
      let dataReq = {
        "token": data['token'],
        "companyProductCd": "PTXNSA"
      }
      // console.log(this.zipdata);
      this.api_common.getDropdown(dataReq).subscribe((dataDrop: {}) => {
        if (dataDrop) {
          // console.log(dataDrop)
          this.stateList = [];
          Object.keys(dataDrop['stateLicensed'][0]).forEach(key => {
            this.stateList.push({ key: key, value: dataDrop['stateLicensed'][0][key] });
          });

          this.genderList=[]
          Object.keys(dataDrop['gender'][0]).forEach(key => {
            this.genderList.push({ key: key, value: dataDrop['gender'][0][key] });
          });

          this.maritalStatusList=[]
          Object.keys(dataDrop['maritalStatus'][0]).forEach(key => {
            this.maritalStatusList.push({ key: key, value: dataDrop['maritalStatus'][0][key] });
          });

          console.log(this.maritalStatusList,"this.maritalStatusList")

        }
      });
    });


    let countyArr = JSON.parse(localStorage.getItem('insuranceFor')).countyList;
    this.countieList = [];
    if(countyArr){
      Object.keys(countyArr).forEach(key => {
        this.countieList.push({ key: key, value: countyArr[key] });
      });
    }
    
    // console.log(this.countieList, 'this.countieList')
    // this.countieList.push({key : "1", value : 'FAYETTE'})
  }


  getCountryValues(e){
    
      this.loading = true;

    let dataReq1 = {
      "zipcode": this.form.get('zip').value,
      "county": e.value
    }
    console.log(dataReq1)
    this.api_page.getPzcmap(dataReq1).subscribe((dataPZC: {}) => {
      console.log(dataPZC)

      this.loading = false;

      if(dataPZC[0]['productName'] != 'PTXNSA'){
        this.invalidCounty = true;
        alert("Invalid Country. Please Select Valid County.")
      }else{
        this.invalidCounty = false;
      }
    })

  }

  emailCheck(e){
    if(e.target.value){
      this.loading = true;

      this.api_common.getTocken().subscribe((data: {}) => {
        // console.log(data, 'generateTocken'); 
        let dataReq1 = {
          "token": data['token'],
          "emailId": e.target.value
        }
        this.api_form.emailVerify(dataReq1).subscribe((data: {}) => {
          
          console.log(data, 'emailVerify'); 
          if(data['statusNbr']==200){
            this.emailError = false;
            this.getCheckEmailExist(e.target.value);
          }else{
            this.emailError = true;
            alert("Email ID Is Invalid");
          }
        });
      });
    }
  }

  getCheckEmailExist(evalue){
    if(evalue){
      this.api_common.getTocken().subscribe((data: {}) => {
        // console.log(data, 'generateTocken'); 
        let dataReq1 = {
          "token": data['token'],
          "emailId": evalue
        }
        this.api_form.emailExist(dataReq1).subscribe((data: {}) => {
          console.log(data, 'emailExist'); 
          this.loading = false;
          if(data['exists']){
            document.getElementById("openModalButtonEmail").click(); 
          }
        });
      });
    }
  }

  getProceedEmail(val){
    this.router.navigate(['page/login']);
  }


  handleChange(e){
    this.selectedOption = e;
    
    
    console.log(e, "handleChange................")
    // if(e == 1){
    //   this.selectedOption = 1
    // }


    // if(e == 2){
    //   this.selectedOption = 2
    //       // let control = (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(0);
    //       // console.log(control);
    // }

    // if(e == 3){
    //   this.selectedOption = 3
    //   document.getElementById("closeAddExpenseModal").click();
    // }
    
  }
 
  onSubmitFinal(val){
    // document.getElementById("closeAddExpenseModal").click();

    console.log(val['addressCheck']);
    if(val['addressCheck'] == 3){
      document.getElementById("closeAddExpenseModal").click();
    }
    else{
      
      document.getElementById("closeAddExpenseModal").click();
      if(val['addressCheck'] == 2){
        this.form.get('street').setValue(this.intelligentsearch.deliveryLine1);
        this.form.get('city').setValue(this.intelligentsearch.city)
        this.form.get('state').setValue(this.intelligentsearch.state)
        this.form.get('zip').setValue(this.intelligentsearch.zip)
      }
      

      
      if(localStorage.getItem('beyontech_drivers') != undefined || localStorage.getItem('beyontech_drivers') != null)
      {
        // console.log((<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(0));
        (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(0).patchValue(this.form.value);
      }

      this.BeyontecFormService.drivers_array$.updateValueAndValidity();
      localStorage.setItem("beyontech_drivers", JSON.stringify((<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).value));

      this.json_coverage = JSON.parse(localStorage.getItem("beyontec_coverage"));
      if(this.json_coverage!=undefined && this.json_coverage!=null)
      {
        this.BeyontecFormService.getCoverageForm();
        this.BeyontecFormService.coverage_array$.patchValue(this.json_coverage);
        this.BeyontecFormService.coverage_array$.get('rqEffDt').setValue(this.form.get('psd').value);
        localStorage.setItem("beyontec_coverage", JSON.stringify(<FormArray>this.BeyontecFormService.coverage_array$.value));
      }
      

      this.router.navigate(['beyontec/07']);

    }
    //  this.router.navigate(['beyontec/07']);
  }


}
