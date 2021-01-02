import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../commons/services/common/common.service';
import { BeyontecService } from '../../commons/services/beyontec/beyontec.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import * as moment from 'moment';
import { BeyontecDashFormService } from '../dashboard-service/beyontec-dash-form.service';
import { MalihuScrollbarService } from 'ngx-malihu-scrollbar';

@Component({
  selector: 'app-dashboard-add-violations',
  templateUrl: './dashboard-add-violations.component.html',
  styleUrls: ['./dashboard-add-violations.component.css', '../../commons/styles.css']
})
export class DashboardAddViolationsComponent implements OnInit {
  voilation_add: FormGroup;
  json_voilation: any;
  driver_index: any;
  isClicked: boolean = false;
  voilationArray = [];
  finallen: any;
  editIndex: any = null;
  lenNo = 0;
  violationSelectedList: any;
  add_driver: any;
  errormessage;
  datepickerModel;
  isEdit: boolean = false;
  selectedIndex: any;
  dropArr: any;
  accidentOrViolation = [];
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
  json_driver;
  lightScrollbarOptions = { axis: 'y', theme: 'light' };

  constructor(public router: Router, private readonly fb: FormBuilder, private activeroute: ActivatedRoute, public BeyontecFormService: BeyontecDashFormService, private mScrollbarService: MalihuScrollbarService,
    public api_common: CommonService, private Beyontec: BeyontecService) {
    this.driver_index = this.activeroute.snapshot.paramMap.get('index');
    this.add_driver = this.activeroute.snapshot.paramMap.get('add_driver');

  }

