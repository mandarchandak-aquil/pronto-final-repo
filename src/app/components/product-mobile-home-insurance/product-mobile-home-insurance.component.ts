import { Component, OnInit,ViewChild } from '@angular/core';
import { ProductService } from '../../commons/services/product/product.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { SubjectCallService } from '../../commons/services/subject-call/subject-call.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-mobile-home-insurance',
  templateUrl: './product-mobile-home-insurance.component.html',
  styleUrls: ['./product-mobile-home-insurance.component.css']
})
export class ProductMobileHomeInsuranceComponent implements OnInit {
  // @ViewChild('headerspc') headerspc;
ads;
loading :boolean = true;  
  dataReq : any;
  productArr: any = [];
  states : string[];
  state_url: string[];
  subheading : any;
  ad_banner1_title;
image_path;
project_path;
policy_titles;
mobile_home_package_subtitle;
what_we_cover_subtilte3;
additiona_coverages;
includes;
mobileapp;
  constructor(public router: Router,public api_product : ProductService, private sanitizer: DomSanitizer, public api_sub : SubjectCallService) {}

  ngOnInit(): void {
    // if(this.router.url.slice(-6) == 'mobile'){
    //   this.api_sub.mob  = 1;
    // }else{
    //   this.api_sub.mob  = 0;
    // }
    // this.mobileapp = this.api_sub.mob;
    // if(this.mobileapp == 0){
    //   console.log('addClass');
    //   $('#headerspc').addClass('spcTpHeader');
    // }else{
    //   console.log('removeClass');

    //   $('#headerspc').removeClass('spcTpHeader');
    // }
    this.Mobilehomeinsurance();
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
  Mobilehomeinsurance(){

    this.dataReq = {
      "language_id":  sessionStorage.getItem('lg')
    }
    // console.log(this.zipdata);
    
    this.api_product.Mobilehomeinsurance(this.dataReq).subscribe((data: {}) => {
   
      if(data['status'] == "success"){
       this.ads = data['banners'];
        this.productArr = data['products'];
         this.image_path = data['image_path'];
        this.project_path= data['project_path'];
               sessionStorage.setItem('page_title',data['products'].page_title);
    sessionStorage.setItem('meta_title',data['products'].meta_title);
    sessionStorage.setItem('meta_desc',data['products'].meta_desc);
    sessionStorage.setItem('meta_keywords',data['products'].meta_keywords);
    sessionStorage.setItem('canonical_rel',data['products'].canonical_rel);
    sessionStorage.setItem('canonical_tag',data['products'].canonical_tag);
    sessionStorage.setItem('meta_robots',data['products'].meta_robots);  
        this.states = JSON.parse(data['products'].states);
        this.state_url= JSON.parse(data['products'].state_url);
        this.subheading = this.sanitizer.bypassSecurityTrustHtml(this.productArr.subheading);
  this.policy_titles= JSON.parse(data['products'].policy_titles);
      this.mobile_home_package_subtitle= JSON.parse(data['products'].mobile_home_package_subtitle);  
      this.what_we_cover_subtilte3 = this.sanitizer.bypassSecurityTrustHtml(this.productArr.what_we_cover_subtilte3);
      this.additiona_coverages = JSON.parse(data['products'].additiona_coverages);
      this.includes = JSON.parse(data['products'].includes);
      this.ad_banner1_title =this.sanitizer.bypassSecurityTrustHtml(this.productArr.ad_banner1_title);
      this.loading = false;
      }else{
        this.productArr = [];
        this.subheading = '';
      
        this.states = [] ;
        this.state_url = [];
      }
      
    });
  }
public myFunction(state){
  this.api_product.product = state;
  }
  onlanguageChange(newValue){
    // console.log(newValue, "new language");
    this.Mobilehomeinsurance();
    this.api_sub.sendMessage(1);
  }
  

}
