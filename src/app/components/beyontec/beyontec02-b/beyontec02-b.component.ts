import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BeyontecFormService } from '../beyontec-form.service';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { CommonService } from '../../../commons/services/common/common.service';
import { BeyontecService } from '../../../commons/services/beyontec/beyontec.service';

@Component({
  selector: 'app-beyontec02-b',
  templateUrl: './beyontec02-b.component.html',
  styleUrls: ['./beyontec02-b.component.css']
})
export class Beyontec02BComponent implements OnInit {
  vehicle_add: FormGroup;
  loading: boolean = false;
  // isReadOnlyvin : boolean = false;

  primary_use_dropdown: any = [
    {
      "name": "Commute (to work or school)"
    },
    {
      "name": "Pleasure"
    },
    {
      "name": "Business (sales, calls, etc)"
    }
  ];
 
  type_of_coverage_dropdown: any = [
    {
      "key" : 0,
      "value": "Liability Only"
    },
    {
      "key" : 250,
      "value": "Liability/Comprehensive/Collision ($250 deductible)"
    },
    {
      "key" : 500,
      "value": "Liability/Comprehensive/Collision ($500 deductible)"
    },
    {
      "key" : 1000,
      "value": "Liability/Comprehensive/Collision ($1000 deductible)"
    }
  ];

  rental_reimbus_dropdown: any = [

    {
      "key" : 0,
      "value": "Reject"
    },
    {
      "key" : 25,
      "value": "$25 day/$750 max"
    }
  ];


  towing_labour_dropdown: any = [
    {
      "key" : 0,
      "value": "Reject"
    },
    {
      "key" : 70,
      "value": "$70 max"
    }
  ]

  equipment_amount_dropdown: any = [
    {
      "key" : 0,
      "name": "$0"
    },
    {
      "key" : 100,
      "name": "$100"
    },
    {
      "key" : 200,
      "name": "$200"
    },
    {
      "key" : 300,
      "name": "$300"
    },
    {
      "key" : 400,
      "name": "$400"
    },
    {
      "key" : 500,
      "name": "$500"
    },
    {
      "key" : 600,
      "name": "$600"
    },
    {
      "key" : 700,
      "name": "$700"
    },
    {
      "key" : 800,
      "name": "$800"
    },
    {
      "key" : 900,
      "name": "$900"
    },
    {
      "key" : 1000,
      "name": "$1,000"
    },
    {
      "key" : 1100,
      "name": "$1,100"
    },
    {
      "key" : 1200,
      "name": "$1,200"
    },
    {
      "key" : 1300,
      "name": "$1,300"
    },
    {
      "key" : 1400,
      "name": "$1,400"
    },
    {
      "key" : 1500,
      "name": "$1,500"
    }

  ];

  isReadOnlyVin = false;
  json_vehicle: any;
  json_vehicle_local: any;
  driver_name: any;
  index: any;
  rentalReimbursement: any;
  towingLabor: any;
  collisionDeductible: any;



  constructor(public router: Router, private readonly fb: FormBuilder, private activeroute: ActivatedRoute, public BeyontecFormService: BeyontecFormService,
    public api_common: CommonService, private Beyontec: BeyontecService) {


    this.index = this.activeroute.snapshot.paramMap.get('index');
  }


  ngOnInit(): void {
    //this.BeyontecFormService.getVehicleForm();
    this.getInit();

    this.vehicle_add = this.fb.group({
      vinNo: ['', [Validators.required]],
      year: ['', [Validators.required]],
      make: ['', [Validators.required]],
      model: ['', [Validators.required]],
      symbol: [''],
      primary_use: ['', [Validators.required]],
      type_of_coverage: ['', [Validators.required]],
      equipment_amount_redio: ['No'],
      equipment_amount: [''],
      rental_reimbus: [''],
      towing_labour: [''],
      road_side_assistance: ['No'],
      include: [true],
      from_api: [false],
      ownership: ['false'],
      lienholder: this.fb.array([]),
    });
    if (this.index) {
      this.isReadOnlyVin = true;
      this.vehicle_add.patchValue((<FormArray>this.BeyontecFormService.vehicles_array$.controls['vehicle']).at(this.index).value)

      if(!this.vehicle_add.get('equipment_amount_redio').value){
        this.vehicle_add.get('equipment_amount_redio').setValue('No');
      }

      if(!this.vehicle_add.get('road_side_assistance').value){
        this.vehicle_add.get('road_side_assistance').setValue('No');
      }
      // 

    }
    else {

    }

    this.formControlValueChanged();
    this.customEquipmentChanged();

    this.BeyontecFormService.vehicles_array$.valueChanges.subscribe(value => {
      this.BeyontecFormService.saveResponse(value.vehicle, "vehicle")
    });
    this.vehicle_add.valueChanges.subscribe(value => {
      if (this.index) {
        (<FormArray>this.BeyontecFormService.vehicles_array$.controls['vehicle']).at(this.index).patchValue(value);
        this.BeyontecFormService.vehicles_array$.updateValueAndValidity();
      }

    });

  }

