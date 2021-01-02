import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../commons/services/product/product.service';
import { DomSanitizer} from '@angular/platform-browser';
import { SubjectCallService } from '../../commons/services/subject-call/subject-call.service';
import { ViewportScroller } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-mexico-texas-northbound-insurance',
  templateUrl: './product-mexico-texas-northbound-insurance.component.html',
  styleUrls: ['./product-mexico-texas-northbound-insurance.component.css']
})
export class ProductMexicoTexasNorthboundInsuranceComponent implements OnInit {
  // @ViewChild('headerspc') headerspc;
productArr;
loading :boolean = true;  
    ads;
    subheading;
    image_path;
    project_path;
    states;
    state_url;
    policy_titles;
    dataReq;
    optional_subtitles;
    faq_qsns;
    faq_answers;
essential_coverage_includes;
optional_limit_subtitle;
mobileapp;
 constructor(public router: Router,public api_product : ProductService, private sanitizer: DomSanitizer, public api_sub : SubjectCallService, private vps: ViewportScroller) {}
 scroll(id) {
    this.vps.scrollToAnchor(id);
  }
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
 	this.TexasMexicoNorthboundInsurance();
  }

  ngAfterViewInit()
  {
    // if(this.mobileapp == 0){
    //    this.headerspc.nativeElement.classList.add('spcTpHeader')
    //  }else{
    //    this.headerspc.nativeElement.classList.remove('spcTpHeader')
    //  }

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
  TexasMexicoNorthboundInsurance(){

  this.dataReq = {
      "language_id": sessionStorage.getItem('lg')
    }
  

    this.api_product.TexasMexicoNorthboundInsurance(this.dataReq).subscribe((data: {}) => {
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

        this.subheading = this.sanitizer.bypassSecurityTrustHtml(this.productArr.subheading);
      	
         this.image_path = data['image_path'];
        this.project_path= data['project_path'];
        this.states = JSON.parse(data['products'].states);
        this.state_url= JSON.parse(data['products'].states_url);
        this.policy_titles = JSON.parse(data['products'].policy_titles);
   
     this.essential_coverage_includes  = JSON.parse(data['products'].essential_coverage_includes);
     this.optional_subtitles = JSON.parse(data['products'].optional_subtitles);
     this.optional_limit_subtitle =  JSON.parse(data['products'].optional_limit_subtitle);
      this.faq_qsns =  JSON.parse(data['products'].faq_qsns);
     this.faq_answers=  JSON.parse(data['products'].faq_answers);
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
    this.TexasMexicoNorthboundInsurance();
    this.api_sub.sendMessage(1);
  }


  getScroll(id)
  {
    setTimeout(function() { 
      $('html,body').animate({ scrollTop : $("#id"+id+"-header").offset().top - ($(".headerWrapMain").height()+10) }, 500); 
    }, 400);
  }
  
}
