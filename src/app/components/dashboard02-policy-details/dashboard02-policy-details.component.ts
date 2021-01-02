import { AfterViewChecked, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { SubjectCallService } from '../../commons/services/subject-call/subject-call.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DashboardService } from '../../commons/services/dashboard/dashboard.service';
import { BeyontecDashFormService } from '../dashboard-service/beyontec-dash-form.service';
import { FormArray, FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { CommonService } from '../../commons/services/common/common.service';
import { BeyontecService } from '../../commons/services/beyontec/beyontec.service';

@Component({
  selector: 'app-dashboard02-policy-details',
  templateUrl: './dashboard02-policy-details.component.html',
  styleUrls: ['./dashboard02-policy-details.component.css', '../../commons/styles.css']
})
export class Dashboard02PolicyDetailsComponent implements OnInit {
  loading: boolean = false;
  policyNo;
  policy;
  productInfoListone;
  oneinc: any = [];
  source;
  oneinc1 = [];
  vehicleList;
  driverList;
  PolicyStatus
  policySelected: any;
  excludeAmended;
  includeAmended;
  amendedVehicle;
  exclude_driver_form: FormGroup;
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
  excludeEditIndex
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
  isVehicleDelete: boolean = false;

  selectedIndex
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
  include_count: number = 0;
  exclude_count: number = 0;
  selectedDriverName;
  isdisabledcontrol
  @Input() manuallyAdd;
  form_include: FormGroup;
  form: FormGroup;
  form_include_spouce: FormGroup;
  all_count;
  excludeonpolicy: boolean = false;
  isReadOnlydln
  documentslist;
  isReadOnlydob
  isReadOnlyFname
  isReadOnlymname
  isReadOnlylname
  pageArr
  @ViewChild("inputBoxlicenseNum") _el: ElementRef;
  selectedIndexDriver

  constructor(public router: ActivatedRoute, public routers: Router, public api_sub: SubjectCallService, public dash: DashboardService, public BeyontecFormService: BeyontecDashFormService, private fb: FormBuilder, public api_common: CommonService, public api_form: BeyontecService,) { }

  ngOnInit(): void {
    // jQuery(function($) {

    $(".cst_mCst_scroll_Desk").mCustomScrollbar({
      theme: "dark"
    });

    

    
    // });

    this.includeForm();
    this.formGenerate();

    this.policy = []
    this.policyNo = localStorage.getItem('policyNumber');
    if (localStorage.getItem('policyDetailList') != undefined || localStorage.getItem('policyDetailList') != null) {
      this.policy = JSON.parse(localStorage.getItem('policyDetailList'));
      this.documentsList();
    }

    if (localStorage.getItem('policyDetailList') != undefined || localStorage.getItem('policyDetailList') != null) {
      this.policySelected = JSON.parse(localStorage.getItem('policyDetailList'));
      console.log("policySelected", this.policySelected);

      // console.log(this.policySelected, "policyDetailList")
      this.PolicyStatus = this.policySelected['status'];
      console.log("PolicyStatus", this.PolicyStatus);

      this.setPolicy();
    }

    this.generateExcludeDriver();


    var maxHeight = 0;
    $('.lgBx_minhgt').each(function () {
      console.log($(this).innerHeight(), 'innerHeight')

      maxHeight = Math.max(maxHeight, $(this).innerHeight() - ($(this).innerHeight() / 1.7));
    });
    console.log(maxHeight, 'maxHeight')
    $('.lgBx_minhgt').css({ height: maxHeight + 'px' });

    // $(document).ready(function(){
    //   $.getScript('./assets/js/sitescripts.js');
    // });
    this.amendCountVehicle();

  }
  documentsList() {
    let docreq = {
      "policyNo": this.policy.policyNumber
    };
    this.dash.documentListstable(docreq).subscribe((datanew: {}) => {
      console.log('datanew', datanew);
      if (datanew['message'] == 'SUCCESS') {
        this.documentslist = datanew;

        console.log('this.documentslist', this.documentslist.esignStatus);
        this.loading = false;
      } else {
        this.loading = false;
      }
    });
  }
  formGenerate() {
    this.form = this.fb.group({
      isdrivingLicence: [''],
      unit: [''],
      firstName: ['', [Validators.required, Validators.min(2)]],
      middleName: ['', [Validators.min(1)]],
      lastName: ['', [Validators.required, Validators.min(2)]],
      email: [''],
      phone1: [''],
      phone2: [''],
      phone3: [''],
      phoneNumber: [''],
      dob: ['', [Validators.required]],
      isMale: [''],
      isMarried: [''],
      relationship: ['', [Validators.required]],
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
      violationsArray: this.fb.array([]),
      isPrimaryDriver: [false],
      isExcluded: [true],
      isAmended: [true],
      driver_include: [false],
      driver_from_api: [false],
    });
    // this.form.patchValue((<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(index).value)
  }


  amendCountVehicle() {
    let count = 0;
    console.log(this.vehicleList)
    this.vehicleList.forEach(element => {
      console.log(element)

      if (!element.isAmended || element.isAmended == 'no') {
        count++;
      }
    });

    if (count > 1) {
      this.isVehicleDelete = false;
    } else {
      this.isVehicleDelete = true;
    }
  }


  includeForm() {
    this.form_include = this.fb.group({
      isdrivingLicence: [''],
      unit: [''],
      firstName: ['', [Validators.required, Validators.min(2)]],
      middleName: [''],
      lastName: ['', [Validators.required, Validators.min(2)]],
      email: [''],
      phone1: [''],
      phone2: [''],
      phone3: [''],
      phoneNumber: [''],
      dob: ['', [Validators.required]],
      isMale: ['', [Validators.required]],
      isMarried: ['M'],
      relationship: ['S'],
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
      violationsArray: this.fb.array([]),
      isPrimaryDriver: [false],
      isExcluded: [true],
      isAmended: [true],
      driver_include: [false],
      driver_from_api: [false],
    });

  }



  includeFormSpouse() {
    this.form_include_spouce = this.fb.group({
      isdrivingLicence: [''],
      unit: [''],
      firstName: ['', [Validators.required, Validators.min(2)]],
      middleName: [''],
      lastName: ['', [Validators.required, Validators.min(2)]],
      email: [''],
      phone1: [''],
      phone2: [''],
      phone3: [''],
      phoneNumber: [''],
      dob: ['', [Validators.required]],
      isMale: ['', [Validators.required]],
      isMarried: ['M'],
      relationship: ['S'],
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
      violationsArray: this.fb.array([]),
      isPrimaryDriver: [false],
      isExcluded: [true],
      isAmended: [true],
      driver_include: [false],
      driver_from_api: [false],
    });

  }

  public ngDoCheck(): void {

    // var maxHeight = 0;
    // $('.lgBx_minhgt').each(function() {
    //     console.log($(this).innerHeight(), 'innerHeight')

    //     maxHeight = Math.max(maxHeight, $(this).innerHeight() - ($(this).innerHeight() / 2.5));
    // });
    // console.log(maxHeight, 'maxHeight')
    // $('.lgBx_minhgt').css({height:maxHeight + 'px'});

  }

  ngAfterViewInit() {

    // $('.mCustomScrollbar1').on( 'mousewheel DOMMouseScroll', function (e) { 
      

    //   console.log(11111);
    //   event.preventDefault();
    //   // var e0 = e.originalEvent;
    //   // var delta = e0.wheelDelta || -e0.detail;
    
    //   // this.scrollTop += ( delta < 0 ? 1 : -1 ) * 30;
    //   // e.preventDefault();  
    // });


    // $(".lgBx_minhgt").load(function() {
    //     alert('started');
    // });

    // $(".lgBx_minhgt").load('', function() {
    //       // alert("window load occurred!");

    //       var maxHeight = 0;
    //       $('.lgBx_minhgt').each(function() {
    //           console.log($(this).innerHeight(), 'innerHeight')

    //           maxHeight = Math.max(maxHeight, $(this).innerHeight() - ($(this).innerHeight() / 1.7));
    //       });
    //       console.log(maxHeight, 'maxHeight')
    //       $('.lgBx_minhgt').css({height:maxHeight + 'px'});


    // });
    // $(".lgBx_minhgt").equalHeights()

    // if(this.driverList && this.vehicleList){
    //   var maxHeight = 0;
    //   $('.lgBx_minhgt').each(function() {
    //       console.log($(this).innerHeight(), 'innerHeight')

    //       maxHeight = Math.max(maxHeight, $(this).innerHeight() - ($(this).innerHeight() / 1.7));
    //   });
    //   console.log(maxHeight, 'maxHeight')
    //   $('.lgBx_minhgt').css({height:maxHeight + 'px'});
    // }else{
    //   var maxHeight = 0;
    //   $('.lgBx_minhgt').each(function() {
    //       console.log($(this).innerHeight(), 'innerHeight')

    //       maxHeight = Math.max(maxHeight, $(this).innerHeight());
    //   });
    //   console.log(maxHeight, 'maxHeight')
    //   $('.lgBx_minhgt').css({height:maxHeight + 'px'});
    // }


    // let parent = document.querySelector<HTMLElement>(".eq_polict");

    // const children = parent.getElementsByClassName('lgBx_minhgt');

    // Array.from(children).forEach((x: HTMLElement) => {
    //   x.style.height = 'initial';
    // })

    // const itemHeights = Array.from(children)
    // .map(x => x.getBoundingClientRect().height);

    // const maxHeight = itemHeights.reduce((prev, curr) => {
    //     return curr > prev ? curr : prev;
    // }, 0);

    // console.log(maxHeight, 'maxHeight')

    // // apply max height
    // Array.from(children)
    //     .forEach((x: HTMLElement) => x.style.height = `${maxHeight}px`);

    // const itemHeights = Array.from(children).map(x => x.getBoundingClientRect().height);

    // var heights = $(".lgBx_minhgt").map(function ()
    // {
    //     return $(this).height();
    // }).get();

    // let maxHeight = Math.max.apply(null, heights);

    // console.log(heights, " lgBx_minhgt clientHeight")

    // console.log(maxHeight, " lgBx_minhgt clientHeight")
    // $.getScript('src/assets/js/sitescripts.js');
  }

  generateExcludeDriver() {
    this.exclude_driver_form = this.fb.group({
      isdrivingLicence: [false],
      unit: [''],
      firstName: ['', [Validators.required, Validators.min(2)]],
      middleName: [''],
      lastName: ['', [Validators.required, Validators.min(2)]],
      email: [''],
      phone1: [''],
      phone2: [''],
      phone3: [''],
      phoneNumber: [''],
      dob: ['', [Validators.required]],
      isMale: [''],
      isMarried: [''],
      relationship: [''],
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
      violationsArray: this.fb.array([]),
      isPrimaryDriver: [false],
      isExcluded: [true],
      isAmended: [true],
      driver_include: [false],
      driver_from_api: [false],
    });
  }

  exclude_driver_clear() {
    // this.driver_array_popup.setValue('');
  }


  exclude_driver_submit() {
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

    (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(len).get('isAmended').setValue(true);
    this.excludeAmended = 'yes';
    localStorage.setItem("excludeAmended", "yes");
    // (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(i).get('isExcluded').setValue(true);
    // (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(i).get('driver_include').setValue(false);

    this.getDriverCount();
    this.BeyontecFormService.drivers_array$.updateValueAndValidity();

    this.driverList = (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']);

    localStorage.setItem("beyontech_drivers", JSON.stringify(this.BeyontecFormService.drivers_array$.value.driver));

    this.exclude_driver_form.reset();
    // this.driver_array_popup.setValue('');
    this.driverList = (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).value;
    document.getElementById('cancel_popup').click()
    console.log(this.BeyontecFormService.drivers_array$.value.driver, "driver main");

  }


  getDriverCount() {
    console.log(this.BeyontecFormService.drivers_array$.value, "foreach");
    this.BeyontecFormService.drivers_array$.value.driver.forEach(element => {
      if (element.driver_include) {
        this.include_count++;
      }
      else {
        this.exclude_count++;
      }
      return 0;
    });
    console.log(this.include_count, "include_count", this.exclude_count, "exclude_count")
  }


  getDriverCount1() {
    this.include_count = 0;
    this.exclude_count = 0;
    this.all_count = 0;

    let hrddata = JSON.parse(localStorage.getItem('policyDetailList'));
    this.all_count = hrddata['additionalDrivers'].length;
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


  getdate(e, ctrl) {
    console.log(e, 'dob', ctrl);
    if (e != null) {
      var currenDate = moment(e).format("MM/DD/YYYY");
      console.log(currenDate, 'currenDate')
      this.exclude_driver_form.get(ctrl).setValue(currenDate);
    }

  }



  getDriverDetailbyDOB(e) {
    let dlno = this.form_include.get('licenseNum').value;
    let dob = e.target.value

    if (dlno && dob) {

      this.loading = true;

      this.api_common.getTocken().subscribe((data: {}) => {
        console.log(data, 'generateToken');

        let dataReq = {
          "token": data['token'],
          "dlNo": dlno,
          "companyProductCd": "PTXNSA"
        }
        // console.log(this.zipdata);

        this.api_form.getHrd(dataReq).subscribe((data1: {}) => {
          if (data1) {
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


  getDriverDetailbyDL(e) {
    let dlno = e.target.value
    let dob = this.form_include.get('dob').value;

    if (!this.form_include.get('isdrivingLicence').value && this.form_include.get('licenseNum').value == '') {
      this.form_include.get('licenseNum').setErrors({ required: true });
    } else {
      this.form_include.get('licenseNum').clearValidators();
      this.form_include.get('licenseNum').setErrors(null);
      this.form_include.get('licenseNum').markAsPristine();
    }


    if (dlno && dob) {

      this.loading = true;

      this.api_common.getTocken().subscribe((data: {}) => {
        console.log(data, 'generateToken');

        let dataReq = {
          "token": data['token'],
          "dlNo": dlno,
          "companyProductCd": "PTXNSA"
        }
        // console.log(this.zipdata);

        this.api_form.getHrd(dataReq).subscribe((data1: {}) => {
          if (data1) {
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



  getLocalHRD(drivers) {
    this.loading = false;
    let control = this.form_include;

    let dln = this.form_include.get('licenseNum');
    let dob = this.form_include.get('dob');

    // console.log(dln, " dln ", dob, " dob")
    this.pageArr = drivers['named'];
    // console.log(this.pageArr, " this.pageArr")

    // console.log(drivers, " drivers arr")

    if (this.pageArr.dob == dob.value && this.pageArr.dlNo == dln.value) {
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
    else {
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


  handleSelectedContinue(e) {
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


  getServerDate() {
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

  setPolicy() {
    if (localStorage.getItem("beyontech_drivers") != undefined || localStorage.getItem("beyontech_drivers") != null || localStorage.getItem("beyontech_vehicles") != undefined || localStorage.getItem("beyontech_vehicles") != null) {

      let dl = JSON.parse(localStorage.getItem("beyontech_drivers"));
      let vl = JSON.parse(localStorage.getItem("beyontech_vehicles"));


      this.includeAmended = localStorage.getItem("includeAmended");
      this.excludeAmended = localStorage.getItem("excludeAmended");
      this.amendedVehicle = localStorage.getItem('amendedVehicle');

      // this.amendedVehicle = this.policySelected['status']

      if (!this.BeyontecFormService.drivers_array$) {
        console.log(1111);
        this.BeyontecFormService.getDriverForm();
        this.BeyontecFormService.assignLocalToDriver(dl);
      } else {
        console.log(2222);
        // this.BeyontecFormService.assignLocalToDriver(dl);
      }

      if (!this.BeyontecFormService.vehicles_array$) {
        console.log(3333)
        this.BeyontecFormService.getVehicleForm();
        this.BeyontecFormService.assignVehiclereplica1(vl);
      }
      else {
        console.log(4444)
        // this.BeyontecFormService.assignVehiclereplica1(vl);
      }

      this.vehicleList = vl;
      this.driverList = dl;

      // $.getScript('assets/js/sitescripts.js');
    }


  }



  onlanguageChange(newValue) {
    // console.log(newValue, "new language");

    this.api_sub.sendMessage(1);
  }

  getdateSpouse(e) {
    if (e != null) {
      var currenDate = moment(e).format("MM/DD/YYYY");
      this.form_include.get('dob').setValue(currenDate);
    }
  }

  getSubmitRequote() {
    let spouse = 0;
    let married = 0;
    let arrayMarried: any = [];

    let drivers = JSON.parse(localStorage.getItem("beyontech_drivers"));
    console.log(drivers, 'drivers');

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

      ii++;
    }

    if (married != spouse) {

      let d = drivers[arrayMarried[spouse]];

      console.log(d, 'arrayMarried');


      if (arrayMarried[spouse] == 0) {
        this.selectedDriverName = '';
      } else {
        this.selectedDriverName = d.firstName + " " + d.middleName + " " + d.lastName;
      }

      console.log(this.selectedDriverName, "selectedDriverName");

      this.getDriverCount1();
      this.isDisabledInclude()
      this.includeFormSpouse()
      document.getElementById('openModalAddSpouse').click();

    } else {

      this.getFullQuote();
    }

  }

  isDisabledInclude() {
    let a = this.include_count >= 4 ? true : false;
    console.log(a)
    if (a) {
      this.isdisabledcontrol = a;
      // this.form_include.controls['driver_include'].disable();
    }
  }

  onSubmitSpouse(val) {
    console.log(val);
    // console.log(this.check_driver_exist_include());
    console.log(11111111)
    if (this.check_driver_exist_include()) {
      document.getElementById("btnClose").click();
      document.getElementById("openModalDriverExist").click();
      this.form_include_spouce.reset();
      this.form_include_spouce.get('driver_include').setValue(false);
      this.form_include_spouce.get('isMarried').setValue("M");
      this.form_include_spouce.get('relationship').setValue("S");
      this.form_include_spouce.get('isExcluded').setValue(true);
      this.form_include_spouce.get('isAmended').setValue(true);
      // alert('Driver already exist')
      return 0;
    }

    this.form_include_spouce.get('stateLicense').value;
    // console.log(this.exclude_driver_form.value)
    if (this.form_include_spouce.get('stateLicense').value != 'TX' && this.form_include_spouce.get('driver_include').value == true) {
      document.getElementById('btnClose').click()
      document.getElementById("openModalstateError").click();
      return 0;
    }
    this.form_include_spouce.get('isAmended').setValue(true);
    localStorage.setItem("includeAmended", "yes");
    this.BeyontecFormService.generateDriver();
    var len: any = ((<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).length - 1);
    console.log(len, "len");
    (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(len).patchValue(this.form_include_spouce.value);

    this.getDriverCount();
    this.BeyontecFormService.drivers_array$.updateValueAndValidity();

    this.driverList = this.BeyontecFormService.drivers_array$.value.driver;

    localStorage.setItem("beyontech_drivers", JSON.stringify(this.BeyontecFormService.drivers_array$.value.driver));

    this.form_include_spouce.reset();
    this.form_include_spouce.get('driver_include').setValue(false);
    this.form_include_spouce.get('isMarried').setValue("M");
    this.form_include_spouce.get('relationship').setValue("S");
    this.form_include_spouce.get('isExcluded').setValue(true);
    this.form_include_spouce.get('isAmended').setValue(true);
    // this.driver_array_popup.setValue('');

    document.getElementById('btnClose').click()



    console.log(this.BeyontecFormService.drivers_array$.value.driver, "driver main");

  }


  // editCoverages(){
  //   this.routers.navigate['dashboard/policy-details/edit-coverage']
  // }

  getIncludeSpousePopup() {
    this.getDriverCount();
    document.getElementById('openModalAddSpouse').click();
  }

  check_driver_exist_include() {

    var exist: boolean = false;
    // console.log(this.form_include, "formaaaa")
    this.BeyontecFormService.drivers_array$.value.driver.forEach(element => {
      // console.log(element, "emlement")
      if (element.firstName.toLowerCase() == this.form_include_spouce.get('firstName').value.toLowerCase() && element.lastName.toLowerCase() == this.form_include_spouce.get('lastName').value.toLowerCase() && element.dob == this.form_include_spouce.get('dob').value) {
        console.log(element, "element")
        exist = true;
        return 0;
      }

    });
    return exist;
  }

  addSelected(i) {
    console.log(i, "index");
    const control = (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']);
    control.at(i).get('isMarried').setValue('M');
    control.at(i).get('relationship').setValue('S');
    control.at(i).get('isExcluded').setValue(true);
    control.at(i).get('isAmended').setValue(true);

    localStorage.setItem("beyontech_drivers", JSON.stringify(this.BeyontecFormService.drivers_array$.value.driver));
    this.driverList = this.BeyontecFormService.drivers_array$.value.driver;
    this.form.reset();
    document.getElementById('btnClose').click()

    // this.form.patchValue(control.at(i).value)
    // this.form.get('isMarried').setValue('M');
    // this.form.get('relationship').setValue('S');
    // console.log(this.form.value, "after")

  }

  getFullQuote() {

  }

  addVehicle() {
    this.vehicleList = (<FormArray>this.BeyontecFormService.vehicles_array$.controls['vehicle']).value;
    let count = 0;
    // console.log(this.vehicleList)
    this.vehicleList.forEach(element => {
      // console.log(element)

      if (element.include) {
        count++;
      }
    });

    console.log(count);

    if (count >= 4) {
      console.log(1111)
      document.getElementById("openModalVehicleError").click();
    } else {
      this.routers.navigate(['/dashboard/policy-details/add-vehicle']);
    }

  }

  editVehicle(i) {
    console.log(i);
    this.routers.navigate(['/dashboard/policy-details/add-vehicle', { index: i }]);
    // this.router.navigate(['policy-details/add-driver']);
  }

  editVehicleAmended(i) {
    console.log(i);
    // localStorage.setItem('amended-vehicle-change',"yes")
    this.routers.navigate(['/dashboard/policy-details/add-vehicle', { index: i }]);
  }


  deleteVehicle(i) {

    let count = 0;
    console.log(this.vehicleList)
    this.vehicleList = (<FormArray>this.BeyontecFormService.vehicles_array$.controls['vehicle']).value;
    this.vehicleList.forEach(element => {
      console.log(element)

      if (!element.isAmended || element.isAmended == 'no') {
        count++;
      }
    });

    // console.log((<FormArray>this.BeyontecFormService.vehicles_array$.controls['vehicle']).length)
    // console.log(i);

    // var len: any = ((<FormArray>this.BeyontecFormService.vehicles_array$.controls['vehicle']).length);
    console.log(count);

    this.selectedIndex = null;

    if (count > 1) {
      this.selectedIndex = i;
      document.getElementById("openModalVehicleDelete").click();
      return 0;
    }

    // 
  }


  deleteVehicleConfirm(i) {

    (<FormArray>this.BeyontecFormService.vehicles_array$.controls['vehicle']).at(i).get('include').setValue(false);
    (<FormArray>this.BeyontecFormService.vehicles_array$.controls['vehicle']).at(i).get('isAmended').setValue(true);
    this.BeyontecFormService.vehicles_array$.updateValueAndValidity();
    this.vehicleList = (<FormArray>this.BeyontecFormService.vehicles_array$.controls['vehicle']).value;
    this.amendedVehicle = 'yes';
    localStorage.setItem('amendedVehicle', 'yes');
    localStorage.setItem('beyontech_vehicles', JSON.stringify((<FormArray>this.BeyontecFormService.vehicles_array$.controls['vehicle']).value));
    this.amendCountVehicle();
    document.getElementById("btnClose1").click();
  }


  deleteVehicleAmended(i) {

    let incVal = (<FormArray>this.BeyontecFormService.vehicles_array$.controls['vehicle']).at(i).get('from_api').value;

    console.log(incVal)

    if (!incVal) {


      const control = (<FormArray>this.BeyontecFormService.vehicles_array$.controls['vehicle']);
      control.removeAt(i);
      localStorage.setItem('beyontech_vehicles', JSON.stringify((<FormArray>this.BeyontecFormService.vehicles_array$.controls['vehicle']).value));

      let count = 0;
      control.value.forEach(element => {
        console.log(element)

        if (element.isAmended) {
          count++;
        }
      });

      console.log(count, "count")

      if (count > 0) {
        this.amendedVehicle = 'yes';
        localStorage.setItem('amendedVehicle', 'yes');
      } else {
        this.amendedVehicle = 'no';
        localStorage.removeItem("amendedVehicle");
      }


    } else {
      this.selectedIndex = null;
      this.selectedIndex = i;
      document.getElementById("openModalVehicleDeleteAmended").click();
    }


    // this.deleteVehicleAmendedConfirm(i)
  }

  deleteVehicleAmendedConfirm(i) {
    console.log(i);
    (<FormArray>this.BeyontecFormService.vehicles_array$.controls['vehicle']).at(i).get('isAmended').setValue(false);
    (<FormArray>this.BeyontecFormService.vehicles_array$.controls['vehicle']).at(i).get('include').setValue(true);

    this.BeyontecFormService.vehicles_array$.updateValueAndValidity();
    this.vehicleList = (<FormArray>this.BeyontecFormService.vehicles_array$.controls['vehicle']).value;


    document.getElementById("btnClose2").click();
    localStorage.setItem('beyontech_vehicles', JSON.stringify((<FormArray>this.BeyontecFormService.vehicles_array$.controls['vehicle']).value));
  }



  addDriver() {

    this.getDriverCount();
    // let a = this.include_count >= 4 ? true : false;
    console.log(this.include_count, "include_count")
    if (this.include_count >= 5) {
      document.getElementById("openModalDriverError").click();
      return 0;
    } else {
      this.routers.navigate(['/dashboard/policy-details/add-driver']);
    }

    // console.log(111);

  }

  editDriver(i) {
    console.log(i);
    this.routers.navigate(['/dashboard/policy-details/add-driver', { index: i }]);
  }

  addDriverExcluded(i){
    console.log(i);
    this.routers.navigate(['/dashboard/policy-details/add-driver', { index: i, add_Excluded: 1}]);
  }


  editDriverExcluded(i)
  {
    this.excludeEditIndex = null;
    console.log('editDriverExcluded')
    this.excludeEditIndex = i

    

    console.log(this.excludeEditIndex, "excludeEditIndex")

    this.exclude_driver_form.patchValue((<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(i).value);


    // let control = this.exclude_driver_form;
    // control.get('firstName').disabled ? control.enable() : control.disable();


    console.log(this.exclude_driver_form.value)

    document.getElementById('openModaldriverExcludeEdit').click()

  }


  exclude_driver_edit_submit(i){
    console.log(i);

    console.log(this.exclude_driver_form.value);

    //  if(this.check_vin_exist())
    //  {
    //    alert('Vehicle already exist')
    //    return 0;
    //  }

    // this.BeyontecFormService.generateDriver();
    // // var len: any = ((<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).length - 1);
    // // console.log(len, "len");
    (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(i).patchValue(this.exclude_driver_form.value);



    (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(i).get('isAmended').setValue(true);
    this.excludeAmended = 'yes';
    localStorage.setItem("excludeAmended", "yes");
    // // (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(i).get('isExcluded').setValue(true);
    // // (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(i).get('driver_include').setValue(false);

    this.getDriverCount();
    this.BeyontecFormService.drivers_array$.updateValueAndValidity();

    this.driverList = (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']);

    localStorage.setItem("beyontech_drivers", JSON.stringify(this.BeyontecFormService.drivers_array$.value.driver));

    this.exclude_driver_form.reset();
    // this.driver_array_popup.setValue('');
    this.driverList = (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).value;
    document.getElementById('cancel_popup1').click()
    console.log(this.BeyontecFormService.drivers_array$.value.driver, "driver main");
  }

  editDriverAmendedExcluded(i) {
    this.routers.navigate(['/dashboard/policy-details/add-driver', { index: i }]);
  }

  deleteDriver(i) {
    if (i > 0) {

      (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(i).get('isAmended').setValue(true);
      (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(i).get('isExcluded').setValue(true);
      (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(i).get('driver_include').setValue(false);

      this.excludeAmended = 'yes';
      localStorage.setItem("excludeAmended", "yes");
      this.driverList = (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).value;
      localStorage.setItem("beyontech_drivers", JSON.stringify(this.driverList));

    }
  }



  editDriverAmendedInclude(i) {
    this.routers.navigate(['/dashboard/policy-details/add-driver', { index: i }]);
  }

  deleteDriverAmendedIncludeConfirm(i){
    (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(i).get('isAmended').setValue(false);
      (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(i).get('isExcluded').setValue(true);
      (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(i).get('driver_include').setValue(false);

      // this.excludeAmended = 'yes';
      // localStorage.setItem("excludeAmended", "yes");
      this.driverList = (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).value;
      localStorage.setItem("beyontech_drivers", JSON.stringify(this.driverList));
      
      document.getElementById("btnClose3").click();
      let count = 0;
      this.driverList.forEach(element => {
        console.log(element)

        if (element.isAmended && !element.isExcluded) {
          count++;
        }
      });

      console.log(count, "count")

      if (count > 0) {
        this.includeAmended = 'yes';
        localStorage.setItem("includeAmended", "yes");
      } else {
        this.includeAmended = 'no';
        localStorage.removeItem("includeAmended");
      }
  }
  deleteDriverAmendedInclude(i) {
    console.log(i);
    if (i > 0) {
      this.selectedIndexDriver = i;
      document.getElementById("openModalDriverDeleteAmended").click();
      
    }
  }

  deleteDriverAmended(i) {

    this.routers.navigate(['/dashboard/policy-details/add-driver', { index: i, add_Excluded: 1 }]);

  }

  setIndexToSave(i, e) {
    // console.log(this.form.value, "Before")
    if (e.target.checked) {
      this.selectedIndex = i;
      // this.form.patchValue((<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(i).value)
      // this.form.get('driver_include').setValue(true);
      console.log(this.form.value, "Before")
    }

    console.log(e.target.checked, "checked", i, "index");
  }

  editCoverages() {

    // console.log(11111)
    this.routers.navigate(['dashboard/policy-details/edit-coverage']);
  }



  ValidateAlpha(evt)
  {
      var keyCode = (evt.which) ? evt.which : evt.keyCode
      if ((keyCode < 65 || keyCode > 90) && (keyCode < 97 || keyCode > 123) && keyCode != 32)
       
      return false;
          return true;
  }

 isNumberKey(evt){  
    //var e = evt || window.event;
	var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode != 46 && charCode > 31 
	&& (charCode < 48 || charCode > 57))
        return false;
        return true;
	}
  
  

}
