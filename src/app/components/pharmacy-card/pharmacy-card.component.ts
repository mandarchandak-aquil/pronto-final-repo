import { Component, OnInit } from '@angular/core';
import { PagesService } from '../../commons/services/page/pages.service';
import { SubjectCallService } from '../../commons/services/subject-call/subject-call.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { ViewportScroller } from '@angular/common';
@Component({
  selector: 'app-pharmacy-card',
  templateUrl: './pharmacy-card.component.html',
  styleUrls: ['./pharmacy-card.component.css']
})
export class PharmacyCardComponent implements OnInit {
dataReq;
page;
       loading :boolean = true; 
subtitle;
project_path;
downlod_buttons;
downlod_buttons_url;
section2_desc;
section3_table_tabs;
section3_table_tabs_new : any = [];
section4_col1_subtitles;
section4_col2_subtitles;
section4_col3_subtitles;
section4_col4_subtitles;
section4_col5_subtitles;
ads_path;
ads;
  constructor(public api_page : PagesService, public api_sub : SubjectCallService, private sanitizer: DomSanitizer, private vps: ViewportScroller) { }

  ngOnInit(): void {
  this.Pharmacycard();
  }
  scroll(id) {
    this.vps.scrollToAnchor(id);
  }

  Pharmacycard(){
   this.dataReq = {
      "language_id": sessionStorage.getItem('lg')
    }
  this.api_page.Pharmacycard(this.dataReq).subscribe((data: {}) => {
  if(data['status'] == 'success'){
  this.page = data['page'];
  this.project_path = data['project_path'];

  this.subtitle=  this.sanitizer.bypassSecurityTrustHtml(this.page.subtitle);
  this.section2_desc =  this.sanitizer.bypassSecurityTrustHtml(this.page.section2_desc);
  this.downlod_buttons = JSON.parse(this.page.downlod_buttons);
  this.downlod_buttons_url = JSON.parse(this.page.downlod_buttons_url);
  this.section3_table_tabs = JSON.parse(this.page.section3_table_tabs);
  var len = Math.ceil(this.section3_table_tabs.length/3);
console.log('len',len);
  for(var i=0;i<=len;i++){
  if(i!=0){
  	 j = j +3;
  	}else{
  	var j =0;
  	}
  	this.section3_table_tabs_new.push({'one':this.section3_table_tabs[j],'two':this.section3_table_tabs[j+1],'three':this.section3_table_tabs[j+2]});

  }
this.section4_col1_subtitles = JSON.parse(this.page.section4_col1_subtitles);
this.section4_col2_subtitles= JSON.parse(this.page.section4_col2_subtitle);
this.section4_col3_subtitles= JSON.parse(this.page.section4_col3_subtitle);
this.section4_col4_subtitles= JSON.parse(this.page.section4_col4_subtitle);
this.section4_col5_subtitles= JSON.parse(this.page.section4_col5_subtitle);
      sessionStorage.setItem('page_title',data['page'].page_title);
    sessionStorage.setItem('meta_title',data['page'].meta_title);
    sessionStorage.setItem('meta_desc',data['page'].meta_desc);
    sessionStorage.setItem('meta_keywords',data['page'].meta_keywords);
    sessionStorage.setItem('canonical_rel',data['page'].canonical_rel);
    sessionStorage.setItem('canonical_tag',data['page'].canonical_tag);
    sessionStorage.setItem('meta_robots',data['page'].meta_robots); 
    this.ads_path= data['ads_path'];
	this.ads=  data['banners'];
    this.loading = false;
  }
  });
  	
  }
  onlanguageChange(newValue){
    // console.log(newValue, "new language");
    this.Pharmacycard();
    this.api_sub.sendMessage(1);
  }

}
