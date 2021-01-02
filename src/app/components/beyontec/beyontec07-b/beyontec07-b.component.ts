import { Component, OnInit, Injectable,Input } from '@angular/core';
import { BeyontecService } from '../../../commons/services/beyontec/beyontec.service';
import {FormControl, FormGroup, ReactiveFormsModule, FormsModule, FormBuilder, Validators, FormArray} from '@angular/forms';
import { CommonService } from '../../../commons/services/common/common.service';
import { BeyontecFormService } from '../beyontec-form.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-beyontec07-b',
  templateUrl: './beyontec07-b.component.html',
  styleUrls: ['./beyontec07-b.component.css']
})
export class Beyontec07BComponent implements OnInit {
  vehicleFinancedLeased = [
    {id: 1, type: 'Financed'},
    {id: 2, type: 'Leased'},
  ];

  isClicked: boolean = false;
  dropArr: any;
  selectState :any[];
  index:any;
  minutesQuote: any;
  driverList: any;
  vehicleList: any;

  quoteFor = '';
  productQuoteId = '';
  lienholder_add :FormGroup;
  SelectedList:any;
  // isClicked : boolean = false;

  // vehicleFinancedLeased:any[];


  constructor(public router: Router, public api_form : BeyontecService, private formBuilder: FormBuilder, public api_common : CommonService, public BeyontecFormService:BeyontecFormService, private activeroute:ActivatedRoute, private readonly fb: FormBuilder) {
    this.index=this.activeroute.snapshot.paramMap.get('index');
   }

  ngOnInit(): void {
    this.getInit();
    this.vehicleList = JSON.parse(localStorage.getItem('beyontech_vehicles'));

    this.lienholder_add= this.fb.group({
        id: [''],
        isFinanced : ['', [Validators.required]],
        lienHolderName: ['', [Validators.required]],
        lienHolderAddress:['', [Validators.required]],
        lienHolderCity:['', [Validators.required]],
        lienHolderState:['', [Validators.required]],
        lienHolderZip:['', [Validators.required, Validators.min(5)]],
    });

    if(this.index)
    {

      if(this.vehicleList != undefined && this.vehicleList != null)
      {
        this.BeyontecFormService.getVehicleForm();
        this.BeyontecFormService.assignLocalToVehicle(this.vehicleList);
        this.SelectedList = (<FormArray>((<FormArray>this.BeyontecFormService.vehicles_array$.controls['vehicle']).at(this.index))).value;


        // console.log((<FormArray>this.BeyontecFormService.vehicles_array$.controls['vehicle']).at(this.index).value);


        // console.log((<FormArray>((<FormArray>this.BeyontecFormService.vehicles_array$.controls['vehicle']).at(this.index))).controls['lienholder'].at(0).value);
        if((<FormArray>((<FormArray>this.BeyontecFormService.vehicles_array$.controls['vehicle']).at(this.index))).controls['lienholder'].at(0).value){
          this.lienholder_add.patchValue((<FormArray>((<FormArray>this.BeyontecFormService.vehicles_array$.controls['vehicle']).at(this.index))).controls['lienholder'].at(0).value)
        }
        
      }
      else{
        this.router.navigate(['/beyontec/07']);
      }



      // console.log(this.index);

      // console.log(this.BeyontecFormService.vehicles_array$);

      // if(this.BeyontecFormService.vehicles_array$ != undefined ){
      //   // console.log((<FormArray>((<FormArray>this.BeyontecFormService.vehicles_array$.controls['vehicle']).at(this.index))));

        

       

      //   // ((<FormArray>this.BeyontecFormService.vehicles_array$.controls['vehicle']).at(this.index).value)

      //   // console.log(this.SelectedList, "SelectedList");

      //   // this.SelectedList = (<FormArray>((<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(this.index))).controls['violationsArray'].value;

      // }else{
      //   // console.log(this.vehicleList[this.index]);
      //   // (<FormArray>((<FormArray>this.BeyontecFormService.vehicles_array$.controls['vehicle']).at(this.index))).get('ownership').setValue('');
      //   if(this.vehicleList[this.index].ownership == true && this.vehicleList[this.index].lienholder.length > 0){
      //     this.router.navigate(['/beyontec/07']);
      //   }else{
      //     this.vehicleList[this.index].ownership = '';
      //     localStorage.setItem('beyontech_vehicles', JSON.stringify(this.vehicleList));
      //     this.router.navigate(['/beyontec/07']);
      //   }
        
      // }

      // 

      // (<FormArray>((<FormArray>this.BeyontecFormService.vehicles_array$.controls['vehicle']).at(this.index))).controls['lienholder'].value;

    }
  }

  getInit(){
    this.selectState =[];
    // this.vehicleFinancedLeased=[];

    this.api_common.getTocken().subscribe((data: {}) => {
      // console.log(data, 'generateToken');
      let dataReq = {
        "token": data['token'],
        "companyProductCd": "PTXNSA"
      }
      // console.log(this.zipdata);
      this.api_common.getDropdown(dataReq).subscribe((dataDrop: {}) => {
        // console.log(dataDrop);
        Object.keys(dataDrop['stateLicensed'][0]).forEach(key => {
          this.selectState.push({ key: key, value: dataDrop['stateLicensed'][0][key] });
        });
        // console.log(this.selectState, "selectState");

      });
    });

    this.minutesQuote = JSON.parse(localStorage.getItem('beyontec_minutesQuote'));
    this.driverList = JSON.parse(localStorage.getItem('beyontech_drivers'));

    if(this.minutesQuote == undefined || this.minutesQuote == null){
      this.router.navigate(['beyontec/04']);
    }else{
      this.productQuoteId = this.minutesQuote.productQuoteId;
    }

    if(this.driverList== undefined || this.driverList== null){
      this.router.navigate(['beyontec/01']);
    }else{
      this.quoteFor = this.driverList[0]['firstName']+" "+this.driverList[0]['lastName']
      // this.setDriver();
    }
    
  }


  onSubmit(val){
    // console.log(val)
    this.BeyontecFormService.generateLienholder1(this.index,val);
    // console.log((<FormArray>this.BeyontecFormService.vehicles_array$.controls['vehicle']).at(0));

    (<FormArray>this.BeyontecFormService.vehicles_array$.controls['vehicle']).at(0).patchValue(this.lienholder_add.value);
    // console.log((<FormArray>this.BeyontecFormService.vehicles_array$.controls['vehicle']).at(0), "00000000000000");


    localStorage.setItem("beyontech_vehicles", JSON.stringify(this.BeyontecFormService.vehicles_array$.value.vehicle));

    // this.form.patchValue((<FormArray>this.BeyontecFormService.vehicles_array$.controls['vehicle']).at(0).value)

    this.lienholder_add.updateValueAndValidity();
    this.router.navigate(['/beyontec/07']);
  }

 

}
