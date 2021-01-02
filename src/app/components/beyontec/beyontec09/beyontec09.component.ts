import { Component, OnInit, Injectable,Input, ViewChild, ElementRef } from '@angular/core';
import { BeyontecService } from '../../../commons/services/beyontec/beyontec.service';
import {FormControl, FormGroup, ReactiveFormsModule, FormsModule, FormBuilder, Validators, FormArray} from '@angular/forms';
import {NgbDateAdapter, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { NgbDateStruct, NgbCalendar, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '../../../commons/services/common/common.service';
import { BeyontecFormService } from '../beyontec-form.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-beyontec09',
  templateUrl: './beyontec09.component.html',
  styleUrls: ['./beyontec09.component.css', '../../../commons/styles.css']
})
export class Beyontec09Component implements OnInit {

  @Input() certify;
  @Input() manuallyAdd;

  isClicked: boolean = false;
  dropArr: any;
  selectState :any[];
  index:any;
  minutesQuote: any;
  driverList: any;
  vehicleList: any;
  editIndex :number;
  quoteFor = '';
  productQuoteId = '';
  json_driver : any;
  driver_array_popup:FormControl;
  exclude_driver_form:FormGroup;
  form: FormGroup;
  form_include: FormGroup;
  form_household: FormGroup;

  include_count: number = 0;
  exclude_count: number = 0;
  all_count: number = 0;
  excludeonpolicy :boolean = false;
  selectedIndex;
  selectedDriverName;
  isdisabledcontrol;

  isReadOnlydln 
  isReadOnlydob 
  isReadOnlyFname 
  isReadOnlymname 
  isReadOnlylname 
  pageArr
  @ViewChild("inputBoxlicenseNum") _el: ElementRef;

  relationship_dropdown: any = [
    {
      "key": "S",
      "value": "Spouse"
    },
    {
      "key": "P",
      "value": "Parent"
    },
    {
      "key": "C",
      "value": "Child"
    },
    {
      "key": "O",
      "value": "Other"
    }
  ]


  relationship_dropdown1: any = [
    {
      "key": "S",
      "value": "Spouse"
    }
  ]

  isMarried_dropdown: any = [
    {
      "key": "M",
      "value": "Married"
    }
  ]

  isMarried_dropdown1: any = [
    {
      "key": "S",
      "value": "Single"
    },
    {
      "key": "M",
      "value": "Married"
    }
  ]


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
  datepickerModel1;
  
  model: NgbDateStruct;
  date: { year: number, month: number };
  loading : boolean =false;

  @ViewChild('dp') dp: NgbDatepicker;


  constructor(public router: Router, public api_form : BeyontecService, private formBuilder: FormBuilder, public api_common : CommonService, public BeyontecFormService:BeyontecFormService, private activeroute:ActivatedRoute, private readonly fb: FormBuilder) { }

  ngOnInit(): void {
    this.getInit();
    this.driver_array_popup=new FormControl('',[Validators.required]);
    this.formGenerate();
    this.includeForm();
    this.householdGenerate();
    this.json_driver= JSON.parse(localStorage.getItem("beyontech_drivers"))
    if(!this.BeyontecFormService.drivers_array$)
    {
      this.BeyontecFormService.getDriverForm();
      this.BeyontecFormService.assignLocalToDriver(this.json_driver);
    }


    this.BeyontecFormService.drivers_array$.valueChanges.subscribe(value => { 
      this.BeyontecFormService.saveResponse(value.driver, "driver")
    });
    console.log(this.BeyontecFormService.drivers_array$,"arrr");

    this.getServerDate();
    this.getDriverCount();
  }

  
  getServerDate(){
    this.api_common.getTocken().subscribe((dataToken: {}) => {
      let reqTocken = 
      {
        "token": dataToken['token']
      }
      this.api_common.getServerDate(reqTocken).subscribe((dataTime: {}) => {
        // console.log(dataTime, 'dataTime', dataTime['date']);

        this.maxDate = moment(dataTime['date']).subtract(18, 'years').toDate();
        this.minDate = moment(dataTime['date']).subtract(100, 'years').toDate();
       
      });

    });
  }

