import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../commons/services/product/product.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { SubjectCallService } from '../../commons/services/subject-call/subject-call.service';
import { ViewportScroller } from '@angular/common';
@Component({
  selector: 'app-health-insurance',
  templateUrl: './health-insurance.component.html',
  styleUrls: ['./health-insurance.component.css']
})
export class HealthInsuranceComponent implements OnInit {
  loading :boolean = true; 
  dataReq;
  image_path;
  project_path;
  ads;
  prodArr;
  prod;
  prod_url;
  policy_titles;
  healthcompare_subtitle;
  constructor(public api_product : ProductService, private sanitizer: DomSanitizer, public api_sub : SubjectCallService, private vps: ViewportScroller) {}


  ngOnInit(): void {
   
    this.healthinsurance();
  }
  healthinsurance(){

    this.dataReq = {
      "language_id": sessionStorage.getItem('lg')
    }
    console.log(this.dataReq);
    this.api_product.healthinsurance(this.dataReq).subscribe((data: {}) => {
      // console.log(data);
      console.log('data',data);
      if(data['status'] == "success"){
        this.image_path = data['image_path'];
        console.log('pathss',data);
        this.project_path= data['project_path'];
        this.ads = data['banners'];
        this.prodArr =  data['page']; 
        this.prod = JSON.parse(this.prodArr.prod);
        this.prod_url = JSON.parse(this.prodArr.prod_url);
        this.policy_titles = JSON.parse(this.prodArr.policy_titles);
        this.healthcompare_subtitle  = JSON.parse(this.prodArr.healthcompare_subtitle);
        this.loading = false;
      }else{
        this.loading = false;
      }
    });

  }
  onlanguageChange(newValue){
    // console.log(newValue, "new language");
    this.healthinsurance();
    this.api_sub.sendMessage(1);
  }

}
