import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../commons/services/product/product.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { SubjectCallService } from '../../commons/services/subject-call/subject-call.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-medicare-advantage-insurance',
  templateUrl: './product-medicare-advantage-insurance.component.html',
  styleUrls: ['./product-medicare-advantage-insurance.component.css']
})
export class ProductMedicareAdvantageInsuranceComponent implements OnInit {

  dataReq : any;
     loading :boolean = true; 
  productArr: any = [];
ads;
    ads_path;

  states : string[];
  state_url: string[];
  subheading;
  policy_titles;
  medicare_subtitle;
    image_path;
project_path;
medicare_subtitle1;
ad_banner1_title;
mobileapp;
  constructor(public router: Router,public api_product : ProductService, private sanitizer: DomSanitizer, public api_sub : SubjectCallService) {}

  ngOnInit(): void {
    // if(this.router.url.slice(-6) == 'mobile'){
    //   this.api_sub.mob  = 1;
    // }else{
    //   this.api_sub.mob  = 0;
    // }
    // console.log('this.api_sub.mob',this.api_sub.mob);
    // this.mobileapp = this.api_sub.mob;
    // if(this.mobileapp == 0){
    //   $('#headerspc').addClass('spcTpHeader');
    // }else{
    //   $('#headerspc').removeClass('spcTpHeader');
    // }
    console.log('mobileapp',this.mobileapp);
    this.getProduct();
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
  getProduct(){

    this.dataReq = {
      "language_id": sessionStorage.getItem('lg'),
      "page_url": "medicare-advantage-insurance"
    }
    // console.log(this.zipdata);
    
    this.api_product.Medicareadvantageinsurance(this.dataReq).subscribe((data: {}) => {
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
        this.medicare_subtitle = JSON.parse( this.productArr.medicare_subtitle);
        this.medicare_subtitle1 = this.sanitizer.bypassSecurityTrustHtml(this.productArr.medicare_subtitle1);
        this.ad_banner1_title = this.sanitizer.bypassSecurityTrustHtml(this.productArr.ad_banner1_title);
        
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
    this.getProduct();
    this.api_sub.sendMessage(1);
  }

}
