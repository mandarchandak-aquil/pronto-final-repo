import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { QuoteProFormService } from '../quote-pro-form.service';
import { Observable } from 'rxjs';
import { qouteproService } from '../../../commons/services/qoute-pro/qoute-pro.service';
import { environment } from '../../../../environments/environment';
import { JsonApiService } from '@quotepro/aq3';
import { ActivatedRoute } from '@angular/router';

import { Router } from '@angular/router';
import * as AOS from 'aos';


@Component({
  selector: 'app-quote01',
  templateUrl: './quote01.component.html',
  styleUrls: ['./quote01.component.css']
})
export class Quote01Component implements OnInit {
  @ViewChild('search') searchElementRef: ElementRef;
  displaySuggestions:any=[];
  flag1 : boolean = false;
  address_sub_text:any='';


  form_fields:any;
  form_values:any;
  form_dropdown_data:any;
  form_load:boolean=false;

  dynamic_data: any ;
  form2: FormGroup;
  payLoad = '';
  first_form:FormGroup;
  violations_option:any=[
    {
      selected: false,
      text: "Yes",
      value: true
      
    },
    {
      selected: false,
      text: "No",
      value: false
  }
  ]
  constructor(public router: Router,private route: ActivatedRoute, private aq3:JsonApiService,public FormService:QuoteProFormService,private fb: FormBuilder,private qouteproService:qouteproService
    ,private ref: ChangeDetectorRef) {
    // this.qouteproService.getLocation();
   }
  ngOnInit(): void {
    AOS.refresh();
//this.qouteproService.init(environment.aq3Url)

// this.qouteproService.initialize();
// this.qouteproService.postZip();
this.dynamic_data=this.route.snapshot.data['location'];
console.log(this.dynamic_data,"location data")
if(this.dynamic_data['form']==undefined || this.dynamic_data['fields']==undefined 
|| this.dynamic_data['viewdata']==undefined)
{
  window.location.reload()
}
this.FormService.getFirstForm(this.dynamic_data);

this.form_values=this.dynamic_data['form'];
this.form_fields=this.dynamic_data['fields'];
this.form_dropdown_data=this.dynamic_data['viewdata'];
var local_data=JSON.parse(sessionStorage.getItem('dataV3'));
console.log(this.form_dropdown_data['priorLimits'],"form_dropdown_data")
this.FormService.first_form.get('city').setValue(this.form_dropdown_data['cities'][0]['value']);
this.FormService.first_form.get('county').setValue(this.form_dropdown_data['counties'][0]['text']);
this.FormService.first_form.get('vehicle').get('ownership').setValue((this.form_values['vehicle']['ownership']).toString());
this.FormService.first_form.get('vehicle').get('usecode').setValue((this.form_values['vehicle']['usecode']).toString());

this.FormService.first_form.get('quote').get('priorLimits').setValue((this.form_dropdown_data['priorLimits'][0]['value']));
var datav3=JSON.parse(sessionStorage.getItem('dataV3'))
if(datav3['drivers'].length>0)
{
  this.FormService.first_form.get('driver').get('stateLicensed').setValue(datav3['drivers'][0]['stateLicensed']);

}
   
this.form_load=true;

  this.qouteproService.updateSession();
  
  
  }
  ngAfterViewInit(){
   
  }
   blink(id) {
    var f = document.getElementById(id);
    f.classList.add
    setTimeout(function() {
      f.style.display = (f.style.display == 'none' ? '' : 'none');
       setTimeout(function() {
          f.style.display = (f.style.display == 'none' ? '' : 'none');
       }, 500);
   }, 500);
 }
getFormData()
{
  const group_main: any = {};
  for (var x in this.dynamic_data['fields']) {
      if(x=='driver' || x=='quote' ||  x=='vehicle')
      {
      }
      else{
        group_main[this.dynamic_data['fields'][x]['label']] = this.dynamic_data['fields'][x]['required'] ? new FormControl(this.dynamic_data['form'][x], Validators.required)
        : new FormControl( this.dynamic_data['form'][x]);
      }
  }
   this.dynamic_data=Array.of(this.dynamic_data['fields']);
 // this.form= new FormGroup(group_main);
}
// getdata(event)
// {
  
// console.log(this.FormService.first_form.get('quote').get('agreeNonOwner').value,"event")
// }
  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
  }
 
  getDropdown(selected_drop)
  {
    this.aq3.postJson("Vehicle", "UpdateDropDowns",this.FormService.first_form.get('vehicle').value).subscribe(result => {
      //var vehicleViewData=this.qouteproService.updateDropdowns(this.FormService.first_form.get('vehicle').value);
     
      this.form_dropdown_data.engines=result['viewdata']['engines'];
      this.form_dropdown_data.makes=result['viewdata']['makes'];
      this.form_dropdown_data.modelDescriptions=result['viewdata']['modelDescriptions'];
      this.form_dropdown_data.styleCodes=result['viewdata']['styleCodes'];
      this.form_dropdown_data.trimCodes=result['viewdata']['trimCodes'];
      this.form_dropdown_data.usecodes=result['viewdata']['usecodes'];
      
      
      this.qouteproService.updateSession();
      if(selected_drop=='year')
      {
    
      this.FormService.first_form.get('vehicle').get('make').setValue( this.form_dropdown_data.makes[0]['text']);
      
      this.FormService.first_form.get('vehicle').get('modelDescription').setValue('');
      this.FormService.first_form.get('vehicle').get('trimCode').setValue('');
      this.FormService.first_form.get('vehicle').get('styleCode').setValue('');
      this.FormService.first_form.get('vehicle').get('engine').setValue('');
      this.getDropdown('make');
      }
      if(selected_drop=='make')
    
      {
        this.FormService.first_form.get('vehicle').get('modelDescription').setValue( this.form_dropdown_data.modelDescriptions[0]['text']);
      
       this.FormService.first_form.get('vehicle').get('trimCode').setValue('');
       this.FormService.first_form.get('vehicle').get('styleCode').setValue('');
       this.FormService.first_form.get('vehicle').get('engine').setValue('');
       this.getDropdown('modelDescription');
      }
      
      if(selected_drop=='modelDescription')
      {
        this.FormService.first_form.get('vehicle').get('trimCode').setValue( this.form_dropdown_data.trimCodes[0]['text']);
      
       this.FormService.first_form.get('vehicle').get('styleCode').setValue('');
       this.FormService.first_form.get('vehicle').get('engine').setValue('');
       this.getDropdown('trimCode')
      }
      if(selected_drop=='trimCode')
      {
        this.FormService.first_form.get('vehicle').get('styleCode').setValue( this.form_dropdown_data.styleCodes[0]['text']);
      
       this.FormService.first_form.get('vehicle').get('engine').setValue('');
       this.getDropdown('styleCode')
      }
      if(selected_drop=='styleCode')
      {
        this.FormService.first_form.get('vehicle').get('engine').setValue( this.form_dropdown_data.engines[0]['text']);
      
      }

      
      //return result;
    });
  
  
  }
  gotoAdditionalDriver()
  {
    this.FormService.first_form.get('driver').get('firstName').setValue(this.FormService.first_form.get('firstName').value);
    this.FormService.first_form.get('driver').get('lastName').setValue(this.FormService.first_form.get('lastName').value);
    this.FormService.first_form.get('driver').get('dob').setValue(this.FormService.first_form.get('dob').value);
    this.FormService.first_form.get('driver').get('dob').setValue(this.FormService.first_form.get('dob').value);
    this.qouteproService.postApplicantInformation(this.FormService.first_form.value).subscribe(result => 
     {
      
       this.qouteproService.updateSession();
       this.router.navigate(['quote-pro/additional-driver']);
     })
  
  }
  gotoAdditionalvehicle()
  {
   
    this.FormService.first_form.get('driver').get('firstName').setValue(this.FormService.first_form.get('firstName').value);
   this.FormService.first_form.get('driver').get('lastName').setValue(this.FormService.first_form.get('lastName').value);
   this.FormService.first_form.get('driver').get('dob').setValue(this.FormService.first_form.get('dob').value);
   this.FormService.first_form.get('driver').get('dob').setValue(this.FormService.first_form.get('dob').value);
   this.qouteproService.postApplicantInformation(this.FormService.first_form.value).subscribe(result => 
    {
      this.qouteproService.updateSession();
      this.router.navigate(['quote-pro/additional-vehicle']);
      
    })
  }
  
  lienHoderChange(event)
  {
   
    if(event.target.value) {
      this.FormService.first_form.get('vehicle').get('lhzipcode').setValidators(Validators.required);
      this.FormService.first_form.get('vehicle').get('lhname').setValidators(Validators.required);
      this.FormService.first_form.get('vehicle').get('lhaddress1').setValidators(Validators.required);
      this.FormService.first_form.get('vehicle').get('lhcity').setValidators(Validators.required);
      this.FormService.first_form.get('vehicle').get('lhstate').setValidators(Validators.required);
    } else {
      
      this.FormService.first_form.get('vehicle').get('lhzipcode').clearValidators();
      this.FormService.first_form.get('vehicle').get('lhname').clearValidators();
      this.FormService.first_form.get('vehicle').get('lhaddress1').clearValidators();
      this.FormService.first_form.get('vehicle').get('lhcity').clearValidators();
      this.FormService.first_form.get('vehicle').get('lhstate').clearValidators();
    }
    this.FormService.first_form.get('vehicle').updateValueAndValidity(); 
  }
  submit()
  {
//console.log("FormService",JSON.stringify(this.FormService.first_form.value))
    this.FormService.first_form.get('driver').get('firstName').setValue(this.FormService.first_form.get('firstName').value);
    this.FormService.first_form.get('driver').get('lastName').setValue(this.FormService.first_form.get('lastName').value);
    this.FormService.first_form.get('driver').get('dob').setValue(this.FormService.first_form.get('dob').value);
    if(this.FormService.first_form.valid)
    {
     // console.log(JSON.stringify(this.FormService.first_form.value),'postApplicantInformation')
   this.qouteproService.postApplicantInformation(this.FormService.first_form.value).subscribe(result => 
    {
      console.log(result,"result")
      if(result['errors']!=undefined)
{
  console.log(result['errors'],"errors")
  if(result['fields'])
  {
    this.form_fields=result['fields']; 
  }
else
{
  alert(result['errors'][0]);
}

}
else
{
  this.qouteproService.updateSession();
this.router.navigate(['quote-pro/quotation']);
      
}
      
    }
    
  )
  }
  else
  {
    this.FormService.first_form.markAllAsTouched();
  }

  }
  gotoviolation()
  {
    this.FormService.first_form.get('driver').get('firstName').setValue(this.FormService.first_form.get('firstName').value);
   this.FormService.first_form.get('driver').get('lastName').setValue(this.FormService.first_form.get('lastName').value);
   this.FormService.first_form.get('driver').get('dob').setValue(this.FormService.first_form.get('dob').value);
 
   if(this.FormService.first_form.valid)
   {
  
   this.qouteproService.postApplicantInformation(this.FormService.first_form.value).subscribe(result => 
    {
      this.qouteproService.updateSession();
      if( this.FormService.first_form.get('driver').get('maritalStatus').value=='M')
      {
        this.router.navigate(['/quote-pro/additional-driver']);
      }
      else
      {
        this.router.navigate(['quote-pro/add-violations']);
      }
    }
    
  )
  
   }
   else
   {
    this.FormService.first_form.markAllAsTouched();
   }
  }
  get_current_carrier(event)
  {
// console.log(event.value);
// var a:any=this.form_dropdown_data['carriers'].filter(e => {
//  if((e.text).includes(event.value))
//  {
//    return e;
//  }
// })
// console.log(a,"aaaaaaaaaaa");
  }

  loadmap(e)
{
  if(e.target.value){
    this.initService();
    var service = new google.maps.places.AutocompleteService();
    service.getPlacePredictions({ input: 'USA' }, this.displaySuggestions);
     console.log(this.displaySuggestions,"sujjest")
    this.ref.detectChanges();
  }
 }
 
 initService() {
  const displaySuggestions = (predictions, status) => {
      if (status != google.maps.places.PlacesServiceStatus.OK) {
           //alert(status);
          return;
      }
  this.displaySuggestions=[];
  console.log(predictions,"sujjest")
      this.displaySuggestions=predictions;
  };

  // change the string inside the input property as you wish and get the predicted list stored in a variable
  const service = new google.maps.places.AutocompleteService();
  console.log(this.FormService.first_form.get('address').value,"address")
  service.getPlacePredictions({ input: this.FormService.first_form.get('address').value }, displaySuggestions);
}
selectAddress(item)
{
  this.displaySuggestions=[];
  //this.addressText='';
  this.FormService.first_form.get('address').setValue(item['structured_formatting'].main_text);
  //this.motorcycle.get('addresss').setValue(item['structured_formatting'].main_text);
  this.address_sub_text=item['structured_formatting'].secondary_text;
                 
// console.log('item',item['structured_formatting'])
}

}




