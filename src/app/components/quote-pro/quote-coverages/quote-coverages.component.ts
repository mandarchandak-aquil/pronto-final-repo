
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { qouteproService } from '../../../commons/services/qoute-pro/qoute-pro.service';
import { QuoteProFormService } from '../quote-pro-form.service';
import { JsonApiService } from '@quotepro/aq3';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
@Component({
  selector: 'app-quote-coverages',
  templateUrl: './quote-coverages.component.html',
  styleUrls: ['./quote-coverages.component.css']
})
export class QuoteCoveragesComponent implements OnInit {

  
  coverage_form:FormGroup;
  form_dropdown_data:any='';
  form_all_values:any='';
  form_fields:any='';
  form_load:boolean=false;
  edit:boolean=false;
  policy_term_data:any=[
    {
      selected: false,
      text: "Select Your Policy Term",
      value: ''
      
    },
    {
      selected: false,
      text: "6 Months",
      value: '6'
      
    },
    {
      selected: false,
      text: "1 Year",
      value: '12'
  }
  ]
  constructor(private activeroute:ActivatedRoute,public router: Router,private route: ActivatedRoute, private aq3:JsonApiService,public FormService:QuoteProFormService,private fb: FormBuilder,private qouteproService:qouteproService) {
    


  }

  ngOnInit(): void {
    
    this.coverage_form= this.fb.group({
    
      "Next": ['submit'],
      "selectedBundle": [''],
      "commonCoverages": this.fb.array([]),
      "vehicleCoverages":this.fb.array([]),
      "effectiveDate": [''],
      "policyTerm": ['']
  
    })
   
      this.aq3.getJson('Coverage', 'Index')
        .subscribe(result => {
         
          this.coverage_form.get('selectedBundle').setValue(result['form']['selectedBundle'])
          this.coverage_form.get('policyTerm').setValue(result['form']['policyTerm'])
          this.coverage_form.get('effectiveDate').setValue( moment(new Date(result['form']['effectiveDate'])).format('MM/DD/YYYY'))
           this.qouteproService.updateSession();
           this.updateBundle(result['form']);
        });
    }
    add_common_coverage()
    {
      var control = <FormArray>this.coverage_form.controls.commonCoverages;
console.log(this.form_all_values,"commonCoverages")
      var a:any=0;
      if (this.form_all_values['commonCoverages'] != '') {
        this.form_all_values['commonCoverages'].forEach(element => {
          control.push(
            this.fb.group({
              "selectedValue": [element.selectedValue],
              "code": [element.code],
              "name": [element.name],
              "description":[element.description],
              "field": [element.field],
              "limits":this.fb.array([]),
            }));
           this.add_limit(element.limits,'commonCoverages',a);
            a++;
        });
      
    }
    }
    add_vehicle_array()
    {
      var control = <FormArray>this.coverage_form.controls.vehicleCoverages;

      var a:any=0;
      
            if (this.form_all_values['vehicleCoverages'] != '') {
              this.form_all_values['vehicleCoverages'].forEach(element => {
               
                control.push(
                  this.fb.array([]));
                  this.add_vehicle_coverage(a);
                  
                  a++;
              });
    }
    
  }
    add_vehicle_coverage(i)
    {
      var control = (<FormArray>((<FormArray>this.coverage_form.controls.vehicleCoverages).at(i))).controls;

var a:any=0;
      if (this.form_all_values['vehicleCoverages'][i]!= '') {
        this.form_all_values['vehicleCoverages'][i].forEach(element => {
            
          control.push(
            this.fb.group({
              "selectedValue": [element.selectedValue],
              "code": [element.code],
              "name": [element.name],
              "description":[element.description],
              "field": [element.field],
              "limits":this.fb.array([]),
            }));
            this.add_vehicle_limit(element.limits,i,a)
            a++;
        });
      
    }
    }
    add_vehicle_limit(limit,main_index,inner_index)
    {
     var control = (<FormArray>(<FormArray>((<FormArray>this.coverage_form.controls.vehicleCoverages).at(main_index))).at(inner_index)).controls['limits'];

var a:any=0;
      
if (limit!= '') {
  limit.forEach(element => {
    control.push(
      this.fb.group({
        "description": [element.description],
"selected": [element.selected],
"value":[element.value],
      }));
      a++;
  });

}
    }
    add_limit(value,form,i)
    {
     var control:any='';
     
      if(form=='commonCoverages')
      {
        control = (<FormArray>((<FormArray>this.coverage_form.controls.commonCoverages).at(i))).controls['limits'];
      }
      var a:any=0;
      
            if (value!= '') {
              value.forEach(element => {
                control.push(
                  this.fb.group({
                    "description": [element.description],
"selected": [element.selected],
"value":[element.value],
                  }));
                  a++;
              });
            
          }
    }
  updateBundle(form){
  
    var bundle:any={
      "selectedBundle":form['selectedBundle'],
      "commonCoverages":form['commonCoverages'],
      "vehicleCoverages": form['vehicleCoverages'],
      "effectiveDate":moment(new Date(form['effectiveDate'])).format('MM/DD/YYYY') ,
      "policyTerm": form['policyTerm']
  }
  console.log(bundle,"bundle")
    this.aq3.postJson('Coverage', 'SelectBundle', bundle)
      .subscribe(result => 
        {
          this.form_all_values=result['form'];
         // console.log(result['form'],"bunbdel");
 
          this.add_common_coverage();
         // this.add_vehicle_coverage();
          this.add_vehicle_array();
          this.form_load=true;
          this.qouteproService.updateSession();
        }
        
      )
  }
  updateCoverage(){
  
    var bundle:any={
      "selectedBundle":this.coverage_form.get('selectedBundle').value,
      "commonCoverages":this.coverage_form.get('commonCoverages').value,
      "vehicleCoverages": this.coverage_form.get('vehicleCoverages').value,
      "effectiveDate": moment(new Date( this.coverage_form.get('effectiveDate').value)).format('MM/DD/YYYY'),
      "policyTerm": this.coverage_form.get('policyTerm').value,
  }
  //console.log(bundle,"bundle")
    this.aq3.postJson('Coverage', 'SelectBundle', bundle)
      .subscribe(result => 
        {
         
          this.form_all_values='';
         this.form_all_values=result['form'];
    
         this.coverage_form= this.fb.group({
  
          "selectedBundle": [bundle['selectedBundle']],
          "commonCoverages": this.fb.array([]),
          "vehicleCoverages":this.fb.array([]),
          "effectiveDate": [bundle['effectiveDate']],
          "policyTerm": [bundle['policyTerm']]
      
        })
       
         console.log(this.form_all_values,"Coverage")
        //   console.log(result['form'],"bunbdel");
 
          this.add_common_coverage();
        //  // this.add_vehicle_coverage();
         this.add_vehicle_array();
        //   this.form_load=true;
          this.qouteproService.updateSession();
        }
        
      )
  }
 submit()
 {
console.log(this.coverage_form.value,"submit")


  this.aq3.postJson('Coverage', 'Index', this.coverage_form.value)
    .subscribe(result => 
      {
        console.log(result,"result")
        this.router.navigate(['quote-pro/quotation']);
        this.qouteproService.updateSession();
      }
      
    )

 }
}