  ngOnInit(): void {

    
    $(".cst_mCst_scroll_Desk").mCustomScrollbar({
      theme: "dark"
    });
    
    
    this.voilation_add = this.fb.group({
      code: [''],
      date: ['', [Validators.required]],
      name: ['', [Validators.required]],
    });

    this.voilation_add.get('code').reset();
    this.voilation_add.get('date').reset()
    this.voilation_add.get('name').reset()



    if (this.driver_index) {
      if (this.BeyontecFormService.drivers_array$ == undefined || this.BeyontecFormService.drivers_array$ == null) {
        if (!JSON.parse(localStorage.getItem("beyontech_nusr"))) {
          this.getPrefilledData();
        }
      }

      if(this.BeyontecFormService.drivers_array$){
        this.violationSelectedList = (<FormArray>((<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(this.driver_index))).controls['violationsArray'].value;
      }else{
        this.json_driver = JSON.parse(localStorage.getItem("beyontech_drivers"));
        this.BeyontecFormService.getDriverForm();
        this.BeyontecFormService.assignLocalToDriver(this.json_driver);
        this.violationSelectedList = (<FormArray>((<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(this.driver_index))).controls['violationsArray'].value;
      }
     

    }



    this.getDropDown();
    this.getServerDate();
  }

  ngAfterViewInit() {    
    this.mScrollbarService.initScrollbar('#dark-card', { axis: 'y', theme: 'dark-thick', scrollButtons: { enable: true } });
  }

  ngOnDestroy() {
    this.mScrollbarService.destroy('#dark-card');
  }
  

  getServerDate() {
    this.api_common.getTocken().subscribe((dataToken: {}) => {
      let reqTocken =
      {
        "token": dataToken['token']
      }
      this.api_common.getServerDate(reqTocken).subscribe((dataTime: {}) => {
        console.log(dataTime, 'dataTime', dataTime['date']);

        this.maxDate = new Date(dataTime['date']);
        // this.maxDate.setDate(this.maxDate.getYear() - 3);

        this.minDate = new Date(dataTime['date']);
        this.minDate.setDate(this.maxDate.getDate() - 1096);

        console.log(this.maxDate, 'maxDate');
        console.log(this.minDate, 'minDate');


      });

    });
  }

  getcode(val) {
    this.voilation_add.get('code').setValue(val['key']);
  }

  getPrefilledData() {
    if (localStorage.getItem('beyontech_drivers') != undefined || localStorage.getItem('beyontech_drivers') != null) {
      let a = JSON.parse(localStorage.getItem('beyontech_drivers'));
      this.BeyontecFormService.getDriverForm();
      this.BeyontecFormService.assignLocalToDriver(a);
    }
  }


  onVoilationSubmit(formval) {
    var currenDate = moment(new Date()).format("MM/DD/YYYY");

    var startDate = moment(this.voilation_add.get('date').value, "MM/DD/YYYY").year();
    var endDate = moment(currenDate, "MM/DD/YYYY").year();
    let dateDiff = endDate - startDate;

    let a = moment(currenDate, "MM/DD/YYYY");
    let b = moment(this.voilation_add.get('date').value, "MM/DD/YYYY");

    var years = a.diff(b, 'year');
    b.add(years, 'years');

    var months = a.diff(b, 'months');
    b.add(months, 'months');

    var days = a.diff(b, 'days');

    console.log(years + ' years ' + months + ' months ' + days + ' days');


    const DATE_REGEX = new RegExp(/^(\d{2}|\d{1})\/(\d{2}|\d{1})\/\d{4}$/);
    this.errormessage = '';
    if (!DATE_REGEX.test(this.voilation_add.get('date').value)) {
      this.errormessage = "Invalid Date";
      // alert("Invalid Date");
      document.getElementById('openModalButtonSomethingWrong').click();

      this.voilation_add.get('code').setValue('');
      this.voilation_add.get('date').setValue('');
      this.voilation_add.get('name').setValue('');
      return 0;
    }
    else if ((years > 3) || (years >= 3 && (months > 0 || days > 0))) {
      // alert("This incident is too old, it will not be counted.");
      this.errormessage = "This incident is too old, it will not be counted.";
      document.getElementById('openModalButtonSomethingWrong').click();
      this.voilation_add.get('code').setValue('');
      this.voilation_add.get('date').setValue('');
      this.voilation_add.get('name').setValue('');
      return 0;
    } else if ((years < 0) || (years <= 0 && (months < 0 || days < 0))) {
      // alert("Please enter a valid date");
      // Something went wrong, please call 1-855-200-4567
      this.errormessage = "Please enter a valid date";
      document.getElementById('openModalButtonSomethingWrong').click();
      this.voilation_add.get('code').setValue('');
      this.voilation_add.get('date').setValue('');
      this.voilation_add.get('name').setValue('');
      return 0;
    }
    else {

      let a = this.check_exist();

      // console.log(a);

      if (!a) {

        // console.log(formval)

        var len: any = ((<FormArray>((<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(this.driver_index))).controls['violationsArray'].length - 1);
        // console.log(len, "len");
        let final_code = (<FormArray>((<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(this.driver_index))).controls['violationsArray'].value;


        this.BeyontecFormService.generateViolation(this.driver_index, formval);

        // console.log(this.BeyontecFormService.drivers_array$.value.driver,"editIndex null show...........")

        this.violationSelectedList = (<FormArray>((<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(this.driver_index))).controls['violationsArray'].value;

        localStorage.setItem("beyontech_drivers", JSON.stringify(this.BeyontecFormService.drivers_array$.value.driver));

        this.voilation_add.get('code').setValue('');
        this.voilation_add.get('date').setValue('');
        this.voilation_add.get('name').setValue('');
        this.voilation_add.updateValueAndValidity();

      } else {
        // alert("Voilation Already Exist.")
        this.errormessage = "Voilation Already Exist.";
        document.getElementById('openModalButtonSomethingWrong').click();
        this.voilation_add.get('code').reset();
        this.voilation_add.get('date').reset()
        this.voilation_add.get('name').reset();
      }


    }

  }




  onSubmit(driver_index) {

    let a = this.BeyontecFormService.drivers_array$.value;
    localStorage.setItem("beyontech_drivers", JSON.stringify(this.BeyontecFormService.drivers_array$.value.driver));
    if (this.add_driver == '0') {
      this.router.navigate(['dashboard/policy-details']);
    }
   
  }



  voilationEdit(i) {
    console.log(this.voilation_add.get('code').value)
    const control = (<FormArray>((<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(this.driver_index))).controls['violationsArray'].at(i).value;


    // this.voilation_add
    this.voilation_add.patchValue(control)

    console.log(control, "control")
    this.editIndex = i;

    this.isEdit = true;
    this.voilation_add.updateValueAndValidity();

  }

  onVoilationUpdate(val, i) {

    let a = this.check_exist();

    console.log(a);

    if (!a) {
      (<FormArray>((<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(this.driver_index))).controls['violationsArray'].at(i).patchValue(val);
      this.violationSelectedList = (<FormArray>((<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(this.driver_index))).controls['violationsArray'].value;
      localStorage.setItem("beyontech_drivers", JSON.stringify(this.BeyontecFormService.drivers_array$.value.driver));

      this.voilation_add.get('code').reset();
      this.voilation_add.get('date').reset()
      this.voilation_add.get('name').reset();
      this.isEdit = false;
    } else {
      // alert("Voilation Already Exist.")
      this.errormessage = "Voilation Already Exist.";
      document.getElementById('openModalButtonSomethingWrong').click();
      this.voilation_add.get('code').reset();
      this.voilation_add.get('date').reset()
      this.voilation_add.get('name').reset();
    }


  }

  voilationDelete(i) {
    this.selectedIndex = i;
    document.getElementById("openModalButtonViolationDelete").click();

  }


  finalDelete(i) {

    document.getElementById("closeViolation").click();
    const control = (<FormArray>((<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(this.driver_index))).controls['violationsArray'];

    console.log(control, "control voilationDelete")
    control.removeAt(i);

    this.violationSelectedList = (<FormArray>((<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(this.driver_index))).controls['violationsArray'].value;

    localStorage.setItem("beyontech_drivers", JSON.stringify(this.BeyontecFormService.drivers_array$.value.driver));

    console.log(this.violationSelectedList)

    this.voilation_add.get('code').setValue('');
    this.voilation_add.get('date').setValue('');
    this.voilation_add.get('name').setValue('');
  }


  check_exist() {
    var exist: boolean = false;

    (<FormArray>((<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(this.driver_index))).controls['violationsArray'].value.forEach(element => {
      console.log(element);
      if (element.name == this.voilation_add.get('name').value && element.date == this.voilation_add.get('date').value) {
        exist = true;
        return 0;
      }
    });
    return exist;
  }


  cancel() {
      this.router.navigate(['dashboard/policy-details/add-driver', {index:  this.driver_index}]);
  }


  getDropDown() {
    this.api_common.getTocken().subscribe((data: {}) => {
      // console.log(data, 'generateToken');
      let dataReq = {
        "token": data['token'],
        "companyProductCd": "PTXNSA"
      }
      // console.log(this.zipdata);
      this.api_common.getDropdown(dataReq).subscribe((dataDrop: {}) => {
        this.dropArr = dataDrop
        console.log(this.dropArr);
        this.getDropdowns(this.dropArr)
      });
    });
  }


  getDropdowns(dropArr) {
    if (dropArr) {
      // console.log(dropArr.umbi);
      this.accidentOrViolation = [];
      Object.keys(dropArr.accidentOrViolation[0]).forEach(key => {
        // console.log(key);
        this.accidentOrViolation.push({ key: key, value: dropArr.accidentOrViolation[0][key] });
      });
      // 
    }

    console.log(this.accidentOrViolation)
  }

  getdate(e) {
    // console.log(e, 'dob');
    if (e != null) {
      var currenDate = moment(e).format("MM/DD/YYYY");
      this.voilation_add.get('date').setValue(currenDate);
      console.log(this.voilation_add.get('date').value, 'selected date');
    }

    // this.getDriverDetailbyDOB(currenDate)
  }


}
