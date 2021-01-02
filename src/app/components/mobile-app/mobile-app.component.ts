import { Component, OnInit } from '@angular/core';
import { PagesService } from '../../commons/services/page/pages.service';
import { SubjectCallService } from '../../commons/services/subject-call/subject-call.service';
@Component({
  selector: 'app-mobile-app',
  templateUrl: './mobile-app.component.html',
  styleUrls: ['./mobile-app.component.css']
})
export class MobileAppComponent implements OnInit {
  loading : boolean = true;
  dataReq;
  page;
  project_path;
  section5_screens;
  section5_subtitles;
  section5_titles;
  constructor(public api_page : PagesService, public api_sub : SubjectCallService) { }

  ngOnInit(): void {
    this.getContent();
  }
  getContent(){
    this.dataReq = {
      "language_id":  sessionStorage.getItem('lg')
    }
    // console.log(this.zipdata);
    
    this.api_page.mobileAppDownload(this.dataReq).subscribe((data: {}) => {
      // console.log(data);
      if(data['status']=='success'){
      this.page = data['page'];
      console.log('page',this.page);
      this.section5_screens= JSON.parse(this.page.section5_screens);
      this.section5_subtitles= JSON.parse(this.page.section5_subtitles);
      this.section5_titles= JSON.parse(this.page.section5_titles);
      this.project_path = data['project_path'];
      this.loading = false;
      }
    });
  }
  onlanguageChange(newValue){
    // console.log(newValue, "new language");
    this.getContent();
    this.api_sub.sendMessage(1);
  }

}