  getdate(e){
    // console.log(e, 'dob');
    if(e != null){
      var currenDate = moment(e).format("MM/DD/YYYY");
      this.form.get('dob').setValue(currenDate);
    }
    
  }

  getdateHousehold(e){
    if(e != null){
      var currenDate = moment(e).format("MM/DD/YYYY");
      this.form_household.get('dob').setValue(currenDate);
    }
  }

  getdateSpouse(e){
    if(e != null){
      var currenDate = moment(e).format("MM/DD/YYYY");
      this.form_include.get('dob').setValue(currenDate);
    }
  }
  // getdate(e){
  //   // console.log(e, 'dob');
  //   if(e != null){
  //     var currenDate = moment(e).format("MM/DD/YYYY");
  //     this.form_include.get('dob').setValue(currenDate);
  //   }
    
  // }


  getInit(){
    this.selectState =[];
    // this.vehicleFinancedLeased=[];

    this.api_common.getTocken().subscribe((data: {}) => {
      // console.log(data, 'generateToken');
      let dataReq = {
        "token": data['token'],
        "companyProductCd": "PTXNSA"
      }
      // console.log(this.zipdata);
      this.api_common.getDropdown(dataReq).subscribe((dataDrop: {}) => {
        console.log(dataDrop);
        // Object.keys(dataDrop['stateLicensed'][0]).forEach(key => {
        //   this.selectState.push({ key: key, value: dataDrop['stateLicensed'][0][key] });
        // });
        // console.log(this.selectState, "selectState");

      });
    });

    this.minutesQuote = JSON.parse(localStorage.getItem('beyontec_minutesQuote'));
    this.driverList = JSON.parse(localStorage.getItem('beyontech_drivers'));

    if(this.minutesQuote == undefined || this.minutesQuote == null){
      this.router.navigate(['beyontec/04']);
    }else{
      this.productQuoteId = this.minutesQuote.productQuoteId;
    }

    if(this.driverList== undefined || this.driverList== null){
      this.router.navigate(['beyontec/01']);
    }else{
      this.quoteFor = this.driverList[0]['firstName']+" "+this.driverList[0]['lastName']
      // this.setDriver();
    }
    
  }


//   generateExcludeDriver()
//  {
//   this.exclude_driver_form = this.fb.group({
//     firstName : ['',[Validators.required, Validators.min(2)]],
//     lastName : ['',[Validators.required, Validators.min(2)]],
//     relationship : ['',[Validators.required]],
//     dob : ['',[Validators.required]],
//     isExcluded : [true],
//     driver_include:[false],
//     driver_from_api:[true],
//   });
//  }


  onSubmit(){
    // this.router.navigate(['beyontec/09']);
  }

  add_driver()
  {
    this.form.reset();
    console.log(11111)
  }

