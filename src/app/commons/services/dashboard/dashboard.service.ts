import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Dashboard } from '../../../core/model/dashboard'
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
export class DashboardService {
apiurl = "https://ardemos.in:3010/";
//apiurl = "https://ardemos.in:3007/";
userdata;
notification_length;
productInfoList :any=[];
  constructor(private http: HttpClient) { }

   changerecivenotification(req) : Observable<Dashboard> {
    return this.http.post<Dashboard>(this.apiurl+'cmspages/changenotification', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  changecredentials(req) : Observable<Dashboard> {
    return this.http.post<Dashboard>(this.apiurl+'auth/changecredentials', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  payaccountadd(req) : Observable<Dashboard> {
    return this.http.post<Dashboard>(this.apiurl+'api/pay/services/account/add', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  payaccountremove(req) : Observable<Dashboard> {
    return this.http.post<Dashboard>(this.apiurl+'api/services/account/remove', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  
  payservicespolicy(req) : Observable<Dashboard> {
    return this.http.post<Dashboard>(this.apiurl+'api/pay/services/policy', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  payaccountdefaultpay(req) : Observable<Dashboard> {
    return this.http.post<Dashboard>(this.apiurl+'api/services/defaultpay', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
   reciveNotifications(req) : Observable<Dashboard> {
    return this.http.post<Dashboard>(this.apiurl+'cmspages/reciveNotifications', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  policyListstable(req) : Observable<Dashboard> {
    return this.http.post<Dashboard>(this.apiurl+'api/policyinfo/services/list', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  setsrecivenotificationnew(req) : Observable<Dashboard> {

    return this.http.post<Dashboard>(this.apiurl+'auth/changenotification', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  getUpdated(req) : Observable<Dashboard> {

    return this.http.post<Dashboard>(this.apiurl+'auth/getUpdated', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  
  oneincPayments(req) : Observable<Dashboard> {

    return this.http.post<Dashboard>(this.apiurl+'oneinc/policy/payments', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  notificationBox(req) : Observable<Dashboard> {

    return this.http.post<Dashboard>(this.apiurl+'cmspages/notificationbox', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  
  beyondtecPayments(req) : Observable<Dashboard> {

    return this.http.post<Dashboard>(this.apiurl+'api/services/account/list', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  servertime(req) : Observable<Dashboard> {

    return this.http.post<Dashboard>(this.apiurl+'api/login/services/server/time', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  
  paymentremove(req) : Observable<Dashboard> {

    return this.http.post<Dashboard>(this.apiurl+'api/services/account/remove', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  defaultpay(req) : Observable<Dashboard> {

    return this.http.post<Dashboard>(this.apiurl+'api/services/defaultpay', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  
  changepassword(req) : Observable<Dashboard> {

    return this.http.post<Dashboard>(this.apiurl+'auth/ChangePassword', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  
  oneincPolicyList(req) : Observable<Dashboard> {

    return this.http.post<Dashboard>(this.apiurl+'oneinc/policy', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  oneincPolicySnapshot(req) : Observable<Dashboard> {

    return this.http.post<Dashboard>(this.apiurl+'oneinc/policy/snapshot', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }


  documentListstable(req) : Observable<Dashboard> {
    return this.http.post<Dashboard>(this.apiurl+'api/policyinfo/services/documents', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
   policyDetailStable(req) : Observable<Dashboard> {
    return this.http.post<Dashboard>(this.apiurl+'api/policy/details', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }




 verifyToken() : Observable<Dashboard> {
 var req = {"ok":11}
    return this.http.post<Dashboard>(this.apiurl+'api/verify',JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  policylistStable(req) : Observable<Dashboard> {
    return this.http.post<Dashboard>(this.apiurl+'/api/policyinfo/services/list', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  
  userAccountSetting(req) : Observable<Dashboard> {
    return this.http.post<Dashboard>(this.apiurl+'cmspages/userAccountSetting', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  
  ChangeuserAccountSetting(req) : Observable<Dashboard> {
    return this.http.post<Dashboard>(this.apiurl+'cmspages/ChangeuserAccountSetting', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
 paymentsettings(req) : Observable<Dashboard> {
    return this.http.post<Dashboard>(this.apiurl+'cmspages/paymentsettings', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

   paymentsettingsdelete(req) : Observable<Dashboard> {
   console.log('remoce',req);
    return this.http.post<Dashboard>(this.apiurl+'cmspages/paymentsettingsdelete', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  
   userNotifications(req) : Observable<Dashboard> {
    return this.http.post<Dashboard>(this.apiurl+'cmspages/userNotifications', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
 Notifications(req) : Observable<Dashboard> {
    return this.http.post<Dashboard>(this.apiurl+'cmspages/notifications', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  
 defaultpaymentsettings(req) : Observable<Dashboard> {
    return this.http.post<Dashboard>(this.apiurl+'cmspages/defaultpaymentsettings', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
 claims(req) : Observable<Dashboard> {
    return this.http.post<Dashboard>(this.apiurl+'cmspages/claims', JSON.stringify(req), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  policies(req) : Observable<Dashboard> {
    return this.http.post<Dashboard>(this.apiurl+'cmspages/policies', JSON.stringify(req), httpOptions)
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
