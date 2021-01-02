import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { BeyontecService } from '../../../commons/services/beyontec/beyontec.service';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule, FormBuilder, Validators, FormArray } from '@angular/forms';
import { CommonService } from '../../../commons/services/common/common.service';
import { BeyontecFormService } from '../beyontec-form.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-beyontec03-b',
  templateUrl: './beyontec03-b.component.html',
  styleUrls: ['./beyontec03-b.component.css', '../../../commons/styles.css']
})
export class Beyontec03BComponent implements OnInit {

  isEnterLicenseNumber: boolean = true;
  pageArr: any = [];
  dropArr: any;
  emailError: boolean = false;
  form: FormGroup;
  isReadOnlyFname: boolean = false;
  isReadOnlymname: boolean = false;
  isReadOnlylname: boolean = false;
  isReadOnlydln: boolean = false;
  isReadOnlydob: boolean = false;
  add_driver_extra : any;
  public subScription;
  isClicked: boolean = false;
  index: any = 0;
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
  loading : boolean = false;
  @Input() driver_details = '';
  @ViewChild("inputBoxlicenseNum") _el: ElementRef;

  constructor(public router: Router, private activeroute: ActivatedRoute, public api_form: BeyontecService, private formBuilder: FormBuilder, public api_common: CommonService, public BeyontecFormService: BeyontecFormService,) {

    
    this.api_common.getTocken().subscribe((data: {}) => {
      console.log(data, 'generateToken');
      let dataReq = {
        "token": data['token'],
        "companyProductCd": "PTXNSA"
      }
      // console.log(this.zipdata);
      this.api_common.getDropdown(dataReq).subscribe((dataDrop: {}) => {
        this.dropArr = dataDrop
        console.log(this.dropArr);
      });
    });



  }

  ngOnInit(): void {
    (<any>$('[data-tooltip="tooltip"]')).tooltip();


    this.index = this.activeroute.snapshot.paramMap.get('index');
    console.log(this.index,"this.index")


    this.form = this.formBuilder.group({
      isdrivingLicence: [''],
      unit: [''],
      firstName: ['', [Validators.required, Validators.min(2)]],
      middleName: ['', [Validators.min(2)]],
      lastName: ['', [Validators.required, Validators.min(2)]],
      email: [''],
      phone1: [''],
      phone2: [''],
      phone3: [''],
      phoneNumber: [''],
      dob: ['', [Validators.required]],
      isMale: ['', [Validators.required]],
      isMarried: [null, [Validators.required]],
      relationship: [null, [Validators.required]],
      licenseType: [''],
      stateLicense: [''],
      countryLicense: [''],
      licenseNum: [''],
      sr22: [''],
      zip: [''],
      county: [''],
      yearsLicensed: [''],
      suffix: [''],
      street: [''],
      aptNumber: [''],
      city: [''],
      state: [''],
      occupation: [''],
      employer: [''],
      mobilePhone: [''],
      workPhone: [''],
      isAnytickets: [''],
      violationsArray: this.formBuilder.array([]),
      isPrimaryDriver: [true],
      isExcluded: [''],
      driver_include: [true],
      driver_from_api: [false],
    });

// || this.index != undefined || this.index != ''
    this.bindData();    
    this.getConditionalValidation();
    this.getServerDate()
  }

