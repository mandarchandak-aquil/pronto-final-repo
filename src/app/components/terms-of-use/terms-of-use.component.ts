import { Component, OnInit } from '@angular/core';
import { PagesService } from '../../commons/services/page/pages.service';
import { SubjectCallService } from '../../commons/services/subject-call/subject-call.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-terms-of-use',
  templateUrl: './terms-of-use.component.html',
  styleUrls: ['./terms-of-use.component.css']
})
export class TermsOfUseComponent implements OnInit {
	loading :boolean = true;  
  dataReq : any;
  pageArr: any = [];
  constructor(public api_page : PagesService, public api_sub : SubjectCallService) { }

  ngOnInit(): void {
  this.Termsofuse();
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
  getScroll2(id)
  {
    console.log($(".headerWrapMain").height()+10)

    setTimeout(function() { 
      $('html,body').animate({ scrollTop : $("#id"+id+"-header").offset().top - ($(".headerWrapMain").height()+10) }, 500); 
    }, 1000);
 
  }
  Termsofuse(){
    this.dataReq = {
      "language_id":  sessionStorage.getItem('lg')
    }
  	 this.api_page.Termsofuse(this.dataReq).subscribe((data: {}) => {

  	  if(data['status'] == "success"){
        this.pageArr = data['page'];

        sessionStorage.setItem('page_title',data['page'].page_title);
    sessionStorage.setItem('meta_title',data['page'].meta_title);
    sessionStorage.setItem('meta_desc',data['page'].meta_desc);
  sessionStorage.setItem('meta_keywords',data['page'].meta_keywords);
  sessionStorage.setItem('canonical_rel',data['page'].canonical_rel);
  sessionStorage.setItem('canonical_tag',data['page'].canonical_tag);
    sessionStorage.setItem('meta_robots',data['page'].meta_robots);
      this.loading = false;
      }else{
        this.pageArr = [];
      }

  	 });
  }
   onlanguageChange(newValue){
    // console.log(newValue, "new language");
    this.Termsofuse();
    this.api_sub.sendMessage(1);
  }

}
