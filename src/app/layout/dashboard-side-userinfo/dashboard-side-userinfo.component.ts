import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../commons/services/dashboard/dashboard.service';
import { AuthServicess } from '../../commons/services/auth/auth.service';
import jwt_decode from "jwt-decode";
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'app-dashboard-side-userinfo',
  templateUrl: './dashboard-side-userinfo.component.html',
  styleUrls: ['./dashboard-side-userinfo.component.css']
})
export class DashboardSideUserinfoComponent implements OnInit {
  passwordchange: FormGroup;
	input;
  user;
  addressedit : boolean=false;
  mobedit : boolean=false;
   passedit : boolean=false;
    emailedit : boolean=false;
    showdone : boolean=false;
	notifications;
  decoded;
  token;
  email;
  address;
  mobile;
  showpass;
  showpass1;
  showpass2;
  constructor(private formBuilder: FormBuilder,public dashservice :DashboardService,public auth :AuthServicess) { }

  ngOnInit(): void {
    this.passwordchange = this.formBuilder.group({
      "password" : ['',[Validators.required]],
      "password1" : ['',[Validators.required]],
      "password2" : ['',[Validators.required]],
      });

    this.token =  sessionStorage.getItem('token');
    this.getUpdated();
  // console.log('dataaaasssssss',sessionStorage.getItem('userdata'));
 
  // console.log('token',this.token);
  this.decoded = jwt_decode(this.token);

 this.user = JSON.parse(sessionStorage.getItem('userdata'));
 this.email = this.user['email'];
 this.address= this.user['address'];
 this.mobile= this.user['mobile'];
  // console.log('user' ,sessionStorage.getItem('userdata'));
  //this.user =this.dashservice.userdata;
    // console.log('userdata', this.user['firstName']);
 // var data = sessionStorage.getItem('userdata');

this.reciveNotifications();
  }

  passwordmatch(){
    // console.log('innnnn');
    if(this.passwordchange.controls['password1'].value != '' && this.passwordchange.controls['password2'].value != ''){
       if(this.passwordchange.controls['password1'].value == this.passwordchange.controls['password2'].value){
     
       }else{

          this.passwordchange.controls['password2'].markAsTouched();
         this.passwordchange.controls.password2.setValue('');
       }
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
  passchange2()
  {
    if(this.showpass2 == false){
    this.showpass2 = true;
    }else{
    this.showpass2 = false;
    }
  }
editaddress(d){
  if(d == 'address'){
    if(this.addressedit == true)
    {
      this.addressedit = false;
    }else{  this.addressedit = true;
    }
  }else if(d == 'email'){
    if(this.emailedit == true)
    {
      this.emailedit = false;
    }else{  
    this.emailedit = true;
    }
    
  }else if(d == 'pass'){
    if(this.passedit == true)
    {
      this.passedit = false;
    }else{  
    this.passedit = true;
    }
  }else if(d == 'mob'){
  if(this.mobedit == true)
    {
      this.mobedit = false;
    }else{  
    this.mobedit = true;
    }
  
  }
}
   setsrecivenotification(type,val){
  this.input = {
        "type" : type,
        "token" : this.token ,
        "value" : val
        };
        // console.log(this.input);
 this.dashservice.changecredentials(this.input).subscribe((data: {}) => {


		 if(data['status']  == 200){
     //this.notifications = data['code_satsus'];
    //  console.log('data',data['code_satsus']);
     this.notifications  = data['code_satsus'];

    //  console.log('afteredit',this.notifications);

     
		 }
		 

    });
  }
  getUpdated(){
    // console.log('getUpdated');
    var tokendata = {
      "token" : this.token
      };
    this.dashservice.getUpdated(tokendata).subscribe((data: {}) => {
      // console.log('datass',data);
      if(data['status']  == 200){
     
   var userdata = data;
           sessionStorage.setItem('userdata', JSON.stringify(userdata));
          //  console.log('userdara',sessionStorage.getItem('userdata'));
      }
    });
  }
  setsrecivenotificationnew(type){
    var input = {
      "type" : type,
      "token" : this.token
      };
      // console.log(this.input);
this.dashservice.setsrecivenotificationnew(input).subscribe((data: {}) => {


   if(data['status']  == 'success'){
   //this.notifications = data['code_satsus'];
  //  console.log('data',data);
   this.email =data['data'].email ;
this.address= data['data']['address'];
this.mobile= data['data']['mobile'];
  //  console.log('afteredit',this.mobile,this.address,this.email);

   
   }
   

  });
  }
  
   logout(){
    sessionStorage.removeItem('ammend_vehicle');
    sessionStorage.removeItem('ammend_driver');
    sessionStorage.removeItem('policy');
    sessionStorage.removeItem('userdata');
    sessionStorage.removeItem('policyNo');
    localStorage.removeItem('notificationlength')
      this.auth.logout();
     
  }
  hidemodal(){
    this.showdone = false;
  }
  changepassword(){
    var datainp = this.passwordchange.value;
    this.input = {
      
      "token" : this.token ,
      "password" :datainp.password ,
      "password1": datainp.password1,
      "password2": datainp.password2,
      };
    this.dashservice.changepassword(this.input).subscribe((datas: {}) => {
      if(datas['status'] == 200){
        this.passwordchange.reset();
        this.showdone = true;
      }else{
        this.passwordchange.controls['password'].setErrors({'incorrect': true});
        this.passwordchange.controls['password1'].setErrors({'incorrect': true});
         this.passwordchange.controls['password2'].setErrors({'incorrect': true});
      }
      // console.log(datas);
    });
  }

   reciveNotifications(){
      
      this.input = {
            "user_id" :  this.decoded.id 
            };
 this.dashservice.reciveNotifications(this.input).subscribe((datas: {}) => {
      		 if(datas['status'] == 'success'){
      		 this.notifications = datas['user_notification'];
           }

       
    });
  }

}

