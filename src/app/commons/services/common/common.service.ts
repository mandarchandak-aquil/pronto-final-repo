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
export class CommonService {

  // constructor() { }
  constructor(private http: HttpClient) { }

  apiurl = "https://ardemos.in:3010/";

  // apiurl = "http://localhost:3006/";


  getTocken() : Observable<any> {
    // console.log(req)
    return this.http.post<any>(this.apiurl+'api/verify', httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }


  getDropdown(req) : Observable<any> {
    // console.log(req)
    return this.http.post<any>(this.apiurl+'api/resource', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }


  // https://ardemos.in:3010/api/login/services/server/time

  getServerDate(req) : Observable<any> {
    // console.log(req)
    return this.http.post<any>(this.apiurl+'api/login/services/server/time', JSON.stringify(req), httpOptions)
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
