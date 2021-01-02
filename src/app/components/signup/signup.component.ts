import { Component, OnInit,ViewChild } from '@angular/core';
import { NgbDateStruct, NgbCalendar, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import {NgbDateAdapter, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import {Injectable} from '@angular/core';
import { AuthServicess } from '../../commons/services/auth/auth.service';
import { SubjectCallService } from '../../commons/services/subject-call/subject-call.service';
import { DashboardService } from '../../commons/services/dashboard/dashboard.service';
import { Router } from '@angular/router';
// import { ConfirmedValidator } from '../../commons/validators/confirmed.validator';
import { FormGroup, FormBuilder, Validators, FormControl,AbstractControl } from '@angular/forms';
// import * as $ from 'jquery';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  model: NgbDateStruct;
  isReadOnly:boolean = false; 
  source;
  formsv;
  minutesQuote;
  driverList;
  showModalBox : boolean = false; 
   loading :boolean = false;  
   showpass:boolean = false;  
    showpass1:boolean = false; 
    policyone :boolean = false; 
    mob;
  date: { year: number, month: number };
  @ViewChild('NgbdDatepicker') dp: NgbDatepicker;
  dataReq;
  dataerror :boolean = false;  
  registerform: FormGroup;
  constructor(public router: Router,private formBuilder: FormBuilder,private auth :AuthServicess,public api_sub : SubjectCallService,public dashservice :DashboardService) { }

  ngOnInit(): void {
    this.registerform = this.formBuilder.group({
                        "email" : ['',[Validators.required,Validators.email]],
                        "password" : ['',[Validators.required]],
                        "password1" : ['',[Validators.required]],
                        "policyNo" : ['',[Validators.required]],
                        "first_name" : ['',[Validators.required]],
                         "middle_name" : [''],
                        "last_name" : ['',[Validators.required]],
                         "zip" : ['',[Validators.required]],
                         "dob" : ['',[Validators.required]]
                        });
                        this.minutesQuote = JSON.parse(localStorage.getItem('beyontech_payStatement'));
                        this.driverList = JSON.parse(localStorage.getItem('beyontech_drivers'));
                 console.log('this.minutesQuote',this.minutesQuote,'this.driverList',this.driverList);   
                var zip = JSON.parse(localStorage.getItem('insuranceFor'));
                 if( this.minutesQuote != null ){
                  this.registerform.controls.policyNo.setValue(this.minutesQuote.policyNo);
                  this.registerform.controls.dob.setValue(this.driverList[0].dob);
                  this.registerform.controls.zip.setValue(zip.zipcode);
                  this.Datavalidation();
                 }  
  }
  passchange()
  {
    if(this.showpass == false){
    this.showpass = true;
    }else{
    this.showpass = false;
    }
  }
  passchange1()
  {
    if(this.showpass1 == false){
    this.showpass1 = true;
    }else{
    this.showpass1 = false;
    }
  }
  Datavalidation(){
    if(this.registerform.get('policyNo').valid && this.registerform.get('dob').valid && this.registerform.get('zip').valid) {
    this.loading = true;
    var regform = this.registerform.value;
    this.dashservice.verifyToken().subscribe((data: {}) => {
    var datareq = {
      "token" : data['token'],
      "postalCode" : regform.zip,
      "dob" : regform.dob,
      "policyNo" : regform.policyNo,
    };
       this.auth.Datavalidation(datareq).subscribe((data: {}) => {
          if(data['messageId'] != "POL0003" && data['messageId'] != "POL0002" && data['messageId'] != "POL0004" && data['messageId'] != "POL0009" && data['messageId'] != "PRT00011"){
            this.source = data['source'];
          if(data['source'] == 'beyondtec'){
            console.log('innnnnnnnnn');
                this.mob = null;
                        this.isReadOnly = true;
              }else if(data['source'] == 'policyone'){
                this.mob = data['mobile'];
                this.registerform.controls.zip.setValue(data['postalCode']);
            this.registerform.controls.dob.setValue(data['dob']);
            this.policyone = true;
              }   
              this.registerform.controls.first_name.setValue(data['firstName']);
            this.registerform.controls.last_name.setValue(data['lastName']);
              this.registerform.controls.middle_name.setValue(data['middleName']);
            this.registerform.controls.email.setValue(data['emailId']);       
                      //this.registerform.controls.email.readOnly = true;

            
             this.loading = false;
             this.dataerror = false;
          }else{
          console.log('ouuuuuuuuttt');
           this.registerform.controls['zip'].setErrors({'incorrect': true});
           this.registerform.controls['policyNo'].setErrors({'incorrect': true});
            this.registerform.controls['dob'].setErrors({'incorrect': true});
                    this.dataerror = true;
          this.loading = false;

                           // this.registerform.controls.zip.invalid = true;



         
          }
       });
       });
   }
  }

  passwordmatch(){
    if(this.registerform.controls['password'].value != '' && this.registerform.controls['password1'].value != ''){
       if(this.registerform.controls['password'].value == this.registerform.controls['password1'].value){
     
       }else{

          this.registerform.controls['password1'].markAsTouched();
         this.registerform.controls.password1.setValue('');
       }
    }

  }
      get f() { return this.registerform.controls; }
onlanguageChange(newValue){
    // console.log(newValue, "new language");
   
    this.api_sub.sendMessage(1);
  }

  hidemodal(){
    if(this.showModalBox == true){
    this.showModalBox = false;
    }else{
      this.showModalBox = true;
    }
  }
onSubmit(){

var data = this.registerform.value;
this.formsv =  {
  "email": data['email'],
  "password": data['password'],
  "password1": data['password1'],
  "policyNo": data['policyNo'],
  "first_name": data['first_name'],
  "middle_name":data['middle_name'],
  "last_name": data['last_name'],
  "mob" : this.mob,
  "zip": data['zip'],
  "dob": data['dob'],
  "source": this.source
}
console.log(JSON.stringify(this.formsv));
   this.auth.register(this.formsv).subscribe((data: {}) => {
      if(data['status'] == 200){

             
              this.auth.login(this.formsv).subscribe((datas: {}) => {
              console.log('datas',datas);
      if(datas['status'] == 200){
      var userdata = datas;
             sessionStorage.setItem('userdata', JSON.stringify(userdata));
              sessionStorage.setItem('token', datas['token']);
              console.log( sessionStorage.getItem('token'));
              this.registerform.reset();
               this.router.navigate(['/dashboard/notifications']);
                
              }else{
                  this.router.navigate(['/login']);
              }
              
      });

              }else{
                this.showModalBox = true;
               }
             
      });

}
 
}
 @Injectable()
export class CustomAdapter extends NgbDateAdapter<string> {
  readonly DELIMITER = '-';
  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        month : parseInt(date[1], 10),
        day : parseInt(date[0], 10),
        year : parseInt(date[2], 10)
      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
  }
}
@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
  readonly DELIMITER = '/';
  parse(value: string): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        month : parseInt(date[1], 10),
        day : parseInt(date[0], 10),
        year : parseInt(date[2], 10)
      };
    }
    return null;
  }


  format(date: NgbDateStruct | null): string {
    return date ? date.month + this.DELIMITER + date.day + this.DELIMITER + date.year : '';
  }
  }