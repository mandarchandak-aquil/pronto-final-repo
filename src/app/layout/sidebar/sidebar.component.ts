import { Component, OnInit, Input, ChangeDetectorRef, Output,Renderer2 , EventEmitter, HostListener } from '@angular/core';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';
import { HeaderServiceService } from '../../commons/services/header/header-service.service';
import { DashboardService } from '../../commons/services/dashboard/dashboard.service';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SubjectCallService } from '../../commons/services/subject-call/subject-call.service';
import { HomepageService } from '../../commons/services/homepage/homepage.service';
import { AuthServicess } from '../../commons/services/auth/auth.service';
import { AuthGuard } from '../../commons/guards/auth.guard';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Input()
  page_url: any;
  @Output() languageChange = new EventEmitter();
  isShown: boolean = true ;
  sidebar;
  messages;
  loading; 
  dataReq;
  submenupath;
  submenu;
  subscription: Subscription;
    constructor(public api_header: HeaderServiceService, private ref: ChangeDetectorRef,public dashservice : DashboardService,private renderer: Renderer2,public api_sub : SubjectCallService,public api_page : HomepageService,public auth :AuthServicess,
      public router: Router,private formBuilder: FormBuilder,private authService: AuthService) {
 
      this.subscription = this.api_sub.getMessage().subscribe(message => {
       
          if (message) {
            
             if(message.isUpdate == 1){
              this.getSidebarMenu();
            
            }
    
            this.messages= message;
          } else {
            this.messages = '';
          }
        });
       }
  ngOnInit(): void {
    this.getSidebarMenu();
  }
  menuClose(){
    document.body.classList.remove('menuShow');
    // document.getElementById("closemenu").style.display = "none";
    // this.isShown = false;
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
  getRedirect(url){
    // console.log(url);
    this.loading = true;
    // this.router.navigate([url]);
  
  }
  pharmacy(){
    this.router.navigate(['/en/pharmacy-card']);
    
  }
}