  getdate(e){
    console.log(e, 'dob');
    if(e != null){
      var currenDate = moment(e).format("MM/DD/YYYY");
      this.form.get('dob').setValue(currenDate);
      this.getDriverDetailbyDOB(currenDate);
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

        this.maxDate = moment(dataTime['date']).subtract(18, 'years').toDate();
        this.minDate = moment(dataTime['date']).subtract(100, 'years').toDate();
       
      });

    });
  }

  bindData(){
    if (this.index) {
      this.form.get('isdrivingLicence').setValue(false);

      if(this.BeyontecFormService.drivers_array$){
        this.form.patchValue((<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(this.index).value)
        // if(this.form.get('isdrivingLicence').value){
        //   this.isEnterLicenseNumber = false;
        // }

        // console.log(this.form.get('licenseNum').value, " this.form.get('licenseNum').value 111111111111111111")
       
        if(!this.form.get('licenseNum').value){
          // console.log(this.form.get('driver_from_api').value, 'driver_from_api')
          if(!this.form.get('driver_from_api').value){
            this.form.get('isdrivingLicence').setValue(true);
            this.isEnterLicenseNumber = false;
            this.isReadOnlydln = false;
          }else{
            this.form.get('isdrivingLicence').setValue(false);
            this.isEnterLicenseNumber = true;
            this.isReadOnlydln = false;
          }
            
            this.form.updateValueAndValidity();
        }else{
            this.form.get('isdrivingLicence').setValue(false);
            this.isEnterLicenseNumber = true;
            this.isReadOnlydln = false;
            this.form.updateValueAndValidity();
        }
        

        // this.isReadOnlydob = true;
        // this.isReadOnlyFname = true;
        // this.isReadOnlymname = true;
        // this.isReadOnlylname = true;

        if(this.form.get('licenseNum').value && this.form.get('dob').value){
          this.isReadOnlydob = true;
        }else{
          this.isReadOnlydob = false;
        }

        if(this.form.get('licenseNum').value && this.form.get('dob').value){
          this.isReadOnlyFname = true;
        }else{
          this.isReadOnlyFname = false;
        }

        if(this.form.get('licenseNum').value && this.form.get('dob').value){
          this.isReadOnlymname = true;
        }else{
          this.isReadOnlymname = false;
        }

        if(this.form.get('licenseNum').value && this.form.get('dob').value){
          this.isReadOnlylname = true;
        }else{
          this.isReadOnlylname = false;
        }

      }else{
        // console.log(11111)
        let Local_driver = JSON.parse(localStorage.getItem('beyontech_drivers'));
        this.BeyontecFormService.getDriverForm();

        // console.log(this.form.get('licenseNum').value, " this.form.get('licenseNum').value 22222222222222")


        if(Local_driver != undefined || Local_driver != null){
          this.BeyontecFormService.assignLocalToDriver(Local_driver);
          this.form.patchValue((<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(this.index).value)

          // if(this.form.get('isdrivingLicence').value){
          //   this.isEnterLicenseNumber = false;
          // }

          if(!this.form.get('licenseNum').value){
            this.form.get('isdrivingLicence').setValue(true);
            this.isEnterLicenseNumber = false;
            this.isReadOnlydln = false;
            this.form.updateValueAndValidity();
        }else{
            this.form.get('isdrivingLicence').setValue(false);
            this.isEnterLicenseNumber = true;
            this.isReadOnlydln = true;
            this.form.updateValueAndValidity();
        }
        

        // this.isReadOnlydob = true;
        // this.isReadOnlyFname = true;
        // this.isReadOnlymname = true;
        // this.isReadOnlylname = true;
        if(this.form.get('licenseNum').value && this.form.get('dob').value){
          this.isReadOnlydob = true;
        }else{
          this.isReadOnlydob = false;
        }

        if(this.form.get('licenseNum').value && this.form.get('dob').value){
          this.isReadOnlyFname = true;
        }else{
          this.isReadOnlyFname = false;
        }

        if(this.form.get('licenseNum').value && this.form.get('dob').value){
          this.isReadOnlymname = true;
        }else{
          this.isReadOnlymname = false;
        }

        if(this.form.get('licenseNum').value && this.form.get('dob').value){
          this.isReadOnlylname = true;
        }else{
          this.isReadOnlylname = false;
        }
        }

        
      }
      
    }else{
      console.log(111)
      this.isEnterLicenseNumber = true;
      this.form.get('isdrivingLicence').setValue(false);
      // this.form.updateValueAndValidity();
    }
  }


  ngAfterViewInit() {

    if(this.BeyontecFormService.drivers_array$){
      this.subScription= this.BeyontecFormService.drivers_array$.valueChanges.subscribe(value => {
        this.BeyontecFormService.saveResponse(value.driver, "driver")
      });
    }

    this.subScription = this.form.valueChanges.subscribe(value => {
      if (this.index) {
        (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(this.index).patchValue(this.form.value);
        this.BeyontecFormService.drivers_array$.updateValueAndValidity();
      }
    });
}

ngOnDestroy() {
  this.subScription.unsubscribe()
}

  getConditionalValidation() {
    this.form.get('isdrivingLicence').valueChanges
      .subscribe(value => {
        // console.log(value);
        if (value) {
          this.form.get('licenseNum').clearValidators();
          
        } else {
          this.form.get('licenseNum').setValidators(Validators.required);
          this.isEnterLicenseNumber = false;
          // this.isReadOnlydob = false;
          // this.isReadOnlyFname = true;
          // this.isReadOnlymname = true;
          // this.isReadOnlylname = true;
        }
        this.form.updateValueAndValidity();
      }
      );
  }

  handleSelectedContinue(event) {
    if (event.target.checked === true) {
      document.getElementById("openModalButtonProceed").click();
    } else {
      this.isEnterLicenseNumber = true;
    }
  }

        
  
  getProceed(val) {
    if (val) {
      this.isEnterLicenseNumber = false;
      this.form.get('licenseNum').clearValidators();
      this.form.get('licenseNum').setErrors(null);
      this.form.get('licenseNum').markAsPristine();
      this.form.updateValueAndValidity();
    } else {
      this.form.get('isdrivingLicence').setValue(false);
    }
  }


  getDriverDetailbyDL(e){
    let dlno = e.target.value
    let dob = this.form.get('dob').value;

    if(!this.form.get('isdrivingLicence').value &&  this.form.get('licenseNum').value == ''){
      this.form.get('licenseNum').setErrors({ required: true });
    }else{
      this.form.get('licenseNum').clearValidators();
      this.form.get('licenseNum').setErrors(null);
      this.form.get('licenseNum').markAsPristine();
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

  

  getDriverDetailbyDOB(e){
    let dlno = this.form.get('licenseNum').value;
    let dob = e

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
    let control = this.form;
    
    let dln = this.form.get('licenseNum');
    let dob = this.form.get('dob');

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


  add_voilation() {

    console.log(this.form.valid)
    if(this.form.valid){
      if (this.index) {
        (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(this.index).patchValue(this.form.value);
        (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(this.index).get('driver_include').setValue(true);
  
        this.BeyontecFormService.drivers_array$.updateValueAndValidity();
        this.router.navigate(['beyontec/voilation-detail', { index: this.index, add_driver: '0' }]);
      }
      else {
        this.BeyontecFormService.generateDriver();
        var len: any = ((<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).length - 1);
        (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(len).patchValue(this.form.value);
        this.router.navigate(['beyontec/voilation-detail', { index: len, add_driver: '0' }]);
      }
    }
    
  }


  add_voilation1(){
    let val = this.driver_details
    // console.log(this.driver_details)
    document.getElementById("openModalClosed").click(); 
    if(val == 'yes'){
      this.add_voilation();
    }else{

      if (this.index) {
        (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(this.index).patchValue(this.form.value);
        (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(this.index).get('driver_include').setValue(true);
        this.BeyontecFormService.drivers_array$.updateValueAndValidity();
        // this.router.navigate(['beyontec/voilation-detail', { index: this.index, add_driver: '0' }]);
      }
      else {
        this.BeyontecFormService.generateDriver();
        var len: any = ((<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).length - 1);
        (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(len).patchValue(this.form.value);
        // this.router.navigate(['beyontec/voilation-detail', { index: len, add_driver: '0' }]);
      }

      // this.BeyontecFormService.generateDriver();
      // var len: any = ((<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).length - 1);
      // (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(len).patchValue(this.form.value);
      // (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(len).get('driver_include').setValue(true);
      // this.BeyontecFormService.drivers_array$.updateValueAndValidity();
      // console.log(this.BeyontecFormService.drivers_array$.value.driver, "val main");
      this.router.navigate(['/beyontec/03-a']);
    }
    
    
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

  onSubmit(formval) {
    let stateLicenseVal = this.form.get('stateLicense').value;
    if(this.index == 0){
      this.form.get('stateLicense').setValue('TX');
    }
    if (stateLicenseVal == 'TX') {


      if (this.index) {
        
        (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(this.index).patchValue(this.form.value);
        (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(this.index).get('driver_include').setValue(true);

        this.BeyontecFormService.drivers_array$.updateValueAndValidity();
        document.getElementById("openModalButtondriverhistory").click(); 
        // this.router.navigate(['/beyontec/03-a']);
        return 0;
      }

      else {
        // console.log(this.check_driver_exist(), "this.check_driver_exist()")
        if (this.check_driver_exist()) {
          // alert('Driver already exist')
          document.getElementById("openModalDriverExist").click(); 

          return 0;
        }

        // this.BeyontecFormService.generateDriver();
        // var len: any = ((<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).length - 1);
        // (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(len).patchValue(this.form.value);
        // (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(len).get('driver_include').setValue(true);
        // this.BeyontecFormService.drivers_array$.updateValueAndValidity();
        // console.log(this.BeyontecFormService.drivers_array$.value.driver, "val main");
        
        document.getElementById("openModalButtondriverhistory").click(); 

        // this.router.navigate(['/beyontec/03-a']);
      }
    } else {
      // console.log(1111)
      document.getElementById("openModalstateError").click(); 
    }


  }

  check_driver_exist() {

    var exist: boolean = false;
    console.log(this.form, "formaaaa")
    this.BeyontecFormService.drivers_array$.value.driver.forEach(element => {
      console.log(element, "emlement")
      // if(element.firstName==this.form.get('firstName').value &&  element.dob==this.form.get('dob').value &&
      // element.middleName==this.form.get('middleName').value && element.lastName==this.form.get('lastName').value)
      if (element.firstName == this.form.get('firstName').value && element.lastName == this.form.get('lastName').value && element.dob==this.form.get('dob').value) {
        console.log(element, "element")
        exist = true;
        return 0;
      }

    });
    return exist;
  }

  eventAddDriver(evt){

    // console.log(this.add_driver_extra, "add_driver_extra")
    // console.log(this.form.valid, "this.form.valid")

    if(this.form.valid){
      let stateLicenseVal = this.form.get('stateLicense').value;
      if (stateLicenseVal == 'TX') {
        if (this.index) {
          (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(this.index).patchValue(this.form.value);
          (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(this.index).get('driver_include').setValue(true);

          this.BeyontecFormService.drivers_array$.updateValueAndValidity();
          document.getElementById("openModalButtondriverhistory1").click(); 

        }
        else{
          // console.log(this.check_driver_exist(), "this.check_driver_exist()")
          if (this.check_driver_exist()) {
            alert('Driver already exist')
            return 0;
          }

          this.BeyontecFormService.generateDriver();
          var len: any = ((<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).length - 1);
          (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(len).patchValue(this.form.value);
          (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(len).get('driver_include').setValue(true);
          this.BeyontecFormService.drivers_array$.updateValueAndValidity();
          console.log(this.BeyontecFormService.drivers_array$.value.driver, "val main");
          
          document.getElementById("openModalButtondriverhistory1").click(); 

        }
      }
      else{
        this.add_driver_extra = false;
        document.getElementById("openModalstateError").click(); 
      }
    }
  }

  gotoListDriver(){
    this.router.navigate(['/beyontec/03-a']);
  }

  add_voilation2(){

    const control = (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']);
    let count = 0;
    control.value.forEach(element => {
      // console.log(element, "add_new_Vehicle element")
      // console.log(element.include, "add_new_Vehicle element include")
      if (element.driver_include) {
        count++;
      }
      // console.log(count, "include count")
      // 
    });


    if (count < 5) {



    let val = this.driver_details
    // console.log(this.driver_details)
    document.getElementById("openModalClosed").click(); 

    if(val == 'yes'){
      this.add_voilation();
    }
    else{
          this.ngOnDestroy();
          // evt.preventDefault();
          // evt.stopPropagation();
          this.router.navigate(['/beyontec/03-b']);
          this.ngOnInit();
          
          this.form.reset();
          this.form.get('licenseNum').clearValidators();
          this.form.get('licenseNum').setErrors(null);
          this.form.get('licenseNum').markAsPristine();
          this.form.get('isdrivingLicence').setValue(false);
          this.form.updateValueAndValidity();

          // this.driver_details = ''
          this.isReadOnlydln = false;
          this.isReadOnlydob = false;
          this.isReadOnlyFname = false;
          this.isReadOnlymname = false;
          this.isReadOnlylname = false;
          this.isEnterLicenseNumber = true;
        
      // this.ngOnInit();
      // this.form.reset();
      // this.router.navigate(['/beyontec/03-b']);
      // 
      // this.form.reset();
      // this.ngOnInit();
    }


  } else {
    // this.router.navigate(['/beyontec/03-a']);
    document.getElementById("openModalmoreDriver").click();

  }
    
    
  }

  cancelBack(){
    this.router.navigate(['/beyontec/03-a']);
  }

}
