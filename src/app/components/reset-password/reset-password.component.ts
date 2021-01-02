import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { AuthServicess } from '../../commons/services/auth/auth.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
token;
resetform;
showpass;
showpass1;
  constructor(public router: ActivatedRoute,private formBuilder: FormBuilder,private auth: AuthServicess,private route : Router) {
    
   }

  ngOnInit(): void {
    this.resetform = this.formBuilder.group({
      "password" : ['',[Validators.required]],
      "password1" : ['',[Validators.required]]
      });
    this.router.params.subscribe(function(params){
      
      localStorage.setItem('token', JSON.stringify(params));
      
       })
       this.verifyuser();
  }
  passwordmatch(){
    if(this.resetform.controls['password'].value != '' && this.resetform.controls['password1'].value != ''){
       if(this.resetform.controls['password'].value == this.resetform.controls['password1'].value){
     
       }else{

          this.resetform.controls['password1'].markAsTouched();
         this.resetform.controls.password1.setValue('');
       }
    }

  }
  sub(){
    this.route.navigate(['/login']);
    document.getElementById("cls").click();
  }
  submit(){
    var inp = this.resetform.value;
    inp = {
      "password" :inp['password'],
      "password1" :inp['password1'],
      "token" :  this.token
    }
    console.log(inp,'innn');
    this.auth.resetpassword( inp).subscribe((data: {}) => {
      if(data['status'] == 200){
        document.getElementById("sub").click();
       // this.route.navigate(['/login']);
    }else{
      document.getElementById("sub1").click();
    }
    });

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
  verifyuser(){
    
    var tokn =   JSON.parse(localStorage.getItem('token'));
    console.log('innn',tokn['token'])
    this.token = {
      "token" : tokn['token']
    };
   
    this.auth.verifyuser( this.token).subscribe((data: {}) => {
      if(data['status'] == 200){
          this.token = data['token'] ;
          
      }else{
        this.route.navigate(['/login']);
      }
      console.log('datasssssss',data);
    });
  }
}
