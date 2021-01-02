import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../../commons/services/dashboard/dashboard.service';
import jwt_decode from "jwt-decode";
import { BeyontecService } from '../../commons/services/beyontec/beyontec.service';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import * as moment from 'moment';
import { NgbDateStruct, NgbCalendar, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { BeyontecDashFormService } from '../dashboard-service/beyontec-dash-form.service';
import { CommonService } from '../../commons/services/common/common.service';
import { MalihuScrollbarService } from 'ngx-malihu-scrollbar';

@Component({
  selector: 'app-dashboard07-addriver',
  templateUrl: './dashboard07-addriver.component.html',
  styleUrls: ['./dashboard07-addriver.component.css', '../../commons/styles.css']
})
export class Dashboard07AddriverComponent implements OnInit {
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
  @ViewChild('dp') dp: NgbDatepicker;
  model: NgbDateStruct;
  date: { year: number, month: number };
 isReadOnlydln = false;
 isReadOnlydob = false;
  datepickerModel;
  bsValue;
  setting;
  exist: boolean = false;
  exists: boolean = false;
  decoded;
  loading: boolean = true;
  vinform: FormGroup;
  policy;
  Local_driver
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
  ];
  dropArr;
  index;
  subScription;
  changeflag : any;
  lightScrollbarOptions = { axis: 'y', theme: 'light' };
  pageArr;
  isExcledeAmended

  @ViewChild("inputBoxlicenseNum") _el: ElementRef;

  @Input() driver_details = '';
  @Input() isTexas;
  
  constructor(public routers: Router, private formBuilder: FormBuilder, private dash: DashboardService, private beyondtec: BeyontecService,private activeroute: ActivatedRoute, public BeyontecFormService: BeyontecDashFormService, public api_common: CommonService,private mScrollbarService: MalihuScrollbarService,) {
    
  }

  ngOnInit(): void {

    
    $(".cst_mCst_scroll_Desk").mCustomScrollbar({
      theme: "dark"
    });
    
    
    this.policy = JSON.parse(localStorage.getItem('policy'));
    // console.log('this.policy',this.policy.vehicles);
    this.loading = false;

    this.vinform = this.formBuilder.group({
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
      isAmended: [false],
      driver_include: [true],
      driver_from_api: [false],
    });

    this.loading = false;
  
    this.index = this.activeroute.snapshot.paramMap.get('index');

    this.isExcledeAmended = this.activeroute.snapshot.paramMap.get('add_Excluded');

    console.log(this.index)
    this.onInitPage();
    this.getServerDate();
    this.getDropDown();
  }
  
 
  getDropDown(){
   
      let dataReq = {
        "companyProductCd": "PTXNSA"
      }
      // console.log(this.zipdata);
      this.api_common.getDropdown(dataReq).subscribe((dataDrop: {}) => {
        this.dropArr = dataDrop
        console.log(this.dropArr);
      });
  
  }

  onInitPage() {

    if(this.index){
      // console.log(1111)
      if(this.BeyontecFormService.drivers_array$){
        // console.log(2222)
        this.vinform.patchValue((<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(this.index).value)
      }
      else{
        let Local_driver = JSON.parse(localStorage.getItem('beyontech_drivers'));
        this.BeyontecFormService.getDriverForm();
        this.BeyontecFormService.assignLocalToDriver(Local_driver);
        this.vinform.patchValue((<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(this.index).value)
        // console.log(3333)
      }

      if(this.vinform.get('licenseNum').value && this.vinform.get('dob').value){
        this.isReadOnlydln = true;
        this.isReadOnlydob = true;
      }else{
        this.isReadOnlydln = false;
        this.isReadOnlydob = false;
      }
      
    }else{
      if(!this.BeyontecFormService.drivers_array$){
        let Local_driver = JSON.parse(localStorage.getItem('beyontech_drivers'));
        this.BeyontecFormService.getDriverForm();
        this.BeyontecFormService.assignLocalToDriver(Local_driver);
      }
    }
    // this.Local_driver = [];
    // this.Local_driver.push(this.policy.primaryDriver);
    // this.policy.additionalDrivers.forEach(element => {
    //   this.Local_driver.push(element);
    // });

    // console.log(this.Local_driver, "this.Local_driver")
    // if (!this.BeyontecFormService.drivers_array$) {
    //   this.BeyontecFormService.getDriverForm();
    //   if (this.Local_driver != undefined || this.Local_driver != null) {
    //     this.BeyontecFormService.assignLocalToDriver(this.Local_driver);
    //   }
    // }

    // console.log(this.BeyontecFormService.drivers_array$, "BeyontecFormService")
  }

  getServerDate() {
    let req = { "tocken": "aaaa" }
    this.api_common.getServerDate(req).subscribe((dataTime: {}) => {
      console.log(dataTime, 'dataTime', dataTime['date']);

      this.maxDate = moment(dataTime['date']).subtract(18, 'years').toDate();
      this.minDate = moment(dataTime['date']).subtract(100, 'years').toDate();

    });


  }

  ngAfterViewInit() {    
    this.mScrollbarService.initScrollbar('#dark-card', { axis: 'y', theme: 'dark-thick', scrollButtons: { enable: true } });
    // if(this.BeyontecFormService.drivers_array$){
    //   this.subScription= this.BeyontecFormService.drivers_array$.valueChanges.subscribe(value => {
    //     this.BeyontecFormService.saveResponse(value.driver, "driver")
    //   });
    // }

    // this.subScription = this.vinform.valueChanges.subscribe(value => {
    //   if (this.index) {
    //     // console.log("form change detect")
    //     this.formChangeDetect();
    //     // this.changeflag = null;
    //     // this.changeflag = 
    //     // console.log(this.vinform.get('isAmended').value, "form change detect")


    //     // (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(this.index).patchValue(this.form.value);
    //     // this.BeyontecFormService.drivers_array$.updateValueAndValidity();
    //   }
    // });
}


ngOnDestroy() {
  this.mScrollbarService.destroy('#dark-card');
}





  getCancel(){
    this.routers.navigate(['/dashboard/policy-details']);
  }

  onSubmit() {
    // console.log(this.vinform.value);
    let stateLicenseVal = this.vinform.get('stateLicense').value;

    if (stateLicenseVal == 'TX') {
      

      if(this.index){
        document.getElementById("openModalButtondriverhistory").click();
        this.changeflag = 0;
        let obj1 = (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(this.index).value;
        let obj2 = this.vinform.value;
        if(Object.keys(obj1).length==Object.keys(obj2).length){
          for(let key in obj1) { 
            if(obj1[key].toString() != obj2[key].toString()) {
              this.changeflag = 1;
              break;
            }
          }
        }
        console.log(this.changeflag, "changeflag")
      }else{
        if (this.check_driver_exist()) {
          // alert('Driver already exist')
          // this.isReadOnlydln = false;
          // this.isReadOnlydob = false;
          document.getElementById("openModalDriverExist").click(); 
          return 0;
        }

        document.getElementById("openModalButtondriverhistory").click();


      }
      
    } else {

     

      document.getElementById("openModalstateError").click();
      return 0;
    }

  }

  check_driver_exist() {

    console.log("check_driver_exist");

    var exist: boolean = false;
    // console.log(this.vinform, "formaaaa")
    this.BeyontecFormService.drivers_array$.value.driver.forEach(element => {
      // console.log(element, "emlement")

      if (element.firstName == this.vinform.get('firstName').value && element.lastName == this.vinform.get('lastName').value && element.dob == this.vinform.get('dob').value) {
        // console.log(element, "element")
        exist = true;
        return 0;
      }
      

    });
    console.log(exist, "exist")
    return exist;
  }


  add_voilation() {
    console.log(this.vinform.value);
    if(this.vinform.valid){
      if (this.index) {
        (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(this.index).patchValue(this.vinform.value);

        if(this.isExcledeAmended == 1){
          console.log(111);
          (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(this.index).get('isExcluded').setValue(false);
          (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(this.index).get('driver_include').setValue(true);
          (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(this.index).get('isAmended').setValue(true);
          localStorage.setItem("includeAmended", "yes");



        }

        if(this.changeflag == 1){
          (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(this.index).get('isAmended').setValue(true);
          localStorage.setItem("includeAmended", "yes");
        }
        
        // (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(this.index).get('driver_include').setValue(true);
  
        this.BeyontecFormService.drivers_array$.updateValueAndValidity();

        localStorage.setItem("beyontech_drivers", JSON.stringify((<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).value));
        


        if(this.isExcledeAmended == 1){
          // console.log( this.driverList, " this.driverList")
          let count = 0;
          (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).value.forEach(element => {
              console.log(element)

              if(element.isAmended && element.isExcluded){
                count++;
              }
          });

          console.log(count, "count")
          
          if(count > 0){
            // this.excludeAmended = 'yes';
            localStorage.setItem("excludeAmended", "yes");
          }else{
            // this.excludeAmended = 'no';
            localStorage.removeItem("excludeAmended");
          }
        }
        this.routers.navigate(['/dashboard/policy-details/add-driver/add-violations', { index: this.index, add_driver: '0' }]);
      }
      else {
        console.log("dashboard/policy-details/add-driver/add-violations");

        this.BeyontecFormService.generateDriver();
        var len: any = ((<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).length - 1);
        (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(len).patchValue(this.vinform.value);
        (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(len).get('isAmended').setValue(true);
        localStorage.setItem("includeAmended", "yes");

        localStorage.setItem("beyontech_drivers", JSON.stringify((<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).value));

        this.routers.navigate(['dashboard/policy-details/add-driver/add-violations', { index: len, add_driver: '0' }]);
      }
    }

    
  }

  add_voilation1(){
    let val = this.driver_details
    console.log(val, "val")
    document.getElementById("openModalClosed").click(); 

    
    if(this.index){

      // if(this.changeflag == 1){
      //   this.vinform.get('isAmended').setValue(true);
      // }else{
      //   this.vinform.get('isAmended').setValue(false);
      // }

      if(val == 'yes'){
        this.add_voilation();
      }else{
        console.log(this.changeflag, "changeflag");
        console.log(this.index, "index");

        // this.vinform.get('driver_include').setValue(true);
        (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(this.index).patchValue(this.vinform.value);(<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(this.index).get('driver_include').setValue(true);

        if(this.isExcledeAmended == 1){
          console.log(111);
          (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(this.index).get('isExcluded').setValue(false);
          (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(this.index).get('driver_include').setValue(true);
          (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(this.index).get('isAmended').setValue(true);
          localStorage.setItem("includeAmended", "yes");
        }


        if(this.changeflag == 1){
          (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(this.index).get('isAmended').setValue(true);
          localStorage.setItem("includeAmended", "yes");
        }
        // 
        this.BeyontecFormService.drivers_array$.updateValueAndValidity();
        localStorage.setItem("beyontech_drivers", JSON.stringify((<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).value));


        if(this.isExcledeAmended == 1){
          // console.log( this.driverList, " this.driverList")
          let count = 0;
          (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).value.forEach(element => {
              console.log(element)

              if(element.isAmended && element.isExcluded){
                count++;
              }
          });

          console.log(count, "count")
          
          if(count > 0){
            // this.excludeAmended = 'yes';
            localStorage.setItem("excludeAmended", "yes");
          }else{
            // this.excludeAmended = 'no';
            localStorage.removeItem("excludeAmended");
          }
        }
        

        this.routers.navigate(['/dashboard/policy-details']);
      }

    }else{
      // console.log("yes else 0");

      
      // if (this.check_driver_exist()) {
      //   console.log('check_driver_exist');

      //   document.getElementById("openModalDriverExist").click();
      //   return 0;
      // }
      // else{

        console.log("yes else 1");

        if(val == 'yes'){
         
          this.add_voilation();
        }else{
            this.BeyontecFormService.generateDriver();
            var len: any = ((<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).length - 1);
            (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(len).patchValue(this.vinform.value);
            (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(len).get('isAmended').setValue(true);
              localStorage.setItem("includeAmended", "yes");
            // this.routers.navigate(['/dashboard/ammedment']);
            this.routers.navigate(['/dashboard/policy-details']);
    
            // this.policy.
            localStorage.setItem("beyontech_drivers", JSON.stringify((<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).value));
        }
  
      // }


    }

    


    
    
    
    
  }


  add_voilation2(){

    console.log((<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']));
    
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
          // this.ngOnDestroy();
          // // evt.preventDefault();
          // // evt.stopPropagation();
          // this.router.navigate(['/beyontec/03-b']);
          // this.ngOnInit();
          
          // this.form.reset();
          // this.form.get('licenseNum').clearValidators();
          // this.form.get('licenseNum').setErrors(null);
          // this.form.get('licenseNum').markAsPristine();
          // this.form.get('isdrivingLicence').setValue(false);
          // this.form.updateValueAndValidity();

          // // this.driver_details = ''
          // this.isReadOnlydln = false;
          // this.isReadOnlydob = false;
          // this.isReadOnlyFname = false;
          // this.isReadOnlymname = false;
          // this.isReadOnlylname = false;
          // this.isEnterLicenseNumber = true;
    }


  } else {
    // // this.router.navigate(['/beyontec/03-a']);
    document.getElementById("openModalmoreDriver").click();

  }
    
    
  }


  //   onSubmit(){
  //     let form = this.vinform.value;
  //     console.log('this.vinform.value',this.vinform.value);
  //     console.log('form.stateLicense',form.stateLicense,form)
  //     if(form.stateLicense == 0){
  //       this.exist = true;      
  //   }else{
  //     if(form.licenseNum == this.policy.primaryDriver.licenseNum){
  //       this.exists = true;
  //     }
  //     for(let i =0 ;i<this.policy.additionalDrivers.length;i++){
  //       console.log(this.policy.additionalDrivers[i].licenseNum);
  //       if(form.licenseNum == this.policy.additionalDrivers[i].licenseNum){
  //         this.exists = true;
  //       }
  //     }
  //     if(!this.exists){
  //       let drvr :any = [];
  //       if(localStorage.getItem('ammend_driver')){

  //           drvr.push(JSON.parse(localStorage.getItem('ammend_driver')));
  //           drvr.push(this.vinform.value);
  //           console.log(drvr);
  //           localStorage.setItem('ammend_driver',JSON.stringify(drvr));
  //       }else{
  //         localStorage.setItem('ammend_driver',JSON.stringify(this.vinform.value));
  //       }     

  //       this.routers.navigate(['/dashboard/ammedment']);
  //     }
  //   }
  // }

 
  resetViolationSelect(){
    console.log(this.isTexas, 'this.isTexas');
    this.isTexas = false;
    // this.isTexas.target.checked = false;
  }

  Violation() {

    let stateLicenseVal = this.vinform.get('stateLicense').value;

    console.log(this.isTexas, 'this.isTexas');

    if (stateLicenseVal == 'TX') {
      document.getElementById("openModalButtondriverhistory1").click(); 
    }else{
      
      document.getElementById("openModalstateError").click();
      return 0;
    }
   
    // this.routers.navigate(['/dashboard/addViolations']);
  }

  // getdate(e) {
  //   console.log(e, 'dob');
  //   if (e != null) {
  //     var currenDate = moment(e).format("MM/DD/YYYY");
  //     this.vinform.get('dob').setValue(currenDate);
  //     // document.getElementById('bsDatepickerDOB').blur();

  //   }

  // }
  hdr() {


    let form = this.vinform.value;
    if (form.dob && form.licenseNum) {
      this.isReadOnlydln = true;
      this.isReadOnlydob = true;

      this.loading = true;
      console.log('innn', form.dob);
      let dataReq = {
        "dlNo": form.licenseNum,
        "companyProductCd": "PTXNSA"
      }
      this.beyondtec.getHrd(dataReq).subscribe((vin_data: {}) => {
        console.log('vin_data', vin_data['drivers']['named'].firstName);
        if (form.dob == vin_data['drivers']['named'].dob) {
          this.vinform.controls.firstName.setValue(vin_data['drivers']['named'].firstName);
          this.vinform.controls.middleName.setValue(vin_data['drivers']['named'].middleName);
          this.vinform.controls.lastName.setValue(vin_data['drivers']['named'].lastName);
        } else {
          this.isReadOnlydln = false;
          this.isReadOnlydob = false;
          this.vinform.controls['dob'].setErrors({ 'incorrect': true });
          this.vinform.controls.dob.setValue('');
          this.vinform.controls['licenseNum'].setErrors({ 'incorrect': true });
          this.vinform.controls.licenseNum.setValue('');
        }

        this.loading = false;
      });
    }
  }
  closesocial() {
    this.exists = false;
  }
  closesocials() {
    this.exist = false;
  }

  getdate(e){
    console.log(e, 'dob');
    if(e != null){
      var currenDate = moment(e).format("MM/DD/YYYY");
      this.vinform.get('dob').setValue(currenDate);
      this.getDriverDetailbyDOB(currenDate);
    }
    
  }

  getDriverDetailbyDOB(e){
    let dlno = this.vinform.get('licenseNum').value;
    let dob = e

    if(dlno && dob){

      this.loading = true;

    
      
  
        let dataReq = {
          
          "dlNo": dlno,
          "companyProductCd" : "PTXNSA"
        }
        // console.log(this.zipdata);
        
        this.beyondtec.getHrd(dataReq).subscribe((data1: {}) => {
          if(data1){
            this.getLocalHRD(data1['drivers'])
          }
        },
        (error) => {
          this.loading = false;
          document.getElementById("openModalButtonDLDOB").click(); 
        });
     

    }
  }


  getLocalHRD(drivers){
    this.loading = false;
    let control = this.vinform;
    
    let dln = this.vinform.get('licenseNum');
    let dob = this.vinform.get('dob');

    // console.log(dln, " dln ", dob, " dob")
    this.pageArr = drivers['named'];
    // console.log(this.pageArr, " this.pageArr")

    // console.log(drivers, " drivers arr")


    if(this.pageArr.dob == dob.value && this.pageArr.dlNo == dln.value) 
    {
      control.get('firstName').setValue(this.pageArr.firstName);
      control.get('middleName').setValue(this.pageArr.middleName);
      control.get('lastName').setValue(this.pageArr.lastName);
      // this.isReadOnlyFname = true;
      // this.isReadOnlymname = true;
      // this.isReadOnlylname = true;
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
      // this.isReadOnlyFname = false;
      // this.isReadOnlymname = false;
      // this.isReadOnlylname = false;
      control.get('licenseNum').reset();
      control.get('dob').reset();
      control.get('firstName').reset();
      this._el.nativeElement.focus();
    }
    
  }



}

