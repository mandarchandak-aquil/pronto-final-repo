import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
// import { AuthService } from "angularx-social-login";
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

export class AuthServicess {

apiurl = "https://ardemos.in:3010/";
//apiurl = "https://ardemos.in:3007/";
// private authService: AuthService
  constructor(public http :HttpClient ,public router: Router,) { }
 public isAuthenticated(): boolean {
    const token = sessionStorage.getItem('token'); 
    // console.log('token',token);
    if ( (token ) && token.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  login(req) : Observable<any> {
    return this.http.post<any>(this.apiurl+'auth/login', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
sociallogin(req) : Observable<any> {
    return this.http.post<any>(this.apiurl+'auth/sociallogin', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

checksocial(req) : Observable<any> {
    return this.http.post<any>(this.apiurl+'auth/checksocial', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  
Beyondtechverify(req) : Observable<any> {
    return this.http.post<any>(this.apiurl+'api/policyinfo/services/verify', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  verifyuser(req) : Observable<any> {
    return this.http.post<any>(this.apiurl+'auth/verifyuser', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  forgotpassword(req) : Observable<any> {
    return this.http.post<any>(this.apiurl+'auth/forgotpassword', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  resetpassword(req) : Observable<any> {
    return this.http.post<any>(this.apiurl+'auth/resetpassword', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  Datavalidation(req) : Observable<any> {
    return this.http.post<any>(this.apiurl+'auth/policyinfo/services/confirm', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  register(req) : Observable<any> {
    return this.http.post<any>(this.apiurl+'auth/register', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  verify(req) : Observable<any> {
    return this.http.post<any>(this.apiurl+'auth/verify', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
   public async logout() {
    
    await sessionStorage.removeItem('token');
    
     
    
    await sessionStorage.clear();
    

    // this.authService.signOut();
     this.router.navigate(['/login']);
    return true;

  }
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
