
import { Component, OnInit } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { BeyontecFormService } from '../beyontec-form.service';
import { Router } from '@angular/router';
import { FormArray, FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { CommonService } from '../../../commons/services/common/common.service';

@Component({
  selector: 'app-beyontec03-a',
  templateUrl: './beyontec03-a.component.html',
  styleUrls: ['./beyontec03-a.component.css', '../../../commons/styles.css'],
  changeDetection: ChangeDetectionStrategy.OnPush   
})
export class Beyontec03AComponent implements OnInit {

  json_driver: any;
  include_count: number = 0;
  exclude_count: number = 0;
  driver_array_popup: FormControl;
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

  constructor(private fb: FormBuilder, public BeyontecFormService: BeyontecFormService, public router: Router, public api_common: CommonService) { }
  ngOnInit(): void {
    this.driver_array_popup = new FormControl('', [Validators.required]);

    this.generateExcludeDriver();
    //this.json_driver= JSON.parse(localStorage.getItem("hrddata")).drivers.additional;     
    this.json_driver = JSON.parse(localStorage.getItem("beyontech_drivers"))
    if (!this.BeyontecFormService.drivers_array$) {
      this.BeyontecFormService.getDriverForm();
      this.BeyontecFormService.assignLocalToDriver(this.json_driver);
    }
    this.BeyontecFormService.drivers_array$.valueChanges.subscribe(value => {
      this.BeyontecFormService.saveResponse(value.driver, "driver")
    });
    console.log(this.BeyontecFormService.drivers_array$, "arrr");

    this.getDriverCount();
    this.getServerDate();
  }

  generateExcludeDriver() {
    this.exclude_driver_form = this.fb.group({
      isdrivingLicence: [false],
      firstName: ['', [Validators.required, Validators.min(2)]],
      lastName: ['', [Validators.required, Validators.min(2)]],
      relationship: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      isMarried: ['', [Validators.required]],
      isExcluded: [true],
      driver_include: [false],
      driver_from_api: [true],
    });
  }

  getdate(e, ctrl){
    console.log(e, 'dob', ctrl);
    if(e != null){
      var currenDate = moment(e).format("MM/DD/YYYY");
      console.log(currenDate, 'currenDate')
      this.exclude_driver_form.get(ctrl).setValue(currenDate);
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


  exclude_driver_clear(){
    this.driver_array_popup.setValue('');
  }

  getDriverCount(){
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
  
  add_driver(i, event) {
    console.log(event.target.checked)
    if (i > 0) {
      if (!event.target.checked) {
        if (!(<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(i).get('driver_from_api').value) {
          const control = (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']);
          control.removeAt(i);
          return 0;
        }
        else {
          (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(i).get('driver_include').setValue(false);
          return 0;
        }
      }
      else {
        (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(i).get('driver_include').setValue(false);
        this.router.navigate(['/beyontec/03-b', { index: i }]);
      }
    }
    else {
      (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(i).get('driver_include').setValue(true);
    }
  }


  add_driver1(i, event) {
    console.log(event.target.checked, i)
    const control = (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']);
    console.log(control.value, "add new driver")
    let count = 0;
    // console.log(element, "add_new_Vehicle element")
    control.value.forEach(element => {
      // console.log(element, "add_new_Vehicle element")
      // console.log(element.include, "add_new_Vehicle element include")
      if (element.driver_include) {
        count++;
      }
      console.log(count, "include count")
      // 
    });

    if (count < 6) {
      if (i > 0) {
        if (!event.target.checked) {
          if (!(<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(i).get('driver_from_api').value) {
            const control = (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']);
            control.removeAt(i);
            return 0;
          }
          else {

            (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(i).get('driver_include').setValue(false)
            return 0;
          }
        }
        else {
          (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(i).get('driver_include').setValue(false)
          this.router.navigate(['/beyontec/03-b', { index: i }]);
        }
      }
      else {
        (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(i).get('driver_include').setValue(true)

      }
    } else {
      (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(i).get('driver_include').setValue(false)
      document.getElementById("openModalmoreDriver").click();
    }


  }



  include_driver() {
    const control = (<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']);
    console.log(control.value, "add new driver")
    let count = 0;
    control.value.forEach(element => {
      // console.log(element, "add_new_Vehicle element")
      // console.log(element.include, "add_new_Vehicle element include")
      if (element.driver_include) {
        count++;
      }
      console.log(count, "include count")
      // 
    });


    if (count < 6) {
      document.getElementById("close_included").click();
      this.router.navigate(['/beyontec/03-b']);
    } else {
      document.getElementById("close_included").click();
      document.getElementById("openModalmoreDriver").click();

    }


    // 
  }

  edit_driver(i) {
    this.router.navigate(['/beyontec/03-b', { index: i }]);
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

    this.getDriverCount();
    this.BeyontecFormService.drivers_array$.updateValueAndValidity();
    localStorage.setItem("beyontech_drivers", JSON.stringify(this.BeyontecFormService.drivers_array$.value.driver));

    this.exclude_driver_form.reset();
    this.driver_array_popup.setValue('');

    document.getElementById('cancel_popup').click()
    console.log(this.BeyontecFormService.drivers_array$.value.driver, "driver main");

  }

  ngOnChanges() {
    // create header using child_id
    console.log(111);
  }

  check_vin_exist() {

    var exist: boolean = false;
    this.BeyontecFormService.vehicles_array$.value.vehicle.forEach(element => {

      //  if(element.vinNo==this.vehicle_add.get('vinNo').value)
      //  {

      //    exist=true;
      //    return 0;
      //  }

    });
    return exist;
  }
  
  submit() {

    let json_vehicle = JSON.parse(localStorage.getItem("beyontech_vehicles"));
    if((json_vehicle==undefined && json_vehicle==null) || json_vehicle.length < 1)
    {
      // console.log(111);

      localStorage.setItem("beyontech_drivers", JSON.stringify(this.BeyontecFormService.drivers_array$.value.driver));
      this.router.navigate(['/beyontec/02-a']);

    }else{
      // console.log(222);

      localStorage.setItem("beyontech_drivers", JSON.stringify(this.BeyontecFormService.drivers_array$.value.driver));
      this.router.navigate(['/beyontec/04']);
    }
    
  }
}

