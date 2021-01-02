import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { oneInkDriverFormService } from '../oneink-driver-form.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import {validateBeforeCurrentDate} from '../../../commons/validators/before-current-date.validator';
import { oneInkDropdownService } from '../../../commons/services/one-ink/one-ink-dropdowns.service';
import { Subject } from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import { oneInkService } from '../../../commons/services/one-ink/one-ink.service';
import { oneInkExcludeDriverFormService } from '../oneink-exclude-driver-form.service';
@Component({
  selector: 'app-undisclosed-drivers-list',
  templateUrl: './undisclosed-drivers-list.component.html',
  styleUrls: ['./undisclosed-drivers-list.component.css']
})
export class UndisclosedDriversListComponent implements OnInit {
  @ViewChild('delete_exclude_dialog') delete_exclude_dialog: ElementRef<HTMLElement>;

  undisclosedDrivers_list:any=[];
  excludedDrivers_list:any=[];
  includedDrivers_list:any=[];

  undisclosedForm: FormGroup;
  qouteId: string;
  isRejectDriver: boolean[];
  rejectReason:any=[];
  undisclosed_done:boolean=false;
  json_driver_local:any;
  unsubscribe: Subject<void>;
  delete_index;
  delete_id;
  constructor(public oneInkExcludeDriver:oneInkExcludeDriverFormService,public oneInkService:oneInkService,private oneinkdropdown:oneInkDropdownService,public oneInkDriverForm:oneInkDriverFormService,public router: Router, private  fb: FormBuilder) { 
    this.unsubscribe = new Subject();
    this.getReason();
    this.assignExcludeDrivers();
  }

