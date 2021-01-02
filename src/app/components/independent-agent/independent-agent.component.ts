import { Component, OnInit } from '@angular/core';
import { PagesService } from '../../commons/services/page/pages.service';
import { SubjectCallService } from '../../commons/services/subject-call/subject-call.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { ViewportScroller } from '@angular/common';
import * as $ from 'jquery';
@Component({
  selector: 'app-independent-agent',
  templateUrl: './independent-agent.component.html',
  styleUrls: ['./independent-agent.component.css']
})
export class IndependentAgentComponent implements OnInit {
  dataReq;
  pageArr;
  project_path;
  question;
  insurance_type;
  answer;
  loading : boolean = true;
  constructor(public api_page : PagesService, public api_sub : SubjectCallService, private sanitizer: DomSanitizer, private vps: ViewportScroller) { }


  ngOnInit(): void {
    this.independentAgent();
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

  independentAgent(){
    this.dataReq = {
      "language_id": sessionStorage.getItem('lg')
    }
  this.api_page.independentAgent(this.dataReq).subscribe((data: {}) => {
    if(data['status'] == 'success'){
      this.project_path = data['project_path'];
      this.pageArr = data['page'];
        this.insurance_type = JSON.parse( this.pageArr['insurance_type']);
      this.question = JSON.parse( this.pageArr['question']);
      this.answer = JSON.parse( this.pageArr['answer']);
      
      sessionStorage.setItem('page_title',data['page'].page_title);
    sessionStorage.setItem('meta_title',data['page'].meta_title);
    sessionStorage.setItem('meta_desc',data['page'].meta_desc);
    sessionStorage.setItem('meta_keywords',data['page'].meta_keywords);
    sessionStorage.setItem('canonical_rel',data['page'].canonical_rel);
    sessionStorage.setItem('canonical_tag',data['page'].canonical_tag);
    sessionStorage.setItem('meta_robots',data['page'].meta_robots); 
    this.loading = false;
    }
    console.log('data',this.pageArr);
  });
  }
  onlanguageChange(newValue){
    // console.log(newValue, "new language");
    this.independentAgent();
    this.api_sub.sendMessage(1);
  }
}