  edit_driver(i){
    console.log(i)
    this.editIndex = i;

    this.form_household.patchValue((<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(i).value);
    // this.formGenerate();
  }

  householdGenerate(){
    this.form_household = this.formBuilder.group({
      isdrivingLicence:[''],
      unit : [''],
      firstName : ['',[Validators.required, Validators.min(2)]],
      middleName : ['',[Validators.min(1)]],
      lastName : ['',[Validators.required, Validators.min(2)]],
      email : [''],
      phone1 : [''],
      phone2 : [''],
      phone3 : [''],
      phoneNumber : [''],
      dob : ['',[Validators.required]],
      isMale : [''],
      isMarried : [''],
      relationship : ['',[Validators.required]],
      licenseType : [''],
      stateLicense : [''],
      countryLicense : [''],
      licenseNum : [''],
      sr22 : [''],
      zip : [''],
      county : [''],
      yearsLicensed : [''],
      suffix : [''],
      street : [''],
      aptNumber : [''],
      city : [''],
      state : [''],
      occupation : [''],
      employer : [''],
      mobilePhone : [''],
      workPhone : [''],
      isAnytickets: [''],
      violationsArray : this.formBuilder.array([]),
      isPrimaryDriver : [false],
      isExcluded : [true],
      driver_include:[false],
      driver_from_api:[false],
    });
  }

  formGenerate(){
    this.form = this.formBuilder.group({
      isdrivingLicence:[''],
      unit : [''],
      firstName : ['',[Validators.required, Validators.min(2)]],
      middleName : ['',[Validators.min(1)]],
      lastName : ['',[Validators.required, Validators.min(2)]],
      email : [''],
      phone1 : [''],
      phone2 : [''],
      phone3 : [''],
      phoneNumber : [''],
      dob : ['',[Validators.required]],
      isMale : [''],
      isMarried : [''],
      relationship : ['',[Validators.required]],
      licenseType : [''],
      stateLicense : [''],
      countryLicense : [''],
      licenseNum : [''],
      sr22 : [''],
      zip : [''],
      county : [''],
      yearsLicensed : [''],
      suffix : [''],
      street : [''],
      aptNumber : [''],
      city : [''],
      state : [''],
      occupation : [''],
      employer : [''],
      mobilePhone : [''],
      workPhone : [''],
      isAnytickets: [''],
      violationsArray : this.formBuilder.array([]),
      isPrimaryDriver : [false],
      isExcluded : [true],
      driver_include:[false],
      driver_from_api:[false],
    });
    // this.form.patchValue((<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(index).value)
  }

  includeForm(){
    this.form_include = this.formBuilder.group({
      isdrivingLicence:[''],
      unit : [''],
      firstName : ['',[Validators.required, Validators.min(2)]],
      middleName : [''],
      lastName : ['',[Validators.required, Validators.min(2)]],
      email : [''],
      phone1 : [''],
      phone2 : [''],
      phone3 : [''],
      phoneNumber : [''],
      dob : ['',[Validators.required]],
      isMale : ['',[Validators.required]],
      isMarried : ['M'],
      relationship : ['S'],
      licenseType : [''],
      stateLicense : [''],
      countryLicense : [''],
      licenseNum : [''],
      sr22 : [''],
      zip : [''],
      county : [''],
      yearsLicensed : [''],
      suffix : [''],
      street : [''],
      aptNumber : [''],
      city : [''],
      state : [''],
      occupation : [''],
      employer : [''],
      mobilePhone : [''],
      workPhone : [''],
      isAnytickets: [''],
      violationsArray : this.formBuilder.array([]),
      isPrimaryDriver : [false],
      isExcluded : [true],
      driver_include:[false],
      driver_from_api:[false],
    });
   
  //   this.form_include.valueChanges.subscribe(res=>{
  //     if(res.Schedule=='whatever number or text '){
  //       this.ishidden= true;
  //     }else{
  //       this.ishidden = false;
  //     }
  //  });

    // this.form.patchValue((<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(index).value)
  }

  getIncludeSpousePopup(){
    this.getDriverCount();
    document.getElementById('openModalAddSpouse').click();
  }

  onSubmitSpouse(val){
    console.log(val);
    // console.log(this.check_driver_exist_include());
    console.log(11111111)
    if (this.check_driver_exist_include()) {
      document.getElementById("btnClose").click();
      document.getElementById("openModalDriverExist").click();
      this.form_include.reset();
      this.form_include.get('driver_include').setValue(false);
      this.form_include.get('isMarried').setValue("M");
      this.form_include.get('relationship').setValue("S");
      // alert('Driver already exist')
      return 0;
    }

    this.form_include.get('stateLicense').value;
    // console.log(this.exclude_driver_form.value)
    if (this.form_include.get('stateLicense').value != 'TX' && this.form_include.get('driver_include').value == true) {
      document.getElementById('btnClose').click()
      document.getElementById("openModalstateError").click(); 
      return 0;
    }

    this.BeyontecFormService.generateDriver();
    var len: any = ((<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).length - 1);
    console.log(len, "len");
    (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(len).patchValue(this.form_include.value);

    this.getDriverCount();
    this.BeyontecFormService.drivers_array$.updateValueAndValidity();
    localStorage.setItem("beyontech_drivers", JSON.stringify(this.BeyontecFormService.drivers_array$.value.driver));

    this.form_include.reset();
    this.form_include.get('driver_include').setValue(false);
    this.form_include.get('isMarried').setValue("M");
    this.form_include.get('relationship').setValue("S");
    // this.driver_array_popup.setValue('');

    document.getElementById('btnClose').click()

 

    console.log(this.BeyontecFormService.drivers_array$.value.driver, "driver main");

  }

  check_driver_exist() {

    var exist: boolean = false;
    console.log(this.form, "formaaaa")
    this.BeyontecFormService.drivers_array$.value.driver.forEach(element => {
      console.log(element, "emlement")
      if (element.firstName.toLowerCase( ) == this.form.get('firstName').value.toLowerCase( ) && element.lastName.toLowerCase( ) == this.form.get('lastName').value.toLowerCase( ) && element.dob==this.form.get('dob').value) {
        console.log(element, "element")
        exist = true;
        return 0;
      }

    });
    return exist;
  }

  check_driver_exist_include() {

    var exist: boolean = false;
    // console.log(this.form_include, "formaaaa")
    this.BeyontecFormService.drivers_array$.value.driver.forEach(element => {
      // console.log(element, "emlement")
      if (element.firstName.toLowerCase( ) == this.form_include.get('firstName').value.toLowerCase( ) && element.lastName.toLowerCase( ) == this.form_include.get('lastName').value.toLowerCase( ) && element.dob==this.form_include.get('dob').value) {
        console.log(element, "element")
        exist = true;
        return 0;
      }

    });
    return exist;
  }


  handleSelectedContinue(e){
    // console.log(e.target, e.target['value']);
    // console.log(this.form_include.get('isExcluded').value);

    if (this.form_include.get('driver_include').value === true) {
      // console.log(1111);
      // this.form_include.get('driver_include').setValue(true)
      this.form_include.get('isExcluded').setValue(false)
      this.excludeonpolicy = true;
    } else {
      // console.log(222);
      // this.form_include.get('driver_include').setValue(false)
      this.form_include.get('isExcluded').setValue(true)
      this.excludeonpolicy = false;
    }
  }

  getDriverDetailbyDOB(e){
    let dlno = this.form_include.get('licenseNum').value;
    let dob = e.target.value

    if(dlno && dob){

      this.loading = true;

      this.api_common.getTocken().subscribe((data: {}) => {
        console.log(data, 'generateToken'); 
  
        let dataReq = {
          "token": data['token'],
          "dlNo": dlno,
          "companyProductCd" : "PTXNSA"
        }
        // console.log(this.zipdata);
        
        this.api_form.getHrd(dataReq).subscribe((data1: {}) => {
          if(data1){
            this.getLocalHRD(data1['drivers'])
          }
        },
        (error) => {
          this.loading = false;
          document.getElementById("openModalButtonDLDOB").click(); 
        });
      });

    }
  }


  getDriverDetailbyDL(e){
    let dlno = e.target.value
    let dob = this.form_include.get('dob').value;

    if(!this.form_include.get('isdrivingLicence').value &&  this.form_include.get('licenseNum').value == ''){
      this.form_include.get('licenseNum').setErrors({ required: true });
    }else{
      this.form_include.get('licenseNum').clearValidators();
      this.form_include.get('licenseNum').setErrors(null);
      this.form_include.get('licenseNum').markAsPristine();
    }
     
   
    if(dlno && dob){

      this.loading = true;

      this.api_common.getTocken().subscribe((data: {}) => {
        console.log(data, 'generateToken'); 
  
        let dataReq = {
          "token": data['token'],
          "dlNo": dlno,
          "companyProductCd" : "PTXNSA"
        }
        // console.log(this.zipdata);
        
        this.api_form.getHrd(dataReq).subscribe((data1: {}) => {
          if(data1){
            this.getLocalHRD(data1['drivers'])
          }
        },
        (error) => {
          this.loading = false;
          document.getElementById("openModalButtonDLDOB").click(); 
        });
      });

    }
    
  }

  getLocalHRD(drivers){
    this.loading = false;
    let control = this.form_include;
    
    let dln = this.form_include.get('licenseNum');
    let dob = this.form_include.get('dob');

    // console.log(dln, " dln ", dob, " dob")
    this.pageArr = drivers['named'];
    // console.log(this.pageArr, " this.pageArr")

    // console.log(drivers, " drivers arr")
    
    if(this.pageArr.dob == dob.value && this.pageArr.dlNo == dln.value) 
    {
      control.get('firstName').setValue(this.pageArr.firstName);
      control.get('middleName').setValue(this.pageArr.middleName);
      control.get('lastName').setValue(this.pageArr.lastName);
      this.isReadOnlyFname = true;
      this.isReadOnlymname = true;
      this.isReadOnlylname = true;
      this.isReadOnlydln = true;
      this.isReadOnlydob = true;
      // control.get('fname').disable();
    } 
    else{
      this.loading = false;
      document.getElementById("openModalButtonDLDOB").click(); 
      // alert("Insert Valid Dricing Licence Number OR Date Of Birth");
      this.isReadOnlydln = false;
      this.isReadOnlydob = false;
      this.isReadOnlyFname = false;
      this.isReadOnlymname = false;
      this.isReadOnlylname = false;
      control.get('licenseNum').reset();
      control.get('dob').reset();
      control.get('firstName').reset();
      this._el.nativeElement.focus();
    }
    
  }



  setIndexToSave(i, e){
    // console.log(this.form.value, "Before")
    if(e.target.checked){
      this.selectedIndex = i;
      // this.form.patchValue((<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(i).value)
      // this.form.get('driver_include').setValue(true);
      console.log(this.form.value, "Before")
    }

    console.log(e.target.checked , "checked", i, "index");
  }

  addSelected(i){
    console.log(i, "index");
    const control = (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']);
    control.at(i).get('isMarried').setValue('M');
    control.at(i).get('relationship').setValue('S')
    localStorage.setItem("beyontech_drivers", JSON.stringify(this.BeyontecFormService.drivers_array$.value.driver));
    this.json_driver = this.BeyontecFormService.drivers_array$.value.driver;
    this.form.reset();
    document.getElementById('btnClose').click()
  
    // this.form.patchValue(control.at(i).value)
    // this.form.get('isMarried').setValue('M');
    // this.form.get('relationship').setValue('S');
    // console.log(this.form.value, "after")

  }

  onSubmitForm(val){
    console.log(val);

    (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(this.editIndex).get('firstName').setValue(val.firstName);
    (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(this.editIndex).get('lastName').setValue(val.lastName);
    (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(this.editIndex).get('dob').setValue(val.dob);
    (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(this.editIndex).get('relationship').setValue(val.relationship);

    this.editIndex = null;


    // (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(this.index).patchValue(this.form.value);
    this.BeyontecFormService.drivers_array$.updateValueAndValidity();
    this.form.reset();

    // 
    
    // this.BeyontecFormService.generateDriver();
    // var len:any=((<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).length-1);
    //  console.log(len,"len");
    //   (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(len).patchValue(this.form.value);
     
    // this.BeyontecFormService.drivers_array$.updateValueAndValidity();
    // localStorage.setItem("beyontech_drivers", JSON.stringify(this.BeyontecFormService.drivers_array$.value.driver));
   
    // this.form.reset();



  }

  onSubmitFormNew(val){
    val.isdrivingLicence = false;
// console.log(val)
      console.log(val);
      this.BeyontecFormService.generateDriver();
      var len:any=((<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).length-1);
      console.log(len,"len");
        (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(len).patchValue(val);
        // (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(this.index).get('driver_include').setValue(false);
      this.BeyontecFormService.drivers_array$.updateValueAndValidity();
      localStorage.setItem("beyontech_drivers", JSON.stringify(this.BeyontecFormService.drivers_array$.value.driver));
    
      this.form.reset();
  }

  onSubmitFinal(){
    let spouse = 0;
    let married = 0;
    let arrayMarried : any = [];

    let drivers = JSON.parse(localStorage.getItem("beyontech_drivers"));
    console.log(drivers, 'drivers');
    // console.log(this.manuallyAdd, 'manuallyAdd');
    let ii = 0;
    for (const driver of drivers) {
      if (driver.isMarried === 'M' && driver.relationship != 'S') {
        married++;
        console.log(driver, "Married Driver", ii)
        arrayMarried.push(ii);
      }
      if (driver.relationship === 'S') {
        spouse++;
        console.log(driver, "Spuse Driver", ii)
      }
      // localStorage
      

      ii++;
    }

    // console.log(arrayMarried, "index array")
    // console.log(arrayMarried[spouse], "index array of spouse")
    // arrayMarried
    // console.log(married, 'married', spouse, "spouse");

    if(married != spouse){

      let d= drivers[arrayMarried[spouse]]
      if(arrayMarried[spouse] == 0){
        this.selectedDriverName = '';
      }else{
        this.selectedDriverName =  d.firstName+" "+d.middleName+" "+d.lastName;
      }
     
     console.log(this.selectedDriverName, "selectedDriverName");
    //   if(drivers.length > 1){
        this.getDriverCount();
        this.isDisabledInclude()
        document.getElementById('openModalAddSpouse').click();
    //   }else{
    //     document.getElementById('openModalAddSpouseExisting').click();
    //   }
    }else{
      // console.log('getFullQuote');
      this.getFullQuote();
    }

    // console.log(married, 'married');
    // console.log(spouse, 'spouse');
  // this.getFullQuote();
  }


  getFullQuote(){
    this.loading = true;
    // let minute = JSON.parse(localStorage.getItem("minute_request"));
    // console.log(minute, "minute Request");


    // let beyontec_minutesQuote = JSON.parse(localStorage.getItem("beyontec_minutesQuote"));
    // console.log(beyontec_minutesQuote, "beyontec_minutesQuote");

    let insuranceFor = JSON.parse(localStorage.getItem("insuranceFor"));
    let driver = JSON.parse(localStorage.getItem("beyontech_drivers"));
    let vehicles = JSON.parse(localStorage.getItem("beyontech_vehicles"));
    let coverage = JSON.parse(localStorage.getItem("beyontec_coverage"));
    let intelligentsearch = JSON.parse(localStorage.getItem("beyontec_intelligentsearch"));
    let discounts = JSON.parse(localStorage.getItem("discounts"));
    let beyontec_questionnaire = JSON.parse(localStorage.getItem("beyontec_questionnaire"));
    let beyontec_minutesQuote = JSON.parse(localStorage.getItem("beyontec_minutesQuote"));
    

// console.log(beyontec_questionnaire['queArray'], 'length');
let  underwritings = [];
for(let i=0; i < beyontec_questionnaire['queArray'].length; i++){
  console.log(beyontec_questionnaire['queArray'][i].answer)
    underwritings.push({
      "questionCd":i+1,
      "explanation":beyontec_questionnaire['queArray'][i].description,
      "yesNoCd":beyontec_questionnaire['queArray'][i].answer == 1 ? false : true
    })
}
// console.log(underwritings);


      let additionalDriver = [];
      let vehicleList = [];

      for (let i = 1; i < driver.length; i++) {

        let a = {
          "id": "ysusxllapls0p",
          "driverStatus": "N",
          "firstName": driver[i].firstName,
          "middleName": driver[i].middleName,
          "lastName": driver[i].lastName,
          "email": "",
          "phoneNumber": "",
          "dob": driver[i].dob,
          "isMale": driver[i].isMale,
          "isMarried": driver[i].isMarried,
          "relationship": driver[i].relationship,
          "licenseNum": driver[i].licenseNum,
          "isExcluded": !driver[i].driver_include,
          "licenseType": "T",
          "stateLicense": "TX",
          "yearsLicensed": 0,
          "sr22": false,
          "is2ndNamedInsured": true,
          "discounts": {
            "goodStudent": "2"
          },
          "violationsArray": driver[i].violationsArray,
          "texasDriverLicense": true
        }

        additionalDriver.push(a);

      }

      for (let j = 0; j < vehicles.length; j++) {
       
        if (vehicles[j].include) {


          let b = {
            "vin": vehicles[j].vinNo,
            "year": vehicles[j].year,
            "make": vehicles[j].make,
            "model": vehicles[j].model,
            "subModel": vehicles[j].symbol,
            "vehDrivenMiles": false,
            "vehTon": false,
            "trim": "",
            "bisUse": false,
            "vehInspection": false,
            "eqAmount": vehicles[j].equipment_amount,
            "requests": {
              "compDeductible": vehicles[j].type_of_coverage ? vehicles[j].type_of_coverage : 0,
              "collDeductible": vehicles[j].type_of_coverage ? vehicles[j].type_of_coverage : 0,
              "rentReimbursement": vehicles[j].rental_reimbus ? vehicles[j].rental_reimbus : 0,
              "towingAndLabor": vehicles[j].towing_labour ? vehicles[j].towing_labour : 0,
              "custEquipment": vehicles[j].equipment_amount_redio == "Yes" ? true : false,
              "rsa": vehicles[j].road_side_assistance == "Yes" ? true : false
            },
            "garageInfo": {
              "zip":insuranceFor['zipcode'],
              "aptNumber":0,
              "city":intelligentsearch['city'], //"BROWNSVILLE",
              "state":intelligentsearch['state'],
              "county":insuranceFor['county'],
              "unit":""
            },
            "lossPayee":{
               "zip":"",
               "state":"",
               "city":"",
               "address":"",
               "name":"",
               "isLossPayee":false
            }
          }

          vehicleList.push(b);
        }

      
      }

      this.api_common.getTocken().subscribe((dataT: {}) => {

let ipData = {
  "token": dataT['token'],
  "productState": "TX",
  "requestType": "FQ",
  "companyProductCd": insuranceFor['productName'],
  "source": "WebApp",
  "agentId": "PI001",
  "quoteNo":beyontec_minutesQuote['productQuoteId'],
  "primaryDriver": {
       "id": "glaowpxlzslwpq",
       "firstName": driver[0].firstName,
       "middleName": driver[0].middleName,
       "lastName": driver[0].lastName,
       "email": driver[0].email,
       "phoneNumber": driver[0].phone1 + driver[0].phone2 + driver[0].phone3,
       "zip": insuranceFor['zipcode'],
       "county": driver[0].county,
       "state": driver[0].state,
       "city": driver[0].city,
       "street": driver[0].street,
       "dob": driver[0].dob,
       "licenseNum": driver[0].licenseNum,
       "isMale": driver[0].isMale,
       "isMarried": driver[0].isMarried,
       "relationship": "I",
       "licenseType": "T",
       "stateLicense": "TX",
       "yearsLicensed": null,
       "sr22": false,
       "employer":"",
     "occupation":"",
     "countryLicense":"US",
     "unit":"",
     "suffix":"",
     "isCreditAuthScoreYN":false,

       "coverages": {
         "umbi": coverage.umbi,
         "umpd": coverage.umpd,
         "pip": coverage.pip,
         "bi": coverage.bi,
         "pd": coverage.pd,
         "med": "0"
       },
       "violationsArray": driver[0].violationsArray,
       "discounts":{
        "lbEndorsement":false,
        "pdEndorsement":false,
        "isAutoPay":false,
        "pifDiscount":false
        },
       "requests": {
         "downPayment":beyontec_minutesQuote['choice'].downPct,
         "paymentPlan":discounts['paymentPlan'],
         "productCode":"PTXNSA", //beyontec_minutesQuote['choice'].productName,
         "rqEffDt":coverage.rqEffDt,
         "term":beyontec_minutesQuote['choice'].name,
         "liabilityPropertyDamage":"N"
       },
       "priorCarrier":{
        
        }
  },
  "underwritings":underwritings,
  "additionalDrivers":additionalDriver,
  "vehicles":vehicleList
}

// console.log(JSON.stringify(ipData));
// let bypassurl = "https://stableapi.prontoinsurance.com/premiumrater/services/generate?token=" + dataT['token']
this.api_form.minutesQuote(ipData).subscribe((dataFullQuote: {}) => {
// this.api_form.minutesQuotebypass(ipData, bypassurl).subscribe((dataFullQuote: {}) => {
  this.loading = false;
  console.log(dataFullQuote['quote']);
  localStorage.setItem("beyontec_fullQuote", JSON.stringify(dataFullQuote['quote']));


  if(dataFullQuote['quote'] != null){
    if(dataFullQuote['quote']['programs']['expanded'] != null || dataFullQuote['quote']['programs']['limited'] != null){
      this.router.navigate(['beyontec/10']);
    }
    else{
      document.getElementById('openModalButtonSomethingWrong').click();
      localStorage.clear();
    }
  }else{
    document.getElementById('openModalButtonSomethingWrong').click();
    localStorage.clear();
  }


})

      })
 
  }

  goToFaq(){
    this.router.navigate(['']);
  }

  // getClick(e){
  //   // e.srcElement.attributes.class;

  //   console.log(e.srcElement.attributes.class);
  // }

  exclude_driver_submit(){
    console.log(this.exclude_driver_form.value)

    //  if(this.check_vin_exist())
    //  {
    //    alert('Vehicle already exist')
    //    return 0;
    //  }

    this.BeyontecFormService.generateDriver();
    var len: any = ((<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).length - 1);
    console.log(len, "len");
    (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(len).patchValue(this.exclude_driver_form.value);

    this.getDriverCount();
    this.BeyontecFormService.drivers_array$.updateValueAndValidity();
    localStorage.setItem("beyontech_drivers", JSON.stringify(this.BeyontecFormService.drivers_array$.value.driver));

    this.exclude_driver_form.reset();
    this.driver_array_popup.setValue('');

    document.getElementById('cancel_popup').click()
    console.log(this.BeyontecFormService.drivers_array$.value.driver, "driver main")
  }

  getDriverCount(){
    this.include_count = 0;
    this.exclude_count = 0;
    this.all_count = 0;

    let hrddata = JSON.parse(localStorage.getItem('hrddata'));
    this.all_count = hrddata['drivers']['additional'].length;
    // console.log(this.BeyontecFormService.drivers_array$.value, "foreach");
    this.BeyontecFormService.drivers_array$.value.driver.forEach(element => {
      if (element.driver_include) {
        this.include_count++;
      }
      else {
        this.exclude_count++;
      }
      return 0;
    });

   

    console.log(this.include_count, "include_count", this.exclude_count, "exclude_count", this.all_count, "all_count")
  }

  isDisabledInclude(){
    let a = this.include_count >= 4 ? true : false;
    console.log(a)
    if(a){
      this.isdisabledcontrol = a;
      this.form_include.controls['driver_include'].disable();
    }
  }
  
}

@Injectable()
export class CustomAdapter extends NgbDateAdapter<string> {
  readonly DELIMITER = '-';
  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        month : parseInt(date[1], 10),
        day : parseInt(date[0], 10),
        year : parseInt(date[2], 10)
      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
  }
}
@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
  readonly DELIMITER = '/';
  parse(value: string): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        month : parseInt(date[1], 10),
        day : parseInt(date[0], 10),
        year : parseInt(date[2], 10)
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date ? date.month + this.DELIMITER + date.day + this.DELIMITER + date.year : '';
  }
}