  getInit() {
    (<any>$('[data-tooltip="tooltip"]')).tooltip();
    // this.getDropdown();


    let driver = JSON.parse(localStorage.getItem("beyontech_drivers"));
    this.driver_name = driver[0].firstName + " " + driver[0].lastName;

    // this.selectState =[];
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


    // console.log(this.BeyontecFormService.vehicles_array$,"this.BeyontecFormService.vehicles_array$")

    if (this.BeyontecFormService.vehicles_array$ == undefined || this.BeyontecFormService.vehicles_array$ == null) {
      if (JSON.parse(localStorage.getItem("hrddata"))) {
        this.json_vehicle = JSON.parse(localStorage.getItem("hrddata")).vehicles;
      }
      if (JSON.parse(localStorage.getItem("beyontech_vehicles"))) {
        this.json_vehicle_local = JSON.parse(localStorage.getItem("beyontech_vehicles"));
      }


      this.BeyontecFormService.getVehicleForm();

      if (this.json_vehicle_local != undefined && this.json_vehicle_local != null) {
        this.BeyontecFormService.assignLocalToVehicle(this.json_vehicle_local)
      }
      else if (this.json_vehicle != undefined && this.json_vehicle != null) {
        this.BeyontecFormService.assignVehicle(this.json_vehicle);
      }
      // else{
      //   this.BeyontecFormService.generateVehicle();
      // }

    }
  }

  getDropdown() {
    this.api_common.getTocken().subscribe((data: {}) => {
      // console.log(data, 'generateToken');
      let dataReq = {
        "token": data['token'],
        "companyProductCd": "PTXNSA"
      }
      // console.log(this.zipdata);
      this.api_common.getDropdown(dataReq).subscribe((dataDrop: {}) => {
        if (dataDrop) {
          console.log(dataDrop, "dataDrop")
          this.rentalReimbursement = [];
          Object.keys(dataDrop['rentalReimbursement'][0]).forEach(key => {
            this.rentalReimbursement.push({ key: key, value: dataDrop['rentalReimbursement'][0][key] });
          });

          this.towingLabor=[]
          Object.keys(dataDrop['towingLabor'][0]).forEach(key => {
            this.towingLabor.push({ key: key, value: dataDrop['towingLabor'][0][key] });
          });

          this.collisionDeductible=[]
          Object.keys(dataDrop['collisionDeductible'][0]).forEach(key => {
            this.collisionDeductible.push({ key: key, value: dataDrop['collisionDeductible'][0][key] });
          });

          console.log(this.rentalReimbursement,"this.rentalReimbursement")
          console.log(this.towingLabor,"this.towingLabor")
          console.log(this.collisionDeductible,"this.collisionDeductible")

        }
      });
    });


    // let countyArr = JSON.parse(localStorage.getItem('insuranceFor')).countyList;
    // this.countieList = [];
    // if(countyArr){
    //   Object.keys(countyArr).forEach(key => {
    //     this.countieList.push({ key: key, value: countyArr[key] });
    //   });
    // }

    // console.log(this.countieList, 'this.countieList')
    // this.countieList.push({key : "1", value : 'FAYETTE'})
  }

  getVin(val) {
    this.loading = true;

    (document.getElementById('vin_field') as HTMLElement).classList.remove('has-error')
    this.api_common.getTocken().subscribe((token: {}) => {

      let dataReq = {
        "token": token['token'],
        "vin17": val,
        "companyProductCd": "PTXNSA"
      }
      this.Beyontec.verifyVin(dataReq).subscribe((vin_data: {}) => {
        console.log(vin_data, 'vin_data')
        this.loading = false;
        if (vin_data['exists'] == undefined) {
          this.isReadOnlyVin = true;
          this.vehicle_add.get('year').setValue(vin_data['vinMfYear']);
          this.vehicle_add.get('make').setValue(vin_data['vinMake']);
          this.vehicle_add.get('model').setValue(vin_data['vinModel']);
          this.vehicle_add.get('symbol').setValue(vin_data['vinsymbol']);
          let inputField1: HTMLElement = <HTMLElement>document.querySelector("#custom_ngSelect");
          inputField1.focus();
        }

        else {
          (document.getElementById('vin_field') as HTMLElement).classList.add('has-error')
          this.vehicle_add.get('year').setValue('')
          this.vehicle_add.get('make').setValue('')
          this.vehicle_add.get('model').setValue('')
          this.vehicle_add.get('symbol').setValue('')
        }

        console.log(this.vehicle_add.value, 'vehicle_add');
      });
    });
  }

  getVinData(val) {
    if(val){
      this.getVin(val);
    }else{
      (document.getElementById('vin_field') as HTMLElement).classList.add('has-error')
    }
  }

