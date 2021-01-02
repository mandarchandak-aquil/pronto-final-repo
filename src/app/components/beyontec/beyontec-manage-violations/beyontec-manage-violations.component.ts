import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../commons/services/common/common.service';
import { BeyontecService } from '../../../commons/services/beyontec/beyontec.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BeyontecFormService } from '../beyontec-form.service';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ProductCondoInsuranceModule } from '../../product-condo-insurance/product-condo-insurance.module';
import * as moment from 'moment';

@Component({
  selector: 'app-beyontec-manage-violations',
  templateUrl: './beyontec-manage-violations.component.html',
  styleUrls: ['./beyontec-manage-violations.component.css', '../../../commons/styles.css']
})
export class BeyontecManageViolationsComponent implements OnInit {
  voilation_add:FormGroup;
  json_voilation:any;
  driver_index:any;
  isClicked :boolean = false;
  voilationArray = [];
  finallen : any;
  editIndex : any = null;
  lenNo = 0;
  violationSelectedList :any;
  add_driver : any;
  errormessage;
  datepickerModel;
  
  violationList = [
    { id : 1, name :"Paid or payable accident"},
    { id : 3, name :"Artisan Use"},
    { id : 4, name :"Consuming Alcohol while Driving"},
    { id : 5, name :"Criminally Negligent Operation"},
    { id : 6, name :"DWI or DUID (including probated)"},
    { id : 7, name :"Failure to Take Breath Test"},
    { id : 9, name :"Homicide or Assault with Vehicle"},
    { id : 13, name : "SR -22 requirement"},
    { id : 14, name : "Unacceptable risk"},
    { id : 15, name : "Unacceptable vehicle"},
    { id : 24, name : "Driving while license suspended"},
    { id : 25, name : "Fleeing or Attempting to Elude Police"},
    { id : 26, name : "Hit and Run"},
    { id : 27, name : "Leaving Scene of Accident"},
    { id : 28, name : "Speed Contest or Racing"},
    { id : 29, name : "Reckless or careless driving"},
    { id : 30, name : "Driving too fast for conditions, excessive acceleration, and failure to control speed or vehicle"},
    { id : 31, name : "Failure to stop or remain stopped for a school bus"},
    { id : 33, name : "Speeding"},
    { id : 34, name : "Driving on wrong side of road, driving wrong way, or driving on the side walk"},
    { id : 35, name : "Failure to yield right of way"},
    { id : 36, name : "Open container"},
    { id : 37, name : "License suspended for drug possession"},
    { id : 38, name : "Illegal or improper turn or backing"},
    { id : 39, name : "Unsafe Lane Change"},
    { id : 40, name : "Following Too Close"},
    { id : 41, name : "Failure to yield to an emergency vehicle"},
    { id : 42, name : "Possession of an illegal substance"},
    { id : 43, name : "Texting and Driving"},
    { id : 44, name : "Operation vehicle without Driver's License"},
    { id : 45, name : "Failure to display Driver's License"},
    { id : 47, name : "Improper passing or U-turn, turning violation"},
    { id : 48, name : "Wrong side/left of center"},
    { id : 49, name : "Driving Without Headlights or did not dim headlights"},
    { id : 50, name : "Failure to Signal"},
    { id : 51, name : "Obstructing Traffic"},
    { id : 52, name : "Expired License Plates"},
    { id : 53, name : "Unnecessary use of horn, siren, bell, or whisltle"},
    { id : 54, name : "Improper Parking (Non Moving Violation)"},
    { id : 55, name : "Felony with a Motor Vehicle including manslaughter, murder, or insurance fraud"},
    { id : 56, name : "Failure to report accident or false reporting"},
    { id : 57, name : "Negligent Entrustment to Inexperienced operator surcharge"},
    { id : 58, name : "Seat Belt Violation"},
    { id : 59, name : "Child Restraint Violation"},
    { id : 60, name : "Defective or Improper Equipment"},
    { id : 61, name : "No Motor Vehicle Liability Insurance"}
  ];
  
