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
export class oneInkDropdownService {
  oneink_url:any='https://ardemos.in:3010/oneinc/';
  constructor(private http: HttpClient) { 
    
  }
  

getGender()
{

  return this.http.get(this.oneink_url+'meta/enum/gender')
  .pipe(
    retry(1),
    catchError(this.handleError)
  ) 
}
getMaritalStatus()
{
 var a:any=
 {
  "quoteId" : localStorage.getItem('oneink_qouteId')
 }
  return this.http.post(this.oneink_url+'quote/meta/dynamicEnum/maritalStatus',a)
  .pipe(
    retry(1),
    catchError(this.handleError)
  ) 
}

getdriverNameSuffix()
{
  return this.http.get(this.oneink_url+'meta/enum/driverNameSuffix')
  .pipe(
    retry(1),
    catchError(this.handleError)
  ) 
}
getrelationToApplicant()
{
  return this.http.get(this.oneink_url+'meta/enum/relationToApplicant')
  .pipe(
    retry(1),
    catchError(this.handleError)
  ) 
}
getdriverLicenseType()
{
  return this.http.get(this.oneink_url+'meta/enum/driverLicenseType')
  .pipe(
    retry(1),
    catchError(this.handleError)
  ) 
}
getcoverageLimitOptionDefinition()
{
  var oneink_program_model=JSON.parse(localStorage.getItem('oneink_program_model'));
  var request=
  {
    "programVersionId":oneink_program_model['id']
  }
  return this.http.post(this.oneink_url+'program/meta/coverageLimitOptionDefinition',request)
  .pipe(
    retry(1),
    catchError(this.handleError)
  ) 
}
getvehicleUse()
{
  var oneink_program_model=JSON.parse(localStorage.getItem('oneink_program_model'));
  var request=
  {
    "programVersionId":oneink_program_model['id']
  }
  return this.http.post(this.oneink_url+'program/meta/dynamicEnum/vehicleUse',request)
  .pipe(
    retry(1),
    catchError(this.handleError)
  ) 
}
getnsdTravelClubType()
{
  return this.http.get(this.oneink_url+'meta/enum/nsdTravelClubType')
  .pipe(
    retry(1),
    catchError(this.handleError)
  ) 
}
getworkLossExclusionType()
{
  return this.http.get(this.oneink_url+'meta/enum/workLossExclusionType')
  .pipe(
    retry(1),
    catchError(this.handleError)
  ) 
}
getVoilationType()
{
  return this.http.post(this.oneink_url+'quote/meta/violationDefinition',{'quoteId':localStorage.getItem('oneink_qouteId')})
  .pipe(
    retry(1),
    catchError(this.handleError)
  ) 
}
getAccidentType()
{
  return this.http.post(this.oneink_url+'quote/meta/accidentDefinition',{'quoteId':localStorage.getItem('oneink_qouteId')})
  .pipe(
    retry(1),
    catchError(this.handleError)
  ) 
}
getrejectionDriverReason()
{
  return this.http.get(this.oneink_url+'meta/enum/dynamicEnum/rejectionDriverReason')
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
    
    return throwError(errorMessage);
 }
}
