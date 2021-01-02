import { Component, OnInit,Inject } from '@angular/core';
import { AuthServicess } from '../../commons/services/auth/auth.service';
import { SubjectCallService } from '../../commons/services/subject-call/subject-call.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DashboardService } from '../../commons/services/dashboard/dashboard.service';
import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import * as JQuery  from 'jquery';
import { DOCUMENT } from '@angular/common';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
socialdata;
showpass1:boolean = false;  
socialdeactivate1:boolean = false; 
loginerroe:boolean = false;  
showModalBox:boolean = false;  
socialdeactivate:boolean = false;  
dataReq;
first_name;
loading :boolean = true;  
last_name;
provider;
datavali;
duplicate:boolean = false;
  loginform: FormGroup;
  policyform: FormGroup;
   user;
   loggedIn;
  constructor(@Inject(DOCUMENT) private document: Document,public router: Router,private formBuilder: FormBuilder,private auth :AuthServicess,private authService: AuthService, public api_sub : SubjectCallService,public dashservice :DashboardService) {
    if(sessionStorage.getItem('token') != null){
      console.log('headerssstoken',sessionStorage.getItem('token'));
      this.router.navigate(['/dashboard/notifications']);
    }
   }

  ngOnInit(): void {
    document.body.classList.remove('mngTp-alert-Spc');
    localStorage.setItem('alertshow', 'no');
    
  this.authService.authState.subscribe((user) => {
      this.user = user;
    console.log('this.user',this.user);
    });
  
     this.loginform = this.formBuilder.group({
                        "email" : ['',[Validators.required,Validators.email]],
                      	"password" : ['',[Validators.required]]
                        });

      this.policyform = this.formBuilder.group({
                        "policyNo" : ['',[Validators.required]],
                         "dob" : ['',[Validators.required]],
                          "zip" : ['',[Validators.required,Validators.minLength(5),Validators.maxLength(5)]],
                          "phone" : ['',[Validators.required,Validators.minLength(14)]],
                        });
                        setTimeout(()=>{                           //<<<---using ()=> syntax
                          this.loading = false;  
                     }, 3000);
                             
  }
 

  passchange1()
  {
    if(this.showpass1 == false){
    this.showpass1 = true;
    }else{
    this.showpass1 = false;
    }
  }


googleLogin(userInfo) {
    console.log(userInfo)
}

onSuccess(googleUser) {
      console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
    }
     onFailure(error) {
      console.log(error);
    }
     
 signInWithGoogle(): void {
   
      console.log('signInWithGoogle',this.provider);
      if(this.provider == 'google'){
      console.log('googgle',this.authService.signIn(GoogleLoginProvider.PROVIDER_ID));
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    }else if(this.provider == 'fb'){
     console.log('fb',this.authService.signIn(FacebookLoginProvider.PROVIDER_ID));
     this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    }
    this.signinbkp();
  }
 closesocial(){
   this.socialdeactivate = false;
   this.socialdeactivate1 = false;
 }
  signInWithFB(): void {
 
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.signinbkp();
  } 
 
  signOut(): void {
    this.authService.signOut();
  }

checksocial(d){
    if(d == 'google'){
    this.provider = 'google';
    }else if(d == 'fb'){
     this.provider = 'fb';
    }
  console.log('googgle',this.provider);
}

