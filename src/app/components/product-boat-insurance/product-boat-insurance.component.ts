import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../commons/services/product/product.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { SubjectCallService } from '../../commons/services/subject-call/subject-call.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-product-boat-insurance',
  templateUrl: './product-boat-insurance.component.html',
  styleUrls: ['./product-boat-insurance.component.css']
})
export class ProductBoatInsuranceComponent implements OnInit {
 ads;
   loading :boolean = true;
  dataReq : any;
  productArr: any = [];
  image_path;
  project_path;
  states : string[];
  state_url: string[];
  subheading : any;
  section2: any;
  section3: any;
  section4: any;
policy_titles;
what_we_cover_subtitle2;
boat_insurance_subtitle;
includes;
additional_coverages;
what_we_cover_subtitle3;
mobileapp;
  constructor(public api_product : ProductService, private sanitizer: DomSanitizer, public api_sub : SubjectCallService, private vps: ViewportScroller) {}

  ngOnInit(): void {
   
    this.getBoatinsurance();
  }

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
  getBoatinsurance(){

    this.dataReq = {
      "language_id": sessionStorage.getItem('lg')
    }
    // console.log(this.zipdata);
    
    this.api_product.Boatinsurance(this.dataReq).subscribe((data: {}) => {
      // console.log(data);

      if(data['status'] == "success"){
      this.image_path = data['image_path'];
      console.log('pathss',this.image_path);
      this.project_path= data['project_path'];
      this.ads = data['banners'];
             sessionStorage.setItem('page_title',data['products'].page_title);
    sessionStorage.setItem('meta_title',data['products'].meta_title);
    sessionStorage.setItem('meta_desc',data['products'].meta_desc);
    sessionStorage.setItem('meta_keywords',data['products'].meta_keywords);
    sessionStorage.setItem('canonical_rel',data['products'].canonical_rel);
    sessionStorage.setItem('canonical_tag',data['products'].canonical_tag);
    sessionStorage.setItem('meta_robots',data['products'].meta_robots);  

        this.productArr = data['products'];
           

        this.states = JSON.parse(this.productArr.states);
        
        this.subheading = this.sanitizer.bypassSecurityTrustHtml(this.productArr.subheading);
        this.what_we_cover_subtitle2 = this.sanitizer.bypassSecurityTrustHtml(this.productArr.what_we_cover_subtitle2);
          this.policy_titles = JSON.parse(this.productArr.policy_titles);
          this.boat_insurance_subtitle = JSON.parse(this.productArr.boat_insurance_subtitle);
       this.what_we_cover_subtitle3 = this.sanitizer.bypassSecurityTrustHtml(this.productArr.what_we_cover_subtitle3);
       this.includes  = JSON.parse(this.productArr.includes);
       this.additional_coverages =JSON.parse(this.productArr.additional_coverages);
        this.loading = false;
      }else{
        this.productArr = [];
        this.subheading = '';
        this.section2 = '';
        this.section3 = '';
        this.section4 = '';
        this.states = [] ;
        this.state_url = [];
      }

      // this.productArr = data['products'];
      console.log(this.productArr,'this.productArr');

      // this.states = JSON.parse(data['products'].states);
      // this.state_url= JSON.parse(data['products'].state_url);
      
      // this.subheading = this.sanitizer.bypassSecurityTrustHtml(this.productArr.subheading);
      // this.section2 = this.sanitizer.bypassSecurityTrustHtml(this.productArr.section2);
      // this.section3 = this.sanitizer.bypassSecurityTrustHtml(this.productArr.section3);
      // this.section4 = this.sanitizer.bypassSecurityTrustHtml(this.productArr.section4);
      // console.log(this.productArr.top_banner,'top_banner')
    });
  }
 public myFunction(state){
  this.api_product.product = state;
  }
  onlanguageChange(newValue){
    // console.log(newValue, "new language");
    this.getBoatinsurance();
    this.api_sub.sendMessage(1);
  }


}
