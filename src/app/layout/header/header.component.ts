import { Component, OnInit, Input, ChangeDetectorRef, Output,Renderer2 , EventEmitter, HostListener } from '@angular/core';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';
import { HeaderServiceService } from '../../commons/services/header/header-service.service';
import { DashboardService } from '../../commons/services/dashboard/dashboard.service';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SubjectCallService } from '../../commons/services/subject-call/subject-call.service';
import { HomepageService } from '../../commons/services/homepage/homepage.service';
import { AuthServicess } from '../../commons/services/auth/auth.service';
import { AuthGuard } from '../../commons/guards/auth.guard';

import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { Router } from '@angular/router';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @HostListener('window:beforeunload', ["$event"]) unload(event) {
    localStorage.removeItem('alertshow')
 }
 
  @Input() language;
  @Output() languageChange = new EventEmitter();
  dataReq;
  submenupath;
  Hlength;
  sliderCovidConfig;
dataReq1;
notificationarray : any = [];
messages;
  alertshow: boolean = false;
pencil_banner: any = [];
pencil_banenr;
meta_title;
meta_desc;
meta_keywords;
page_title;
canonical_rel;
setting : any = [];
meta_robots;
canonical_tag;
  sidebar: any = [];
    submenu: any = [];
  dataArr: any = [];
  lgSelected : string = '';
  isLogin : boolean = false;

  showModalBox:boolean = false;  
  socialdeactivate:boolean = false
  loginform: FormGroup;
  policyform: FormGroup;
  first_name;
  loading :boolean = false;  
  last_name;
  duplicate:boolean = false;
   loggedIn;
   length;
  socialdata;
  provider;
  dataReqnot;
  datavali;
  user;
  users;
  mobileapp;
  loginerroe:boolean = false;
  loading1:boolean = false;
  isLoginClicked :boolean = false;
  innerWidth: any = null;

  constructor(public api_header: HeaderServiceService, private ref: ChangeDetectorRef,public dashservice : DashboardService,private renderer: Renderer2,public api_sub : SubjectCallService,public api_page : HomepageService,public auth :AuthServicess,
    public router: Router,private formBuilder: FormBuilder,private authService: AuthService) {

      if(localStorage.getItem('alertshow') != undefined || localStorage.getItem('alertshow') != null){
        this.alertshow = localStorage.getItem('alertshow') == 'no' ? false : true;

        if(this.alertshow){
          document.body.classList.add('mngTp-alert-Spc')
        }else{
          document.body.classList.remove('mngTp-alert-Spc')
        }
      }else{
        this.alertshow = true;
        document.body.classList.add('mngTp-alert-Spc');
      }
    
  this.getLanguageList();
   }

  isShown: boolean = true ;

  ngOnInit(): void {
   
   
    if(sessionStorage.getItem('userdata')){
    this.users= JSON.parse(sessionStorage.getItem('userdata'));
    this.closeAlert();
    this.notificationBox();
    if(localStorage.getItem('notificationlength')){
      this.Hlength =  localStorage.getItem('notificationlength');
    }else{
      this.Hlength =  this.dashservice.notification_length;
    }
    }


  
    // console.log(this.router.url.substr(this.router.url.length-6));
    // if(this.router.url.slice(-6) == 'mobile'){
    //   this.api_sub.mob  = 1;
    //   sessionStorage.setItem('mob','1')
    // }else{
    //   this.api_sub.mob  = 0;
    //   sessionStorage.setItem('mob','0')
    // }
    // this.mobileapp = this.api_sub.mob ;
    // console.log( sessionStorage.getItem('mob'));
 
    this.innerWidth = window.innerWidth;

    if (this.innerWidth <= 767) {

      var lastScrollTop = 0;
      $(window).scroll(function (event) {
        var st = $(this).scrollTop();

        var height = $(window).scrollTop();
    

        if (st > lastScrollTop) {

          if (height < 500) {
            this.document.body.classList.add('scroll-up');
            this.document.body.classList.remove('scroll-down');
            // this.document.body.classList.remove('scroll-up');
          } else {
            this.document.body.classList.add('scroll-down');
            this.document.body.classList.remove('scroll-up');
          }
          // downscroll code
          // console.log(11111)
        } else {
          this.document.body.classList.add('scroll-up');
          this.document.body.classList.remove('scroll-down');
          // upscroll code
          // console.log(222222)
        }
        lastScrollTop = st;
      });
    }



   
    this.renderer.removeClass(document.body, 'menuShow');
  this.getdelay();
    this.getLanguageList();
    
        this.page_title = sessionStorage.getItem('page_title');
      this.meta_title = sessionStorage.getItem('meta_title');
      this.meta_desc = sessionStorage.getItem('meta_desc');
      this.meta_keywords = sessionStorage.getItem('meta_keywords');
       this.canonical_rel = sessionStorage.getItem('canonical_rel');
      this.canonical_tag = sessionStorage.getItem('canonical_tag');
      this.meta_robots = sessionStorage.getItem('meta_robots');
      
    
     this.getPencilbanner();
     if(sessionStorage.getItem('token') != null){
  
     // this.userNotifications();
      this.isLogin = true;

      
      // mngTp-alert-Spc
    }
   
      
    MalihuScrollbarModule
    SlickCarouselModule
    // if(sessionStorage.getItem('lg') != undefined || sessionStorage.getItem('lg') != null){
    //   sessionStorage.removeItem('lg')
    // }
    if(sessionStorage.getItem('lgsrt') != undefined || sessionStorage.getItem('lgsrt') != null){
      this.lgSelected  = sessionStorage.getItem('lgsrt');
    }
      this.getSidebarMenu();
      
    

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

  
    // }
  }

  login(){
    this.router.navigate(['/login']);
    
  }
  notification(){
    this.router.navigate(['/dashboard/notifications']);
    
  }
  pharmacy(){
    this.router.navigate(['/pharmacy-card']);
    
  }
  
  toggle() {
    // this.isShown = ! this.isShown;
    document.body.classList.add('menuShow');
    // document.getElementById("closemenu").style.display = "block";
    // document.getElementsByClassName("closemenuModal").style.color = "yellow";
    
    // this.isShown = true;
  }
  
  menuClose(){
    document.body.classList.remove('menuShow');
    // document.getElementById("closemenu").style.display = "none";
    // this.isShown = false;
  }


  closeAlert(){
    this.alertshow = false;
    document.body.classList.remove('mngTp-alert-Spc');
    localStorage.setItem('alertshow', 'no');
  }
  showAlert(){
    this.alertshow = true;
    document.body.classList.add('mngTp-alert-Spc');
    localStorage.setItem('alertshow', 'yes');
  }

  notificationBox(){
    this.dataReqnot = {
      "language_id":  sessionStorage.getItem('lg'),
    }
    this.dashservice.notificationBox(this.dataReqnot).subscribe((data: {}) => {
     // console.log(data);
      if(data['status'] == 'success'){
     
        var noti = data['notification'];
        var notification = JSON.parse(noti.notificaions);
        var notificationurl = JSON.parse(noti.notifications_url);
        //console.log('notification',notification[0]);
       for(var i = 0;i<notification.length;i++){
        if(notification[i] != null){
         this.notificationarray.push({'text':notification[i],'id':i+1,'url':notificationurl[i]});
         
        }
        }
        this.userNotifications();
      } 
    });
  }
  userNotifications(){
let tok =sessionStorage.getItem('token');
// console.log('this.dataReq',tok);
     this.dataReq = {
          "token" : tok
    
        }
        // console.log('this.dataReq',this.dataReq);
        this.dashservice.userNotifications(this.dataReq).subscribe((data: {}) => {
       // console.log(data);
        if(data['status'] == 'success'){
          this.setting = data['user_notification'];
         
        //this.setting = data['user_notification'];
        this.length = data['length'];
        var len = this.notificationarray.length+this.setting.length;
         localStorage.setItem('notificationlength', len);
         this.dashservice.notification_length = len;
        //  console.log('len', len);
        // console.log('this.setting',this.setting);
          //console.log('this.length',this.length);
     
        }    
        });

    }

    // userNotifications(){

    //  this.dataReq1 = {
    //       "user_id" : 2
    //     }
    //     this.dashservice.userNotifications(this.dataReq1).subscribe((data: {}) => {
       
    //     if(data['status'] == 'success'){
    //     this.Hlength = data['length'];
     
      
    //     }    
    //     });

    // }

    // 

  getLanguageList()
  {
    this.api_header.getLanguage().subscribe((data: {}) => {
      // console.log(data);
      this.dataArr = data['languages'];
      // console.log(this.dataArr,"Language List");
      
      // this.lgSelected = this.dataArr[0].shortCode;
      if(sessionStorage.getItem('lgsrt') != undefined || sessionStorage.getItem('lgsrt') != null){
        if(this.lgSelected == this.dataArr[0].shortCode){
          this.language = false;
        }else{
          this.language = true;
        }
      }else{
        this.language = false;
      }
      // console.log(sessionStorage.getItem('lg'),'lg');
      if(sessionStorage.getItem('lg') == undefined || sessionStorage.getItem('lg') == null){
        this.lgSelected = this.dataArr[0].shortCode;
        sessionStorage.setItem('lg', this.dataArr[0].id)
        sessionStorage.setItem('lgsrt', this.dataArr[0].shortCode)
        this.languageChange.emit(this.dataArr[0].id);
      }else if (sessionStorage.getItem('lg') == '2'){
        sessionStorage.setItem('lg', '2')
        this.dataArr[0].shortCode = 'EN';
        this.dataArr[1].shortCode = 'ES';
        sessionStorage.setItem('lgsrt', 'EN')
        this.lgSelected = 'EN';
       
      }else if(sessionStorage.getItem('lg') == '3'){
        this.dataArr[1].shortCode = 'ES';
        this.dataArr[0].shortCode = 'EN';
        sessionStorage.setItem('lg', '3')
        sessionStorage.setItem('lgsrt', 'ES')
        this.lgSelected = 'ES';
   
      }
    });
  }

  getSidebarMenu(){
    this.dataReq = {
      "language_id":  sessionStorage.getItem('lg'),
    }
    // console.log(this.zipdata);
    
    this.api_header.getSidebarMenu(this.dataReq).subscribe((data: {}) => {
       this.sidebar = [];
        if(data['status'] == "success"){
        this.sidebar = JSON.parse(JSON.stringify(data['sidebar_menu']));
        for(var i = 0;i<this.sidebar.length;i++){
      this.sidebar[i].submenu_title  = JSON.parse(this.sidebar[i].submenu_title);
       this.sidebar[i].submenu_icon  = JSON.parse(this.sidebar[i].submenu_icon);
       this.sidebar[i].submenu_url  = JSON.parse(this.sidebar[i].submenu_url);
        }
       // console.log('this.sidebar',this.sidebar[0].submenu_title[1]);
        this.submenu = JSON.parse(JSON.stringify(data['sidebar_title']));
        this.submenupath = data['project_path']+data['path'];
        let btn : HTMLElement = document.getElementById("closebtn") as HTMLElement;
        btn.click();
        
        }else{
      this.sidebar = [];

        }
      
    });
  }
  

  checkValue(event: any){
   // console.log('this.router.url',this.router.url,this.router.url.replace('SP','EN'));
    
   if( event == 2){
    //  console.log('this.router.url.slice(0, 2)',this.router.url.slice(1, 2));
     // console.log('es',this.router.url.length,this.router.url[this.router.url.length-2]+this.router.url[this.router.url.length-1]);
      //console.log('es',this.router.url.replace(new RegExp(this.router.url + '$'), 'es'));
      
      //this.router.navigate([this.router.url.replace('es','en')]);
      // console.log(this.router.url.substr(1, 2) + 'en' + this.router.url.substr(3 + 1));
      //this.router.navigate([this.router.url.slice(1, 3) + 'en']);
      if(this.router.url.substr(1,2) == 'es'){
      this.router.navigate(['en' + this.router.url.substr(1 + 2)]);
      }
    }else if(event == 3){
     // console.log('this.router.url.slice(0, 2)',this.router.url.substr(1 , 2),'es' + this.router.url.substr(1 + 2));
      //console.log('es',this.router.url.length,this.router.url[this.router.url.length-2]+this.router.url[this.router.url.length-1]);
    //  console.log(this.router.url.slice(-7));
    //  console.log( 'es' + this.router.url.substr(1 + 2),this.router.url.length > 1);
      //console.log('this.router.url',this.router.url.slice(0, -2) + 'es');
      //console.log('es',this.router.url.replace(new RegExp(this.router.url + '$'), 'en'));
      //this.router.navigate([this.router.url.slice(1, 3) + 'es']);
      if(this.router.url.substr(1,2) == 'en'){
      this.router.navigate(['es' + this.router.url.substr(1 + 2)]);
      }
    }
    let btn : HTMLElement = document.getElementById("closebtn") as HTMLElement;
    btn.click();
    sessionStorage.setItem('lg', event);
    this.getSidebarMenu();
        this.getPencilbanner();
    this.languageChange.emit(event);

    // this.ref.detectChanges();
  }

  getValue(event: any){
    this.lgSelected = event;
    sessionStorage.setItem('lgsrt', event)
    // console.log(this.lgSelected, "event lang select");
  }
  
   slidesCovidUpdate = [
    { id:"1", name: 'COVID-19 Update - Our agencies are open! Call Customer Service' },
    { id:"2", name: 'Bundle & Save! - Get an additional 15% credit on new policies.' },
  ];  

  getPencilbanner(){
if(sessionStorage.getItem('lg')){
this.dataReq = {
      "language_id":  sessionStorage.getItem('lg'),
    }
    }else{
    this.dataReq = {
      "language_id":  2
    }
    }
   this.api_header.getPencilbanner(this.dataReq).subscribe((data: {}) => {
   this.pencil_banner = [];
this.pencil_banenr = data['banners'];

var project_path = data['project_path'];
for(var i = 0;i<this.pencil_banenr.length;i++)
{
  this.pencil_banner.push({'id':i+1,'name':this.pencil_banenr[i].title,'is_background':this.pencil_banenr[i].is_background,'button_text':this.pencil_banenr[i].button_text,'button_colour':this.pencil_banenr[i].button_colour,'button_url':this.pencil_banenr[i].button_url,'desktop_img':project_path+this.pencil_banenr[i].desktop_img,'mob_img':project_path+this.pencil_banenr[i].mob_img,'color':this.pencil_banenr[i].color,'page_id':this.pencil_banenr[i].page_id,'page_url':this.pencil_banenr[i].button_url});
  } 
      // this.renderer.addClass(document.body, 'mngTp-alert-Spc');

      if(localStorage.getItem('alertshow') != undefined || localStorage.getItem('alertshow') != null){
        this.alertshow = localStorage.getItem('alertshow') == 'no' ? false : true;

        if(this.alertshow){
          document.body.classList.add('mngTp-alert-Spc')
        }else{
          document.body.classList.remove('mngTp-alert-Spc')
        }
      }
        
  });

}
 getdelay(){
this.dataReq = {
      "language_id":  sessionStorage.getItem('lg'),
    }
 this.api_page.getProduct(this.dataReq).subscribe((data: {}) => {

var pageArr = data['homepage'];
 this.sliderCovidConfig= {
  "autoplaySpeed": pageArr.pencil_banner_delay, 
  "arrows" : false,   
  "dots": false,  
  "infinite": false,  
  "slidesToShow": 1,  
  "slidesToScroll":1,   
  "autoplay": true,   
  "speed": 0,   
  
  "cssEase": 'linear',  
  "swipe":false,  
  "vertical": true,   
  "touchMove":false,  
  "verticalSwiping": true,  
  "pauseOnHover":false
  }

 });

 }



 signInWithGoogle(d): void {
  this.provider = '';
  if(d == 'google'){
  this.provider = 'google';
  }else if(d == 'fb'){
   this.provider = 'fb';
  }

 
  if(this.provider == 'google'){

this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
}else if(this.provider == 'fb'){

 this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
}
this.signinbkp();
}

