import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../commons/services/product/product.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { SubjectCallService } from '../../commons/services/subject-call/subject-call.service';

@Component({
  selector: 'app-product-rv-insurance',
  templateUrl: './product-rv-insurance.component.html',
  styleUrls: ['./product-rv-insurance.component.css']
})
export class ProductRvInsuranceComponent implements OnInit {
 loading :boolean = true; 
  dataReq : any;
  productArr: any = [];
  states : string[];
  state_url: string[];
  subheading : any;
    image_path;
    policy_titles;
    includes;
project_path;
additional_coverages;
rv_comparison_subtitle1;
rv_comparison_includes;
ads;
  constructor(public api_product : ProductService, private sanitizer: DomSanitizer, public api_sub : SubjectCallService) {}

  ngOnInit(): void {
    this.Rvinsurance();
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
  Rvinsurance(){

    this.dataReq = {
      "language_id":  sessionStorage.getItem('lg'),
      "page_url": "rv-insurance"
    }
    console.log(this.dataReq);
    
    this.api_product.Rvinsurance(this.dataReq).subscribe((data: {}) => {
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
        this.states = JSON.parse(data['products'].states);
        this.state_url= JSON.parse(data['products'].state_url);
        this.subheading = this.sanitizer.bypassSecurityTrustHtml(this.productArr.subheading);
        this.policy_titles = JSON.parse(data['products'].policy_titles);
       this.includes = JSON.parse(data['products'].includes);
       this.additional_coverages =  JSON.parse(data['products'].additional_coverages);
       this.rv_comparison_subtitle1 = this.sanitizer.bypassSecurityTrustHtml(this.productArr.rv_comparison_subtitle1);
       this.rv_comparison_includes =  JSON.parse(this.productArr.rv_comparison_includes);
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
    this.Rvinsurance();
    this.api_sub.sendMessage(1);
  }

}
