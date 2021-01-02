import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Page } from '../../../core/model/page'
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
export class PagesService {

  // constructor() { }
  constructor(private http: HttpClient) { }

apiurl = "https://ardemos.in:3010/";
//apiurl = "https://ardemos.in:3007/";


  getProduct(req) : Observable<Page> {
    return this.http.post<Page>(this.apiurl+'cmspages/page', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  
Contact(req) : Observable<Page> {
    return this.http.post<Page>(this.apiurl+'cmspages/contact', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  Claimcms(req) : Observable<Page> {
    return this.http.post<Page>(this.apiurl+'cmspages/claimcms', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  
 Pencilbannerpages(req) : Observable<Page> {
    return this.http.post<Page>(this.apiurl+'cmspages/pencilbannerpages', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }


  Pharmacycard(req) : Observable<Page> {
    return this.http.post<Page>(this.apiurl+'cmspages/pharmacycard', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  helpcenter(req) : Observable<Page> {
    return this.http.post<Page>(this.apiurl+'cmspages/help_center', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  sitemap(req) : Observable<Page> {
    return this.http.post<Page>(this.apiurl+'cmspages/sitemap', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  
  independentAgent(req) : Observable<Page> {
    return this.http.post<Page>(this.apiurl+'cmspages/independentagent', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  mobileAppDownload(req) : Observable<Page> {
    return this.http.post<Page>(this.apiurl+'cmspages/mobileAppDownload', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

Sb1567(req) : Observable<Page> {
    return this.http.post<Page>(this.apiurl+'cmspages/sb1567', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

Texaspersonal(req) : Observable<Page> {
    return this.http.post<Page>(this.apiurl+'cmspages/texaspersonal', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }



 Securitypolicy(req) : Observable<Page> {
    return this.http.post<Page>(this.apiurl+'cmspages/security_policy', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
Termsofuse(req) : Observable<Page> {
    return this.http.post<Page>(this.apiurl+'cmspages/termsofuse', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }


 Privacypolicy(req) : Observable<Page> {
    return this.http.post<Page>(this.apiurl+'cmspages/Privacypolicy', JSON.stringify(req), httpOptions)
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
