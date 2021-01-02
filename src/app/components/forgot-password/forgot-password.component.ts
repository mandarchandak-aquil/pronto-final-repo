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
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotform: FormGroup;
  constructor(@Inject(DOCUMENT) private document: Document,public router: Router,private formBuilder: FormBuilder,private auth :AuthServicess,private authService: AuthService, public api_sub : SubjectCallService,public dashservice :DashboardService) {

}

  ngOnInit(): void {
    this.forgotform = this.formBuilder.group({
      "email" : ['',[Validators.required,Validators.email]]
      });
  }


  onSubmit(){


     this.auth.forgotpassword(this.forgotform.value).subscribe((data: {}) => {
       if(data['status'] == 200){
        document.getElementById("sub").click();
       }else{
        this.forgotform.controls['email'].setErrors({'incorrect': true});
       }
     });
  }
}
