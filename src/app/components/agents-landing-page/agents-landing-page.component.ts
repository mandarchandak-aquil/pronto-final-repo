import { Component, OnInit } from '@angular/core';
import { AgentService } from '../../commons/services/agent.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { Router,ActivatedRoute } from '@angular/router';
import { SubjectCallService } from '../../commons/services/subject-call/subject-call.service';
import * as e from 'express';
@Component({
  selector: 'app-agents-landing-page',
  templateUrl: './agents-landing-page.component.html',
  styleUrls: ['./agents-landing-page.component.css']
})
export class AgentsLandingPageComponent implements OnInit {
agent;
 loading :boolean = true;  
agentdetails;
description;
ids;
ads;
zoom = 6;
store_hours;
project_path;
lat: number = 41.850033;
lng: number = -87.6500523;
path;
dataReq;
pagearr;
coverages;
  fitbound: boolean = false;


 public iconUrl =  {
    url: './assets/images/icon-location-pin.svg',
    scaledSize: {
        width: 60,
        height: 90
    }
}
  constructor(public router: ActivatedRoute,public api_agent: AgentService, private sanitizer: DomSanitizer,public api_sub : SubjectCallService) {
   this.loadScript('//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js');
   
   }

  ngOnInit(): void {
   this.router.params.subscribe(function(params){
       localStorage.setItem('slug', JSON.stringify(params));
       localStorage.setItem('agentId', JSON.stringify(params));

      })
  //  console.log('this.zoom',this.zoom);
   

      this.getAgents();
      this.Agentlandingpagecms();
      this.Agentads();
      
  }
  ngAfterViewInit(){
    
  }
 public loadScript(url: string) {
      const body = <HTMLDivElement> document.body;
      const script = document.createElement('script');
      script.innerHTML = '';
      script.src = url;
      script.async = false;
      script.defer = true;
      body.appendChild(script);
    }
  Agentads(){
  this.api_agent.Agentads().subscribe((data: {}) => {

     this.ads  = data['ads'];
     this.project_path  = data['project_path'];
       this.path  = data['image_path'];
     //console.log('this.ads ',this.ads );
    });
  }
 
Agentlandingpagecms(){
  this.pagearr = '';
    this.dataReq = {
      "language_id": sessionStorage.getItem('lg')
    }
            this.api_agent.Agentlandingpagecms(this.dataReq).subscribe((data: {}) => {
        this.pagearr = data['agents'];
        this.coverages = JSON.parse(data['agents'].insurance_coverages);
     //   console.log('this.coverages',this.coverages);
         sessionStorage.setItem('page_title',data['agents'].page_title);
        sessionStorage.setItem('meta_title',data['agents'].meta_title);
          sessionStorage.setItem('meta_desc',data['agents'].meta_desc);
          sessionStorage.setItem('meta_keywords',data['agents'].meta_keywords);
          
        });
  
}
  getAgents(){
  var data = JSON.parse(localStorage.getItem('slug'));
 // console.log(data.slug);
  this.agent= {"slug":data.slug};
  sessionStorage.setItem('agent_id',data.slug);
    this.api_agent.agentDetails(this.agent).subscribe((data: {}) => {
     //console.log("data",data);
     this.agentdetails  = data;
    this.description = this.sanitizer.bypassSecurityTrustHtml(this.agentdetails.agents.description);

    
 sessionStorage.setItem('page_title',this.agentdetails.agents['person_name']);
    sessionStorage.setItem('meta_title',this.agentdetails.agents['person_name']);
    sessionStorage.setItem('meta_desc',this.agentdetails.agents['person_name']);
    sessionStorage.setItem('meta_keywords',this.agentdetails.agents['person_name']);
    sessionStorage.setItem('canonical_rel',this.agentdetails.agents['person_name']);
    sessionStorage.setItem('canonical_tag',this.agentdetails.agents['person_name']);
    sessionStorage.setItem('meta_robots',this.agentdetails.agents['person_name']);
    this.fitbound = true;

    setTimeout (() => {
      this.fitbound = false;
      this.zoom = 10;
    }, 1000);

    var datasreqww = {
      "store_hours_id" :  this.agentdetails.agents['store_hours_id']
    }
   // console.log('datas',datasreqww,JSON.stringify(this.agentdetails.agents));
    this.api_agent.store_hours(datasreqww).subscribe((data: {}) => {
      if(data['status'] == 'success'){
      this.store_hours  = data['time'];
    //  console.log('this.store_hours',this.store_hours);
    this.loading = false;
      }else{
        this.store_hours = '';
        this.loading = false;
      }
  });
    // if(this.agentdetails.agents['Latitude'] && this.agentdetails.agents['Longitude']){
    //   this.fitbound = true;
    // }
    // 

    });
  }

   onlanguageChange(newValue){
    this.Agentlandingpagecms();
    this.api_sub.sendMessage(1);
  }

}

