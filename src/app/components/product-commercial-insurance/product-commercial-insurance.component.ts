import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../commons/services/product/product.service';
import { DomSanitizer} from '@angular/platform-browser';
import { SubjectCallService } from '../../commons/services/subject-call/subject-call.service';
import { ViewportScroller } from '@angular/common';
@Component({
  selector: 'app-product-commercial-insurance',
  templateUrl: './product-commercial-insurance.component.html',
  styleUrls: ['./product-commercial-insurance.component.css']
})
export class ProductCommercialInsuranceComponent implements OnInit {

  ads;
  dataReq : any;
  image_path;
  loading :boolean = true;
project_path;
banner;
  productArr: any = [];
  states : string[];
  state_url: string[];
  subheading : any;
 policy_titles;

 myStyles = {}

 mobileapp;
commercial_insurance_subtitles;
commercial_insurance_subtitles1;
commercial_insurance_subtitles2;
commercial_insurance_subtitles3;
commercial_insurance_subtitles4;
commercial_insurance_subtitles5;
what_we_cover_subtitle;
  constructor(public api_product : ProductService, private sanitizer: DomSanitizer, public api_sub : SubjectCallService, private vps: ViewportScroller) {}

  ngOnInit(): void {
    this.mobileapp = this.api_sub.mob ;
    // if(this.mobileapp == 0){
    //   $('#headerspc').addClass('spcTpHeader');
    // }else{
    //   $('#headerspc').removeClass('spcTpHeader');
    // }
    this.getProduct();
  }
  ngAfterViewInit()
  {

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

scroll(id) {
    this.vps.scrollToAnchor(id);
  }
  getProduct(){

    this.dataReq = {
      "language_id": sessionStorage.getItem('lg')
    }
    // console.log(this.zipdata);
    
    this.api_product.Commercialinsurance(this.dataReq).subscribe((data: {}) => {
     

      if(data['status'] == "success"){
       this.ads = data['banners'];

         this.productArr = data['products'];
         this.image_path = data['image_path'];
        this.project_path= data['project_path'];
       
        this.banner = this.project_path+this.ads[0].ad_banner1;
        
       // this.myStyles = {background-image:url(this.banner)}

        this.policy_titles= JSON.parse(data['products'].policy_titles);
                 sessionStorage.setItem('page_title',data['products'].page_title);
    sessionStorage.setItem('meta_title',data['products'].meta_title);
    sessionStorage.setItem('meta_desc',data['products'].meta_desc);
    sessionStorage.setItem('meta_keywords',data['products'].meta_keywords);
    sessionStorage.setItem('canonical_rel',data['products'].canonical_rel);
    sessionStorage.setItem('canonical_tag',data['products'].canonical_tag);
    sessionStorage.setItem('meta_robots',data['products'].meta_robots);  
      this.commercial_insurance_subtitles = JSON.parse(data['products'].commercial_insurance_subtitles);
      this.commercial_insurance_subtitles1 = JSON.parse(data['products'].commercial_insurance_subtitles1);
      this.commercial_insurance_subtitles2 = JSON.parse(data['products'].commercial_insurance_subtitles2);
      this.commercial_insurance_subtitles3 = JSON.parse(data['products'].commercial_insurance_subtitles3);
        this.commercial_insurance_subtitles4 = JSON.parse(data['products'].commercial_insurance_subtitles4);
         this.commercial_insurance_subtitles5 = JSON.parse(data['products'].commercial_insurance_subtitles5);
           this.what_we_cover_subtitle = JSON.parse(data['products'].what_we_cover_subtitle);
           this.loading = false;
      }else{
        this.productArr = [];
        this.subheading = '';
       
        this.states = [] ;
        this.state_url = [];
      }
      
      // console.log(this.productArr.top_banner,'top_banner')
    });
  }

  onlanguageChange(newValue){
    // console.log(newValue, "new language");
    this.getProduct();
    this.api_sub.sendMessage(1);
  }

}
