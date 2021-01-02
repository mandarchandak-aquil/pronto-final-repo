import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Beyontec } from '../../../core/model/beyontec'
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
export class BeyontecService {

 // constructor() { }
 constructor(private http: HttpClient) { }

 apiurl = "https://ardemos.in:3010/";

 // apiurl = "http://localhost:3006/";


 getHrd(req) : Observable<any> {
   return this.http.post<any>(this.apiurl+'api/hdr/lookup', JSON.stringify(req), httpOptions)
  //  .pipe(
  //    retry(1),
  //    catchError(this.handleError)
  //  )
 }

 emailExist(req) : Observable<any> {
  return this.http.post<any>(this.apiurl+'api/email/exists', JSON.stringify(req), httpOptions)
  .pipe(
    retry(1),
    catchError(this.handleError)
  )
}

emailVerify(req) : Observable<any> {
  return this.http.post<any>(this.apiurl+'api/strikeiron/services/verify', JSON.stringify(req), httpOptions)
  .pipe(
    retry(1),
    catchError(this.handleError)
  )
}


intelligentsearch(req) : Observable<any> {
  // console.log(req);

  return this.http.post<any>(this.apiurl+'api/intelligentsearch/services/list', JSON.stringify(req), httpOptions)
  .pipe(
    retry(1),
    catchError(this.handleError)
  )
}

minutesQuote(req) : Observable<any> {
  // console.log(req);
  // https://ardemos.in:3010/api/minute/quotenew
  return this.http.post<any>(this.apiurl+'api/minute/quotenew', JSON.stringify(req), httpOptions)
  .pipe(
    retry(1),
    catchError(this.handleError)
  )
}


minutesQuotebypass(req, urlbypass) : Observable<any> {
  // console.log(req);

  return this.http.post<any>(urlbypass, JSON.stringify(req), httpOptions)
  .pipe(
    retry(1),
    catchError(this.handleError)
  )
}


beyondtecFullquote(req) : Observable<any> {
  return this.http.post<any>(this.apiurl+'api/beyondtecFullquote', JSON.stringify(req), httpOptions)
  .pipe(
    retry(1),
    catchError(this.handleError)
  )
}

verifyVin(req)
{
  return this.http.post<any>(this.apiurl+'api/vin/lookup', JSON.stringify(req), httpOptions)
  .pipe(
    retry(1),
    catchError(this.handleError)
  )
 
}


policyBuyBypass(req, urlbypass) : Observable<any> {
  // console.log(req);
  // https://stableapi.prontoinsurance.com/pay/services/policy?token=e30e8141-8a61-45e4-bd05-6902173db404
  return this.http.post<any>(urlbypass, JSON.stringify(req), httpOptions)
  .pipe(
    retry(1),
    catchError(this.handleError)
  )


  


  
}


policyBuy(req) : Observable<any> {
  // console.log(req);
  return this.http.post<any>(this.apiurl+'api/pay/services/policy', JSON.stringify(req), httpOptions)
  .pipe(
    retry(1),
    catchError(this.handleError)
  )
}

questionaryAnswer()
{
  return this.http.get<any>(this.apiurl+'api/beyondtec/questionary')
  .pipe(
    retry(1),
    catchError(this.handleError)
  )
 
}


  ccPay(req) : Observable<any> {
    // console.log(req);
    return this.http.post<any>(this.apiurl+'pay/ccpay', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  paypalPay(req) : Observable<any> {
    // console.log(req);
    return this.http.post<any>(this.apiurl+'pay/paypalpay', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }


  gPay(req) : Observable<any> {
    // console.log(req);
    return this.http.post<any>(this.apiurl+'pay/googlepay', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  applePay(req) : Observable<any> {
    // console.log(req);
    return this.http.post<any>(this.apiurl+'pay/ccpay', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  requestedMyquote(req) : Observable<any> {
    return this.http.post<any>(this.apiurl+'api/premiumrater/services/requested/myquote', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  
// https://ardemos.in:3010/api/beyondtec/questionary


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
   console.log(errorMessage, 'errorMessage errorMessage errorMessage')
  //  // window.alert(errorMessage); 
  console.log(errorMessage)
   return throwError(errorMessage);
}

}