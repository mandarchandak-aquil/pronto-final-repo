import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../commons/services/product/product.service';
import { DomSanitizer} from '@angular/platform-browser';
import { SubjectCallService } from '../../commons/services/subject-call/subject-call.service';
import { ViewportScroller } from '@angular/common';
import * as AOS from 'aos';
@Component({
  selector: 'app-product-home-insurance',
  templateUrl: './product-home-insurance.component.html',
  styleUrls: ['./product-home-insurance.component.css']
})
export class ProductHomeInsuranceComponent implements OnInit {

ads: any = [];
loading :boolean = true;  
    ads_path;
  dataReq : any;
  productArr: any = [];
  states : string[];
  state_url: string[];
  subheading : any;
  image_path;
project_path;
policy_titles;
what_we_cover_subtitle;
what_not_covered;
requirement_purchase;
what_not_cover;
home_owner_title3;
 faq_question;
 inclued;
 what_not_covereds;
 additional_coverages;
 requirement_purchase1;
          faq_answes;
          mobileapp;
  constructor(public api_product : ProductService, private sanitizer: DomSanitizer, public api_sub : SubjectCallService, private vps: ViewportScroller) {}

   scroll(id) {
    this.vps.scrollToAnchor(id);
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



  ngOnInit(): void {
    // this.mobileapp = this.api_sub.mob ;
    // if(this.mobileapp == 0){
    //   $('#headerspc').addClass('spcTpHeader');
    // }else{
    //   $('#headerspc').removeClass('spcTpHeader');
    // }
  
    
    this.getProduct();
  }

  getProduct(){

    this.dataReq = {
      "language_id": sessionStorage.getItem('lg')
    }
    // console.log(this.zipdata);
    
    this.api_product.Homeinsurance(this.dataReq).subscribe((data: {}) => {
      // console.log(data);
  
      if(data['status'] == "success"){
        let ads23 = [];
        let banner1 :any = [];
        let ads22 :any= [];
      // this.ads = data['banners'];
        this.productArr = data['products'];
        
        let banner = data['banners'];
         
          if(banner.length <= 1){
            ads22 = banner[0];
            ads23  = banner[0];
          }else{
        if(this.productArr.ad_banner1 == banner[0].id ){
      
           ads22 = banner[0];
        }
         if(this.productArr.ad_banner1 == banner[1].id){
        
          //this.ads.push(banner[1]);
          ads22 = banner[1];
          //this.ads = [ ...this.ads, ...banner[0]];

        }
     
    
         if(this.productArr.ad_banner2 == banner[0].id ){
           ads23 = banner[0];
        }
         if(this.productArr.ad_banner2 == banner[1].id){
           ads23 = banner[1];
        }
       
      }
        this.ads = [ ads22, ads23];
       
               sessionStorage.setItem('page_title',data['products'].page_title);
    sessionStorage.setItem('meta_title',data['products'].meta_title);
    sessionStorage.setItem('meta_desc',data['products'].meta_desc);
    sessionStorage.setItem('meta_keywords',data['products'].meta_keywords);
    sessionStorage.setItem('canonical_rel',data['products'].canonical_rel);
    sessionStorage.setItem('canonical_tag',data['products'].canonical_tag);
    sessionStorage.setItem('meta_robots',data['products'].meta_robots);  
         this.image_path = data['image_path'];
        this.project_path= data['project_path'];
        this.states = JSON.parse(data['products'].states);
        this.state_url= JSON.parse(data['products'].state_url);
        this.subheading = this.sanitizer.bypassSecurityTrustHtml(this.productArr.subheading);
        this.policy_titles= JSON.parse(data['products'].policy_titles);
       this.what_we_cover_subtitle= JSON.parse(data['products'].what_we_cover_subtitle);
        this.what_not_covered= JSON.parse(data['products'].what_not_covered);
        this.what_not_cover = JSON.parse(data['products'].what_not_cover);
        this.requirement_purchase = JSON.parse(data['products'].requirement_purchase);
         this.faq_question = JSON.parse(data['products'].faq_question);
          this.faq_answes = JSON.parse(data['products'].faq_answes);
          this.home_owner_title3 = this.sanitizer.bypassSecurityTrustHtml(this.productArr.home_owner_title3);
          this.inclued  = JSON.parse(data['products'].inclued);

          this.additional_coverages = JSON.parse(data['products'].additional_coverages);
          this.what_not_covereds = JSON.parse(data['products'].what_not_covered);
          this.requirement_purchase1 = JSON.parse(data['products'].requirement_purchase1);
          this.loading = false;
      }else{
        this.productArr = [];
        this.subheading = '';
      
        this.states = [] ;
        this.state_url = [];
      }
      
      // this.productArr = data['products'];
      // console.log(this.productArr,'this.productArr');

      // this.states = JSON.parse(data['products'].states);
      // this.state_url= JSON.parse(data['products'].state_url);

       this.subheading = this.sanitizer.bypassSecurityTrustHtml(this.productArr.subheading);
     
    });
  }

public myFunction(state){
  this.api_product.product = state;
  }
  
  onlanguageChange(newValue){
    // console.log(newValue, "new language");
    this.getProduct();
    this.api_sub.sendMessage(1);
  }

  getScroll(id)
  {
   console.log(id);
    setTimeout(function() { 
      $('html,body').animate({ scrollTop : $("#id"+id+"-header").offset().top - ($(".headerWrapMain").height()+10) }, 7000); 
    }, 400);
  
    
  }

}
