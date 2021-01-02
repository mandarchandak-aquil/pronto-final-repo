import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { qouteproService } from '../../../commons/services/qoute-pro/qoute-pro.service';
import { QuoteProFormService } from '../quote-pro-form.service';
import { JsonApiService } from '@quotepro/aq3';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-quote-underwriting',
  templateUrl: './quote-underwriting.component.html',
  styleUrls: ['./quote-underwriting.component.css']
})
export class QuoteUnderwritingComponent implements OnInit {
  underwritting_form:FormGroup;
  form_values:any;
  form_view_data:any;
  constructor(public router: Router,private route: ActivatedRoute, private aq3:JsonApiService,public FormService:QuoteProFormService,private fb: FormBuilder,private qouteproService:qouteproService) {

  }

  ngOnInit(): void {
    this.underwritting_form=  this.fb.group({
      "address": [''],
    "carrierCode": [''],
    "carrierName": [''],
    "drivers":this.fb.array([]),
    "email": [''],
    "employers":this.fb.array([]),
    "isNonOwner":[false],
    "notes": [''],
    "phone":[''],
    "questions": this.fb.array([]),
    "vins": this.fb.array([]),
      });
    


    this.aq3.getJson("Underwriting", "Index")
      .subscribe(result => {
        console.log(result,"result")
        this.form_values=result['form'];
        this.form_view_data= result['viewdata'];
        this.add_driver();
        this.add_employer();
        this.add_questions();
        this.add_vins();
        this.underwritting_form.patchValue(result['form']);
        console.log(this.underwritting_form);
        this.qouteproService.updateSession();
      })
  };
  
  
  add_driver()
  {
    var control = <FormArray>this.underwritting_form.controls.drivers;
         var a:any=0;
          if (this.form_values['drivers'] != '') {
            this.form_values['drivers'].forEach(element => {
              control.push(
                this.fb.group({
                   "firstName": [element.firstName],
                  "id": [element.id],
                  "lastName": [element.lastName],
                  "licenseNo": [element.licenseNo,[Validators.required]],
                  "licType":[element.licType],
                  "occupation": [element.occupation],
                  "showSr22Details": [element.showSr22Details],
                  "sr22": [element.sr22],
                  "stateLicensed": [element.stateLicensed]


                }));
               a++;
            });
          
        }
  }
  add_employer()
  {
    var control = <FormArray>this.underwritting_form.controls.employers;
         var a:any=0;
          if (this.form_values['employers'] != '') {
            this.form_values['employers'].forEach(element => {
              control.push(
                this.fb.group({
                   "employer":[element.employer,[Validators.required]],
                   "employerAddress": [element.employerAddress,[Validators.required]],
                   "employerCity": [element.employerCity,[Validators.required]],
                   "employerState": [element.employerState,[Validators.required]],
                   "employerZip": [element.employerZip,[Validators.required]],
                   "firstName": [element.firstName],
                   "id": [element.id],
                   "lastName": [element.lastName]


                }));
               a++;
            });
          
        }
  }
  add_questions()
  {
    var control = <FormArray>this.underwritting_form.controls.questions;
         var a:any=0;
          if (this.form_values['questions'] != '') {
            this.form_values['questions'].forEach(element => {
              control.push(
                this.fb.group({
                   
                   "id": [element.id],
            "carrier_Id": [element.carrier_Id],
            "alwaysAsk": [element.alwaysAsk],
            "mustHaveAnswer": [element.mustHaveAnswer],
            "noQuoteIfYes": [element.noQuoteIfYes],
            "noQuoteMessage": [element.noQuoteMessage],
            "answer": [element.answer],
            "opr1": [element.opr1],
            "opr2": [element.opr2],
            "opr3": [element.opr3],
            "opr4": [element.opr4],
            "questionKey": [element.questionKey],
            "ratingKey": [element.ratingKey],
            "question1": [element.question1],
            "questionOrder": [element.questionOrder],
            "questionType":[element.questionType],
            "triggerForm": [element.triggerForm],
            "whatType": [element.whatType],
            "defaultAnswer": [element.defaultAnswer],
            "carrier": [element.carrier],
            "bOpr1": [element.bOpr1]

                }));
               a++;
            });
          
        }
  }
  add_vins()
  {
    var control = <FormArray>this.underwritting_form.controls.vins;
         var a:any=0;
          if (this.form_values['vins'] != '') {
            this.form_values['vins'].forEach(element => {
              control.push(
                this.fb.group({
                  
                   "hasLienHolder": [element.hasLienHolder],
            "id": [element.id],
            "isMexicanUnderwriting": [element.isMexicanUnderwriting],
            "make": [element.make],
            "modelDescription": [element.modelDescription],
            "vinNumber": [element.vinNumber,[Validators.required]],
            "year": [element.year]


                }));
               a++;
            });
          
        }
  }
  change_yes_no(index,value)
  {
   //console.log(index,value)
    // if(value=='True')
    // {
    //   //((<FormArray>this.underwritting_form.controls['questions']).at(index)).get('answer').
    //   ((<FormArray>this.underwritting_form.controls['questions']).at(index)).get('answer').setValidators([Validators.required]);
    //   ((<FormArray>this.underwritting_form.controls['questions']).at(index)).updateValueAndValidity();
    //   }
    // else
    // {
    //   ((<FormArray>this.underwritting_form.controls['questions']).at(index)).get('answer').clearValidators();
    //   this.underwritting_form.updateValueAndValidity();
    //    }
    console.log((<FormArray>this.underwritting_form.controls['questions']).at(index));
   
  }
  submit()
  {
    console.log(this.underwritting_form.value)
    
      this.aq3.postJson("Underwriting", "Index", this.underwritting_form.value)
        .subscribe(result => {
          console.log(result)
          if(result['errors'])
          {
            alert(result['errors'][0])
            
          }
          else{
            this.router.navigate(['quote-pro/purchase']);
          }
          this.qouteproService.updateSession();
        })
      
    
    
  }
}