  ngOnInit(): void {
    this.qouteId=localStorage.getItem('oneink_qouteId');
    
    this.undisclosedDrivers_list = JSON.parse(localStorage.getItem("oneink_undisclosedDrivers"));
     
   //this.excludedDrivers_list=JSON.parse(localStorage.getItem("oneink_excludedDrivers"));  
   this.undisclosedForm = this.fb.group({});
   this.isRejectDriver = [];
   this.setUpUndisclosedForm();
   this.excludedDrivers_list=this.oneInkExcludeDriver.drivers_array$.value;
  }
  ngAfterViewInit()
  {
    this.includedDrivers_list=this.oneInkDriverForm.drivers_array$.get('driver').value;
    console.log(this.includedDrivers_list,"this.includedDrivers_list")
  }
  assignExcludeDrivers()
  {
    var json_exclude_driver_local = JSON.parse(localStorage.getItem("oneink_excludedDrivers"));

    
    if(json_exclude_driver_local!=undefined && json_exclude_driver_local!=null && this.oneInkExcludeDriver.drivers_array$==undefined)
    {
      this.oneInkExcludeDriver.getDriverForm();
      this.oneInkExcludeDriver.assignLocalToDriver(json_exclude_driver_local);
      console.log(this.oneInkExcludeDriver.drivers_array$.value,"oneInkExcludeDriver.drivers_array$")
    }
  }
  private setUpUndisclosedForm() {
    const undisclosedDriversControlArray = [];
    this.undisclosedDrivers_list.forEach((item) => {
     undisclosedDriversControlArray.push(this.fb.group({
        driverAction: [undefined, Validators.required],
        driverName: [item['person']['fullName']],
        driverId: [item['id']]
      }));
      this.isRejectDriver.push(false);

    });
    this.undisclosedForm.addControl('undisclosedDrivers', this.fb.array(undisclosedDriversControlArray));
    this.undisclosedForm.get('undisclosedDrivers')['controls'].forEach((currentFormGroup, index: number) => {
      currentFormGroup.controls.driverAction.valueChanges.subscribe(isValueReject => {
        this.setRejectForm(isValueReject, index, currentFormGroup);
      });
    });
  }
  private setRejectForm(isValueReject: string, index: number, currentFormGroup: FormGroup) {
    if (isValueReject === 'rejectDriver') {
      currentFormGroup.addControl('rejectReason', this.fb.control(undefined, Validators.required));
      currentFormGroup.addControl('rejectNote', this.fb.control(undefined, Validators.maxLength(4000)));
      this.isRejectDriver[index] = true;
    } else {
      this.isRejectDriver[index] = false;
      currentFormGroup.removeControl('rejectReason');
      currentFormGroup.removeControl('rejectNote');
    }
  }
  submit()
  {
    this.oneInkService.error_msg='';
 console.log(this.undisclosedForm.get('undisclosedDrivers').value,"undisclosedForm")
 const formval=this.undisclosedForm.get('undisclosedDrivers').value;
 localStorage.setItem('undisclosedForm',JSON.stringify(formval));
 var total=0;
 var close_foreach=false;
 var next_set_path='';
 var param=[];
this.handelNextNavigation_new()

}
handelNextNavigation_new()
{
 
  var formval:any=JSON.parse(localStorage.getItem('undisclosedForm'));
  
for(var i=0;i<formval.length;i++)
{
 console.log(formval[i])
   if(formval[i].driverAction=='includeDriver')
   {
    localStorage.setItem('undisclosedFlowDone',"no");
     this.router.navigate(['/one-ink/undisclosed-include',{'current_index':i,"edit":'no'}]);
     
      return 0;
   }
   
   else if(formval[i].driverAction=='excludeDriver')
   {
    localStorage.setItem('undisclosedFlowDone',"no");
    this.router.navigate(['/one-ink/undisclosed-exclude',{'current_index':i,"edit":'no'}]);
   
    return 0;
   }
   else if(formval[i].driverAction=='rejectDriver')
   {
    var reject_model:any=
    {
      'quoteId':localStorage.getItem('oneink_qouteId'),
      'excludedDriverId': formval[i].driverId,
      'model':
       {"rejectionReason":formval[i].rejectReason,"rejectionNote":formval[i].rejectNote}
    }
    this.oneInkService.RejectDriver(reject_model).pipe(takeUntil(this.unsubscribe)).subscribe(result => 
      {
        if(result['errors'])
        {
          this.oneInkService.error_msg=result['errors'][0]['message']; 
        }
       
  });
   
  }
  if(i==formval.length-1)
  {

    this.router.navigate(['/one-ink/quote-summary']);
    localStorage.setItem('undisclosedFlowDone',"yes");
  }
}
 

}
  filterDropdown(result)
  {
    console.log(result)
    var jsonToBeUsed = [];
    for (var type in result) {
     var item = {};
     item['name'] = result[type];
     jsonToBeUsed.push(item);
 }
 return jsonToBeUsed;
  }
  getReason()
  {

    this.oneinkdropdown.getrejectionDriverReason().pipe(takeUntil(this.unsubscribe)).subscribe(result => 
      {
        console.log(result,"result")
        this.rejectReason=this.filterDropdown(result);
  });
}
open_delete_popup(id,index)
{
  console.log(index,"iddddd");
  this.delete_index=index;
  this.delete_id=id;
  let el: HTMLElement = this.delete_exclude_dialog.nativeElement;
  el.click();
}
delete_exclude_driver()
{
  var delete_model=
  {
    'quoteId':localStorage.getItem('oneink_qouteId'),
      'excludedDriverId': this.delete_id,
  }
  console.log(delete_model,"delete_model")
  
  this.oneInkService.DeleteExcludeDriver(delete_model).pipe(takeUntil(this.unsubscribe)).subscribe(delete_result => 
    {
   console.log(delete_result,"delete_result");
   (<FormArray>this.oneInkExcludeDriver.drivers_array$.controls['driver']).removeAt(this.delete_index);
   this.excludedDrivers_list=this.oneInkExcludeDriver.drivers_array$.value;
   var json_exclude_driver_local = JSON.parse(localStorage.getItem("oneink_excludedDrivers"));
   delete json_exclude_driver_local[this.delete_index];
   localStorage.setItem("oneink_excludedDrivers",json_exclude_driver_local);
});

}
edit_exclude_driver(i)
{
  this.router.navigate(['/one-ink/undisclosed-exclude',{'current_index':i,"edit":'yes'}]);
}

}

















