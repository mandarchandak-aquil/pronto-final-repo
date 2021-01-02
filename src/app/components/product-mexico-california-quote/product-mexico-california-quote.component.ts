import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubjectCallService } from '../../commons/services/subject-call/subject-call.service';
import { ProductService } from '../../commons/services/product/product.service';

@Component({
  selector: 'app-product-mexico-california-quote',
  templateUrl: './product-mexico-california-quote.component.html',
  styleUrls: ['./product-mexico-california-quote.component.css']
})
export class ProductMexicoCaliforniaQuoteComponent implements OnInit {
  // @ViewChild('headerspc') headerspc;
  mobileapp;
  image_path;
  project_path;
  ads;
  productArr;
  dataReq;
  loading :boolean = false;
  constructor(public router: Router,public api_product : ProductService,  public api_sub : SubjectCallService) {}


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
  TexasMexicoSouthboundInsurance(){

    this.dataReq = {
          "language_id": sessionStorage.getItem('lg')
        }
      
        this.api_product.californiaquote(this.dataReq).subscribe((data: {}) => {
          if(data['status'] == "success"){  
         
           this.ads = data['banners'];
            this.productArr = data['products'];
            console.log('this.productArr',this.productArr);
             this.image_path = data['image_path'];
            this.project_path= data['project_path'];
         
          this.loading = false;
          }else{ 
            this.productArr = [];
            this.loading = false;
          }
         
        });
      }
      onlanguageChange(newValue){
        this.TexasMexicoSouthboundInsurance();
        this.api_sub.sendMessage(1);
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

}
