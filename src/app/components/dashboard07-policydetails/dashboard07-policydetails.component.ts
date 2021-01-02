import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../commons/services/dashboard/dashboard.service';
import jwt_decode from "jwt-decode";
import { BeyontecService } from '../../commons/services/beyontec/beyontec.service';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BeyontecDashFormService } from '../dashboard-service/beyontec-dash-form.service';
import { CommonService } from '../../commons/services/common/common.service';

@Component({
  selector: 'app-dashboard07-policydetails',
  templateUrl: './dashboard07-policydetails.component.html',
  styleUrls: ['./dashboard07-policydetails.component.css']
})
export class Dashboard07PolicydetailsComponent implements OnInit {
  setting;
  decoded;
  loading: boolean = false;
  vinform: FormGroup;
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
      "key": 0,
      "value": "Liability Only"
    },
    {
      "key": 250,
      "value": "Liability/Comprehensive/Collision ($250 deductible)"
    },
    {
      "key": 500,
      "value": "Liability/Comprehensive/Collision ($500 deductible)"
    },
    {
      "key": 1000,
      "value": "Liability/Comprehensive/Collision ($1000 deductible)"
    }
  ];

  policy;
  exist;
  vehicle_add: FormGroup;

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
  selectState :any[];
  isReadOnlyVin = false;
  json_vehicle: any;
  json_vehicle_local: any;
  driver_name: any;
  index: any;
  rentalReimbursement: any;
  towingLabor: any;
  collisionDeductible: any;
  changeflag;
  isOwned : boolean = false;

  vehicleFinancedLeased = [
    {id: 1, type: 'Financed'},
    {id: 2, type: 'Leased'},
  ];
  avc

  constructor(private formBuilder: FormBuilder, public routers: Router, private dash: DashboardService, private beyondtec: BeyontecService, public router: Router, private readonly fb: FormBuilder, private activeroute: ActivatedRoute, public BeyontecFormService: BeyontecDashFormService,
    public api_common: CommonService, private Beyontec: BeyontecService) { 
      this.index = this.activeroute.snapshot.paramMap.get('index');
      this.avc = this.activeroute.snapshot.paramMap.get('avc');
    }

  ngOnInit(): void {

   
         $(".cst_mCst_scroll_Desk").mCustomScrollbar({
         theme:"dark"
       });
     
      this.getDropdown();
    //this.BeyontecFormService.getVehicleForm();
    this.getInit();


  //   if(localStorage.getItem("beyontech_vehicles") != undefined || localStorage.getItem("beyontech_vehicles") != null){

      
  //     let vl = JSON.parse(localStorage.getItem("beyontech_vehicles") );
  //     console.log(vl)

  //     if (!this.BeyontecFormService.vehicles_array$) {
  //       this.BeyontecFormService.getVehicleForm();
  //       this.BeyontecFormService.assignVehiclereplica1(vl);
  //     }
      
  // }


  
    this.vehicle_add = this.fb.group({
      vinNo: ['', [Validators.required]],
      year: ['', [Validators.required]],
      make: ['', [Validators.required]],
      model: ['', [Validators.required]],
      symbol: [''],
      primary_use: ['', [Validators.required]],
      type_of_coverage: [, [Validators.required]],
      equipment_amount_redio: ['No'],
      equipment_amount: [''],
      rental_reimbus: [''],
      towing_labour: [''],
      road_side_assistance: [],
      include: [true],
      from_api: [false],
      ownership: [true],
      lienholder: this.fb.group({
        isFinanced : [''],
        lienHolderName: [''],
        lienHolderAddress:[''],
        lienHolderCity:[''],
        lienHolderState:[''],
        lienHolderZip:[''],
      }),
      isAmended: [],
     
     

    });
    if (this.index) {
      this.isReadOnlyVin = true;
      this.vehicle_add.patchValue((<FormArray>this.BeyontecFormService.vehicles_array$.controls['vehicle']).at(this.index).value)
      // this.vehicle_add.get('type_of_coverage').setValue();

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
    // this.formControlValueChanged1();
    

    // this.customEquipmentChanged();

    // this.BeyontecFormService.vehicles_array$.valueChanges.subscribe(value => {
    //   this.BeyontecFormService.saveResponse(value.vehicle, "vehicle")
    // });
    this.vehicle_add.valueChanges.subscribe(value => {
      if (this.index) {
        // (<FormArray>this.BeyontecFormService.vehicles_array$.controls['vehicle']).at(this.index).patchValue(value);
        // this.BeyontecFormService.vehicles_array$.updateValueAndValidity();
      }

    });


   

   


  }


  createItem(): FormGroup {
    return 
  }

 


  getInit() {
    (<any>$('[data-tooltip="tooltip"]')).tooltip();
    
    let driver = JSON.parse(localStorage.getItem("beyontech_drivers"));
    this.driver_name = driver[0].firstName + " " + driver[0].lastName;

     
  
    if (this.BeyontecFormService.vehicles_array$ == undefined || this.BeyontecFormService.vehicles_array$ == null) {
      // if (JSON.parse(localStorage.getItem("hrddata"))) {
      //   this.json_vehicle = JSON.parse(localStorage.getItem("hrddata")).vehicles;
      // }
      if (JSON.parse(localStorage.getItem("beyontech_vehicles"))) {
        this.json_vehicle_local = JSON.parse(localStorage.getItem("beyontech_vehicles"));
      }

      this.BeyontecFormService.getVehicleForm();

      if (this.json_vehicle_local != undefined && this.json_vehicle_local != null) {
        this.BeyontecFormService.assignVehiclereplica1(this.json_vehicle_local)
      }
      // else if (this.json_vehicle != undefined && this.json_vehicle != null) {
      //   this.BeyontecFormService.assignVehicle(this.json_vehicle);
      // }
      // else{
      //   this.BeyontecFormService.generateVehicle();
      // }

    }

    
  }

  getDropdown() {
      

      // console.log(data, 'generateToken');
      let dataReq = {
        "companyProductCd": "PTXNSA"
      }
      // console.log(this.zipdata);
      this.api_common.getDropdown(dataReq).subscribe((dataDrop: {}) => {
        if (dataDrop) {
          // console.log(dataDrop, "dataDrop")
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
          
          this.selectState =[];
          Object.keys(dataDrop['stateLicensed'][0]).forEach(key => {
            this.selectState.push({ key: key, value: dataDrop['stateLicensed'][0][key] });
          });

          // console.log(this.rentalReimbursement,"this.rentalReimbursement")
          // console.log(this.towingLabor,"this.towingLabor")
          // console.log(this.collisionDeductible,"this.collisionDeductible")

        }
      });
    


  }

  getVin(val) {
    this.loading = true;

    (document.getElementById('vin_field') as HTMLElement).classList.remove('has-error')
 

      let dataReq = { 
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
          
          this.vehicle_add.get('equipment_amount_redio').setValidators([Validators.required]);
         
          this.vehicle_add.get('rental_reimbus').setValidators([Validators.required]);
          this.vehicle_add.get('towing_labour').setValidators([Validators.required]);

          this.vehicle_add.get('equipment_amount_redio').updateValueAndValidity();
          this.vehicle_add.get('rental_reimbus').updateValueAndValidity();
          this.vehicle_add.get('towing_labour').updateValueAndValidity();
        }
        else {

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



      this.vehicle_add.get('ownership').valueChanges.subscribe(
        (data) => {
          console.log(data, 'data');
  
          if (!data) {

            this.isOwned = true;
            this.vehicle_add.get('lienholder.isFinanced').setValidators([Validators.required]);
            this.vehicle_add.get('lienholder.lienHolderName').setValidators([Validators.required]);
            this.vehicle_add.get('lienholder.lienHolderAddress').setValidators([Validators.required]);
            this.vehicle_add.get('lienholder.lienHolderCity').setValidators([Validators.required]);
            this.vehicle_add.get('lienholder.lienHolderState').setValidators([Validators.required]);
            this.vehicle_add.get('lienholder.lienHolderZip').setValidators([Validators.required]);


            this.vehicle_add.get('lienholder.isFinanced').updateValueAndValidity();
            this.vehicle_add.get('lienholder.lienHolderName').updateValueAndValidity();
            this.vehicle_add.get('lienholder.lienHolderAddress').updateValueAndValidity();
            this.vehicle_add.get('lienholder.lienHolderCity').updateValueAndValidity();
            this.vehicle_add.get('lienholder.lienHolderState').updateValueAndValidity();
            this.vehicle_add.get('lienholder.lienHolderZip').updateValueAndValidity();

          }
          else {
  
            this.isOwned = false;
            this.vehicle_add.get('lienholder.isFinanced').setValue('');
            this.vehicle_add.get('lienholder.isFinanced').clearValidators();
            this.vehicle_add.get('lienholder.isFinanced').setErrors(null);
            this.vehicle_add.get('lienholder.isFinanced').markAsPristine();

            this.vehicle_add.get('lienholder.lienHolderName').setValue('');
            this.vehicle_add.get('lienholder.lienHolderName').clearValidators();
            this.vehicle_add.get('lienholder.lienHolderName').setErrors(null);
            this.vehicle_add.get('lienholder.lienHolderName').markAsPristine();

            this.vehicle_add.get('lienholder.lienHolderAddress').setValue('');
            this.vehicle_add.get('lienholder.lienHolderAddress').clearValidators();
            this.vehicle_add.get('lienholder.lienHolderAddress').setErrors(null);
            this.vehicle_add.get('lienholder.lienHolderAddress').markAsPristine();

            this.vehicle_add.get('lienholder.lienHolderCity').setValue('');
            this.vehicle_add.get('lienholder.lienHolderCity').clearValidators();
            this.vehicle_add.get('lienholder.lienHolderCity').setErrors(null);
            this.vehicle_add.get('lienholder.lienHolderCity').markAsPristine();

            this.vehicle_add.get('lienholder.lienHolderState').setValue('');
            this.vehicle_add.get('lienholder.lienHolderState').clearValidators();
            this.vehicle_add.get('lienholder.lienHolderState').setErrors(null);
            this.vehicle_add.get('lienholder.lienHolderState').markAsPristine();

            this.vehicle_add.get('lienholder.lienHolderZip').setValue('');
            this.vehicle_add.get('lienholder.lienHolderZip').clearValidators();
            this.vehicle_add.get('lienholder.lienHolderZip').setErrors(null);
            this.vehicle_add.get('lienholder.lienHolderZip').markAsPristine();
            

            this.vehicle_add.get('lienholder.isFinanced').updateValueAndValidity();
            this.vehicle_add.get('lienholder.lienHolderName').updateValueAndValidity();
            this.vehicle_add.get('lienholder.lienHolderAddress').updateValueAndValidity();
            this.vehicle_add.get('lienholder.lienHolderCity').updateValueAndValidity();
            this.vehicle_add.get('lienholder.lienHolderState').updateValueAndValidity();
            this.vehicle_add.get('lienholder.lienHolderZip').updateValueAndValidity();

          }
  
          this.vehicle_add.updateValueAndValidity();
        });



      

  }


  getChangeDetect(){
    if(this.index){
      this.changeflag = 0;
      let obj1 = (<FormArray>this.BeyontecFormService.vehicles_array$.controls['vehicle']).at(this.index).value;
      let obj2 = this.vehicle_add.value;

      
      if(Object.keys(obj1).length==Object.keys(obj2).length){

        // console.log(obj1, "obj1")
        // console.log(obj2, "obj2")

        for(let key in obj1) { 

          // console.log(obj1[key]+" key1 -----------", obj2[key]+" key2")

          if(obj1[key].toString() != obj2[key].toString()) {
            // console.log(111)
            this.changeflag = 1;
            this.vehicle_add.get('isAmended').setValue(true);
            localStorage.setItem('amendedVehicle', "yes")
            break;
          }
        }
      }
      console.log(this.changeflag, "changeflag getChangeDetect")
    }
  }

  submit() {
    let primary_use = this.vehicle_add.get('primary_use').value
    // console.log(primary_use);


    if (primary_use != 'Business (sales, calls, etc)') {

      this.vehicle_add.get('include').setValue(true);

      if (this.index) {


        this.getChangeDetect();
        
        // if(this.changeflag == 1){
        //   this.vehicle_add.get('isAmended').setValue(true);
        //   localStorage.setItem('amendedVehicle', "yes")
        // }else{
        //   if(this.avc != 1){
        //     this.vehicle_add.get('isAmended').setValue(false);
        //   }
          
        //   localStorage.removeItem('amendedVehicle')
        // }

        console.log(this.vehicle_add.value, "form value");

        (<FormArray>this.BeyontecFormService.vehicles_array$.controls['vehicle']).at(this.index).patchValue(this.vehicle_add.value);

        localStorage.setItem('beyontech_vehicles', JSON.stringify((<FormArray>this.BeyontecFormService.vehicles_array$.controls['vehicle']).value));

        // this.router.navigate(['/dashboard/policy-details']);
        // return 0;
      }
      else {
        if (this.check_vin_exist()) {
          // alert('Vehicle already exist')
          this.isReadOnlyVin = false;
          document.getElementById("openModalErrorVehicleExist").click();
          // this.vehicle_add.reset();
          this.ngOnInit();

          return 0;
        }

        this.BeyontecFormService.generateVehicle();
        var len: any = ((<FormArray>this.BeyontecFormService.vehicles_array$.controls['vehicle']).length - 1);
        console.log(len, "len");
        localStorage.setItem('amendedVehicle', "yes")

       
        this.vehicle_add.get('isAmended').setValue(true);
        
        console.log(this.vehicle_add.value, "form value");

        (<FormArray>this.BeyontecFormService.vehicles_array$.controls['vehicle']).at(len).patchValue(this.vehicle_add.value);
        (<FormArray>this.BeyontecFormService.vehicles_array$.controls['vehicle']).at(len).get('isAmended').setValue(true);

      }
      this.BeyontecFormService.vehicles_array$.updateValueAndValidity();
      localStorage.setItem('beyontech_vehicles', JSON.stringify((<FormArray>this.BeyontecFormService.vehicles_array$.controls['vehicle']).value));

      console.log(this.BeyontecFormService.vehicles_array$.value.vehicle, "val main");
      this.router.navigate(['/dashboard/policy-details']);

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
    this.router.navigate(['/dashboard/policy-details']);
  }

  // onSubmit() {

  //   let form = this.vinform.value;
  //   for (let i = 0; i < this.policy.vehicles.length; i++) {
  //     console.log(this.policy.vehicles[i].vin);
  //     if (form.vin == this.policy.vehicles[i].vin) {
  //       this.exist = true;
  //     }
  //   }
  //   if (this.exist) {
  //     this.exist = true;
  //   } else {
  //     localStorage.setItem('ammend_vehicle', JSON.stringify(this.vinform.value));
  //     this.routers.navigate(['/dashboard/ammedment']);
  //   }


  // }
  // checkvin() {

  // }
  // closesocial() {
  //   this.exist = false;
  // }
  // onVin() {
  //   let form = this.vinform.value;
  //   if (form.vin) {
  //     this.loading = true;
  //     console.log('form', form);
  //     let dataReq = {
  //       "vin17": form.vin,
  //       "companyProductCd": "PTXNSA"
  //     }
  //     this.beyondtec.verifyVin(dataReq).subscribe((vin_data: {}) => {
  //       console.log('vin_data', vin_data['vinMake']);
  //       this.loading = false;
  //       this.vinform.controls.make.setValue(vin_data['vinMake']);
  //       this.vinform.controls.model.setValue(vin_data['vinModel']);
  //       this.vinform.controls.year.setValue(vin_data['vinMfYear']);
  //     });
  //   }
  // }
}
