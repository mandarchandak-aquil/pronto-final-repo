import { Component, OnInit } from '@angular/core';
import { PagesService } from '../../commons/services/page/pages.service';
import { SubjectCallService } from '../../commons/services/subject-call/subject-call.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { ViewportScroller } from '@angular/common';
@Component({
  selector: 'app-sitemap',
  templateUrl: './sitemap.component.html',
  styleUrls: ['./sitemap.component.css']
})
export class SitemapComponent implements OnInit {
  loading : boolean =true;
  dataReq;
  page;
  vehicle_insu;
  property_insu;
  health_insu;
  mexico_auto_insu;
  comm_insu;
  claims_center;
  texas;
  california;
  florida;
  independent_agent;
  pronto_ser;
  legal;
  social;
  vehicle_insu_url;
  property_insu_url;
  health_insu_url;
  mexico_auto_insu_url;
  comm_insu_url;
  claims_center_url;
  texas_url;
  california_url;
  florida_url;
  independent_agent_url;
  pronto_ser_url;
  legal_url;
  social_url;
 
  constructor(public api_page : PagesService, public api_sub : SubjectCallService, private sanitizer: DomSanitizer, private vps: ViewportScroller) { }

  ngOnInit(): void {
    this.sitemap();
  }


  sitemap(){
    this.dataReq = {
      "language_id": sessionStorage.getItem('lg')
    }
  this.api_page.sitemap(this.dataReq).subscribe((data: {}) => {
    console.log(data);
    if(data['status'] == 'success'){
      this.page = data['page'];
      console.log('this.page',this.page);
      this.vehicle_insu = JSON.parse(this.page['vehicle_insu']);
      this.property_insu = JSON.parse(this.page['property_insu']);
      this.health_insu = JSON.parse(this.page['health_insu']);
      this.mexico_auto_insu = JSON.parse(this.page['mexico_auto_insu']);
      this.comm_insu = JSON.parse(this.page['comm_insu']);
      this.claims_center = JSON.parse(this.page['claims_center']);
      this.texas = JSON.parse(this.page['texas']);
      this.california = JSON.parse(this.page['california']);
      this.florida = JSON.parse(this.page['florida']);
      this.independent_agent = JSON.parse(this.page['independent_agent']);
      this.pronto_ser = JSON.parse(this.page['pronto_ser']);
      this.legal = JSON.parse(this.page['legal']);
      this.social = JSON.parse(this.page['social']);
      this.vehicle_insu_url = JSON.parse(this.page['vehicle_insu_url']);
      this.property_insu_url = JSON.parse(this.page['property_insu_url']);
      this.health_insu_url = JSON.parse(this.page['health_insu_url']);
      this.mexico_auto_insu_url = JSON.parse(this.page['mexico_auto_insu_url']);
      this.comm_insu_url = JSON.parse(this.page['comm_insu_url']);
      this.claims_center_url = JSON.parse(this.page['claims_center_url']);
      this.texas_url = JSON.parse(this.page['texas_url']);
      this.california_url  = JSON.parse(this.page['california_url']);
      this.florida_url = JSON.parse(this.page['florida_url']);
      this.independent_agent_url = JSON.parse(this.page['independent_agent_url']);
      this.pronto_ser_url = JSON.parse(this.page['pronto_ser_url']);
      this.legal_url = JSON.parse(this.page['legal_url']);
      this.social_url = JSON.parse(this.page['social_url']);
      this.loading = false;
    }
  });
  }
  onlanguageChange(newValue){
    // console.log(newValue, "new language");
    this.sitemap();
    this.api_sub.sendMessage(1);
  }
}
