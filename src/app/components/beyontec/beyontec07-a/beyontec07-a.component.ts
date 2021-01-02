import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BeyontecFormService } from '../beyontec-form.service';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { CommonService } from '../../../commons/services/common/common.service';
import { BeyontecService } from '../../../commons/services/beyontec/beyontec.service';

@Component({
  selector: 'app-beyontec07-a',
  templateUrl: './beyontec07-a.component.html',
  styleUrls: ['./beyontec07-a.component.css', '../../../commons/styles.css']
})
export class Beyontec07AComponent implements OnInit {

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
      vinNo: [{value: '', disabled: true}],
      year: [{value: '', disabled: true}],
      make: [{value: '', disabled: true}],
      model: [{value: '', disabled: true}],
      symbol: [{value: '', disabled: true}],
      primary_use: [{value: '', disabled: true}],
      type_of_coverage: [{value: '', disabled: true}],
      equipment_amount_redio: [{value: '', disabled: true}],
      equipment_amount: [{value: '', disabled: true}],
      rental_reimbus: [{value: '', disabled: true}],
      towing_labour: [{value: '', disabled: true}],
      road_side_assistance: [{value: '', disabled: true}],
      include: [{value: '', disabled: true}],
      from_api: [{value: '', disabled: true}],
      ownership: [{value: '', disabled: true}],
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

    // this.formControlValueChanged();
    // this.customEquipmentChanged();

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

  }

  cancelBack(){
    this.router.navigate(['/beyontec/07']);
  }

}
