
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { oneInkDriverFormService } from '../oneink-driver-form.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import {validateBeforeCurrentDate} from '../../../commons/validators/before-current-date.validator';
import { oneInkDropdownService } from '../../../commons/services/one-ink/one-ink-dropdowns.service';

import { Subject } from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import { violet } from 'color-name';
@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.css']
})
export class DriverListComponent implements OnInit {
  @ViewChild('delete_dialog') delete_dialog: ElementRef<HTMLElement>;
 driver_list:any=[];
 voilation_list:any=[];
 accident_list:any=[];
 violation_form:FormGroup;
 accident_form:FormGroup;
 
  qouteId;
  json_driver_local:any;
  unsubscribe: Subject<void>;
  delete_driver_index;
  sub_delete_id;
  delete_type;
 
  constructor(private oneinkdropdown:oneInkDropdownService,public oneInkDriverForm:oneInkDriverFormService,public router: Router, private  fb: FormBuilder) { 
    this.unsubscribe = new Subject();
    this.getAccidentList();
    this.getVoilationList();
  }

  ngOnInit(): void {

    this.json_driver_local = JSON.parse(localStorage.getItem("oneink_drivers"));
    if(this.json_driver_local!=undefined && this.json_driver_local!=null)
    {
      this.oneInkDriverForm.getDriverForm();
      this.oneInkDriverForm.assignLocalToDriver(this.json_driver_local)
    }
  
    this.qouteId=localStorage.getItem('oneink_qouteId');
    this.driver_list=this.oneInkDriverForm.drivers_array$.value
    this.setup_form();
    this.oneInkDriverForm.drivers_array$.valueChanges.subscribe(value => { 
     // console.log(value,"value")
      this.oneInkDriverForm.saveResponse(value.driver, "driver")
    });
  }
  setup_form()
  {
    this.violation_form=  this.fb.group({
      violation_date: ['', Validators.compose([
          Validators.required,
          validateBeforeCurrentDate
        ])],
        violation_desc: ['']
    });
    this.accident_form=  this.fb.group({
      accident_date: ['', Validators.compose([
          Validators.required,
          validateBeforeCurrentDate
        ])],
        accident_desc: ['']
        
      
    });
  }
  getAccidentList()
  {
    this.oneinkdropdown.getAccidentType().pipe(takeUntil(this.unsubscribe)).subscribe(accident => 
      {
  this.accident_list=accident;
     console.log(accident,"accident")
  
  });
  }

  getVoilationList()
  {
    this.oneinkdropdown.getVoilationType().pipe(takeUntil(this.unsubscribe)).subscribe(voilation => 
      {
    this.voilation_list=voilation;
  
  });
  }
  getAccidentFromID(id)
  {
    var name= this.accident_list.filter(accident =>accident.id === id)
.map((acc: any) => {
  return acc.name
});
return name;
  }
  getVoilalationFromID(id)
  {
    var name= this.voilation_list.filter(voilation =>voilation.id === id)
.map((voi: any) => {
  return voi.name
});
return name;
  }
  submit()
  {
   // console.log(JSON.parse(localStorage.getItem('oneinc_vehicle')).vehicle.length,"JSON.stringify(localStorage.getItem('oneinc_vehicle'))")
    if(localStorage.getItem('oneinc_vehicle') && JSON.parse(localStorage.getItem('oneinc_vehicle')).vehicle.length>0)
    {
      this.router.navigate(['/one-ink/02-c']);
    }
    else
    {
      this.router.navigate(['/one-ink/02-b']);
    }
    
  }
  gotolnclude_driver()
  {
    this.router.navigate(['/one-ink/include-driver']);
  }
  voilation_flip(index)
  {
    
    var voilation=<HTMLInputElement> document.getElementById('Violation_form_id'+index);
    var accindent=<HTMLInputElement> document.getElementById('accident_form_id'+index);
    voilation.style.display="block";
    accindent.style.display="none";

   
  }
  Accident_flip(index)
  {
    var voilation=<HTMLInputElement> document.getElementById('Violation_form_id'+index);
    var accindent=<HTMLInputElement> document.getElementById('accident_form_id'+index);
    voilation.style.display="none";
    accindent.style.display="block";
  }
  add_voilation(index)
  {
    
   
    console.log(this.violation_form.value)
  this.oneInkDriverForm.generateViolation(index,this.violation_form.value)
  this.driver_list=this.oneInkDriverForm.drivers_array$.value;
  console.log(this.oneInkDriverForm.drivers_array$.value,"mormmmmm")
  }
  add_accident(index)
  {
   
    this.oneInkDriverForm.generateAccident(index,this.accident_form.value)
    this.driver_list=this.oneInkDriverForm.drivers_array$.value;
    console.log(this.oneInkDriverForm.drivers_array$.value)
  }

  edit_driver(index)
  {
    if(index==0)
    {
      this.router.navigate(['/one-ink/primary-details']);
    }
    else
    {
      this.router.navigate(['/one-ink/include-driver', { index: index }]);
    }
 
  }
  cancel(index)
  {
    var voilation=<HTMLInputElement> document.getElementById('Violation_form_id'+index);
    var accindent=<HTMLInputElement> document.getElementById('accident_form_id'+index);
    voilation.style.display="none";
    accindent.style.display="none";
  }
  open_delete_popup(id,index,type)
{
  console.log(index,"iddddd");
  this.delete_driver_index=id;
  this.sub_delete_id=index;
  this.delete_type=type;
  let el: HTMLElement = this.delete_dialog.nativeElement;
  el.click();
}
delete_model_click()
{
if(this.delete_type=='Violation')
{
  console.log('remove_violation');
  this.remove_violation(this.delete_driver_index,this.sub_delete_id)

}
if(this.delete_type=='Accident')
{
  console.log('remove_accident');
  this.remove_accident(this.delete_driver_index,this.sub_delete_id)
}
if(this.delete_type=='Driver')
{
  console.log('remove_accident');
  this.remove_driver(this.delete_driver_index)
}
}
remove_driver(index)
{
  var control = (<FormArray>this.oneInkDriverForm.drivers_array$.controls['driver']);

    control.removeAt(index);
    this.driver_list=this.oneInkDriverForm.drivers_array$.value;
}
remove_accident(index,accident_index)
{
  var control = (<FormArray>((<FormArray>this.oneInkDriverForm.drivers_array$.controls['driver']).at(index))).controls['AccidentsArray'];

    control.removeAt(accident_index);
    this.driver_list=this.oneInkDriverForm.drivers_array$.value;
}
remove_violation(index,violation_index)
{
  var control = (<FormArray>((<FormArray>this.oneInkDriverForm.drivers_array$.controls['driver']).at(index))).controls['violationsArray'];

  control.removeAt(violation_index);
  this.driver_list=this.oneInkDriverForm.drivers_array$.value;
}
}
















