import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { HeaderServiceService } from '../../commons/services/header/header-service.service';
import { SubjectCallService } from '../../commons/services/subject-call/subject-call.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

   @Input()
  page_url: any;
  @Output() languageChange = new EventEmitter();
  lgSelected : string = '';
  messages;
   subscription: Subscription;
  constructor(public api_header: HeaderServiceService, private ref: ChangeDetectorRef,public api_sub : SubjectCallService) {
    //this.loadScript('//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js');
    
  this.subscription = this.api_sub.getMessage().subscribe(message => {
   
      if (message) {
        
         if(message.isUpdate == 1){
          this.getFooterHorizontal();
          this.getFooter();
          this.Connect();

        }

        this.messages= message;
      } else {
        this.messages = '';
      }
    });
   }
  horizontal_menu;
dataReq;
dataReq2;
footermenu;
  social;
  connect;

  ngOnInit(): void {

    console.log("load script")
    $.getScript('//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js');
this.getFooterHorizontal();
 this.getSocialIcon();
 this.getFooter();
 this.Connect();
  }

  public loadScript(url: string) {
      const body = <HTMLDivElement> document.body;
      const script = document.createElement('script');
      script.innerHTML = '';
      script.src = url;
      script.async = false;
      script.defer = true;
      console.log(script);
      body.appendChild(script);
    }

 getFooterHorizontal(){
    this.dataReq = {
      "language_id":  sessionStorage.getItem('lg'),
    }
    // console.log(this.zipdata);
    
    this.api_header.getfooterhorizontalMenu(this.dataReq).subscribe((data: {}) => {
     
        if(data['status'] == "success"){
        this.horizontal_menu = JSON.parse(JSON.stringify(data['horizontal_menu']));
      
        }else{
      this.horizontal_menu = [];

        }
    
    });
  }

  Connect(){
    this.dataReq2 = {
      "language_id":  sessionStorage.getItem('lg'),
    }
    // console.log(this.zipdata);
    
    this.api_header.Connect(this.dataReq).subscribe((data: {}) => {
      
        if(data['status'] == "success"){
        this.connect = JSON.parse(JSON.stringify(data['connect']));
       
      
        }else{
      this.footermenu = [];

        }
    
    });
   
  }
ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    }


  getFooter(){
    this.dataReq = {
      "language_id":  sessionStorage.getItem('lg'),
    }
    // console.log(this.zipdata);
    
    this.api_header.getfooterMenu(this.dataReq).subscribe((data: {}) => {
      
        if(data['status'] == "success"){
        this.footermenu = data['footer_menu'];
        console.log('this.footermenu.length',this.footermenu.length);
        for(var i = 0 ;i< this.footermenu.length;i++)
        {
        this.footermenu[i].menu_title  = this.footermenu[i].menu_title;
        this.footermenu[i].menu_url  = this.footermenu[i].menu_url;
        console.log('before this.footermenu[i].submenu_title',this.footermenu[i].submenu_title)
    this.footermenu[i].submenu_title =JSON.parse(this.footermenu[i].submenu_title);
      console.log('after this.footermenu[i].submenu_title',this.footermenu[i].submenu_title[0])
  this.footermenu[i].submenu_order  = JSON.parse(this.footermenu[i].submenu_order);
    this.footermenu[i].submenu_url  = JSON.parse(this.footermenu[i].submenu_url);
         }
      
        }else{
      this.footermenu = [];

        }
    
    });
   
  }
  
 

getSocialIcon(){
    
    // console.log(this.zipdata);
    
    this.api_header.getSocialIcon().subscribe((data: {}) => {
     
        if(data['status'] == "success"){
        this.social = JSON.parse(JSON.stringify(data['social']));
      
        }else{
      this.social = [];

        }
     
    });
  }


}
