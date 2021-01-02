import { Component, OnInit, Input } from '@angular/core';
import { AgentService } from '../../commons/services/agent.service';

import { filter, map } from 'rxjs/operators';
import { SubjectCallService } from '../../commons/services/subject-call/subject-call.service';
@Component({
  selector: 'app-find-an-agent',
  templateUrl: './find-an-agent.component.html',
  styleUrls: ['./find-an-agent.component.css']
})
export class FindAnAgentComponent implements OnInit {
  // zipdata : any;
  Agents: any = [];
  
   loading :boolean = true;  
  AgentsLen = 0;
  address;
  datar;
  location: Location;
  hide : boolean = false; 
  


  //public iconUrl = 'assets/images/icon-location-pin.svg';
  public iconUrl = {
    url: './assets/images/icon-location-pin.svg',
    scaledSize: {
      width: 60,
      height: 90
    }
  }

  @Input() zipdata = { Zip_code: '' }
  data;
  // zoom: number = 5;
  // lat;
  // lng;
  newlog;
  newlat;
  currentlat;
  currentlog;
  newagent: any = [];
  latlong: any = [];
  fitbound : boolean = false;
  zoom: number = 8;
  lat: number = 28.68352;
  lng: number = -147.20785;
lang_id;
dataReq;
pagearr;
  // private geoCoder: any;

  mapZoom = Math.round(14 - (Math.log(50) / Math.LN2));

  //    showMenu : boolean = true;
  constructor(public api_agent: AgentService,public api_sub : SubjectCallService) {


  }





  ngOnInit(): void {
  this.Findagentcms();
   this.lang_id = sessionStorage.getItem('lg');
    //console.log('this.lat', this.lat, 'this.lng', this.lng);

    // this.lat = 31.9686;
    // this.lng = -99.9018;

     this.getPosition().then(pos=>
      {

      this.latlong[0] = pos.lat;
      this.latlong.push(pos.lng);
        });
for(var i=0;i<2;i++){
   console.log('this.currentlog',this.latlong);
}
  if(this.currentlog){
  this.agentsearchinit();
}
    $('.btnToggle-sidebar').on('click', function (e) {
      $('.findAgentCol_wrap').toggleClass("hideLocation_side");
      e.preventDefault();
    });

   
  }
  Findagentcms(){
 var dataReq = {
      "language_id":  sessionStorage.getItem('lg'),
    }
 
        this.api_agent.Findagentcms(dataReq).subscribe((data: {}) => {
        this.pagearr = data['agents'];
         sessionStorage.setItem('page_title',data['agents'].page_title);
        sessionStorage.setItem('meta_title',data['agents'].meta_title);
          sessionStorage.setItem('meta_desc',data['agents'].meta_desc);
          sessionStorage.setItem('meta_keywords',data['agents'].meta_keywords);
          this.loading = false;
        });

  }

  hidemodal()
{
  if(this.hide == false){
  this.hide = true;
  }else{
    this.hide = false;
  }
}

  agentsearchinit(){
  // var zip = {
   // "Latitude" :25.9017,
   // "Longitude" :-97.4975
   // }
 // "26.189903",
// "-97.688261"
 var zip = {
    "Latitude" :this.newlat,
    "Longitude" :this.newlog
  }
  console.log('init',zip);
      this.api_agent.agentsearch(zip).subscribe((data: {}) => {
        this.Agents = data['agents'];
      this.currentlat = data['lat'];
      this.currentlog = data['long'];

      if (this.Agents.length >= 1) {
        this.lat = this.Agents[0].Latitude;
        this.lng = this.Agents[0].Longitude;
      }
      for (var i = 0; i < this.Agents.length; i++) {
        var dist = this.distance(this.currentlat, this.currentlog, this.Agents[i].Latitude, this.Agents[i].Longitude, "N");

        this.Agents[i]['dist'] = dist;
        this.Agents.sort((a, b) => {
          return a.dist - b.dist;
        });
        console.log("this.Agents[i]['dist']",this.currentlat, this.currentlog, this.Agents[i].Latitude, this.Agents[i].Longitude, "N");
      }
      if(this.Agents[0]){
            var zip = {
      "Zip_code" :this.Agents[0].Zip_code
      }
      this.api_agent.geocode(zip).subscribe((data: {}) => {
        this.address = data['address'];
      });
       }
      this.fitbound = true;

});
}
  recenterMap() {
    this.lat = Number(28);
    this.lng = Number(-147);
  }



   getPosition(): Promise<any>
    {
      return new Promise((resolve, reject) => {

        navigator.geolocation.getCurrentPosition(resp => {
          console.log();
        this.newlat =resp.coords.latitude;
        this.newlog = resp.coords.longitude;
          this.agentsearchinit();
       console.log('location',resp.coords.longitude,'currentlog0',this.currentlog);
            resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});

          },
          err => {
           reject(err);
          });
      });

    }



  distance(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
      return 0;
    }
    else {
      var radlat1 = Math.PI * lat1 / 180;
      var radlat2 = Math.PI * lat2 / 180;
      var theta = lon1 - lon2;
      var radtheta = Math.PI * theta / 180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180 / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit == "K") { dist = dist * 1.609344 }
      if (unit == "N") { dist = dist * 0.8684 }

      return dist;
    }
  }








  getAgents() {
    // this.zipdata = {"Zip_code" :78550};


    this.api_agent.agentsearch(this.zipdata).subscribe((data: {}) => {
      console.log('datasss', data);
      this.Agents = data['agents'];
      this.currentlat = data['lat'];
      this.currentlog = data['long'];
      if (this.Agents.length >= 1) {
        this.lat = this.Agents[0].Latitude;
        this.lng = this.Agents[0].Longitude;
      }
      for (var i = 0; i < this.Agents.length; i++) {
        // this.agentDistanceToCurrentZipCode(this.Agents[i]);
        var dist = this.distance(this.currentlat, this.currentlog, this.Agents[i].Latitude, this.Agents[i].Longitude, "N");

        this.Agents[i]['dist'] = dist;
        this.Agents.sort((a, b) => {
          return a.dist - b.dist;
        });
      }
      console.log('this.Agents.length', this.Agents.length);



      // this.zoom = 8;
      this.api_agent.geocode(this.zipdata).subscribe((data: {}) => {
        this.address = data['address'];
      });

      this.fitbound = true;

    });
  }

onlanguageChange(newValue){
    this.agentsearchinit();
    this.Findagentcms();
    this.api_sub.sendMessage(1);
  }


}
