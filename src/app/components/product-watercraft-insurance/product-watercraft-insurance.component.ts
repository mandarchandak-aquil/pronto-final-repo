import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../commons/services/product/product.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { SubjectCallService } from '../../commons/services/subject-call/subject-call.service';

@Component({
  selector: 'app-product-watercraft-insurance',
  templateUrl: './product-watercraft-insurance.component.html',
  styleUrls: ['./product-watercraft-insurance.component.css']
})
export class ProductWatercraftInsuranceComponent implements OnInit {
loading :boolean = true;  
  dataReq : any;
  productArr: any = [];
  states : string[];
  state_url: string[];
  subheading : any;
  image_path;
  project_path;
  watercraft_insurance_subtitle;
  policy_titles;
  includes;
  ads;
  additional_coverages;
  what_we_cover_subtitle3;
  constructor(public api_product : ProductService, private sanitizer: DomSanitizer, public api_sub : SubjectCallService) {}

  ngOnInit(): void {
    this.getProduct();
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
  getProduct(){

    this.dataReq = {
      "language_id":  sessionStorage.getItem('lg')
    
    }
    // console.log(this.zipdata);
    
    this.api_product.Watercraftinsurance(this.dataReq).subscribe((data: {}) => {
      // console.log(data);

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

        //this.state_url= JSON.parse(data['products'].state_url);
        this.subheading = this.sanitizer.bypassSecurityTrustHtml(this.productArr.subheading);
           this.policy_titles = JSON.parse(data['products'].policy_titles);
        this.watercraft_insurance_subtitle = JSON.parse(data['products'].watercraft_insurance_subtitle);
         this.what_we_cover_subtitle3 = this.sanitizer.bypassSecurityTrustHtml(this.productArr.what_we_cover_subtitle3);
         this.includes= JSON.parse(data['products'].includes);
          this.additional_coverages= JSON.parse(data['products'].additional_coverages);
          this.loading = false;
      }else{
        this.productArr = [];
        this.subheading = '';
       
        this.states = [] ;
        
      }
      
      
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

}