  formControlValueChanged() {

    this.vehicle_add.get('type_of_coverage').valueChanges.subscribe(
      (data) => {
        // console.log(data, 'data');

        if (data > 0) {
          // console.log(111111111, ' 111111111111');
          this.vehicle_add.get('equipment_amount_redio').setValidators([Validators.required]);
          // this.vehicle_add.get('equipment_amount').setValidators([Validators.required]);
          this.vehicle_add.get('rental_reimbus').setValidators([Validators.required]);
          this.vehicle_add.get('towing_labour').setValidators([Validators.required]);

          this.vehicle_add.get('equipment_amount_redio').updateValueAndValidity();
          this.vehicle_add.get('rental_reimbus').updateValueAndValidity();
          this.vehicle_add.get('towing_labour').updateValueAndValidity();
        }
        else {

          // console.log(22222222, ' 22222222');
          // this.vehicle_add.get('equipment_amount_redio').clearValidators();
          // this.vehicle_add.get('equipment_amount').clearValidators();
          // this.vehicle_add.get('rental_reimbus').clearValidators();
          // this.vehicle_add.get('towing_labour').clearValidators();
          this.vehicle_add.get('equipment_amount').setValue('');
          this.vehicle_add.get('equipment_amount').clearValidators();
          this.vehicle_add.get('equipment_amount').setErrors(null);
          this.vehicle_add.get('equipment_amount').markAsPristine();
          this.vehicle_add.get('equipment_amount').updateValueAndValidity();

          this.vehicle_add.get('equipment_amount_redio').clearValidators();
          this.vehicle_add.get('equipment_amount_redio').setErrors(null);
          this.vehicle_add.get('equipment_amount_redio').markAsPristine();

          this.vehicle_add.get('rental_reimbus').clearValidators();
          this.vehicle_add.get('rental_reimbus').setErrors(null);
          this.vehicle_add.get('rental_reimbus').markAsPristine();

          this.vehicle_add.get('towing_labour').clearValidators();
          this.vehicle_add.get('towing_labour').setErrors(null);
          this.vehicle_add.get('towing_labour').markAsPristine();


          this.vehicle_add.get('equipment_amount_redio').updateValueAndValidity();
          this.vehicle_add.get('rental_reimbus').updateValueAndValidity();
          this.vehicle_add.get('towing_labour').updateValueAndValidity();

          // this.form.get('licenseNum').clearValidators();
          // this.form.get('licenseNum').setErrors(null);
          // this.form.get('licenseNum').markAsPristine();
        }

        this.vehicle_add.updateValueAndValidity();
      });
  }

  customEquipmentChanged(){
    // this.vehicle_add.get('equipment_amount_redio').valueChanges.subscribe(
    //   (data) => {
    //     // console.log(data);
    //     if(data == 'Yes'){
          
    //       this.vehicle_add.get('equipment_amount').setValidators([Validators.required]);
    //       this.vehicle_add.get('equipment_amount').updateValueAndValidity();
    //     }else{
    //       this.vehicle_add.get('equipment_amount').clearValidators();
    //       this.vehicle_add.get('equipment_amount').setErrors(null);
    //       this.vehicle_add.get('equipment_amount').markAsPristine();
    //       this.vehicle_add.get('equipment_amount').updateValueAndValidity();
          
    //     }
    //     // this.vehicle_add.updateValueAndValidity();
    //   });

  }

  submit() {
    let primary_use = this.vehicle_add.get('primary_use').value
    // console.log(primary_use);


    if (primary_use != 'Business (sales, calls, etc)') {

      this.vehicle_add.get('include').setValue(true);
      if (this.index) {
        (<FormArray>this.BeyontecFormService.vehicles_array$.controls['vehicle']).at(this.index).patchValue(this.vehicle_add.value);
        this.router.navigate(['/beyontec/02-a']);
        return 0;
      }

      else {
        if (this.check_vin_exist()) {
          // alert('Vehicle already exist')
          this.isReadOnlyVin = false;
          document.getElementById("openModalErrorVehicleExist").click();
          return 0;
        }

        this.BeyontecFormService.generateVehicle();
        var len: any = ((<FormArray>this.BeyontecFormService.vehicles_array$.controls['vehicle']).length - 1);
        console.log(len, "len");
        (<FormArray>this.BeyontecFormService.vehicles_array$.controls['vehicle']).at(len).patchValue(this.vehicle_add.value);


      }
      this.BeyontecFormService.vehicles_array$.updateValueAndValidity();
      console.log(this.BeyontecFormService.vehicles_array$.value.vehicle, "val main");
      this.router.navigate(['/beyontec/02-a']);

    }
    else {
      document.getElementById("openModalPrimaryUseBusiness").click();
    }
  }

  check_vin_exist() {

    var exist: boolean = false;
    this.BeyontecFormService.vehicles_array$.value.vehicle.forEach(element => {

      console.log(this.vehicle_add.get('vinNo'), 'vinNo check_vin_exist')

      if (element.vinNo == this.vehicle_add.get('vinNo').value) {
        exist = true;
        return 0;
      }

    });
    return exist;
  }

  cancelBack(){
    this.router.navigate(['/beyontec/02-a']);
  }

}
