import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../commons/services/product/product.service';
import { DomSanitizer} from '@angular/platform-browser';
import { SubjectCallService } from '../../commons/services/subject-call/subject-call.service';
import { ViewportScroller } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-mexico-insurance',
  templateUrl: './product-mexico-insurance.component.html',
  styleUrls: ['./product-mexico-insurance.component.css']
})
export class ProductMexicoInsuranceComponent implements OnInit {
  // @ViewChild('headerspc') headerspc;
  dataReq : any;
  productArr;
 loading :boolean = true;  

  subheading ;
    image_path;
project_path;
policy_titles;
what_we_cover_subtitle3;
includes;
additional_coverages;
  states ;
  ads;
  state_url;
full_coverage_subtitletitle1;
full_coverage_elite_subtitle1;
full_coverages_elite_additional;
full_coverages_elite_includes;
full_coverage_additonal_coverages;
full_coverage_includes;
faq_question;
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
    this.Mexicoinsuurance();
  }
  ngAfterViewInit()
  {

    // if(this.mobileapp == 0){
    //   this.headerspc.nativeElement.classList.add('spcTpHeader')
    // }else{
    //   this.headerspc.nativeElement.classList.remove('spcTpHeader')
    // }

    // console.log(document.readyState, "document.readyState")
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


  Mexicoinsuurance(){

    this.dataReq = {
      "language_id": sessionStorage.getItem('lg')
    }
    
    this.api_product.Mexicoinsuurance(this.dataReq).subscribe((data: {}) => {
      // console.log(data);
      if(data['status'] == "success"){
       this.ads = data['banners'];
        this.productArr = data['products'];
        this.subheading = this.sanitizer.bypassSecurityTrustHtml(this.productArr.subheading);
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
        this.policy_titles = JSON.parse(data['products'].policy_titles);
           this.what_we_cover_subtitle3 = this.sanitizer.bypassSecurityTrustHtml(this.productArr.what_we_cover_subtitle3);
           this.includes = JSON.parse(data['products'].includes);
           this.additional_coverages =  JSON.parse(data['products'].additional_coverages);
           this.full_coverage_subtitletitle1 = this.sanitizer.bypassSecurityTrustHtml(this.productArr.full_coverage_subtitletitle1);
           this.full_coverage_elite_subtitle1  = this.sanitizer.bypassSecurityTrustHtml(this.productArr.full_coverage_elite_subtitle1);
           this.full_coverages_elite_additional =  JSON.parse(data['products'].full_coverages_elite_additional);
           this.full_coverages_elite_includes =  JSON.parse(data['products'].full_coverages_elite_includes);
           this.full_coverage_additonal_coverages = JSON.parse(data['products'].full_coverage_additonal_coverages);
           this.full_coverage_includes = JSON.parse(data['products'].full_coverage_includes);
           this.faq_question  = JSON.parse(data['products'].faq_question);
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
    this.Mexicoinsuurance();
    this.api_sub.sendMessage(1);
  }


  
  getScroll(id)
  {
    setTimeout(function() { 
      $('html,body').animate({ scrollTop : $(".cst_accord"+id).offset().top - ($(".headerWrapMain").height()+10) }, 500); 
    }, 400);
  }
  


}
