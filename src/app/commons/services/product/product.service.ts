import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Products } from '../../../core/model/products'
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
export class ProductService {

public product;
  
  // constructor() { }
  constructor(private http: HttpClient) { }
apiurl = "https://ardemos.in:3010/";
//apiurl = "https://ardemos.in:3007/";






ValidateEmail(req) : Observable<Products> {
    return this.http.get<Products>(this.apiurl+'api/validateEmail/'+req, httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  healthinsurance(req) : Observable<Products> {
    return this.http.post<Products>(this.apiurl+'cmspages/healthinsurance', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  claimcentercalifornia(req) : Observable<Products> {
    return this.http.post<Products>(this.apiurl+'cmspages/claim_center_california', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  getProduct(req) : Observable<Products> {
    return this.http.post<Products>(this.apiurl+'cmspages/products', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  Getaquote(req) : Observable<Products> {
    return this.http.post<Products>(this.apiurl+'cmspages/getaquote', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  
  californiaquote(req) : Observable<Products> {
    return this.http.post<Products>(this.apiurl+'cmspages/californiaquote', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  texassouthboundquote(req) : Observable<Products> {
    return this.http.post<Products>(this.apiurl+'cmspages/texassouthboundquote', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  
  texasnorthboundquote(req) : Observable<Products> {
    return this.http.post<Products>(this.apiurl+'cmspages/texasnorthboundquote', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  freshsales(req) : Observable<Products> {
    return this.http.post<Products>(this.apiurl+'cmspages/freshsales', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }


  Claimsubmit(req) : Observable<Products> {
    return this.http.post<Products>(this.apiurl+'cmspages/claimsubmit', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
AutoInsurance(req) : Observable<Products> {
    return this.http.post<Products>(this.apiurl+'cmspages/autoInsurance', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  Boatinsurance(req) : Observable<Products> {
    return this.http.post<Products>(this.apiurl+'cmspages/boatinsurance', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
 Motorcycleinsurance(req) : Observable<Products> {
    return this.http.post<Products>(this.apiurl+'cmspages/motorcycleinsurance', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
   Watercraftinsurance(req) : Observable<Products> {
    return this.http.post<Products>(this.apiurl+'cmspages/watercraftinsurance', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  TexasMexicoSouthboundInsurance(req) : Observable<Products> {
    return this.http.post<Products>(this.apiurl+'cmspages/TexasMexicoSouthboundInsurance', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  TexasMexicoNorthboundInsurance(req) : Observable<Products> {
    return this.http.post<Products>(this.apiurl+'cmspages/TexasMexicoNorthboundInsurance', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  
   Condoinsurance(req) : Observable<Products> {
    return this.http.post<Products>(this.apiurl+'cmspages/condoinsurance', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
    Commercialinsurance(req) : Observable<Products> {
    return this.http.post<Products>(this.apiurl+'cmspages/commercialinsurance', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
    Mobilehomeinsurance(req) : Observable<Products> {
    return this.http.post<Products>(this.apiurl+'cmspages/mobilehomeinsurance', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )

  }
  Homeinsurance(req) : Observable<Products> {
    return this.http.post<Products>(this.apiurl+'cmspages/homeinsurance', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )

  }
  Medicareadvantageinsurance(req) : Observable<Products> {
    return this.http.post<Products>(this.apiurl+'cmspages/medicareadvantageinsurance', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )

  }

    CaliforniaMexicoAutoInsurance(req) : Observable<Products> {
    return this.http.post<Products>(this.apiurl+'cmspages/CaliforniaMexicoAutoInsurance', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )

  }
 TexasMexicoAutoInsurance(req) : Observable<Products> {
    return this.http.post<Products>(this.apiurl+'cmspages/TexasMexicoAutoInsurance', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )

  }
  
 Mexicoinsuurance(req) : Observable<Products> {
    return this.http.post<Products>(this.apiurl+'cmspages/mexicoinsuurance', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )

  }
   Roadsideassistanceinsurance(req) : Observable<Products> {
    return this.http.post<Products>(this.apiurl+'cmspages/roadsideassistanceinsurance', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )

  }
  Rvinsurance(req) : Observable<Products> {
    return this.http.post<Products>(this.apiurl+'cmspages/rvinsurance', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )

  }
   Supplementalhealthinsurance(req) : Observable<Products> {
    return this.http.post<Products>(this.apiurl+'cmspages/supplementalhealthinsurance', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )

  }
  Rentersinsurance(req) : Observable<Products> {
    return this.http.post<Products>(this.apiurl+'cmspages/rentersinsurance', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )

  }
 CommanSection(req) : Observable<Products> {
    return this.http.post<Products>(this.apiurl+'cmspages/CommanSection', JSON.stringify(req), httpOptions)
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
