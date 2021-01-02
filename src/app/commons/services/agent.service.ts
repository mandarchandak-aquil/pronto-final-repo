import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Agent } from '../../core/model/agent'
import { Geocode } from '../../core/model/Geocode'
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
export class AgentService {

  // constructor() { }
  constructor(private http: HttpClient) { }
apiurl = "https://ardemos.in:3010/";
//apiurl = "https://ardemos.in:3007/";
public lat;
public long;

  agentsearch(req) : Observable<Agent> {
    return this.http.post<Agent>(this.apiurl+'cmspages/agentsearch', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
   
     agentsearchinit(req) : Observable<Agent> {
    return this.http.post<Agent>(this.apiurl+'cmspages/agentsearch', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  store_hours(req) : Observable<Agent> {
    return this.http.post<Agent>(this.apiurl+'cmspages/store_hours', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  
  Agentads() : Observable<Agent> {
    return this.http.post<Agent>(this.apiurl+'cmspages/agentads', httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
   Findagentcms(req) : Observable<Agent> {
    return this.http.post<Agent>(this.apiurl+'cmspages/findagentcms', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
 
   Agentlandingpagecms(req) : Observable<Agent> {
    return this.http.post<Agent>(this.apiurl+'cmspages/agentlandingpagecms', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
 
 




     geocode(req) : Observable<Geocode> {
    return this.http.post<Geocode>(this.apiurl+'cmspages/geocode', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  agentDetails(req) : Observable<Agent> {
    return this.http.post<Agent>(this.apiurl+'cmspages/agentdetails', JSON.stringify(req), httpOptions)
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
