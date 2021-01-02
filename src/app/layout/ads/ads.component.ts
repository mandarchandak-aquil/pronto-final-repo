import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { ProductService } from '../../commons/services/product/product.service';
import { HomepageService } from '../../commons/services/homepage/homepage.service';
import { SubjectCallService } from '../../commons/services/subject-call/subject-call.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css']
})
export class AdsComponent implements OnInit {
 @Input()
  page_url: any;

  @Input()
    @Output() languageChange = new EventEmitter();
  isProduct: any;
dataReq;
project_path;
image_path;
datarrr;
  messages: any;
  subscription: Subscription;
 
  constructor(public api_product : ProductService, public api_home : HomepageService, public api_sub : SubjectCallService) { 

    this.subscription = this.api_sub.getMessage().subscribe(message => {
      console.log(message, "message")
      if (message) {
        
        if(message.isUpdate == 1){
          this.CommanSection();
        }

        this.messages= message;
      } else {
        this.messages = '';
      }
    });
  }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    }

  ngOnInit(): void {
  	this.CommanSection();
  }
CommanSection(){
  this.dataReq = {
      "language_id": sessionStorage.getItem('lg')
    }
     this.api_product.CommanSection(this.dataReq).subscribe((data: {}) => {
     
      if(data['status'] == "success"){
           this.project_path = data['project_path'];
        this.image_path = data['image_path'];
        this.datarrr = data['comman'];
       
      }else{
        
      }
    });

}
}