onlanguageChange(newValue){

  this.api_sub.sendMessage(1);
}
   validatedata(){
     this.loading = true;
   var source = this.socialdata;
   console.log('source',source);
    this.dashservice.verifyToken().subscribe((data: {}) => {
        
var datareq = this.policyform.value;
this.datavali = {
      "policyNo" : datareq.policyNo,
        "dob" : datareq.dob,
         "postalCode" :  datareq.zip,
    "token":data['token']
};

     this.auth.Datavalidation(this.datavali).subscribe((data: {}) => {
     console.log('source',data);
                 if(data['messageId'] != "POL0003" && data['messageId'] != "POL0002" && data['messageId'] != "POL0004" && data['messageId'] != "POL0009" && data['messageId'] != "PRT00011"){

                 if(data['emailId'] == source.email){
                 if(data['source'] == 'beyondtec'){
                    this.datavali = {
                   "policyNo" : datareq.policyNo,
                   "dob" : datareq.dob,
                    "postalCode" :  datareq.zip,
                    "id" :  source.id,
                    "provider" :  source.provider,
                    "email" :  source.email,
                    "firstName" :source.firstName,
                    "lastName" :source.lastName,
                        "source" :data['source'],
                      "photoUrl" :source.photoUrl,
                    }
                 }else if(data['source'] == 'policyone'){
                      this.datavali = {
                   "policyNo" : datareq.policyNo,
                   "dob" : data['dob'],
                    "postalCode" :  data['postalCode'],
                    "id" :  source.id,
                    "provider" :  source.provider,
                     "mob" : data['mobile'],
                    "email" :  source.email,
                    "firstName" :source.firstName,
                    "lastName" :source.lastName,
                    "source" :data['source'],
                      "photoUrl" :source.photoUrl,
                    }
                 }
                  this.auth.sociallogin( this.datavali).subscribe((data: {}) => {
          if(data['status'] == 200){
          this.dashservice.userdata = data;
           //sessionStorage.setItem('userdata', JSON.stringify(data));
           console.log('oooooooooooooosdoadooooooooooo');
                  sessionStorage.setItem('token', data['token']);
                 
                  sessionStorage.setItem('userdata',JSON.stringify(data));
                   this.router.navigate(['/dashboard/notifications']);
                  }else if(data['status'] == 404){
                  this.duplicate = true;
                       this.router.navigate(['/login']);
                  }else{
                  this.router.navigate(['/login']);
                  }
                  console.log( sessionStorage.getItem('token'));
          });
                 this.loading = false;

                 }else{
                  this.policyform.controls['zip'].setErrors({'incorrect': true});
               this.policyform.controls['policyNo'].setErrors({'incorrect': true});
                this.policyform.controls['dob'].setErrors({'incorrect': true});
                       
              this.loading = false;
                 }

                
              }else{
               this.policyform.controls['zip'].setErrors({'incorrect': true});
               this.policyform.controls['policyNo'].setErrors({'incorrect': true});
                this.policyform.controls['dob'].setErrors({'incorrect': true});
                       
              this.loading = false;
              }
      });
       });

   }

   signinbkp(){
 console.log( 'this.user');
 this.authService.authState.subscribe((user) => {
           this.user =  '';
      this.user = user;
       this.socialdata = user;
      var d = user;
      console.log( this.user);
        if(d!=null){
         var $ :any;
          this.auth.checksocial(d).subscribe((data: {}) => {
          console.log(data);
          if(data['status'] == 200 && data['is_social'] == 1){
            console.log('data',data['first_name']);
            
         this.first_name = data['first_name'];
          this.last_name =data['last_name'];

          this.dashservice.userdata = data;
           sessionStorage.setItem('userdata', JSON.stringify(this.dashservice.userdata));
              sessionStorage.setItem('token', data['token']);
              this.loginform.reset();
               this.router.navigate(['/dashboard/notifications']);
          }else if(data['status'] == 200 && data['is_social'] == 0){
            this.socialdeactivate = true;
            console.log('socialdeactivate');
          }else if(data['status'] == 404){
          
            
           this.showModalBox = true;
          }
           });
          
          }

      
    });

   }

closemodal(){
      this.showModalBox = false;
}

  onSubmit(){
    
      this.dashservice.verifyToken().subscribe((data: {}) => {
        
var datareq = this.loginform.value;
var datavallog = {
      "emailId" : datareq.email,
        "password" : datareq.password,
         "token":data['token']
};
      this.auth.login(datavallog).subscribe((data: {}) => {
      if(data['status'] == 200){
        this.loading = true;
          console.log('data',data['firstName']);
         this.first_name = data['firstName'];
          this.last_name =data['lastName'];
              this.loginerroe = false;
          this.dashservice.userdata = data;
           sessionStorage.setItem('userdata', JSON.stringify(this.dashservice.userdata));
           console.log('userdata', sessionStorage.getItem('userdata'));
              sessionStorage.setItem('token', data['token']);
              this.loginform.reset();
               this.router.navigate(['/dashboard/notifications']);
              
              }else{
                  this.loginform.controls['email'].setErrors({'incorrect': true});
           this.loginform.controls['password'].setErrors({'incorrect': true});
           this.socialdeactivate1 = true;
                  this.router.navigate(['/login']);
              }
              console.log( sessionStorage.getItem('token'));
      });
        });
  }
}
