import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { qouteproService } from '../../../commons/services/qoute-pro/qoute-pro.service';
import { QuoteProFormService } from '../quote-pro-form.service';
import { JsonApiService } from '@quotepro/aq3';
import { ActivatedRoute, Router } from '@angular/router';
import { validate } from 'json-schema';

@Component({
  selector: 'app-add-violations',
  templateUrl: './add-violations.component.html',
  styleUrls: ['./add-violations.component.css']
})
export class AddViolationsComponent implements OnInit {

  Add_violation_form:FormGroup;
  form_dropdown_data:any='';
  form_fields:any='';
  all_vehicles:any;
  constructor(public router: Router,private route: ActivatedRoute, private aq3:JsonApiService,public FormService:QuoteProFormService,private fb: FormBuilder,private qouteproService:qouteproService) {

  }

  ngOnInit(): void {
    
    this.Add_violation_form=this.fb.group({
      driver_Id:['',[Validators.required]],
  id:[''],
  location:['',[Validators.required]],
  strictValidation:[false],
  vehicleNumber:['',[Validators.required]],
  violationCode:['',[Validators.required]],
  violationDate:['',[Validators.required]],
  violationType:['',[Validators.required]]
    });
  
  this.aq3.getJson('Violation', 'Index')
  .subscribe(result => {
    this.form_dropdown_data=result['viewdata'];
    console.log(result,"result")
  })
  }

// edit_vehicle(i)
// {
//   this.Add_vehicle_form.patchValue((<FormArray>this.FormService.vehicle_array.controls['vehicles']).at(i).value)
// this.Add_vehicle_form.updateValueAndValidity();
// }
// remove_vehicle(i,id)
// {
// console.log(i,id);
//     this.aq3.postJson("Vehicle", "Delete", {id: id})
//     .subscribe(response => {
//       console.log(response);
//       (<FormArray>this.FormService.vehicle_array.controls['vehicles']).removeAt(i);
//       this.all_vehicles=this.FormService.vehicle_array.get('vehicles').value
//       this.qouteproService.updateSession();
//     })
  
  
// }
submit()
{
  console.log(this.Add_violation_form)
   this.aq3.postJson('Violation', 'Create', this.Add_violation_form.value)
    .subscribe(result => {
     
      console.log(result,"add violation")
      this.qouteproService.updateSession();
      this.router.navigate(['quote-pro/quotation']);
    })
  }
}

