import { Component, OnInit,Renderer2,ElementRef ,ViewChild} from '@angular/core';

import { ProductService } from '../../commons/services/product/product.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { SubjectCallService } from '../../commons/services/subject-call/subject-call.service';
 import { ViewportScroller } from '@angular/common';
 import { Router } from '@angular/router';
@Component({
  selector: 'app-product-motorcycle-insurance',
  templateUrl: './product-motorcycle-insurance.component.html',
  styleUrls: ['./product-motorcycle-insurance.component.css']
})
export class ProductMotorcycleInsuranceComponent implements OnInit {
  // @ViewChild('headerspc') headerspc;

   loading :boolean = true;  
  dataReq : any;
  productArr: any = [];
  subheading : any;
ads;

current_state;
  states;
    emailError : boolean = false;
  image_path;
  policy_titles;
  project_path;
  section2_points;
  additional_coverages;
  includes;
  how_to_save_question;
      how_to_save_answer;
      mobileapp;
  constructor(public router: Router,public api_product : ProductService, private sanitizer: DomSanitizer, public api_sub : SubjectCallService,                 private vps: ViewportScroller,private renderer: Renderer2) {}

  ngOnInit(): void {
    // if(this.router.url.slice(-6) == 'mobile'){
    //   this.api_sub.mob  = 1;
    // }else{
    //   this.api_sub.mob  = 0;
    // }
    // this.mobileapp = this.api_sub.mob;
    // console.log('this.mobileapp',this.mobileapp);
   


    this.getProduct();
  }


  ngAfterViewInit()
  {
    // if(this.mobileapp == 0){
    //    this.headerspc.nativeElement.classList.add('spcTpHeader')
    //  }else{
    //    this.headerspc.nativeElement.classList.remove('spcTpHeader')
    //  }

   } //   console.log(document.readyState, "document.readyState")
  //   document.onreadystatechange = function() { 
  //     if (document.readyState !== "complete") { 
  //         document.querySelector("body").style.visibility = "hidden"; 
  //         document.querySelector<HTMLElement>(".site_preloader").style.visibility = "visible"; 
  //     } else { 
  //         document.querySelector<HTMLElement>(".site_preloader").style.display = "none"; 
  //         document.querySelector("body").style.visibility = "visible"; 
  //     } 
  //   };


  // }


 scroll(id) {
    this.vps.scrollToAnchor(id);
  }
  

   public myFunction(state){
  this.api_product.product = state;
  }

  getProduct(){

    this.dataReq= {
      "language_id":  sessionStorage.getItem('lg'),
      "page_url": "motorcycle-insurance"
    }
    // console.log(this.zipdata);
    
    this.api_product.Motorcycleinsurance(this.dataReq).subscribe((data: {}) => {
      // console.log(data);

      if(data['status'] == "success"){
       this.ads = data['banners'];
      this.image_path = data['image_path'];
      this.project_path= data['project_path'];
        this.productArr = data['products'];
        this.states = JSON.parse(data['products'].states);
              sessionStorage.setItem('page_title',data['products'].page_title);
    sessionStorage.setItem('meta_title',data['products'].meta_title);
    sessionStorage.setItem('meta_desc',data['products'].meta_desc);
    sessionStorage.setItem('meta_keywords',data['products'].meta_keywords);
    sessionStorage.setItem('canonical_rel',data['products'].canonical_rel);
    sessionStorage.setItem('canonical_tag',data['products'].canonical_tag);
    sessionStorage.setItem('meta_robots',data['products'].meta_robots);  
            this.states = JSON.parse(this.productArr.states);
        this.subheading = this.sanitizer.bypassSecurityTrustHtml(this.productArr.subheading);
      this.section2_points = JSON.parse(this.productArr.section2_points);
      this.policy_titles= JSON.parse(this.productArr.policy_titles);
      this.includes = JSON.parse(this.productArr.includes);
      this.additional_coverages = JSON.parse(this.productArr.additional_coverages);
      this.how_to_save_question= JSON.parse(this.productArr.how_to_save_question);
      this.how_to_save_answer  = JSON.parse(this.productArr.how_to_save_answer);
      this.loading = false;
      }else{
        this.productArr = [];
        this.subheading = '';
        
        this.states = [] ;
       
      }
      
     
    });
  }


  onlanguageChange(newValue){
    // console.log(newValue, "new language");
    this.getProduct();
    this.api_sub.sendMessage(1);
  }

}