closesocial(){
this.socialdeactivate = false;
}
signInWithFB(): void {

this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
this.signinbkp();
} 



checksocial(d){
  this.provider = '';
if(d == 'google'){
this.provider = 'google';
}else if(d == 'fb'){
 this.provider = 'fb';
}

}


validatedata(){
var source = this.socialdata;

this.dashservice.verifyToken().subscribe((data: {}) => {
   
var datareq = this.policyform.value;
this.datavali = {
  "policyNo" : datareq.policyNo,
    "dob" : datareq.dob,
     "postalCode" :  datareq.zip,
"token":data['token']
};

 this.auth.Datavalidation(this.datavali).subscribe((data: {}) => {

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
      
              sessionStorage.setItem('token', data['token']);
              
              sessionStorage.setItem('userdata',JSON.stringify(data));
               this.router.navigate(['/dashboard/notifications']);
              }else if(data['status'] == 404){
              this.duplicate = true;
                   this.router.navigate(['/login']);
              }else{
              this.router.navigate(['/login']);
              }
          
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


getRedirect(url){
  // console.log(url);
  this.loading = true;
  // this.router.navigate([url]);

}

onSubmit(){
  this.loading1 = true;
  this.isLoginClicked = true;
  this.dashservice.verifyToken().subscribe((data: {}) => {
   
var datareq = this.loginform.value;
var datavallog = {
  "emailId" : datareq.email,
    "password" : datareq.password,
     "token":data['token']
};
  this.auth.login(datavallog).subscribe((data: {}) => {
  if(data['status'] == 200){
    this.loading1 = false;
      
     this.first_name = data['firstName'];
      this.last_name =data['lastName'];
          this.loginerroe = false;
      this.dashservice.userdata = data;
       sessionStorage.setItem('userdata', JSON.stringify(this.dashservice.userdata));
      
          sessionStorage.setItem('token', data['token']);
          this.loginform.reset();
           this.router.navigate(['/dashboard/notifications']);
         
          }else{
            this.loading1 = false;
            this.isLoginClicked = false;
              this.loginform.controls['email'].setErrors({'incorrect': true});
       this.loginform.controls['password'].setErrors({'incorrect': true});
       this.loginerroe = true;
              this.router.navigate(['/login']);
          }
        
  });
    });
}
 

signinbkp(){
  
  this.authService.authState.subscribe((user) => {
            this.user =  '';
       this.user = user;
        this.socialdata = user;
       var d = user;
  
         if(d!=null){
          var $ :any;
           this.auth.checksocial(d).subscribe((data: {}) => {
         
           if(data['status'] == 200 && data['is_social'] == 1){
       
            
          this.first_name = data['first_name'];
           this.last_name =data['last_name'];
 
           this.dashservice.userdata = data;
            sessionStorage.setItem('userdata', JSON.stringify(this.dashservice.userdata));
               sessionStorage.setItem('token', data['token']);
               this.loginform.reset();
                this.router.navigate(['/dashboard/notifications']);
           }else if(data['status'] == 200 && data['is_social'] == 0){
             this.socialdeactivate = true;
           
           }else if(data['status'] == 404){
          
            
            this.showModalBox = true;
           }
            });
          
           }
 
      
     });
 
    }
    mobile(){
    // console.log('innnn');
      let btn : HTMLElement = document.getElementById("closebtn") as HTMLElement;
        btn.click();
        var lg = sessionStorage.getItem('lgsrt');
      //  console.log('lg',lg);
        if( lg == 'EN'){
          this.router.navigate(['/en/mobile-app']);
        }else if(lg == 'ES'){
          this.router.navigate(['/es/mobile-app']);
        }
      
    }
    claims(){
      let btn : HTMLElement = document.getElementById("closebtn") as HTMLElement;
      btn.click();
      var lg = sessionStorage.getItem('lgsrt');
      if( lg == 'EN'){
        this.router.navigate(['/en/claims']);
      }else if(lg == 'ES'){
        this.router.navigate(['/es/claims']);
      }
      
    }
    
  
}
