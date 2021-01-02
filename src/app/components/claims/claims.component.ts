import { Component, OnInit } from '@angular/core';
import { PagesService } from '../../commons/services/page/pages.service';
import { SubjectCallService } from '../../commons/services/subject-call/subject-call.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.css'],
    animations: [
    trigger('smoothCollapse', [
      state('initial', style({
        height:'0',
        overflow:'hidden',
        opacity:'0'
      })),
      state('final', style({
        overflow:'hidden',
        opacity:'1'
      })),
      transition('initial=>final', animate('2.5s')),
      transition('final=>initial', animate('2.5s'))
    ]),
  ]
})

export class ClaimsComponent implements OnInit {
dataReq;
page;
subtitle;
buttons;
buttons_url;
state;
state_number;
   loading :boolean = true;  
projectpath;
commonly_use_subtitle;
commonly_use_subtitle1;
commonly_use_subtitle2;

section4_titles;
section4_subtitles;

section6_titles;
section6_subtitles;
faq_qsn;
faq_answer;
tabs;

 constructor(public api_page : PagesService, public api_sub : SubjectCallService,private sanitizer: DomSanitizer, private vps: ViewportScroller) { }

  ngOnInit(): void {
  this.Claimcms();
  }
Claimcms(){
this.dataReq = {
      "language_id":  sessionStorage.getItem('lg')
    }
	 this.api_page.Claimcms(this.dataReq).subscribe((data: {}) => {
	 if(data['status'] == 'success'){
	 this.page = data['page'];
	 this.subtitle = this.sanitizer.bypassSecurityTrustHtml(this.page.subtitle);
	 this.projectpath  =data['project_path']; 
	 this.buttons = JSON.parse( this.page.buttons); 
	 this.buttons_url = JSON.parse( this.page.buttons_url); 
	 	this.state= JSON.parse( this.page.state); 
		this.state_number= JSON.parse( this.page.state_number); 
		this.tabs = JSON.parse( this.page.tabs); 
		this.commonly_use_subtitle = JSON.parse( this.page.commonly_use_subtitle); 
		this.commonly_use_subtitle1 = JSON.parse( this.page.commonly_use_subtitle1); 
		this.commonly_use_subtitle2= JSON.parse( this.page.commonly_use_subtitle2); 
		this.faq_qsn= JSON.parse( this.page.faq_qsn); 
		this.faq_answer= JSON.parse( this.page.faq_answer); 
		this.section4_titles = JSON.parse( this.page.section4_titles); 
		this.section4_subtitles = JSON.parse( this.page.section4_subtitles); 
		this.section6_titles = JSON.parse( this.page.section6_titles);
		this.section6_subtitles = JSON.parse( this.page.section6_subtitles);
	 this.loading = false;
	 }

	 });
}
getScroll(id)
  {
    console.log($(".headerWrapMain").height()+10)

    setTimeout(function() { 
      $('html,body').animate({ scrollTop : $("#id"+id+"-header").offset().top - ($(".headerWrapMain").height()+10) }, 500); 
    }, 400);

  
  }
onlanguageChange(newValue){
   this.Claimcms();
      this.api_sub.sendMessage(1);
    }

    scroll(id) {
      // this.vps.scrollToAnchor(id);

      // var aTag = $(".packageAlternative");
      $('html,body').animate({scrollTop: $("#"+id).offset().top - ($(".headerWrapMain").height())},'slow');

    }

}
