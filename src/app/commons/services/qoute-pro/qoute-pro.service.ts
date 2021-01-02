

import { Injectable } from '@angular/core';

import { JsonApiService } from '@quotepro/aq3';
import { flatMap, concatMap, retry, catchError, map, filter, tap, takeUntil } from 'rxjs/operators';
import { of, Observable, from, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';
import { DataSession } from '../../../core/model/data-session';
import { environment } from '../../../../environments/environment';

const httpOptions = {
    headers: new HttpHeaders({ 
    'Access-Control-Allow-Credentials' : 'true',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class qouteproService {
  public sidebar_change = new BehaviorSubject<any>(false);
  session=new Object;
  photos: Array<string> = [];
  aq3Url = '';
  loading = false;
  scrollPosition: [number, number];
  vehicleSearchPage: number;
  first_form_data:any;
 carrrierSettings:any;
 finished$:any="true";
  constructor(
    private aq3: JsonApiService,
    private http: HttpClient,
    private route: ActivatedRoute,
  ) { }

  // init(aq3Url: string) {

  //   const stored = sessionStorage.getItem('v2c_session');
  //   if (stored) {
  //     Object.assign(this.session, JSON.parse(stored));
  //   } else {
  //     this.session.sid = this.aq3.newGuid();
  //     //this.updateSession(this.session);
  //   }
  //   // of(...dealerList['dealers']).subscribe((d: Dealer) => {
  //   //   if (d.Description.indexOf('z-') === -1) {
  //   //     this.dealers.push(d);
  //   //   }
  //   // });
  //   this.route.queryParams.subscribe((parms: Params) => {
  //     const url = parms['url'];
  //     if (url) {
  //       this.session.url = url;
  //       this.updateSession();
  //     }
  //   });
  //   this.aq3.sid = this.session.sid;
  //   this.aq3.baseUrl = aq3Url;
  //   this.aq3Url = aq3Url;
  // }
  updateSidebar()
  {
    this.sidebar_change.next(true);
  }
  initialize()
  {
    this.aq3.baseUrl=environment.aq3Url;
   
    this.aq3.initializeSession();
   // imp  this.aq3.sid='2f94d659-fcb0-4ce7-a8e9-4a2fea9221f4';
  // this.aq3.sid='af32f88c-9232-4704-8f19-89348943a7cf';
   //this.aq3.affid=12345;
//console.log(this.aq3.affid,this.aq3.sid,"this.aq3.affid")
  //  this.aq3.sid='609c1a99-5969-412e-868a-c4231bc7e45c';
    this.updateSession();
  }
  postZip()
  {
    var zipdata=JSON.parse(localStorage.getItem('insuranceFor'));
    var data:any={
      'insuranceType':zipdata.insurancetype,
   'zipCode':zipdata.zipcode
     }
    // console.log(data,"dattttta")
    this.aq3.postJson('home','Index',data)
    .subscribe(response=>{
      console.log(response,"postZip",this.aq3.sid);
     this.updateSession();
    })
  }
  getLocation()
  {
    return this.aq3.getJson('Location','Index')
    // .subscribe(response=>{
    //   this.first_form_data=response;
    //   console.log(response,"getLocation")
    //   this.updateSession();
    // return response;
    //  })
    //  return a;
  }
postApplicantInformation(form_main){
  var form:any={
    "address": "820 N Orleans",
    "addressType": "6",
    "city": "CHICAGO",
    "county": "COOK",
    "disableValidation": false,
    "email": "test@gmail.com",
    "firstName": "John",
    "id": 6644,
    "lastName": "Doe",
    "phone": "(321) 321-3213",
    "quote": {
        "agreeNonOwner": false,
        "currentlyInsured": false,
        "nonOwner": false,
        "noPrior": "6",
        "paperLessDisc": false,
        "yearsInsured": 1
    },
    "state": "IL",
    "zipCode": "60610"
}
 return this.aq3.postJson('Location', 'Index', form_main)
   
}

  getCarrierSettingsCode(state)
  {
    this.aq3.postJson('RestApi','GetCarrierSettings',{state:'TX'})
    .subscribe(response=>{
      console.log(response,"getCarrierSettingsCode");
     //this.carrrierSettings[state]=response.settings
     })
  }
 
createVehicle(){
  this.aq3.getJson("Vehicle", "Create", {id: 0})
    .subscribe(result => {
      console.log(result,"createVehicle")
      this.updateSession();
    })
};

updateDropdowns(vehicle_data){
 var a= this.aq3.postJson("Vehicle", "UpdateDropDowns",vehicle_data).subscribe(result => {
    console.log(result,"postJson")
    this.updateSession();
    return result;
  });
  return a;
}


startQuote(){
  
  return this.aq3.getJson('RestApi', 'GetQuote')
  //     .subscribe(result => {
  //       if (result.errors) {
  //         console.log("errors",result.errors);
          
  //       }
  //       else
  //       {
  //         console.log("only result",result);
  //       }
        
  //       this.retrieveIncrementalResults()
  // })


}
  retrieveIncrementalResults(){
   //console.log('retrieveIncrementalResults')
    return this.aq3.getJson('RestApi', 'Incremental')
        // .subscribe(result => {
        //   console.log(result,"qoute result")
        // })
  }
  updateSession() {
    this.aq3.getJson('RestApi','GetSession')
    .subscribe(response=>{
      
      let obj=Object.assign(this.session,response);
      console.log(response,"GetSession");
      sessionStorage.setItem('dataV3',JSON.stringify(obj));
     // console.log(JSON.stringify(obj),"responce")
    });
    // try {
    //   if (data && data !== this.session) {
    //     Object.keys(data).forEach(key => {
    //       if (this.session.hasOwnProperty(key)) {
    //         this.session[key] = data[key];
    //       }
    //     });
    //   }
    //   sessionStorage.setItem('v2c_session', JSON.stringify(this.session));
    // } catch (e) {
    //   console.log(e);
    // }
  }



}