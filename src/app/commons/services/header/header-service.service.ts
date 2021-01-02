import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Languagelist } from '../../../core/model/header'
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
export class HeaderServiceService {

  // constructor() { }
  constructor(private http: HttpClient) { }
apiurl = "https://ardemos.in:3010/";
//apiurl = "https://ardemos.in:3007/";

  getLanguage() : Observable<Languagelist> {
    return this.http.get<Languagelist>(this.apiurl+'cmspages/languages')
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  
  sitesetting(req) : Observable<Languagelist> {
    return this.http.post<Languagelist>(this.apiurl+'cmspages/sitesetting', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
getSidebarMenu(req) : Observable<Languagelist> {
    return this.http.post<Languagelist>(this.apiurl+'cmspages/sidebarmenu', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
getfooterhorizontalMenu(req) : Observable<Languagelist> {
    return this.http.post<Languagelist>(this.apiurl+'cmspages/horizontalmenu', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }


  getfooterMenu(req) : Observable<Languagelist> {
    return this.http.post<Languagelist>(this.apiurl+'cmspages/footermenu', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  getPencilbanner(req) : Observable<Languagelist> {
    return this.http.post<Languagelist>(this.apiurl+'cmspages/pencilbanner', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  Connect(req) : Observable<Languagelist> {
    return this.http.post<Languagelist>(this.apiurl+'cmspages/connect', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }


  getSocialIcon() : Observable<Languagelist> {
    return this.http.get<Languagelist>(this.apiurl+'cmspages/socialmedia', httpOptions)
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
