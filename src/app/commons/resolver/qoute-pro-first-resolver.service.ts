import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { qouteproService } from '../services/qoute-pro/qoute-pro.service';
import { JsonApiService } from '@quotepro/aq3';

@Injectable()
export class ProFirstResolver implements Resolve<any> {

  constructor(private aq3: JsonApiService,private http: HttpClient,private qouteproService:qouteproService) { }

  resolve(): Observable<any> {
   
     this.qouteproService.initialize();
    this.qouteproService.postZip();
    return this.qouteproService.getLocation();
//    var a= this.aq3.getJson('Location','Index')
//     .subscribe(response=>{
//       console.log("response",response)
//     //this.FormService.getFirstForm(response);
    
//    this.qouteproService.updateSession();
//       // this.qouteproService.createVehicle();
//       return response;
//      })
   
  }
}