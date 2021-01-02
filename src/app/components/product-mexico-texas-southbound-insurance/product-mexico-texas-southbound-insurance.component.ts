import { Component, OnInit,ViewChild } from '@angular/core';
import { ProductService } from '../../commons/services/product/product.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { SubjectCallService } from '../../commons/services/subject-call/subject-call.service';
import { ViewportScroller } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-mexico-texas-southbound-insurance',
  templateUrl: './product-mexico-texas-southbound-insurance.component.html',
  styleUrls: ['./product-mexico-texas-southbound-insurance.component.css']
})
export class ProductMexicoTexasSouthboundInsuranceComponent implements OnInit {
  // @ViewChild('headerspc') headerspc;
   loading :boolean = true;  
productArr;
    ads;
    subheading;
    image_path;
    project_path;
    states;
    state_url;
    policy_titles;
    dataReq;
basic_coverage_includes;
basic_addtional_cov;
full_coverage_includes;
full_coverage_additional;
full_coverage_elite_includes;
full_coverage_elite_additionals;
faq_ans1_2_subpoint;
faq_ans1_3_subpoint;
faq_ans2_subpoints;
faq_ans2_6_subpoints;
mobileapp;
   constructor(public router: Router,public api_product : ProductService, private sanitizer: DomSanitizer, public api_sub : SubjectCallService, private vps: ViewportScroller) {}

  ngOnInit(): void {
    
  // if(this.router.url.slice(-6) == 'mobile'){
  //   this.api_sub.mob  = 1;
  // }else{
  //   this.api_sub.mob  = 0;
  // }
  // this.mobileapp = this.api_sub.mob;
  // if(this.mobileapp == 0){
  //   $('#headerspc').addClass('spcTpHeader');
  // }else{
  //   $('#headerspc').removeClass('spcTpHeader');
  // }
  this.TexasMexicoSouthboundInsurance();
  }
  ngAfterViewInit()
  {
    // if(this.mobileapp == 0){
    //    this.headerspc.nativeElement.classList.add('spcTpHeader')
    //  }else{
    //    this.headerspc.nativeElement.classList.remove('spcTpHeader')
    //  }
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
  scroll(id) {
    this.vps.scrollToAnchor(id);
  }
  TexasMexicoSouthboundInsurance(){

this.dataReq = {
      "language_id": sessionStorage.getItem('lg')
    }
  

    this.api_product.TexasMexicoSouthboundInsurance(this.dataReq).subscribe((data: {}) => {
      if(data['status'] == "success"){

                sessionStorage.setItem('page_title',data['products'].page_title);
    sessionStorage.setItem('meta_title',data['products'].meta_title);
    sessionStorage.setItem('meta_desc',data['products'].meta_desc);
    sessionStorage.setItem('meta_keywords',data['products'].meta_keywords);
    sessionStorage.setItem('canonical_rel',data['products'].canonical_rel);
    sessionStorage.setItem('canonical_tag',data['products'].canonical_tag);
    sessionStorage.setItem('meta_robots',data['products'].meta_robots);  

       this.ads = data['banners'];
        this.productArr = data['products'];
        console.log('request_quote_button',this.productArr);
        this.subheading = this.sanitizer.bypassSecurityTrustHtml(this.productArr.subheading);
      
         this.image_path = data['image_path'];
        this.project_path= data['project_path'];
        //this.states = JSON.parse(data['products'].states);
        //this.state_url= JSON.parse(data['products'].state_url);
        this.policy_titles = JSON.parse(data['products'].policy_titles);
      this.basic_coverage_includes= JSON.parse(data['products'].basic_coverage_includes);
      this.basic_addtional_cov = JSON.parse(data['products'].basic_addtional_cov);
      this.full_coverage_includes =  JSON.parse(data['products'].full_coverage_includes);
      this.full_coverage_additional =  JSON.parse(data['products'].full_coverage_additional);
      this.full_coverage_elite_includes =  JSON.parse(data['products'].full_coverage_elite_includes);
      this.full_coverage_elite_additionals =  JSON.parse(data['products'].full_coverage_elite_additionals);
      this.faq_ans1_2_subpoint =  JSON.parse(data['products'].faq_ans1_2_subpoint);
      this.faq_ans1_3_subpoint =  JSON.parse(data['products'].faq_ans1_3_subpoint);
      this.faq_ans2_subpoints =  JSON.parse(data['products'].faq_ans2_subpoints);
      this.faq_ans2_6_subpoints = JSON.parse(data['products'].faq_ans2_6_subpoints);
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
    this.TexasMexicoSouthboundInsurance();
    this.api_sub.sendMessage(1);
  }


  getScroll(id)
  {
    setTimeout(function() { 
      $('html,body').animate({ scrollTop : $("#faq_accord_"+id).offset().top - ($(".headerWrapMain").height()+50) }, 500); 
    }, 400);
  }

}
