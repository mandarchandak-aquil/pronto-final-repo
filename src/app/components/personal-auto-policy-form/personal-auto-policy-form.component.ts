import { Component, OnInit } from '@angular/core';
import { PagesService } from '../../commons/services/page/pages.service';
import { SubjectCallService } from '../../commons/services/subject-call/subject-call.service';
@Component({
  selector: 'app-personal-auto-policy-form',
  templateUrl: './personal-auto-policy-form.component.html',
  styleUrls: ['./personal-auto-policy-form.component.css']
})
export class PersonalAutoPolicyFormComponent implements OnInit {
  loading :boolean = true;
    dataReq : any;
  pageArr: any = [];
instruction_suboints;
company_name;
company_file_url;
endorsement;
endorsement_name;
endorsement_url;
important_subtitles;
important_subtitles_url;
importnat_subtitles2;
importnat_subtitles2_url;
historical_subtitles;
historical_subtitles_url;
endorsement_number1;
endorsement_name1;
endorsement_url1;
project_path;
image_path;
  constructor(public api_page : PagesService, public api_sub : SubjectCallService) { }

  ngOnInit(): void {
    this.getContent();
  }

  getContent(){
    this.dataReq = {
      "language_id":  sessionStorage.getItem('lg'),
      "page_url": "texas-personal-auto-policy"
    }
    // console.log(this.zipdata);
    
    this.api_page.Texaspersonal(this.dataReq).subscribe((data: {}) => {
      // console.log(data);
      // this.pageArr = data['page'];
      if(data['status'] == "success"){
        this.project_path = data['project_path'];
        this.image_path = data['image_path'];
        this.pageArr = data['page'];
        this.instruction_suboints = JSON.parse(data['page'].instruction_suboints);
        this.company_name= JSON.parse(data['page'].company_name);
         this.company_file_url= JSON.parse(data['page'].company_file_url);
         this.endorsement= JSON.parse(data['page'].endorsement);
          this.endorsement_name= JSON.parse(data['page'].endorsement_name);
         this.endorsement_url= JSON.parse(data['page'].endorsement_url);
         this.important_subtitles = JSON.parse(data['page'].important_subtitles);
         this.important_subtitles_url = JSON.parse(data['page'].important_subtitles_url);
         this.importnat_subtitles2= JSON.parse(data['page'].importnat_subtitles2);
        this.importnat_subtitles2_url= JSON.parse(data['page'].importnat_subtitles2_url);
        this.historical_subtitles = JSON.parse(data['page'].historical_subtitles);
        this.historical_subtitles_url = JSON.parse(data['page'].historical_subtitles_url);
         this.endorsement_number1= JSON.parse(data['page'].endorsement_number1);
        this.endorsement_name1= JSON.parse(data['page'].endorsement_name1);
         this.endorsement_url1= JSON.parse(data['page'].endorsement_url1);
         this.loading = false;
      }else{
        this.pageArr = [];
      }
      
      console.log(this.pageArr,'this.pageArr');
    });
  }

  onlanguageChange(newValue){
    // console.log(newValue, "new language");
    this.getContent();
    this.api_sub.sendMessage(1);
  }

}
