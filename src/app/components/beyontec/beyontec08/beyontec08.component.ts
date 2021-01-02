import { Component, OnInit, Injectable,Input } from '@angular/core';
import { BeyontecService } from '../../../commons/services/beyontec/beyontec.service';
import {FormControl, FormGroup, ReactiveFormsModule, FormsModule, FormBuilder, Validators, FormArray} from '@angular/forms';
import { CommonService } from '../../../commons/services/common/common.service';
import { BeyontecFormService } from '../beyontec-form.service';
import { Router, ActivatedRoute } from '@angular/router';


type data = {
  title: string;
}[];

@Component({
  selector: 'app-beyontec08',
  templateUrl: './beyontec08.component.html',
  styleUrls: ['./beyontec08.component.css']
})
export class Beyontec08Component implements OnInit {

  isClicked: boolean = false;
  dropArr: any;
  selectState :any[];
  index:any;
  minutesQuote: any;
  driverList: any;
  vehicleList: any;

  quoteFor = '';
  productQuoteId = '';

  json_questionnaire : any;
  loading : boolean =false;


  public form: FormGroup;
  public arrayItems: data = [];
  private formFields = [];
  private tooltipData = [];
  private ansData = [];
  private ansData1 = [];
  private ansFormating= [];
  
  constructor(public router: Router, public api_form : BeyontecService, private formBuilder: FormBuilder, public api_common : CommonService, public BeyontecFormService:BeyontecFormService, private activeroute:ActivatedRoute, private readonly fb: FormBuilder) {

    this.form = this.formBuilder.group({
      queArray: this.formBuilder.array([])
    });

  }
  ngOnInit() {
    (<any>$('[data-tooltip="tooltip"]')).tooltip();

    if(localStorage.getItem('beyontec_questionnaire') != undefined || localStorage.getItem('beyontec_questionnaire') != null){
      // console.log(JSON.parse(localStorage.getItem('beyontec_questionnaire')))
      this.assignLocal(JSON.parse(localStorage.getItem('beyontec_questionnaire')).queArray);
    }

    this.getQuestionary();
    this.getInit();
  }

  get queFormArray() {
    return this.form.get("queArray") as FormArray;
  }


  getInit(){

    // this.json_questionnaire = JSON.parse(localStorage.getItem("beyontec_questionnaire"));
    // if(this.json_questionnaire!=undefined && this.json_questionnaire!=null)
    // {
    //   this.BeyontecFormService.getQuestionnaireForm();
    //   this.BeyontecFormService.questionnaire_array$.patchValue(this.json_questionnaire)
    // }
    

    // this.selectState =[];
    // this.vehicleFinancedLeased=[];

    // this.api_common.getTocken().subscribe((data: {}) => {
    //   // console.log(data, 'generateToken');
    //   let dataReq = {
    //     "token": data['token'],
    //     "companyProductCd": "PTXNSA"
    //   }
    //   // console.log(this.zipdata);
    //   this.api_common.getDropdown(dataReq).subscribe((dataDrop: {}) => {
    //     // console.log(dataDrop);
    //     Object.keys(dataDrop['stateLicensed'][0]).forEach(key => {
    //       this.selectState.push({ key: key, value: dataDrop['stateLicensed'][0][key] });
    //     });
    //     // console.log(this.selectState, "selectState");

    //   });
    // });

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
    }
    
  }

  assignLocal(values)
{
  console.log(values,"json data")
  var i=0;
  values.forEach(element => {
     
  this.addQuestion();
  (<FormArray>this.form.controls['queArray']).at(i).patchValue(element);


  // console.log(element,"element.lienholder") 
  
    // this.assignLienholder(i, element.lienholder);
  
  
      i++;  
  });

  console.log(this.form, "form patch")
  // this.vehicles_array$.patchValue(values);
}


  addQuestion(){
	  let fg = this.formBuilder.group({
      answer: ['', [Validators.required]],
      description : [''],
    });
	  this.queFormArray.push(fg);	  
  }


  getQuestionary(){
    this.api_form.questionaryAnswer().subscribe((dataQ: {}) => {

      console.log(dataQ);

      this.formFields = dataQ['qsn']; 
      this.tooltipData = dataQ['tooltip']; 
      this.ansData = dataQ['ans']; 
      this.ansData1 = dataQ['ans1']; 
      this.ansFormating = dataQ['ansFormating'];
      //dataQ['qsn'];
      // console.log(this.formFields,'this.formFields');
      // console.log(dataQ['qsnno']);


      if(dataQ['status'] == 200 && this.formFields){
        if(localStorage.getItem('beyontec_questionnaire') == undefined || localStorage.getItem('beyontec_questionnaire') == null){

          this.formFields.map(field => {
          //     console.log(field,"arrayItems");
          //     this.arrayItems.push({title: field});
          //     this.queArray.push(this.formBuilder.control(''));
              this.addQuestion();
            });   
          
        }
          
      }
      
      // Object.keys(dataDrop['stateLicensed'][0]).forEach(key => {
      //   this.selectState.push({ key: key, value: dataDrop['stateLicensed'][0][key] });
      // });
      // console.log(this.selectState, "selectState");

    });
  }

  onSubmit(){
    let val = this.form.value;
    
    console.log(val)

    let givenAns = [];
    val['queArray'].map(field => {
      // console.log(field['answer'], 'answer');
      givenAns.push(field['answer']);
    });

    let cnt = 0;
    for(let i=0; i<this.ansData.length; i++){
      // console.log(givenAns[i], " given----- ",this.ansData[i] , "Actual")
      if(givenAns[i] == this.ansData[i] || givenAns[i] == this.ansData1[i] ){
        cnt++;
      }
    }
    console.log(cnt);
  

  //   // console.log(this.BeyontecFormService.questionnaire_array$.value['q8']);
  //   // console.log(<FormArray>this.BeyontecFormService.questionnaire_array$.value);


  //   localStorage.setItem("beyontec_questionnaire", JSON.stringify(<FormArray>this.BeyontecFormService.questionnaire_array$.value));
  if(cnt == this.formFields.length){
      localStorage.setItem("beyontec_questionnaire", JSON.stringify(this.form.value));
      this.router.navigate(['beyontec/09']);
  }else{
    document.getElementById('openModalProviderAnsError').click();
  }
   
  }


}
