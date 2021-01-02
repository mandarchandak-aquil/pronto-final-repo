import { Component, OnInit, Injectable,Input, ViewChild } from '@angular/core';
import { BeyontecService } from '../../../commons/services/beyontec/beyontec.service';
import {FormControl, FormGroup, ReactiveFormsModule, FormsModule, FormBuilder, Validators, FormArray} from '@angular/forms';
import {NgbDateAdapter, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { NgbDateStruct, NgbCalendar, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '../../../commons/services/common/common.service';
import { BeyontecFormService } from '../beyontec-form.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-beyontec11',
  templateUrl: './beyontec11.component.html',
  styleUrls: ['./beyontec11.component.css']
})
export class Beyontec11Component implements OnInit {

  json_driver : any;
  isClicked: boolean = false;
  dropArr: any;
  selectState :any[];
  index:any;
  minutesQuote: any;
  driverList: any;
  vehicleList: any;
  editIndex :number;
  quoteFor = '';
  productQuoteId = '';
  minutesQuoteSelected : any;
  loading : boolean = false;
  beyontech_payStatement : any;

  constructor(public router: Router, public api_form : BeyontecService, private formBuilder: FormBuilder, public api_common : CommonService, public BeyontecFormService:BeyontecFormService, private activeroute:ActivatedRoute, private readonly fb: FormBuilder) { }

  ngOnInit(): void {
    this.getInit();
  }


  getInit(){
    
    // this.minutesQuote = JSON.parse(localStorage.getItem('beyontec_fullQuote'));
    this.driverList = JSON.parse(localStorage.getItem('beyontech_drivers'));
    this.beyontech_payStatement = JSON.parse(localStorage.getItem('beyontech_payStatement'));


    if(this.beyontech_payStatement != undefined || this.beyontech_payStatement != null){
      this.productQuoteId = this.beyontech_payStatement.policyNo;
    }else{
      this.productQuoteId = 'PR-000000000-00';
    }


    if(this.driverList== undefined || this.driverList== null){
      this.router.navigate(['beyontec/01']);
    }else{
      this.quoteFor = this.driverList[0]['firstName']+" "+this.driverList[0]['lastName']
      // this.setDriver();
    }

  }


}
