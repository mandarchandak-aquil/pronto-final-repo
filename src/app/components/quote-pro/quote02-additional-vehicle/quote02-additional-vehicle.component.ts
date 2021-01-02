import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { qouteproService } from '../../../commons/services/qoute-pro/qoute-pro.service';
import { QuoteProFormService } from '../quote-pro-form.service';
import { JsonApiService } from '@quotepro/aq3';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-quote02-additional-vehicle',
  templateUrl: './quote02-additional-vehicle.component.html',
  styleUrls: ['./quote02-additional-vehicle.component.css']
})
export class Quote02AdditionalVehicleComponent implements OnInit {
  Add_vehicle_form:FormGroup;
  form_dropdown_data:any='';
  form_fields:any='';
  all_vehicles:any;
  index:any='';
  removevehicle_id:any='';
  removevehicle_index:any='';
  removevehicle_data:any='';
  constructor(private activeroute:ActivatedRoute,public router: Router,private route: ActivatedRoute, private aq3:JsonApiService,public FormService:QuoteProFormService,private fb: FormBuilder,private qouteproService:qouteproService) {
    


  }

  ngOnInit(): void {
    
    this.Add_vehicle_form=this.fb.group({
      id:['', [Validators.required ]],
      isLastVehicle:[''],
      addAnotherVehicle:[''],
      vehicleNumber:[''],
      isoVinNumber:['',],
      actualValue:[''],
      costNew:[''],
      strictValidation:[''],
      imsControl:[''],
      quickLookup:[''],
      fullLookup:[''],
      vinNumber:[''],
      year:['',[Validators.required]],
      make:['',[Validators.required]],
      modelDescription:['',[Validators.required]],
      trimCode:['',[Validators.required]],
      styleCode:['',[Validators.required]],
      engine:['',[Validators.required]],
      usecode:['',[Validators.required]],
      lengthOwned:[''],
      dailyMiles:[''],
      miles1Way:[''],
      annualMiles:[''],
      rideSharing:['',[Validators.required]],
      ownership:['',[Validators.required]],
      lienHolder:['',[Validators.required]],
      lhname:[''],
      lhaddress1:[''],
      lhzipcode:[''],
      lhcity:[''],
      lhstate:[''],
    });
    this.Add_vehicle_form.get('lienHolder').valueChanges.subscribe(lien =>{
      console.log(lien,"lien holder")
    })
    this.aq3.getJson("Vehicle", "Create", {id: 0})
    .subscribe(result => {
      console.log(result,"lien holder")
      this.form_dropdown_data=result['viewdata'];
      this.form_fields=result['fields']; 
      this.Add_vehicle_form.patchValue(result['form']);
      this.Add_vehicle_form.get('usecode').setValue((result['form']['usecode']).toString())
      this.Add_vehicle_form.get('ownership').setValue((result['form']['ownership']).toString())
      this.qouteproService.updateSession();
      this.FormService.generateVehicleArray();
      this.FormService.assignLocalToVahicle();
      this.all_vehicles=this.FormService.vehicle_array.get('vehicles').value
      this.activeroute.params.subscribe(result => {
        console.log(result.index,"result.index")
        this.index=result.index;
        if(this.index!='' && this.index!=undefined)
      {
        this.edit_vehicle(this.index);
       
      }
    })
      
      console.log(result['form']['usecode'],"createVehicle")
    })
  
  }
add_anather_vehicle()
{
  this.aq3.getJson("Vehicle", "Create", {id: 0})
  .subscribe(result => {
    
    this.form_dropdown_data=result['viewdata'];
    this.form_fields=result['fields']; 
    this.Add_vehicle_form.patchValue(result['form']);
    this.Add_vehicle_form.get('usecode').setValue((result['form']['usecode']).toString())
    this.Add_vehicle_form.get('ownership').setValue((result['form']['ownership']).toString())
    this.qouteproService.updateSession();
    this.FormService.generateVehicleArray();
    this.FormService.assignLocalToVahicle();
    this.all_vehicles=this.FormService.vehicle_array.get('vehicles').value;
   
  })
}
getDropdown(selected_drop)
{

  this.aq3.postJson("Vehicle", "UpdateDropDowns",this.Add_vehicle_form.value).subscribe(result => {
    this.form_dropdown_data.engines=result['viewdata']['engines'];
    this.form_dropdown_data.makes=result['viewdata']['makes'];
    this.form_dropdown_data.modelDescriptions=result['viewdata']['modelDescriptions'];
    this.form_dropdown_data.styleCodes=result['viewdata']['styleCodes'];
    this.form_dropdown_data.trimCodes=result['viewdata']['trimCodes'];    
    
    this.qouteproService.updateSession();
    if(selected_drop=='year')
    {
  
    this.Add_vehicle_form.get('make').setValue( this.form_dropdown_data.makes[0]['text']);
    
    this.Add_vehicle_form.get('modelDescription').setValue('');
    this.Add_vehicle_form.get('trimCode').setValue('');
    this.Add_vehicle_form.get('styleCode').setValue('');
    this.Add_vehicle_form.get('engine').setValue('');
    this.getDropdown('make');
    }
    if(selected_drop=='make')
  
    {
      this.Add_vehicle_form.get('modelDescription').setValue( this.form_dropdown_data.modelDescriptions[0]['text']);
    
     this.Add_vehicle_form.get('trimCode').setValue('');
     this.Add_vehicle_form.get('styleCode').setValue('');
     this.Add_vehicle_form.get('engine').setValue('');
     this.getDropdown('modelDescription');
    }
    
    if(selected_drop=='modelDescription')
    {
      this.Add_vehicle_form.get('trimCode').setValue( this.form_dropdown_data.trimCodes[0]['text']);
    
     this.Add_vehicle_form.get('styleCode').setValue('');
     this.Add_vehicle_form.get('engine').setValue('');
     this.getDropdown('trimCode')
    }
    if(selected_drop=='trimCode')
    {
      this.Add_vehicle_form.get('styleCode').setValue( this.form_dropdown_data.styleCodes[0]['text']);
    
     this.Add_vehicle_form.get('engine').setValue('');
     this.getDropdown('styleCode')
    }
    if(selected_drop=='styleCode')
    {
      this.Add_vehicle_form.get('engine').setValue( this.form_dropdown_data.engines[0]['text']);
    
    }

  });
}
setDropdown(selected_drop)
{

  this.aq3.postJson("Vehicle", "UpdateDropDowns",this.Add_vehicle_form.value).subscribe(result => {
    this.form_dropdown_data.engines=result['viewdata']['engines'];
    this.form_dropdown_data.makes=result['viewdata']['makes'];
    this.form_dropdown_data.modelDescriptions=result['viewdata']['modelDescriptions'];
    this.form_dropdown_data.styleCodes=result['viewdata']['styleCodes'];
    this.form_dropdown_data.trimCodes=result['viewdata']['trimCodes'];    
    
    this.qouteproService.updateSession();
    
  });
}
edit_vehicle(i)
{
  this.Add_vehicle_form.patchValue((<FormArray>this.FormService.vehicle_array.controls['vehicles']).at(i).value);
  this.Add_vehicle_form.get('usecode').setValue((this.Add_vehicle_form.get('usecode').value).toString())
  this.Add_vehicle_form.get('ownership').setValue((this.Add_vehicle_form.get('ownership').value).toString())
  
  
this.Add_vehicle_form.updateValueAndValidity();
this.setDropdown('year'); 
}
remove_vehicle()
{

    this.aq3.postJson("Vehicle", "Delete", {id: this.removevehicle_id})
    .subscribe(response => {
      console.log(response);
      (<FormArray>this.FormService.vehicle_array.controls['vehicles']).removeAt(this.removevehicle_index);
      this.all_vehicles=this.FormService.vehicle_array.get('vehicles').value
      this.removevehicle_data='';
      this.removevehicle_id='';
      this.removevehicle_index='';
     
      this.qouteproService.updateSession();
      setTimeout(() => {

        this.qouteproService.updateSidebar();
              }, 1500);
    })
    document.getElementById('close_modal_id').click();
  
}
remove_vehicle_popup(i,id)
{
console.log(i,id);
if(i>0)
{
this.removevehicle_id=id;
this.removevehicle_index=i;
this.removevehicle_data=(<FormArray>this.FormService.vehicle_array.controls['vehicles']).at(i).value;
document.getElementById('remove_vehicle_id').click();
} 
  
}
submit()
{
   
if(this.Add_vehicle_form.get('id').value==0)
{
  console.log(this.Add_vehicle_form.value,"if")
  this.aq3.postJson("Vehicle", "Create",this.Add_vehicle_form.value).subscribe(response => {
console.log(response,"Vehicle update");
this.qouteproService.updateSession();
if(response['errors']!=undefined)
{
  if(response['fields']==undefined)
  {
   alert(response['errors'][0]);
  //  this.router.navigate(['quote-pro/01']);
  }
  else{
    this.form_fields=response['fields']; 
  }
}

else
{
  this.router.navigate(['quote-pro/quotation']);
}
  })
}
else
{
  this.aq3.postJson("Vehicle", "Delete", {id: this.Add_vehicle_form.get('id').value})
    .subscribe(response => {
      this.qouteproService.updateSession();
        
        this.aq3.getJson("Vehicle", "Create", {id: 0})
    .subscribe(result => {
      let old_form:any=this.Add_vehicle_form.value;
    this.Add_vehicle_form.patchValue(result['form']);  
    this.Add_vehicle_form.updateValueAndValidity();
    this.qouteproService.updateSession();
    this.Add_vehicle_form.get('year').setValue(old_form['year']);
    this.Add_vehicle_form.get('make').setValue(old_form['make']);
    this.Add_vehicle_form.get('modelDescription').setValue(old_form['modelDescription']);
    this.Add_vehicle_form.get('trimCode').setValue(old_form['trimCode']);
    this.Add_vehicle_form.get('styleCode').setValue(old_form['styleCode']);
    this.Add_vehicle_form.get('engine').setValue(old_form['engine']);
    this.Add_vehicle_form.get('usecode').setValue(old_form['usecode']);
    this.Add_vehicle_form.get('rideSharing').setValue(old_form['rideSharing']);
    this.Add_vehicle_form.get('ownership').setValue(old_form['ownership']);
    this.Add_vehicle_form.get('lienHolder').setValue(old_form['lienHolder']);
    this.Add_vehicle_form.get('lhaddress1').setValue(old_form['lhaddress1']);
    this.Add_vehicle_form.get('lhzipcode').setValue(old_form['lhzipcode']);
    this.Add_vehicle_form.get('lhcity').setValue(old_form['lhcity']);
    this.Add_vehicle_form.get('lhstate').setValue(old_form['lhstate']);
    this.Add_vehicle_form.get('lhname').setValue(old_form['lhname']);
//console.log(this.Add_vehicle_form,"Add_vehicle_form")
this.aq3.postJson("Vehicle", "Create",this.Add_vehicle_form.value).subscribe(response1 => {
  this.qouteproService.updateSession();
  if(response1['errors']!=undefined)
{
  if(response1['fields']==undefined)
  {
   alert(response1['errors'][0]);
  //  this.router.navigate(['quote-pro/01']);
  }
  else{
    this.form_fields=response1['fields']; 
  }
}

else
{
  this.router.navigate(['quote-pro/quotation']);
}
    })
    
    });
       
            
      
    })
 
}

}
}
