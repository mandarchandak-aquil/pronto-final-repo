import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../commons/services/product/product.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { SubjectCallService } from '../../commons/services/subject-call/subject-call.service';

@Component({
  selector: 'app-product-supplemental-health-insurance',
  templateUrl: './product-supplemental-health-insurance.component.html',
  styleUrls: ['./product-supplemental-health-insurance.component.css']
})
export class ProductSupplementalHealthInsuranceComponent implements OnInit {
ads;
  loading :boolean = true;  
  dataReq : any;
  productArr: any = [];

  states : string[];
  state_url: string[];
  subheading;
   image_path;
project_path;
suplemental_health_subtitle;
policy_titles;
suplemental_health_subtitle1;
ad_banner1_title;
  constructor(public api_product : ProductService, private sanitizer: DomSanitizer, public api_sub : SubjectCallService) {}

  ngOnInit(): void {
    this.Supplementalhealthinsurance();
  }
  ngAfterViewInit()
  {

    console.log(document.readyState, "document.readyState")
    document.onreadystatechange = function() { 
      if (document.readyState !== "complete") { 
          document.querySelector("body").style.visibility = "hidden"; 
          document.querySelector<HTMLElement>(".site_preloader").style.visibility = "visible"; 
      } else { 
          document.querySelector<HTMLElement>(".site_preloader").style.display = "none"; 
          document.querySelector("body").style.visibility = "visible"; 
      } 
    };


  }
  Supplementalhealthinsurance(){

    this.dataReq = {
      "language_id":  sessionStorage.getItem('lg'),
      "page_url": "supplemental-health-insurance"
    }
    // console.log(this.zipdata);
    
    this.api_product.Supplementalhealthinsurance(this.dataReq).subscribe((data: {}) => {
      // console.log(data);

      if(data['status'] == "success"){
      this.ads = data['banners'];
        this.productArr = data['products'];
         this.image_path= data['image_path'];
            this.project_path= data['project_path'];
                sessionStorage.setItem('page_title',data['products'].page_title);
    sessionStorage.setItem('meta_title',data['products'].meta_title);
    sessionStorage.setItem('meta_desc',data['products'].meta_desc);
    sessionStorage.setItem('meta_keywords',data['products'].meta_keywords);
    sessionStorage.setItem('canonical_rel',data['products'].canonical_rel);
    sessionStorage.setItem('canonical_tag',data['products'].canonical_tag);
    sessionStorage.setItem('meta_robots',data['products'].meta_robots);  
     
        this.subheading = this.sanitizer.bypassSecurityTrustHtml(this.productArr.subheading);
        this.policy_titles = JSON.parse(this.productArr.policy_titles);
        this.suplemental_health_subtitle = JSON.parse(this.productArr.suplemental_health_subtitle);
        this.suplemental_health_subtitle1  = this.sanitizer.bypassSecurityTrustHtml(this.productArr.suplemental_health_subtitle1);
        this.ad_banner1_title  = this.sanitizer.bypassSecurityTrustHtml(this.productArr.ad_banner1_title);
        this.loading = false;
      }else{
        this.productArr = [];
        this.subheading = '';
    
        this.states = [] ;
        this.state_url = [];
      }
   
    });
  }

  onlanguageChange(newValue){
    // console.log(newValue, "new language");
    this.Supplementalhealthinsurance();
    this.api_sub.sendMessage(1);
  }

}
