import { Component, OnInit } from '@angular/core';
import { PagesService } from '../../commons/services/page/pages.service';
import { SubjectCallService } from '../../commons/services/subject-call/subject-call.service';
import { Router,ActivatedRoute } from '@angular/router';
// import * as AOS from 'aos';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';


@Component({
  selector: 'app-corona-update',
  templateUrl: './corona-update.component.html',
  styleUrls: ['./corona-update.component.css']
})
export class CoronaUpdateComponent implements OnInit {
page;
slug;
dataReq;
section1;
section2;
paramLink

   loading :boolean = true;  
  constructor(public api_page : PagesService, public routers: Router,public api_sub : SubjectCallService,public router: ActivatedRoute,private sanitizer: DomSanitizer) { 
    this.router.params.subscribe(function(params){
      this.paramLink = params;
      localStorage.setItem('page_url', JSON.stringify(params));
      console.log(params.page_url)
     })
  }

  ngOnInit(): void {
  
   console.log('ngOnInit');   
  this.Pencilbannerpages();
  this.loading = false;
 
  }

  Pencilbannerpages(){
    console.log('ngOnInitinnnnnnn');  
    var page_url = JSON.parse(localStorage.getItem('page_url'));

 
  this.dataReq = {
      "language_id":  sessionStorage.getItem('lg'),
      "page_url" : this.routers.url
    }
    console.log('ngOnInitinnnnnnn',this.dataReq);  

  this.api_page.Pencilbannerpages(this.dataReq).subscribe((data: {}) => {
    console.log(data, 'Pencilbannerpages')
if(data['status'] == 'success'){
  this.page =data['page'];
   this.section1 =this.sanitizer.bypassSecurityTrustHtml(this.page.section1);
 this.section2 = this.sanitizer.bypassSecurityTrustHtml(this.page.section2);
}else{
  console.log(data['message'])
}
  });

  }
 onlanguageChange(newValue){
    // console.log(newValue, "new language");
    this.Pencilbannerpages();
    this.api_sub.sendMessage(1);
  }
}
