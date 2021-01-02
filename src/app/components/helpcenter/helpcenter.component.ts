import { Component, ElementRef, OnInit } from '@angular/core';
import { PagesService } from '../../commons/services/page/pages.service';
import { SubjectCallService } from '../../commons/services/subject-call/subject-call.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { ViewportScroller } from '@angular/common';
import * as $ from 'jquery';
@Component({
  selector: 'app-helpcenter',
  templateUrl: './helpcenter.component.html',
  styleUrls: ['./helpcenter.component.css']
})
export class HelpcenterComponent implements OnInit {
  loading :boolean = true; 
  dataReq;
  page;
  ans1;
  ans4;
  ans5_2;
  ans6_3_3;
  ans6_2_3;
  ans7_2;
  ans8_2;
  cov_ans_1;
  cov_ans_2;
  cov_ans_3_2;
  constructor(public api_page : PagesService, public api_sub : SubjectCallService, private sanitizer: DomSanitizer, private vps: ViewportScroller, private elRef: ElementRef) { }

  ngOnInit(): void {
  this.helpcenter();
  }


  getScroll(id)
  {
    // var headspc = $(".headerWrapMain").height() + 10;
    // var panel = $(".cst_accord"+id).offset().top;
    // setTimeout(function() { 
    //   $('html,body').animate({ scrollTop: panel - headspc }, 500); 
    // }, 400);   

    setTimeout(function() { 
      $('html,body').animate({ scrollTop: $(".cst_accord"+id).offset().top - ($(".headerWrapMain").height()+10) }, 500); 
    }, 400);   
  }


  helpcenter(){
   this.dataReq = {
      "language_id": sessionStorage.getItem('lg')
    }
  this.api_page.helpcenter(this.dataReq).subscribe((data: {}) => {
  this.page = data['page']; 
   this.ans1 = JSON.parse(this.page['ans1']);
   this.ans4 = JSON.parse(this.page['ans4']);
   this.ans5_2 = JSON.parse(this.page['ans5_2']);
   this.ans6_2_3 = JSON.parse(this.page['ans6_2_3']);
   this.ans6_3_3 = JSON.parse(this.page['ans6_3_3']);
   this.ans7_2 = JSON.parse(this.page['ans7_2']);
   this.ans8_2 = JSON.parse(this.page['ans8_2']); 
   this.cov_ans_1 = JSON.parse(this.page['cov_ans_1']); 
   this.cov_ans_2  = JSON.parse(this.page['cov_ans_2']); 
   this.cov_ans_3_2 = JSON.parse(this.page['cov_ans_3_2']); 
   this.loading = false;
  console.log(this.page['title']);
  });
  }

  scroll(){

  }

 onlanguageChange(newValue){
    // console.log(newValue, "new language");
    this.helpcenter();
    this.api_sub.sendMessage(1);
  }

}
