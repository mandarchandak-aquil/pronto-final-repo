import { Component, OnInit } from '@angular/core';
import { PagesService } from '../../commons/services/page/pages.service';
import { SubjectCallService } from '../../commons/services/subject-call/subject-call.service';

@Component({
  selector: 'app-sb1567-sign',
  templateUrl: './sb1567-sign.component.html',
  styleUrls: ['./sb1567-sign.component.css']
})
export class Sb1567SignComponent implements OnInit {
 loading :boolean = true;  
  dataReq : any;
  pageArr: any = [];

  constructor(public api_page : PagesService, public api_sub : SubjectCallService) { }

  ngOnInit(): void {
    this.getContent();
  }

  getContent(){
    this.dataReq = {
      "language_id":  sessionStorage.getItem('lg'),
      "page_url": "sb1567-sign"
    }
    // console.log(this.zipdata);
    
    this.api_page.getProduct(this.dataReq).subscribe((data: {}) => {
      // console.log(data);

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

      // this.pageArr = data['page'];
      console.log(this.pageArr,'this.pageArr');
    });
  }

  onlanguageChange(newValue){
    // console.log(newValue, "new language");
    this.getContent();
    this.api_sub.sendMessage(1);
  }
  

}
