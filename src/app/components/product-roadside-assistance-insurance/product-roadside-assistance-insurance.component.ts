import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../commons/services/product/product.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { SubjectCallService } from '../../commons/services/subject-call/subject-call.service';

@Component({
  selector: 'app-product-roadside-assistance-insurance',
  templateUrl: './product-roadside-assistance-insurance.component.html',
  styleUrls: ['./product-roadside-assistance-insurance.component.css']
})
export class ProductRoadsideAssistanceInsuranceComponent implements OnInit {
ads;
  loading :boolean = true;  
  dataReq : any;
  productArr: any = [];
  states;
  state_url;
  subheading : any;
    image_path;
project_path;
section2_subpoints;
section3_description;
section4_points;

section4_points_url;
car_rental_subtitle;
  constructor(public api_product : ProductService, private sanitizer: DomSanitizer, public api_sub : SubjectCallService) {}

  ngOnInit(): void {
    this.Roadsideassistanceinsurance();
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
  Roadsideassistanceinsurance(){

    this.dataReq = {
      "language_id":  sessionStorage.getItem('lg'),
      "page_url": "roadside-assistance"
    }
    // console.log(this.zipdata);
    
    this.api_product.Roadsideassistanceinsurance(this.dataReq).subscribe((data: {}) => {
      // console.log(data);

      if(data['status'] == "success"){
        this.ads = data['banners'];
       this.productArr = data['products'];
       // this.subheading = this.sanitizer.bypassSecurityTrustHtml(this.productArr.subheading);
                sessionStorage.setItem('page_title',data['products'].page_title);
    sessionStorage.setItem('meta_title',data['products'].meta_title);
    sessionStorage.setItem('meta_desc',data['products'].meta_desc);
    sessionStorage.setItem('meta_keywords',data['products'].meta_keywords);
    sessionStorage.setItem('canonical_rel',data['products'].canonical_rel);
    sessionStorage.setItem('canonical_tag',data['products'].canonical_tag);
    sessionStorage.setItem('meta_robots',data['products'].meta_robots);  
            this.image_path = data['image_path'];
        this.project_path= data['project_path'];
        //this.states = JSON.parse(data['products'].states);
        //this.state_url= JSON.parse(data['products'].state_url);
        this.section2_subpoints = JSON.parse(data['products'].section2_subpoints);
          this.section3_description = this.sanitizer.bypassSecurityTrustHtml(this.productArr.section3_description);
          this.section4_points = JSON.parse(data['products'].section4_points);
          this.section4_points_url = JSON.parse(data['products'].section4_points_url);
          this.car_rental_subtitle = JSON.parse(data['products'].car_rental_subtitle);
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

  onlanguageChange(newValue){
    // console.log(newValue, "new language");
    this.Roadsideassistanceinsurance();
    this.api_sub.sendMessage(1);
  }

}
