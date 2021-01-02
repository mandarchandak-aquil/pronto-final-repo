import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Homepage } from '../../../core/model/homepage'
// import { first } from 'rxjs/operators';
// import { Observable } from 'rxjs';
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
export class HomepageService {
  // constructor() { }
  constructor(private http: HttpClient) { }

apiurl = "https://ardemos.in:3010/";
//apiurl = "https://ardemos.in:3007/";


  getProduct(req) : Observable<Homepage> {
    
    return this.http.post<Homepage>(this.apiurl+'cmspages/homepage', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  getslider(req) : Observable<Homepage> {
 
    return this.http.post<Homepage>(this.apiurl+'cmspages/frontproducts', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

 getnotificationbox(req) : Observable<Homepage> {
 
    return this.http.post<Homepage>(this.apiurl+'cmspages/notificationbox', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }


  getCountyLookup(req) : Observable<any>{
    return this.http.post<any>(this.apiurl+'api/county/lookup', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getPzcmap(req) : Observable<any>{
    return this.http.post<any>(this.apiurl+'api/pzc/pzcmap', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }


  API_DOMAIN:any= 'https://pronto-api.talosdigital.com/api-dev/api/';
  // apiurl = "http://localhost:3006/";
  getStatebyzipcode(zipcode)   {
 
    return this.http.post('https://ardemos.in:3010/oneinc/api/v2/state',{  
      "zip" : zipcode
  })
  .pipe(
    retry(1),
    catchError(this.handleError)
  )
}
getflpzmap(paramsZipCode)   {
 
  return this.http.post(this.API_DOMAIN + "flpz/flpzmap",{  
    zipCode: paramsZipCode
})
.pipe(
  retry(1),
  catchError(this.handleError)
)
}





  // Error handling 
  handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // window.alert(errorMessage); 
    console.log(errorMessage)
    return throwError(errorMessage);
 }
}
