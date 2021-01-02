import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../commons/services/product/product.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { SubjectCallService } from '../../commons/services/subject-call/subject-call.service';
import { ViewportScroller } from '@angular/common';
@Component({
  selector: 'app-claim-center-california',
  templateUrl: './claim-center-california.component.html',
  styleUrls: ['./claim-center-california.component.css']
})
export class ClaimCenterCaliforniaComponent implements OnInit {
  loading :boolean = true;
  project_path;
  pagearr;
  image_path;
  dataReq;
  colum1;
  colum2;
  colum3;
  constructor(public api_product : ProductService, private sanitizer: DomSanitizer, public api_sub : SubjectCallService, private vps: ViewportScroller) {}


  ngOnInit(): void {
    this.getBoatinsurance();
  }
  getBoatinsurance(){

    this.dataReq = {
      "language_id": sessionStorage.getItem('lg')
    }
    // console.log(this.zipdata);
    
    this.api_product.claimcentercalifornia(this.dataReq).subscribe((data: {}) => {
      // console.log(data);

      if(data['status'] == "success"){
      this.image_path = data['image_path'];
      console.log('pathss',this.image_path);
      this.project_path= data['project_path'];
      this.pagearr =  data['page'];
      this.colum1 = JSON.parse(this.pagearr.colum1);
      this.colum2 = JSON.parse(this.pagearr.colum2);
      this.colum3 = JSON.parse(this.pagearr.colum3);
      console.log( this.colum1[0], this.colum2, this.colum3);
      this.loading = false;
      }
      });
    }
    onlanguageChange(newValue){
      // console.log(newValue, "new language");
      this.getBoatinsurance();
      this.api_sub.sendMessage(1);
    }
}
