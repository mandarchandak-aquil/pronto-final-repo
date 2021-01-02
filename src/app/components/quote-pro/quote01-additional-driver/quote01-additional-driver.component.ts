
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { qouteproService } from '../../../commons/services/qoute-pro/qoute-pro.service';
import { QuoteProFormService } from '../quote-pro-form.service';
import { JsonApiService } from '@quotepro/aq3';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-quote01-additional-driver',
  templateUrl: './quote01-additional-driver.component.html',
  styleUrls: ['./quote01-additional-driver.component.css']
})
export class Quote01AdditionalDriverComponent implements OnInit {

  Add_driver_form:FormGroup;
  form_dropdown_data:any='';
  form_fields:any='';
  all_drivers:any;
  edit:boolean=false;
  removedriver_id:any='';
  removedriver_index:any='';
  removedriver_data:any='';
  exclude_option:any=[
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
  constructor(private activeroute:ActivatedRoute,public router: Router,private route: ActivatedRoute, private aq3:JsonApiService,public FormService:QuoteProFormService,private fb: FormBuilder,private qouteproService:qouteproService) {
    


  }

  ngOnInit(): void {
    this.Add_driver_form= this.fb.group({
      "id":[''],
      "isLastDriver":[''],
      "driverNumber":[''],
      "firstName":[''],
      "middleInitial":[''],
      "lastName":[''],
      "excluded":[''],
      "relationship":[''],
      "gender": ['',[Validators.required]],
      "dob":[''],
      "occupation":[''],
          "maritalStatus": ['',[Validators.required]],
          "licType":['',[Validators.required]],
          "datelicenced": [''],
          "stateLicensed":[''],
          "licenseNo":[''],
          "educationLevel":[''],
          "licSusRev": [''],
          "sr22": [''],
          "dsr22Case":[''],
          "dsr22Date":[''],
          "dsr22Reason":[''],
          "anyViolations": [''],
    })
    this.aq3.getJson("Driver", "Create", {id: 0})
    .subscribe(result => {
      console.log(result,"resulraa")
      this.form_dropdown_data=result['viewdata'];
      this.form_fields=result['fields']; 
      this.Add_driver_form.patchValue(result['form']);
      // this.Add_driver_form.get('usecode').setValue((result['form']['usecode']).toString())
      // this.Add_driver_form.get('ownership').setValue((result['form']['ownership']).toString())
      this.qouteproService.updateSession();
      this.FormService.generateDriverArray();
      this.FormService.assignLocalToDriver();
      this.all_drivers=this.FormService.driver_array.get('drivers').value;
      this.activeroute.params.subscribe(result => {
       console.log(result)
        if(result.index!=undefined )
      {
        console.log(result.index,"innnn")
        this.edit_driver(result.index);
      }
    
    })
      console.log(this.all_drivers,"createDriver")
    })
  }
  
  edit_driver(i)
{
  this.Add_driver_form.patchValue((<FormArray>this.FormService.driver_array.controls['drivers']).at(i).value)
  console.log()
  this.Add_driver_form.get('dob').setValue(moment(new Date((<FormArray>this.FormService.driver_array.controls['drivers']).at(i).value['dob'])).format('MM/DD/YYYY'))    
this.Add_driver_form.updateValueAndValidity();
this.edit=true;
}
remove_driver_popup(i,id)
{
console.log(i,id);
if(i>0)
{
this.removedriver_id=id;
this.removedriver_index=i;
this.removedriver_data=(<FormArray>this.FormService.driver_array.controls['drivers']).at(i).value;
document.getElementById('remove_driver_id').click();
    // this.aq3.postJson("Driver", "Delete", {id: id})
    // .subscribe(response => {
    //   console.log(response);
    //   (<FormArray>this.FormService.driver_array.controls['drivers']).removeAt(i);
    //   this.all_drivers=this.FormService.driver_array.get('drivers').value;
    //   this.qouteproService.updateSession();
    // })
}
}
remove_driver()
{
    this.aq3.postJson("Driver", "Delete", {id: this.removedriver_id})
    .subscribe(response => {
      console.log(response);
      (<FormArray>this.FormService.driver_array.controls['drivers']).removeAt(this.removedriver_index);
      this.all_drivers=this.FormService.driver_array.get('drivers').value;
this.removedriver_data='';
this.removedriver_id='';
this.removedriver_index='';
      this.qouteproService.updateSession();
      setTimeout(() => {
        
this.qouteproService.updateSidebar();
      }, 1500);
      document.getElementById('close_modal_id').click();
    })
  
}
add_anather()
{
  this.aq3.getJson("Driver", "Create", {id: 0})
    .subscribe(result => {
      console.log(result,"resulraa")
      this.form_dropdown_data=result['viewdata'];
      this.form_fields=result['fields']; 
      this.Add_driver_form.reset();
      this.Add_driver_form.patchValue(result['form']);
      this.qouteproService.updateSession();
      this.FormService.generateDriverArray();
      this.FormService.assignLocalToDriver();
      this.all_drivers=this.FormService.driver_array.get('drivers').value;
     }) 
}
submit()
{

 if(!this.edit)
 {
  this.aq3.postJson("Driver", "Create",this.Add_driver_form.value).subscribe(response => {
console.log(response,"driver");
if(response['errors']!=undefined)
{
  if(response['fields']==undefined)
  {
   alert(response['errors'][0]);
   this.router.navigate(['quote-pro/01']);
  }
  else{
    this.form_fields=response['fields']; 
  }


}
else
{
  this.router.navigate(['quote-pro/quotation']);
}
    this.qouteproService.updateSession();
  })
}
else
{
  this.aq3.postJson("Driver", "Edit",this.Add_driver_form.value).subscribe(response => {
    console.log(response,"editdriver")
   
  this.router.navigate(['quote-pro/quotation']);
       this.qouteproService.updateSession();
        
      })
}
this.edit=false;
//this.Add_driver_form.reset();

}

}
