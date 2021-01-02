import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
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
import { error } from 'jquery';

@Component({
  selector: 'app-b01',
  templateUrl: './b01.component.html',
  styleUrls: ['./b01.component.css', '../../../commons/styles.css']
})
export class B01Component implements OnInit {
  model: NgbDateStruct;
  date: { year: number, month: number };
  @ViewChild('dp') dp: NgbDatepicker;

  isEnterLicenseNumber : boolean = true;
  pageArr: any = [];
  dropArr: any;
  emailError : boolean = false;
  form: FormGroup;
  form1: FormGroup;
  isReadOnlyFname : boolean = false;
  isReadOnlymname : boolean = false;
  isReadOnlylname : boolean = false;
  isReadOnlydln : boolean = false;
  isReadOnlydob : boolean = false;
  serverTime: Date;
  loading: boolean = false;
  pickerMaxDate: NgbDateStruct;
  pickerMinDate: NgbDateStruct;
  maxDate;
  minDate;
  isClicked: boolean = false;
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
  relationship_dropdown: any = [
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


  @ViewChild("inputBoxlicenseNum") _el: ElementRef;

  constructor(public router: Router, public api_form : BeyontecService, private formBuilder: FormBuilder, public api_common : CommonService, public BeyontecFormService:BeyontecFormService,) {
    // this.api_common.getTocken().subscribe((data: {}) => {
    //   console.log(data, 'generateToken'); 
    //   let dataReq = {
    //     "token": data['token'],
    //     "companyProductCd" : "PTXNSA"
    //   }
    //   // console.log(this.zipdata);
    //   this.api_common.getDropdown(dataReq).subscribe((dataDrop: {}) => {
    //     this.dropArr = dataDrop
    //     console.log(this.dropArr);
    //   }); 
    // });
  }

  ngOnInit(): void {
  
    // var date = moment().toDate();

    // console.log(date);
    // this.maxDate = moment(date).subtract(18, 'years').toDate();
    // this.mindate = moment(date).subtract(100, 'years').toDate();
    this.datepickerModel = null;
    this.form = this.formBuilder.group({
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
      isMarried : [ ,[Validators.required]],
      relationship : [''],
      licenseType : [''],
      stateLicense : ['TX'],
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
      isAnytickets: ['No'],
      violationsArray : this.formBuilder.array([]),
      isPrimaryDriver : [true],
      isExcluded : [''],
      driver_include:[''],
      driver_from_api:[''],
    });

    if(!JSON.parse(localStorage.getItem("beyontech_nusr"))){
      this.getPrefilledData();
    }
    
    this.getConditionalValidation();
    this.getServerDate()
    // $("body").removeClass("openZipcode_Modal");

    // Modal Zipcode
// $('.mngZipCodeModal').on("shown.bs.modal", function() {$("body").addClass("openZipcode_Modal");});
// $('.mngZipCodeModal').on("hide.bs.modal", function() {$("body").removeClass("openZipcode_Modal");});')
  }

  getConditionalValidation(){
    this.form.get('isdrivingLicence').valueChanges
        .subscribe(value => {
        console.log(value);
          if(value) {
            this.form.get('licenseNum').clearValidators();
            this.form.get('licenseNum').clearValidators();
            this.form.get('licenseNum').setErrors(null);
            this.form.get('licenseNum').markAsPristine();

          } else {
            this.form.get('licenseNum').setValidators(Validators.required);
          }
          this.form.updateValueAndValidity(); 
        }
    );
  }

  getPrefilledData(){
    if(localStorage.getItem('beyontech_drivers') != undefined || localStorage.getItem('beyontech_drivers') != null){
      let a = JSON.parse(localStorage.getItem('beyontech_drivers'));
      console.log(a, 'a');

      this.BeyontecFormService.getDriverForm();
      this.BeyontecFormService.assignLocalToDriver(a);
      this.bsValue = new Date(a[0].dob);
      // console.log(this.bsValue, 'this.bsValue');
      // this.getdate1(this.bsValue)
      this.datepickerModel = new Date(a[0].dob);
      // let k = 0
      // a.forEach(t => {
      //   // console.log(t);
      //   this.BeyontecFormService.generateDriver();
      //   (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(k).patchValue(t);
      //   let l = 0;
      //   t.violationsArray.forEach(b => {
      //     // console.log(b,"bbbbbb");
      //     this.BeyontecFormService.generateViolation1(k);
      //     ((<FormArray>(<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(k)).controls['violationsArray']).at(l).patchValue(b);
      //     l++;
      //   });
      //   k++;
      // });

      this.form.patchValue((<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(0).value)
      // console.log(this.form , "this.form this.form this.form") 
      this.isReadOnlydln = true;
      this.isReadOnlydob = true;
      this.isReadOnlyFname = true;
      this.isReadOnlymname = true;
      this.isReadOnlylname = true;
      this.form.updateValueAndValidity();
    }
  }

  handleSelectedContinue(event){
    if (event.target.checked === true) {
      document.getElementById("openModalButton").click();      
    }else{
      this.isEnterLicenseNumber = true;
    }
  }

  getProceed(val)
  {
    if(val)
    {
      this.isEnterLicenseNumber = false;
      // this.form.get('isdrivingLicence').setValue(true);
    }else{
      this.form.get('isdrivingLicence').setValue(false);
    }
  }

  getDriverDetailbyDL(e){
    let dlno = e.target.value
    // console.log(dlno)
    let dob = this.form.get('dob').value;

    console.log(dob, " getDriverDetailbyDL Dob")

    let localDriver = JSON.parse(localStorage.getItem("hrddata"));
    // console.log(localDriver, 'localDriver');

    // console.log(this.form.get('isdrivingLicence').value, 'this.form.get(isdrivingLicence).value'); 

    if(!this.form.get('isdrivingLicence').value &&  this.form.get('licenseNum').value == ''){
      // this.form.get('licenseNum').setValidators(Validators.required);
      this.form.get('licenseNum').setErrors({ required: true });
      // this.form.get('licenseNum').markAsDirty();
    }else{
      this.form.get('licenseNum').clearValidators();
      this.form.get('licenseNum').setErrors(null);
      this.form.get('licenseNum').markAsPristine();
    }
     
   
    if(dlno && dob){
      this.loading = true;

      if(localDriver == undefined || localDriver == null){
        localStorage.removeItem('beyontec_minutesQuote');
          localStorage.removeItem('beyontech_vehicles');
          localStorage.removeItem('beyontec_intelligentsearch');
          localStorage.removeItem('beyontech_drivers');
          localStorage.removeItem('hrddata');
          localStorage.removeItem('beyontec_coverage');

        this.getDriverData(dlno);
      }else{

        // console.log(localDriver['drivers']['named']['dlNo'], " ================== ", localDriver['drivers']['named']['dob'])

        if(localDriver['drivers']['named']['dlNo'] == dlno && localDriver['drivers']['named']['dob'] == dob){
          this.getLocalHRD();
         this.getPrefilledData();
        }
        else{
          this.loading = true;

          localStorage.removeItem('beyontec_minutesQuote');
          localStorage.removeItem('beyontech_vehicles');
          localStorage.removeItem('beyontec_intelligentsearch');
          localStorage.removeItem('beyontech_drivers');
          localStorage.removeItem('hrddata');

          this.getDriverData(dlno);
        }
      }
      // this.form.get('licenseNum').disable();
      // this.form.get('dob').disable();
      this.isReadOnlydln = true;
      this.isReadOnlydob = true;

      // this.form.get('email').focus();
      // document.getElementById("email").focus();
    }
    

  }

  getdate(e){
    console.log(e, 'dob');
    if(e != null){
      var currenDate = moment(e).format("MM/DD/YYYY");
      this.form.get('dob').setValue(currenDate);
      // document.getElementById('bsDatepickerDOB').blur();
      this.getDriverDetailbyDOB(currenDate)
    }
    
  }

  getDriverDetailbyDOB(e){
    let dln = this.form.get('licenseNum').value;
    let dob = e;

    console.log(dln, 'dln', dob, 'dob');

    let localDriver = JSON.parse(localStorage.getItem("hrddata"));
    // console.log(localDriver, 'localDriver');


    if(dln && dob){
      this.loading = true;
      if(localDriver == undefined || localDriver == null){
        localStorage.removeItem('beyontec_minutesQuote');
        localStorage.removeItem('beyontech_vehicles');
        localStorage.removeItem('beyontec_intelligentsearch');
        localStorage.removeItem('beyontech_drivers');
        localStorage.removeItem('discounts');
        // localStorage.removeItem('isMinQuote');
        // localStorage.removeItem('beyontech_nusr');
        localStorage.removeItem('agreement');
        localStorage.removeItem('beyontec_questionnaire');

        localStorage.removeItem('hrddata');
        this.getDriverData(dln);
      }else{

        // console.log(localDriver['drivers']['named']['dlNo'], " ================== ", localDriver['drivers']['named']['dob'])

        // let control = this.form
        this.isReadOnlydln = true;
        this.isReadOnlydob = true;

        if(localDriver['drivers']['named']['dlNo'] == dln && localDriver['drivers']['named']['dob'] == dob){
          this.getLocalHRD();
          this.getPrefilledData();
        }
        else{
          localStorage.removeItem('beyontec_minutesQuote');
          localStorage.removeItem('beyontech_vehicles');
          localStorage.removeItem('beyontec_intelligentsearch');
          localStorage.removeItem('beyontech_drivers');
          localStorage.removeItem('hrddata');
          localStorage.removeItem('discounts');
          // localStorage.removeItem('isMinQuote');
          // localStorage.removeItem('beyontech_nusr');
          localStorage.removeItem('agreement');
          localStorage.removeItem('beyontec_questionnaire');


          this.getDriverData(dln);
        }
        
      }
     
      // control.get('licenseNum').disable();
      // control.get('dob').disable();
      // this.getLocalHRD();
    }
  }

  getDriverData(dlno){
    let control = this.form;
    let dln = control.get('licenseNum');
    let dob = control.get('dob');

    this.api_common.getTocken().subscribe((data: {}) => {
      console.log(data, 'generateToken'); 

      let dataReq = {
        "token": data['token'],
        "dlNo": dlno,
        "companyProductCd" : "PTXNSA"
      }
      // console.log(this.zipdata);
      
      this.api_form.getHrd(dataReq).subscribe((data1: {}) => {
        
        // console.log(data1['drivers']['named'])
        let hdrUsr = data1['drivers']['named'];

        if(hdrUsr.dlNo == dln.value && hdrUsr.dob == dob.value){
          localStorage.setItem("hrddata", JSON.stringify(data1))
          if(localStorage.getItem("hrddata") != undefined || localStorage.getItem("hrddata") != null){
            this.getLocalHRD()
          }
        }else{
          this.loading = false;
          document.getElementById("openModalButtonDLDOB").click(); 
          // alert("Insert Valid Dricing Licence Number OR Date Of Birth");
          control.get('licenseNum').reset();
          control.get('dob').reset();
          control.get('firstName').reset();
          this.isReadOnlydln = false;
          this.isReadOnlydob = false;
          this._el.nativeElement.focus();
        }
          
      },
      (error) => {
        this.loading = false;
        document.getElementById("openModalButtonDLDOB").click(); 
        // console.log(error, "error")
        // this.errorHandler.handleError(error);
        // this.errorMessage = this.errorHandler.errorMessage;
      });
    });
  }

  getLocalHRD(){
    this.loading = false;

    let control = this.form;
    let dln = control.get('licenseNum');
    let dob = control.get('dob');

    let drivers = JSON.parse(localStorage.getItem("hrddata"))['drivers'];
    this.pageArr = drivers['named'];
    // let primaryDriver = JSON.parse(localStorage.getItem("hrddata"))['drivers']['named'];
    // console.log(this.pageArr, "page Array");

    // console.log(this.pageArr.dob,'pageArray dob', this.pageArr.dlNo, "pageArray dlNo");
    // console.log(dob.value,'dob', dln.value, "licenseNum");

    // console.log(this.pageArr,' drivers > named Local');
    
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
      // alert("Insert Valid Dricing Licence Number OR Date Of Birth");
      this.isReadOnlydln = false;
      this.isReadOnlydob = false;
      control.get('licenseNum').reset();
      control.get('dob').reset();
      control.get('firstName').reset();
      this._el.nativeElement.focus();

    }
    // if(control.get('fname').value){
    //   control.get('fname').disable();
    // }
    // if(control.get('mname').value){
    //   control.get('mname').disable();
    // }
    // if(control.get('lname').value){
    //   control.get('lname').disable();
    // }
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
          
          // console.log(data, 'emailVerify'); 
          if(data['statusNbr']==200){
            this.emailError = false;
            this.getCheckEmailExist(e.target.value);
          }else{
            this.loading = false;
            this.emailError = true;
            // alert("Email ID Is Invalid");
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
    this.router.navigate(['login']);
  }

  onSubmit(formval){
    this.isClicked = true
    let insuranceFor = JSON.parse(localStorage.getItem("insuranceFor"));
    this.form.get('county').setValue(insuranceFor['county']);

    this.form.get('relationship').setValue('I');
    this.form.get('isExcluded').setValue(false);
    this.form.get('driver_include').setValue(true);

    if(!this.form.get('isdrivingLicence').value){
      let primaryDriver = JSON.parse(localStorage.getItem("hrddata"))['drivers']['named'];
      console.log(primaryDriver, "primaryDriver");

      this.form.get('zip').setValue(primaryDriver['zip']);
      this.form.get('street').setValue(primaryDriver['address']);

      this.form.get('driver_from_api').setValue(true);
    }else{
      this.form.get('driver_from_api').setValue(false);
      this.form.get('zip').setValue(insuranceFor['zipcode']);
    }

    console.log(this.form.value, "this.form");

    

    // if(!this.BeyontecFormService.drivers_array$)
    if(localStorage.getItem('beyontech_drivers') == undefined || localStorage.getItem('beyontech_drivers') == null)
    {
      console.log("is First time");

      if(!this.BeyontecFormService.drivers_array$){

        this.BeyontecFormService.getDriverForm();
        this.BeyontecFormService.generateDriver();

        (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(0).patchValue(this.form.value);

      }

      var hrddata=JSON.parse(localStorage.getItem("hrddata"));

      if(hrddata!=undefined && hrddata!=null)
      {
        this.BeyontecFormService.assignDriver(hrddata['drivers']['additional'])
        console.log(this.BeyontecFormService.drivers_array$,'HRD data');
      }
    }
    
    this.BeyontecFormService.drivers_array$.updateValueAndValidity();
    // this.BeyontecFormService.saveResponse(value,"vehicle")
    // let abc = [];
    // abc.push()
    localStorage.setItem("beyontech_drivers", JSON.stringify((<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).value));

    localStorage.setItem("beyontech_nusr", "false")

    // if(formval.isAnytickets == 'Yes'){
    //   this.router.navigate(['beyontec/voilation-detail',{index:0}]);
    // }else{
      if(!formval.isdrivingLicence){
        this.router.navigate(['beyontec/02-a']);
      }else{
        this.router.navigate(['beyontec/02-b']);
      }
    // }
    // this.router.navigate(['beyontec/02-a']);
    // let hrdArray = JSON.parse(localStorage.getItem("hrddata"))
    // console.log(hrdArray)
    // hrdArray['']
  }

  addVoilation(e){
    // console.log(e.target.value)

    if(e.target.value == "Yes"){
      let insuranceFor = JSON.parse(localStorage.getItem("insuranceFor"));
      this.form.get('county').setValue(insuranceFor['county']);

      this.form.get('relationship').setValue('I');
      this.form.get('isExcluded').setValue(false);
      this.form.get('driver_include').setValue(true);

      if(!this.form.get('isdrivingLicence').value){
        let primaryDriver = JSON.parse(localStorage.getItem("hrddata"))['drivers']['named'];
        // console.log(primaryDriver, "primaryDriver");

        this.form.get('zip').setValue(primaryDriver['zip']);
        this.form.get('street').setValue(primaryDriver['address']);

        this.form.get('driver_from_api').setValue(true);
      }else{
        this.form.get('driver_from_api').setValue(false);
        this.form.get('zip').setValue(insuranceFor['zipcode']);
      }

      // console.log(this.form.value, "this.form");

      if(localStorage.getItem('beyontech_drivers') == undefined || localStorage.getItem('beyontech_drivers') == null)
      {
        // console.log("is First time");
        if(!this.BeyontecFormService.drivers_array$){
          this.BeyontecFormService.getDriverForm();
          this.BeyontecFormService.generateDriver();
          (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(0).patchValue(this.form.value);
        }

        var hrddata=JSON.parse(localStorage.getItem("hrddata"));
        if(hrddata!=undefined && hrddata!=null)
        {
          this.BeyontecFormService.assignDriver(hrddata['drivers']['additional'])
          // console.log(this.BeyontecFormService.drivers_array$,'HRD data');
        }
      }
      
      this.BeyontecFormService.drivers_array$.updateValueAndValidity();
      localStorage.setItem("beyontech_drivers", JSON.stringify((<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).value));
      localStorage.setItem("beyontech_nusr", "false")

      this.router.navigate(['beyontec/voilation-detail',{index:0}]);

    }else{

    }
  }

//   onSubmit(formval){


//     this.isClicked = true

//     let insuranceFor = JSON.parse(localStorage.getItem("insuranceFor"));
//     this.form.get('county').setValue(insuranceFor['county']);

//     this.form.get('relationship').setValue('I');
//     this.form.get('isExcluded').setValue(false);
//     this.form.get('driver_include').setValue(true);

//     if(!this.form.get('isdrivingLicence').value){
//       let primaryDriver = JSON.parse(localStorage.getItem("hrddata"))['drivers']['named'];
//       console.log(primaryDriver, "primaryDriver");

//       this.form.get('zip').setValue(primaryDriver['zip']);
//       this.form.get('street').setValue(primaryDriver['address']);

//       this.form.get('driver_from_api').setValue(true);
//     }else{
//       this.form.get('driver_from_api').setValue(false);
//       this.form.get('zip').setValue(insuranceFor['zipcode']);
//     }

//     console.log(this.form.value, "this.form")

//     this.BeyontecFormService.getDriverForm()
//     this.BeyontecFormService.generateDriver();

//     (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(0).patchValue(this.form.value);

//     // var hrddata=JSON.parse(localStorage.getItem("hrddata"));

//     // this.BeyontecFormService.assignDriver(hrddata['drivers']['additional'])
//     // console.log(this.BeyontecFormService.drivers_array$,'HRD data');
    
//    this.BeyontecFormService.drivers_array$.updateValueAndValidity();
//     // this.BeyontecFormService.saveResponse(value,"vehicle")
//     // let abc = [];
//     // abc.push()
//     localStorage.setItem("beyontech_drivers", JSON.stringify((<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).value));

// console.log(JSON.stringify((<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).value),"ggggggggggg");

//     if(formval.isAnytickets == 'Yes'){
//       this.router.navigate(['beyontec/voilation-detail',{index:0}]);
//     }else{
//       if(!formval.isdrivingLicence){
//         this.router.navigate(['beyontec/02-a']);
//       }else{
//         this.router.navigate(['beyontec/02-b']);
//       }
//     }
//     // this.router.navigate(['beyontec/02-a']);
//     // let hrdArray = JSON.parse(localStorage.getItem("hrddata"))
//     // console.log(hrdArray)
//     // hrdArray['']
//   }

getChangeData(){
  this.form.get('licenseNum').reset();
  document.getElementById("inputBoxlicenseNum").focus(); 
  this.form.get('dob').reset();
  this.form.get('firstName').setErrors(null);
  this.form.get('firstName').markAsPristine();
}

  numberOnly(event: any): boolean {
      const charCode = (event.which) ? event.which : event.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
          return false;
      }
      return true;
  }


  keytab(event, n, i){
    let nextInput = event.target.value
    // console.log(nextInput.length)
    if(i == 1 && nextInput.length == n){
      let inputField: HTMLElement = <HTMLElement>document.querySelector("#phone2");
      inputField.focus();
    }
    if(i == 2 && nextInput.length == n){
      let inputField1: HTMLElement = <HTMLElement>document.querySelector("#phone3");
      inputField1.focus();
    }
  }


  getServerDate(){
    this.api_common.getTocken().subscribe((dataToken: {}) => {
      let reqTocken = 
      {
        "token": dataToken['token']
      }
      this.api_common.getServerDate(reqTocken).subscribe((dataTime: {}) => {
        console.log(dataTime, 'dataTime', dataTime['date']);

        // this.maxDate1 = new Date(dataTime['date']); 
        // // this.maxDate.setDate(this.maxDate.getYear() - 3);

        // this.minDate1 = new Date(dataTime['date']); 
        // this.minDate1.setDate(this.maxDate1.getDate() - 1096);

        // console.log(this.maxDate1, 'maxDate');
        // console.log(this.minDate1, 'minDate');

        this.maxDate = moment(dataTime['date']).subtract(18, 'years').toDate();
        this.minDate = moment(dataTime['date']).subtract(100, 'years').toDate();
        // console.log(maxDate3, 'maxDate');
        // console.log(mindate3, 'minDate');


      });

    });
  }



}

