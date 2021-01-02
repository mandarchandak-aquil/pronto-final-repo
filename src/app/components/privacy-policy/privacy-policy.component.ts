import { Component, OnInit } from '@angular/core';
import { PagesService } from '../../commons/services/page/pages.service';
import { SubjectCallService } from '../../commons/services/subject-call/subject-call.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit {
  loading : boolean = true;
  dataReq : any;
  pageArr;
  section1;
  table_of_content_subpoints1;
  table_of_content_subpoints2;
  table_of_content_subpoints3;
  table_of_content_subpoints4;
  info_subtitles;
  info_subtitles2;
  sensetive_subtitles;
  how_we_use_subtitles;
  disclosure_subtitles;
  prontos_cookie_subtitles;
  constructor(public api_page : PagesService, public api_sub : SubjectCallService, private sanitizer: DomSanitizer, private vps: ViewportScroller) { }

  ngOnInit(): void {
    this.getContent();
  }

  getContent(){
  console.log(sessionStorage.getItem('lg'));
    this.dataReq = {
      "language_id": sessionStorage.getItem('lg'),
      "page_url": "privacy-policy"
    }
    // console.log(this.zipdata);
    
    this.api_page.Privacypolicy(this.dataReq).subscribe((data: {}) => {
      // console.log(data);
      if(data['status'] == "success"){
    

        this.pageArr = data['page'];
         this.section1 = this.sanitizer.bypassSecurityTrustHtml(data['page'].section1);
        this.table_of_content_subpoints1 = JSON.parse(data['page'].table_of_content_subpoints1);
        this.table_of_content_subpoints2 = JSON.parse(data['page'].table_of_content_subpoints2);
        this.table_of_content_subpoints3 = JSON.parse(data['page'].table_of_content_subpoints3);
        this.table_of_content_subpoints4= JSON.parse(data['page'].table_of_content_subpoints4);
        this.info_subtitles = JSON.parse(data['page'].info_subtitles);
        this.info_subtitles2 = JSON.parse(data['page'].info_subtitles2);
        this.sensetive_subtitles = JSON.parse(data['page'].sensetive_subtitles);
        this.how_we_use_subtitles = JSON.parse(data['page'].how_we_use_subtitles);
        this.disclosure_subtitles = JSON.parse(data['page'].disclosure_subtitles);
  this.prontos_cookie_subtitles = JSON.parse(data['page'].prontos_cookie_subtitles);

        
            this.loading  = false;
      }else{
        this.pageArr = [];
        this.loading  = false;
      }
      console.log(this.pageArr,'this.pageArr');
    });
  }

scroll(id) {
    this.vps.scrollToAnchor(id);
  }
  onlanguageChange(newValue){
    // console.log(newValue, "new language");
    this.getContent();
    this.api_sub.sendMessage(1);
  }

  // onlanguageChange(newValue){
  //   // console.log(newValue, "new language");
  //   this.getContent();
  //   this.api_sub.sendMessage(1);
  // }
}
