import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
// import { first } from 'rxjs/operators';
// import { Observable } from 'rxjs';
const httpOptions = {
    headers: new HttpHeaders({ 
    'Access-Control-Allow-Credentials' : 'true',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
    'Content-Type':  'application/json',
    'x-origin': 'c5c402e1bffd9d2e9ede2105560c371ed4b023565677c73f1c4f7be05c5d2789'
  })
};

@Injectable({
  providedIn: 'root'
})
export class oneInkPaymentService {


   constructor(private http: HttpClient) { 
  
  }
 
createSession()
{
  return this.http.get("https://testportalone.processonepayments.com/Api/Api/Session/Create?portalOneAuthenticationKey=14bbbd56-b1cd-490b-ace0-53a108ccaf44").pipe(map(function (response) {
    return response;
}));
 }

 savePaymentMethod(model)
{
  let headers1 = new HttpHeaders({
    'authority':' testportalone.processonepayments.com',
'method': 'POST',
'path': '/GenericModal/api/validate/savePaymentMethod',
'scheme': 'https',
'authorization': model['sessionId'],
'origin':' https://testportalone.processonepayments.com'
//referer: https://testportalone.processonepayments.com/GenericModal/?uniq=1606131607615&sessionId=5cc61f50-142f-47ba-912c-0bef85e34492
 });

  return this.http.post("https://testportalone.processonepayments.com/GenericModal/api/validate/savePaymentMethod",model,
  {
    headers: headers1
  }).pipe(map(function (response) {
    return response;
}));
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
alert(errorMessage)
    return throwError(errorMessage);
 }
}
