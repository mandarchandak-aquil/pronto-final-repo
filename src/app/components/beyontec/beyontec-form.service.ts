

import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { map, elementAt } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class BeyontecFormService implements OnInit {
  public vehicles_array$: FormGroup;
  public drivers_array$: FormGroup;
  public violation_array$: FormGroup;
  public coverage_array$: FormGroup;
  public questionnaire_array$: FormGroup;
  authorizeCheck = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly http: HttpClient
  ) { }
  ngOnInit() {

  }

  // Vehicle Section End===============================================================================

  getVehicleForm() {

    this.vehicles_array$ = this.fb.group({
      vehicle: this.fb.array([]),
    });
    // this.assignVehicle(data)
  }

  assignLocalToVehicle(values)
{
  // console.log(values,"json data")
  var i=0;
  values.forEach(element => {
  this.generateVehicle();
  // road_side_assistance
  // console.log((<FormArray>this.vehicles_array$.controls['vehicle']).at(i).value,"55555555555555555555");
  (<FormArray>this.vehicles_array$.controls['vehicle']).at(i).patchValue(element);
  // console.log(element,"element.lienholder") 
    this.assignLienholder(i, element.lienholder);
      i++;  
  });
  // this.vehicles_array$.patchValue(values);
}


assignVehiclereplica(values: any) {
  var control = <FormArray>this.vehicles_array$.controls.vehicle;
  console.log(111)

  if (values != '') {

    values.forEach(element => {
      control.push(
        this.fb.group({
          vinNo: [element.vinNo == null ? '' : element.vinNo],
          year: [element.year == null ? '' : element.year],
          make: [element.make == null ? '' : element.make],
          model: [element.model == null ? '' : element.model],
          symbol: [element.symbol == null ? '' : element.symbol],
          primary_use: [''],
          type_of_coverage: [''],
          equipment_amount_redio:[element.equipment_amount_redio ? 'No' : element.equipment_amount_redio],
          equipment_amount: [''],
          rental_reimbus: [''],
          towing_labour: [''],
          road_side_assistance: [element.road_side_assistance ? 'No' : element.road_side_assistance],
          include: [false],
          from_api: [true],
          ownership: [element.ownership == null ? 'false' : element.ownership],
          lienholder: this.fb.array([]),
        }));
    });

  }
}

  assignVehicle(values: any) {
    var control = <FormArray>this.vehicles_array$.controls.vehicle;
    console.log(111)

    if (values != '') {

      values.vins.forEach(element => {
        control.push(
          this.fb.group({
            vinNo: [element.vinNo == null ? '' : element.vinNo],
            year: [element.year == null ? '' : element.year],
            make: [element.make == null ? '' : element.make],
            model: [element.model == null ? '' : element.model],
            symbol: [element.symbol == null ? '' : element.symbol],
            primary_use: [''],
            type_of_coverage: [''],
            equipment_amount_redio:[element.equipment_amount_redio ? 'No' : element.equipment_amount_redio],
            equipment_amount: [''],
            rental_reimbus: [''],
            towing_labour: [''],
            road_side_assistance: [element.road_side_assistance ? 'No' : element.road_side_assistance],
            include: [false],
            from_api: [true],
            ownership: [element.ownership == null ? 'false' : element.ownership],
            lienholder: this.fb.array([]),
          }));
      });

    }
  }

  generateVehicle() {
    var control = <FormArray>this.vehicles_array$.controls.vehicle;
    control.push(
      this.fb.group({
        vinNo: [''],
        year: [''],
        make: [''],
        model: [''],
        symbol: [''],
        primary_use: [''],
        type_of_coverage: [''],
        equipment_amount_redio:['No'],
        equipment_amount: [''],
        rental_reimbus: [''],
        towing_labour: [''],
        road_side_assistance: ['No'],
        include: [false],
        from_api: [''],
        ownership: ['false'],
        lienholder: this.fb.array([]),
      }));
  }

  // Vehicle Section End===============================================================================

  // Add Lienholder Section==================================================================================
  generateLienholder(index) {
    var control = (<FormArray>((<FormArray>this.vehicles_array$.controls['vehicle']).at(index))).controls['lienholder'];
    control.push(
      this.fb.group({
        id: [''],
        isFinanced : ['', [Validators.required]],
        lienHolderName: ['', [Validators.required]],
        lienHolderAddress:['', [Validators.required]],
        lienHolderCity:['', [Validators.required]],
        lienHolderState:['', [Validators.required]],
        lienHolderZip:['', [Validators.required]],
      }));
  }

  generateLienholder1(index, values) {
    console.log(index, "index")
    // console.log(values, "values")
    // (<FormArray>((<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(index))).controls['violationsArray']
    var control = (<FormArray>((<FormArray>this.vehicles_array$.controls['vehicle']).at(index))).controls['lienholder'];
    control.push(
      this.fb.group({
        id: [values.id],
        isFinanced : [values.isFinanced, [Validators.required]],
        lienHolderName: [values.lienHolderName, [Validators.required]],
        lienHolderAddress:[values.lienHolderAddress, [Validators.required]],
        lienHolderCity:[values.lienHolderCity, [Validators.required]],
        lienHolderState:[values.lienHolderState, [Validators.required]],
        lienHolderZip:[values.lienHolderZip, [Validators.required]],

      }));
  }


  assignLienholder(index, values) {
    // console.log(values, " values------------------", index, " driver_index")
    var control = (<FormArray>((<FormArray>this.vehicles_array$.controls['vehicle']).at(index))).controls['lienholder'];
    // console.log(control, "control assignViolation")
    // var control = <FormArray>this.violation_array$.controls.violations;
    if (values != '') {

      // console.log(values, "values assignViolation")
      let i = 0;
      values.forEach(element => {

        // console.log(element.isFinanced, "values assignLienholder")

        control.push(
          this.fb.group({

            id: [element.id == null ? '' : element.id],
            isFinanced : [element.isFinanced == null ? '' : element.isFinanced],
            lienHolderName: [element.lienHolderName == null ? '' : element.lienHolderName],
            lienHolderAddress:[element.lienHolderAddress == null ? '' : element.lienHolderAddress],
            lienHolderCity:[element.lienHolderCity == null ? '' : element.lienHolderCity],
            lienHolderState:[element.lienHolderState == null ? '' : element.lienHolderState],
            lienHolderZip:[element.lienHolderZip == null ? '' : element.lienHolderZip],
          }));

          // console.log(control, "")
        i++;
      });
    }
  }


  // Add Lienholder Section End==================================================================================

  // Driver Section ===============================================================================

  getDriverForm() {
    this.drivers_array$ = this.fb.group({
      driver: this.fb.array([]),
    });
    // this.assignDriver(data)
  }

  assignLocalToDriver(json) {
    var control = <FormArray>this.drivers_array$.controls.driver;

    if (json != '') {
      var i = 0;
      json.forEach(element => {
        // console.log(element, "element")

        this.generateDriver();
        (<FormArray>this.drivers_array$.controls['driver']).at(i).patchValue(element);

        // console.log(i, "and", element.violationsArray)
        // this.generateViolation(i,element.violationsArray);
        this.assignViolation(element.violationsArray, i);
        i++;
      });

    }

  }

  assignDriver(values) {
    // console.log(values, "valu")
    var control = <FormArray>this.drivers_array$.controls.driver;


    if (values != '') {

      values.forEach(element => {
        control.push(
          this.fb.group({
            isdrivingLicence: [''],
            unit: [''],
            firstName: [element.firstName == null ? '' : element.firstName, [Validators.required, Validators.min(2)]],
            middleName: [''],
            lastName: [element.lastName == null ? '' : element.lastName, [Validators.required, Validators.min(2)]],
            email: [''],
            phone1: [''],
            phone2: [''],
            phone3: [''],
            phoneNumber: [''],
            dob: [element.dob == null ? '' : element.dob],
            isMale: [''],
            isMarried: [''],
            relationship: [''],
            licenseType: [''],
            stateLicense: [''],
            countryLicense: [''],
            licenseNum: [element.dlNo == null ? '' : element.dlNo],
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
            violationsArray: this.fb.array([]),
            isPrimaryDriver: [''],
            isAnytickets: [''],
            isExcluded: [true],
            driver_include: [false],
            driver_from_api: [true],
          }));
      });

    }
  }

  generateDriver() {
    var control = <FormArray>this.drivers_array$.controls.driver;

    // console.log(control, "in generateDriver")
    control.push(
      this.fb.group({
        isdrivingLicence: [''],
        unit: [''],
        firstName: [''],
        middleName: [''],
        lastName: [''],
        email: [''],
        phone1: [''],
        phone2: [''],
        phone3: [''],
        phoneNumber: [''],
        dob: [''],
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
        isPrimaryDriver: [''],
        isExcluded: [true],
        driver_include: [false],
        driver_from_api: [true],
      }));



  }

  // Driver Section End===============================================================================

  // Violation Section===============================================================================
  getViolationForm(data) {

    this.violation_array$ = this.fb.group({
      violations: this.fb.array([]),
    });

    if (data) {
      // this.assignViolation(data)
    }

  }

  assignViolation(values: any, driver_index) {
    // console.log(values, " values------------------", driver_index, " driver_index")
    var control = (<FormArray>((<FormArray>this.drivers_array$.controls['driver']).at(driver_index))).controls['violationsArray'];
    // console.log(control, "control assignViolation")
    // var control = <FormArray>this.violation_array$.controls.violations;
    if (values != '') {

      // console.log(values, "values assignViolation")
      let i = 0;
      values.forEach(element => {
        // console.log(element, "values assignViolation")
        control.push(
          this.fb.group({
            code: [element.code == null ? i : element.code],
            date: [element.date == null ? '' : element.date],
            name: [element.name == null ? '' : element.name],
          }));
        i++;
      });
    }
  }

  generateViolation(index, values) {
    // console.log(index, "index")
    // console.log(values, "values")
    // (<FormArray>((<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(index))).controls['violationsArray']
    var control = (<FormArray>((<FormArray>this.drivers_array$.controls['driver']).at(index))).controls['violationsArray'];
    control.push(
      this.fb.group({
        code: [values.code],
        date: [values.date, [Validators.required]],
        name: [values.name, [Validators.required]],
      }));
  }

  generateViolation1(index) {

    var control = (<FormArray>((<FormArray>this.drivers_array$.controls['driver']).at(index))).controls['violationsArray'];
    control.push(
      this.fb.group({
        code: [''],
        date: ['', [Validators.required]],
        name: ['', [Validators.required]],
      }));

    // return this.fb.group({
    //     code: [''],
    //     date: ['', [Validators.required] ],
    //     name: ['', [Validators.required] ],
    //   })
  }

  // Violation Section End===============================================================================
  // Add Coverage Section==================================================================================


  getCoverageForm() {
    this.coverage_array$ = this.fb.group({
      pip: ['',[Validators.required]],
      umpd: ['',[Validators.required]],
      umbi: ['',[Validators.required]],
      pd: [''],
      bi: [''],
      rqEffDt: ['',[Validators.required]]
    });

    // if(data){
    //   this.assignCoverage(data)
    // }

  }

  // Add Coverage Section End===============================================================================


  // questionnaire Section==================================================================================


  getQuestionnaireForm() {

    this.questionnaire_array$ = this.fb.group({
      q1: ['',[Validators.required]],
      q2: ['',[Validators.required]],
      q3: ['',[Validators.required]],
      q4: ['',[Validators.required]],
      q5: ['',[Validators.required]],
      q6: ['',[Validators.required]],
      q7: ['',[Validators.required]],
      q8: ['',[Validators.required]],
      q8_more: [''],
      q9: ['',[Validators.required]],
      q10: ['',[Validators.required]],
      q11: ['',[Validators.required]]
    });

  }

  // questionnaire Section End===============================================================================



  //local storage store arrays
  saveResponse(masterData: any, type) {
    var beyontec_data: any;
    if (type == "vehicle") {
      localStorage.setItem('beyontech_vehicles', JSON.stringify(masterData));
         
      // console.log(a,"localStorage")   
    } 
    if (type == "driver") {
      localStorage.setItem('beyontech_drivers', JSON.stringify(masterData));
      var a = localStorage.getItem('beyontech_drivers'); 
      // console.log(a, "localStorage")
    }
  }

}
