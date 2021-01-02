import { Component, OnInit,AfterViewInit } from '@angular/core';
import { ProductService } from '../../commons/services/product/product.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { SubjectCallService } from '../../commons/services/subject-call/subject-call.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-product-renters-insurance',
  templateUrl: './product-renters-insurance.component.html',
  styleUrls: ['./product-renters-insurance.component.css']
})
export class ProductRentersInsuranceComponent implements OnInit {
ads;
loading :boolean = true;  
  dataReq : any;
  productArr: any = [];
  states : string[];
  state_url: string[];
  subheading;
  image_path;
project_path;
policy_titles;
what_we_cover_subpoints2;
what_we_cover_subpoints1;
whats_not_covered_subtitle;
whats_not_covered_subtitle2;
faq_question;
includes;
opational_coverages;
faq_answer;
addtionational_coverages;
rental_insurance_package_subtitle1;
  constructor(public api_product : ProductService, private sanitizer: DomSanitizer, public api_sub : SubjectCallService, private vps: ViewportScroller) {}

  ngOnInit(): void {
    this.Rentersinsurance();
  }

  

scroll(id) {
    this.vps.scrollToAnchor(id);
  }
  
  Rentersinsurance(){

    this.dataReq = {
      "language_id":  sessionStorage.getItem('lg')
    }
    // console.log(this.dataReq);
    
    this.api_product.Rentersinsurance(this.dataReq).subscribe((data: {}) => {
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
        this.states = JSON.parse(data['products'].states);
        this.state_url= JSON.parse(data['products'].state_url);
        this.subheading = this.sanitizer.bypassSecurityTrustHtml(this.productArr.subheading);
        this.policy_titles =JSON.parse(this.productArr.policy_titles);
        this.what_we_cover_subpoints2 =JSON.parse( this.productArr.what_we_cover_subpoints2);
           this.what_we_cover_subpoints1 =JSON.parse( this.productArr.what_we_cover_subpoints1);
           this.whats_not_covered_subtitle =JSON.parse( this.productArr.whats_not_covered_subtitle);
        this.faq_question =JSON.parse( this.productArr.faq_question);
        this.faq_answer =JSON.parse( this.productArr.faq_answer);
        this.rental_insurance_package_subtitle1 = this.sanitizer.bypassSecurityTrustHtml(this.productArr.rental_insurance_package_subtitle1);
        this.includes = JSON.parse( this.productArr.includes);
        this.whats_not_covered_subtitle2 = JSON.parse( this.productArr.what_not_covered1);
        this.addtionational_coverages = JSON.parse( this.productArr.addtionational_coverages);
         this.opational_coverages = JSON.parse( this.productArr.opational_coverages);
         this.loading = false;
      }else{
        this.productArr = [];
        this.subheading = '';
        this.loading = false;
        this.states = [] ;
        this.state_url = [];
      }
      
      // this.productArr = data['products'];
      // console.log(this.productArr,'this.productArr');
      // this.states = JSON.parse(data['products'].states);
      // this.state_url= JSON.parse(data['products'].state_url);

      // this.subheading = this.sanitizer.bypassSecurityTrustHtml(this.productArr.subheading);
      // this.section2 = this.sanitizer.bypassSecurityTrustHtml(this.productArr.section2);
      // this.section3 = this.sanitizer.bypassSecurityTrustHtml(this.productArr.section3);
      // this.section4 = this.sanitizer.bypassSecurityTrustHtml(this.productArr.section4);
      // console.log(this.productArr.top_banner,'top_banner')
    });
  }
  // ngAfterViewInit(){
  // this.loading = false;
  // }

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

public myFunction(state){
  this.api_product.product = state;
  }
  onlanguageChange(newValue){
    // console.log(newValue, "new language");
    this.Rentersinsurance();
    this.api_sub.sendMessage(1);
  }

  getScroll(id)
  {
    setTimeout(function() { 
      $('html,body').animate({ scrollTop : $("#id"+id+"-header").offset().top - ($(".headerWrapMain").height()+10) }, 500); 
    }, 400);
  }

}