  isEdit:boolean = false;
  selectedIndex : any;
  dropArr: any;
  accidentOrViolation = [];
  bsConfig = {
    containerClass: 'theme-red',
    // minDate :new Date(Date.now()),
    // maxDate :new Date(Date.now()),
    isAnimated: true,
    adaptivePosition: true,
    showWeekNumbers: false,
    returnFocusToInput: true,
    dateInputFormat: 'MM/DD/YYYY',
  };
  maxDate;
  minDate;

  constructor(public router: Router,private readonly fb: FormBuilder,private activeroute:ActivatedRoute,public BeyontecFormService:BeyontecFormService,
    public api_common : CommonService,private Beyontec:BeyontecService) { 
      this.driver_index=this.activeroute.snapshot.paramMap.get('index');
      this.add_driver=this.activeroute.snapshot.paramMap.get('add_driver');

    }

    ngOnInit(): void {

      this.voilation_add= this.fb.group({
        code: [''],
        date: ['', [Validators.required] ],
        name: ['', [Validators.required] ],
      });

      this.voilation_add.get('code').reset();
      this.voilation_add.get('date').reset()
      this.voilation_add.get('name').reset()


      if(this.driver_index)
      {
        if(this.BeyontecFormService.drivers_array$ == undefined || this.BeyontecFormService.drivers_array$ == null){
          if(!JSON.parse(localStorage.getItem("beyontech_nusr"))){
            this.getPrefilledData();
          }
        }
        // console.log(this.driver_index, "this.driver_index")
        // console.log((<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']));
        this.violationSelectedList = (<FormArray>((<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(this.driver_index))).controls['violationsArray'].value;

        // console.log((<FormArray>((<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(this.driver_index))).controls['violationsArray']);

      //   this.BeyontecFormService.assignViolation(((<FormArray>((<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(this.driver_index))).controls['violationsArray']).value, 0);

      //   // let driver0 = JSON.parse(localStorage.getItem('beyontech_drivers'))
      //   // console.log(driver0[0]['violationsArray']);
      //   // this.BeyontecFormService.getViolationForm(driver0[0]['violationsArray']);
      //   // this.finallen = (<FormArray>this.BeyontecFormService.violation_array$.controls['violations']).value.length;
        
      //   // this.voilation_add.patchValue((<FormArray>this.BeyontecFormService.violation_array$.controls['violations']).at(this.index).value)
      }

       
      // console.log(this.voilation_add.get('code').value)
      // this.getViolationForm()
      // this.voilation_add= this.fb.group({
      //   violations: this.fb.array([this.initRows()]),
      // });

      this.getDropDown();
      this.getServerDate()
    }

    getServerDate(){
      this.api_common.getTocken().subscribe((dataToken: {}) => {
        let reqTocken = 
        {
          "token": dataToken['token']
        }
        this.api_common.getServerDate(reqTocken).subscribe((dataTime: {}) => {
          console.log(dataTime, 'dataTime', dataTime['date']);

          this.maxDate = new Date(dataTime['date']); 
          // this.maxDate.setDate(this.maxDate.getYear() - 3);
  
          this.minDate = new Date(dataTime['date']); 
          this.minDate.setDate(this.maxDate.getDate() - 1096);

          console.log(this.maxDate, 'maxDate');
          console.log(this.minDate, 'minDate');
  
    
        });
  
      });
    }

    getcode(val){
      // console.log(val); 
      // let numVal = Number(val['key'])
      this.voilation_add.get('code').setValue(val['key']);


      // let term = this.searchTerm;
      // let items = this.accidentOrViolation.filter(function(tag) {
      //   return tag.name.indexOf(val) >= 0;
      // }); 

      // let filteredItems = this.accidentOrViolation.filter(
      //   item => item.value.toLowerCase().indexOf(val.toLowerCase()) > -1
      // )

      
      // console.log(filteredItems)

    }

    getPrefilledData(){
      if(localStorage.getItem('beyontech_drivers') != undefined || localStorage.getItem('beyontech_drivers') != null){
        let a = JSON.parse(localStorage.getItem('beyontech_drivers'));
        this.BeyontecFormService.getDriverForm();
        this.BeyontecFormService.assignLocalToDriver(a);
      }
    }


    onVoilationSubmit(formval){
      var currenDate = moment(new Date()).format("MM/DD/YYYY");

      var startDate = moment(this.voilation_add.get('date').value, "MM/DD/YYYY").year();
      var endDate = moment(currenDate, "MM/DD/YYYY").year();
      let dateDiff = endDate - startDate;

      let a = moment(currenDate, "MM/DD/YYYY");
      let b = moment(this.voilation_add.get('date').value, "MM/DD/YYYY");

      var years = a.diff(b, 'year');
      b.add(years, 'years');

      var months = a.diff(b, 'months');
      b.add(months, 'months');

      var days = a.diff(b, 'days');

      console.log(years + ' years ' + months + ' months ' + days + ' days');


      // let dateFrom = moment(Date.now() - 7 * 24 * 3600 * 1000).format('MM/DD/YYYY');
      // let dateFrom = moment().subtract(3,'year').format('MM/DD/YYYY');
      // console.log(dateFrom, "dateFrom");
      // var endDateLast = moment().subtract(3, 'year')
      // var endDateLast1 = moment().subtract(0, 'month')
      // var endDateLast2 = moment().subtract(0, 'day')
     
      // console.log(endDateLast, "Year value", endDateLast1, "month value", endDateLast2, "days value");

      // var startDate1 = moment(this.voilation_add.get('date').value, "MM/DD/YYYY").month();
      // var endDate1 = moment(currenDate, "MM/DD/YYYY").month();
      // let dateDiff1 = endDate1 - startDate1;

      // var startDate2 = moment(this.voilation_add.get('date').value, "MM/DD/YYYY").date();
      // var endDate2 = moment(currenDate, "MM/DD/YYYY").date();
      // let dateDiff2 = endDate2 - startDate2;


      // var startDate1 : any = null;
      // var currenDate1 = moment(new Date()).format("MM/DD/YYYY");
      // startDate1 = moment(this.voilation_add.get('date').value, "MM/DD/YYYY");
      // var endDate1 = moment(currenDate1, "MM/DD/YYYY");
      // let k = endDate1.diff(startDate1, 'days');

      // console.log(startDate,'startDate--------',endDate,'endDate--------', dateDiff, "Year value");

      // console.log(dateDiff, "Year value");
      // console.log(startDate1, "month value", endDate1,"end month value");
      // console.log(startDate2, "days value", endDate2, "end days value");
      // console.log(startDate2,'startDate--------',endDate2,'endDate--------', dateDiff2, "date value");
      // console.log(currenDate1, "currenDate1 value");
      // console.log(startDate1, 'startDate1 value', endDate1, "endDate1 value");

      const DATE_REGEX = new RegExp(/^(\d{2}|\d{1})\/(\d{2}|\d{1})\/\d{4}$/);
      this.errormessage = '';
      if (!DATE_REGEX.test(this.voilation_add.get('date').value)) {
        this.errormessage = "Invalid Date";
        // alert("Invalid Date");
        document.getElementById('openModalButtonSomethingWrong').click();
        
        this.voilation_add.get('code').setValue('');
        this.voilation_add.get('date').setValue('');
        this.voilation_add.get('name').setValue('');
        return 0;
      }
      else if((years > 3 ) || (years >= 3 && (months > 0 || days > 0))){
        // alert("This incident is too old, it will not be counted.");
        this.errormessage = "This incident is too old, it will not be counted.";
        document.getElementById('openModalButtonSomethingWrong').click();
        this.voilation_add.get('code').setValue('');
        this.voilation_add.get('date').setValue('');
        this.voilation_add.get('name').setValue('');
        return 0;
      }else if((years < 0 ) || (years <= 0 && (months < 0 || days < 0))){
        // alert("Please enter a valid date");
        // Something went wrong, please call 1-855-200-4567
        this.errormessage = "Please enter a valid date";
        document.getElementById('openModalButtonSomethingWrong').click();
        this.voilation_add.get('code').setValue('');
        this.voilation_add.get('date').setValue('');
        this.voilation_add.get('name').setValue('');
        return 0;
      }
      else
      {

      let a = this.check_exist();

      // console.log(a);

      if(!a){

        // console.log(formval)
      
      var len:any=((<FormArray>((<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(this.driver_index))).controls['violationsArray'].length-1);
      // console.log(len, "len");
      let final_code = (<FormArray>((<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(this.driver_index))).controls['violationsArray'].value;
      // console.log(final_code[len-1], "final_code");

      // if(final_code[len] != undefined ){
      //   // console.log(final_code[len]['code'], "final_code");
      //   this.lenNo= final_code[len]['code'] + 1;
      //   formval['code'] = this.lenNo;
      // }else{
      //   formval['code'] = 0;
      //   // this.lenNo = 0;
      // }

      // console.log(this.lenNo, "lenNo");
      // this.voilation_add.get('code').setValue(this.lenNo);
      // console.log(this.voilation_add, "this.voilation_add");

      this.BeyontecFormService.generateViolation(this.driver_index,formval);

      // console.log(this.BeyontecFormService.drivers_array$.value.driver,"editIndex null show...........")

      this.violationSelectedList = (<FormArray>((<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(this.driver_index))).controls['violationsArray'].value;

      localStorage.setItem("beyontech_drivers", JSON.stringify(this.BeyontecFormService.drivers_array$.value.driver));

      this.voilation_add.get('code').setValue('');
      this.voilation_add.get('date').setValue('');
      this.voilation_add.get('name').setValue('');
      this.voilation_add.updateValueAndValidity();

      // console.log(this.violationSelectedList, 'violationSelectedList');

      // this.BeyontecFormService.drivers_array$.get('driver').controls

      }else{
        // alert("Voilation Already Exist.")
        this.errormessage = "Voilation Already Exist.";
        document.getElementById('openModalButtonSomethingWrong').click();
        this.voilation_add.get('code').reset();
        this.voilation_add.get('date').reset()
        this.voilation_add.get('name').reset();
      }


    }

    }




    onSubmit(driver_index){

      // console.log(this.voilation_add.get('date').value, "dob value");

      let a = this.BeyontecFormService.drivers_array$.value;
      localStorage.setItem("beyontech_drivers", JSON.stringify(this.BeyontecFormService.drivers_array$.value.driver));
      if(this.add_driver=='0')
      {
        this.router.navigate(['beyontec/03-a']);
      }
      else
      {
        // console.log(a['driver'][driver_index]['isdrivingLicence'],'abbbbbbbbbbbbbbbbbbbb');
        
        // console.log((<FormArray>this.BeyontecFormService.violation_array$.controls['violations']).value, "onSubmit")
        // let a = JSON.parse(localStorage.getItem("beyontech_drivers"));
        // a[driver_index]['violationsArray'] = (<FormArray>this.BeyontecFormService.violation_array$.controls['violations']).value;
        // localStorage.setItem("beyontech_drivers", JSON.stringify(a));
        // // console.log(a, "onSubmit a")
        if(!a['driver'][driver_index]['isdrivingLicence'] || a['driver'][driver_index]['isdrivingLicence'] == ''){
        this.router.navigate(['beyontec/02-a']);
        }else{
        this.router.navigate(['beyontec/02-b']);
        }
      }
      
      
      }


    // onVoilationSubmit(formval){
    //   console.log(formval)

    //   // let a = this.check_exist();
    //   if(this.check_exist()){
    //       alert("Violation Exist in List")
    //   }else{
    //     // console.log(formval.code, 'formval code');
    //     console.log(this.editIndex, "editIndex")

    //     if(this.editIndex == null){

    //       console.log("editIndex null...........")

    //       this.BeyontecFormService.generateViolation(0);
    //       var len:any=((<FormArray>this.BeyontecFormService.violation_array$.controls['violations']).length-1);

    //       let final_code = (<FormArray>this.BeyontecFormService.violation_array$.controls['violations']).value;

          
    //       if(final_code[len-1] != undefined){
    //         console.log(final_code[len-1]['code'], "final_code");
    //         this.lenNo= final_code[len-1]['code'] + 1;
    //       }else{
    //         this.lenNo = 0;
    //       }
    //       console.log(this.lenNo, "lenNo");
          
    //       this.voilation_add.get('code').setValue(this.lenNo);
    //       (<FormArray>this.BeyontecFormService.violation_array$.controls['violations']).at(len).patchValue(this.voilation_add.value);
    //       // console.log((<FormArray>this.BeyontecFormService.violation_array$.controls['violations']).value)
    //     }
    //     else{

    //       console.log("editIndex not null...........");

    //       (<FormArray>this.BeyontecFormService.violation_array$.controls['violations']).at(this.editIndex).patchValue(this.voilation_add.value);
    //       this.editIndex = null;
    //     }

    //   }
      
    //   this.voilation_add.get('code').setValue('');
    //   this.voilation_add.get('date').setValue('');
    //   this.voilation_add.get('name').setValue('');
    //   this.voilation_add.updateValueAndValidity();

    //   console.log((<FormArray>this.BeyontecFormService.violation_array$.controls['violations']).value)
    //   this.finallen = (<FormArray>this.BeyontecFormService.violation_array$.controls['violations']).value.length;
    //   // this.voilationArray.push(formval)


    //   console.log(this.finallen, "this.finallen");

    //   // this.isClicked  = true;
    // }

    voilationEdit(i){
      console.log(this.voilation_add.get('code').value)
      const control = (<FormArray>((<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(this.driver_index))).controls['violationsArray'].at(i).value;


      // this.voilation_add
      this.voilation_add.patchValue(control)

      console.log(control, "control")
      this.editIndex = i;

      // this.voilation_add.patchValue();

    //   // const control = (<FormArray>this.BeyontecFormService.violation_array$.controls['violations']);
    //   // console.log(control, "control voilationEdit")
    //   // console.log((<FormArray>this.BeyontecFormService.violation_array$.controls['violations']).value)
    //   this.voilation_add.patchValue((<FormArray>this.BeyontecFormService.violation_array$.controls['violations']).at(i).value)
      this.isEdit = true;
      this.voilation_add.updateValueAndValidity();

    }

    onVoilationUpdate(val, i){

      let a = this.check_exist();

      console.log(a);

      if(!a){
        (<FormArray>((<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(this.driver_index))).controls['violationsArray'].at(i).patchValue(val);
        this.violationSelectedList = (<FormArray>((<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(this.driver_index))).controls['violationsArray'].value;
        localStorage.setItem("beyontech_drivers", JSON.stringify(this.BeyontecFormService.drivers_array$.value.driver));
        // console.log((<FormArray>((<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(this.driver_index))).controls['violationsArray'].at(i));
        this.voilation_add.get('code').reset();
        this.voilation_add.get('date').reset()
        this.voilation_add.get('name').reset();
        this.isEdit = false;
      }else{
        // alert("Voilation Already Exist.")
        this.errormessage = "Voilation Already Exist.";
        document.getElementById('openModalButtonSomethingWrong').click();
        this.voilation_add.get('code').reset();
        this.voilation_add.get('date').reset()
        this.voilation_add.get('name').reset();
      }
      // console.log(val, i)

      // this.violationSelectedList = (<FormArray>((<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(this.driver_index))).controls['violationsArray'].at(i);

      // console.log(this.violationSelectedList);
      
      // localStorage.setItem("beyontech_drivers", JSON.stringify(this.BeyontecFormService.drivers_array$.value.driver));
      // this.voilation_add.get('code').setValue('');
      // this.voilation_add.get('date').setValue('');
      // this.voilation_add.get('name').setValue('');
      // this.voilation_add.updateValueAndValidity();

    }

    voilationDelete(i){
      this.selectedIndex = i;
      document.getElementById("openModalButtonViolationDelete").click(); 
      
      //   const control = (<FormArray>this.BeyontecFormService.violation_array$.controls['violations']);
      //   console.log(control, "control voilationDelete")
      //   control.removeAt(i);
      //   console.log((<FormArray>this.BeyontecFormService.violation_array$.controls['violations']).value)
      // console.log(i,"IIIIIIIIIIIIIIIIIIIIIIIIIIII")
    }


    finalDelete(i){
      
      document.getElementById("closeViolation").click(); 
      const control = (<FormArray>((<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(this.driver_index))).controls['violationsArray'];

      console.log(control, "control voilationDelete")
      control.removeAt(i);

      // console.log((<FormArray>((<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(this.driver_index))).controls['violationsArray'].value)
      this.violationSelectedList = (<FormArray>((<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(this.driver_index))).controls['violationsArray'].value;

      localStorage.setItem("beyontech_drivers", JSON.stringify(this.BeyontecFormService.drivers_array$.value.driver));

      console.log(this.violationSelectedList)

      this.voilation_add.get('code').setValue('');
      this.voilation_add.get('date').setValue('');
      this.voilation_add.get('name').setValue('');
    }

    // onSubmit(driver_index){

    //   let a = this.BeyontecFormService.drivers_array$.value;

    //   // console.log(a,'aaaaaaaaaaaaaaaaaaaaaa');
    //   // console.log(a['driver'][driver_index]['isdrivingLicence'],'abbbbbbbbbbbbbbbbbbbb');

    // //   console.log((<FormArray>this.BeyontecFormService.violation_array$.controls['violations']).value, "onSubmit")
    // //   let a = JSON.parse(localStorage.getItem("beyontech_drivers"));
    // //   a[driver_index]['violationsArray'] = (<FormArray>this.BeyontecFormService.violation_array$.controls['violations']).value;
    // //   localStorage.setItem("beyontech_drivers", JSON.stringify(a));
    // //   // console.log(a, "onSubmit a")

    //   if(!a['driver'][driver_index]['isdrivingLicence'] || a['driver'][driver_index]['isdrivingLicence'] == ''){
    //     this.router.navigate(['beyontec/02-a']);
    //   }else{
    //     this.router.navigate(['beyontec/02-b']);
    //   }


    // }

    
    

    check_exist(){
      var exist:boolean=false;

      // console.log((<FormArray>((<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(this.driver_index))).controls['violationsArray'].value);

      (<FormArray>((<FormArray>this.BeyontecFormService.drivers_array$.controls['driver']).at(this.driver_index))).controls['violationsArray'].value.forEach(element => {
        console.log(element);
        if(element.name==this.voilation_add.get('name').value && element.date==this.voilation_add.get('date').value)
        {
          exist=true;
          return 0;
        }
      });
      return exist;
    }


  cancel(){       
    if(this.add_driver=='0')      
    {       
      this.router.navigate(['beyontec/03-a']);      
    }      
    else      
    {       
      this.router.navigate(['beyontec/01']);      
    }     
  }


  getDropDown(){
    this.api_common.getTocken().subscribe((data: {}) => {
      // console.log(data, 'generateToken');
      let dataReq = {
        "token": data['token'],
        "companyProductCd": "PTXNSA"
      }
      // console.log(this.zipdata);
      this.api_common.getDropdown(dataReq).subscribe((dataDrop: {}) => {
        this.dropArr = dataDrop
        console.log(this.dropArr);
        this.getDropdowns(this.dropArr)
      });
    });
  }


  getDropdowns(dropArr) {
    if (dropArr) {
      // console.log(dropArr.umbi);
      this.accidentOrViolation = [];
      Object.keys(dropArr.accidentOrViolation[0]).forEach(key => {
        // console.log(key);
        this.accidentOrViolation.push({ key: key, value: dropArr.accidentOrViolation[0][key] });
      });
      // 
    }

    console.log(this.accidentOrViolation)
  }

  getdate(e){
    // console.log(e, 'dob');
    if(e != null){
      var currenDate = moment(e).format("MM/DD/YYYY");
      this.voilation_add.get('date').setValue(currenDate);
      console.log(this.voilation_add.get('date').value, 'selected date');
    }
    
    // this.getDriverDetailbyDOB(currenDate)
  }

}
