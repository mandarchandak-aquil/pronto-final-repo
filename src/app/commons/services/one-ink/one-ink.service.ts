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
export class oneInkService {
  oneink_url:any='https://ardemos.in:3010/oneinc/';  
  error_msg='';
    // ONE_INK_API_MAIN= 'https://midstg.prontoinsurance.com/api-stg/api/';

    // ONE_INK_API_DOMAIN= 'https://pronto-api.talosdigital.com/api-dev/api/';
    
    // BIRD_EYE_BASE= 'https://private-anon-048a8f8196-birdeye.apiary-proxy.com/resources/v1';
    // BIRD_EYE_API_KEY= 'Uuc7bubXhf74e7vNEGtM2IYQCvQpvwVB';
    // BIRD_EYE_BUSINESS_ID= '148666764416581';
    // GOOGLE_MAPS_API_KEY= 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAkXNMHSioMW3OTW-kq-kwYdil5g6Hu-g8';
    // logLevel= 'log';
    // DEFAULT_AGENT_ID= 'PI001';
    // VERSION= 'Develop'
    API_DOMAIN:any= 'https://pronto-api.talosdigital.com/api-dev/api/';
  FLORIDA_API_DOMAIN: 'https://pronto-api.talosdigital.com/florida-api-test/api/';
  // constructor() { }
  constructor(private http: HttpClient) { 
  
  }
  gettoken()
  {
    var config = { headers: {} };
    const credentials = {
      email: 'pipetest2@talos.com',
      password: 'password123*'
    };
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    return this.http.post(this.API_DOMAIN + "login", "email=" + credentials.email + "&password=" + credentials.password, config).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  getSearch()
  {
    return this.http.post(this.oneink_url + "program/meta/search",{'effectiveDate':"2020-11-12T14:40:39Z"}).pipe(map(function (response) {
      return response;
  }));
  }
  getQoutePrototype(createQuoteModel)
  {
   
    return this.http.post(this.oneink_url + "quote",createQuoteModel).pipe(map(function (response) {
      return response;
  }));
  }
  saveGarageAddress(garage_data)
  {
  console.log(garage_data,"garage_data")
    return this.http.post(this.oneink_url + "quote/address/garage",garage_data).pipe(map(function (response) {
      return response;
  }));
  }
  saveMailingAddress(mail_address_data)
  {
  console.log(mail_address_data,"mail_address_data")
    return this.http.post(this.oneink_url + "quote/address/mailing",mail_address_data).pipe(map(function (response) {
      return response;
  }));
  }
  VinVerify(vin_data)
  {
  console.log(vin_data,"vin_data")
  var oneink_program_model=JSON.parse(localStorage.getItem('oneink_program_model'));
  var request=
  {
    "year" : "",
    "make" : " ",
    "effectiveDate" : "",
    "programVersionId" : oneink_program_model['id'],
    "vin" : vin_data
  }
    return this.http.post(this.oneink_url + "program/vehicleVerification/lookup/byVin",request).pipe(map(function (response) {
      return response;
  }));
  }
  
  getFlzmap()
  {
    return this.http.post(this.API_DOMAIN + "flpz/flpzmap", {
      params: {
          zipCode: '33137'
      }
  }).pipe(map(function (response) {
      return response;
  }));
  }
  
  addressVerification(value)
  {
    var zipcode =JSON.parse(localStorage.getItem('insuranceFor'));

   //:state/:city/:zip/:street/:county'
   var param:string=  '/'+value['state']+'/'+value['city']+'/'+zipcode['zipcode']+'/'+value['street']+'/'+zipcode['county']+'';
  //console.log(param)
    return this.http.get(this.oneink_url+'addressVerification'+param)
    .pipe(
      retry(1),
      catchError(this.handleError)
    ) 
  }
getusState()
{
  return this.http.get(this.oneink_url+'meta/enum/usState')
  .pipe(
    retry(1),
    catchError(this.handleError)
  ) 
}

CreateFullQoute(qoute_model)
{
 
  return this.http.post(this.oneink_url + "quote/full",{
    'quoteModel':qoute_model
  }).pipe(
    retry(1),
    catchError(this.handleError)
  );
}
verifyVehicles(quoteId)
{
 
  return this.http.post(this.oneink_url + "quote/vehicle/verify",{'quoteId':quoteId}).pipe(
    retry(1),
    catchError(this.handleError)
  );
}
payPlanOption()
{
 
  return this.http.post(this.oneink_url + "quote/payPlanOption",{'quoteId':localStorage.getItem('oneink_qouteId')}).pipe(map(function (response) {
    return response;
}));
}
qouteSnapsot()
{
 
  return this.http.post(this.oneink_url + "quote/snapshot",{'quoteId':localStorage.getItem('oneink_qouteId')}).pipe(map(function (response) {
    return response;
}));
}
saveCommanQoute(qoutemodel)
{
 console.log(qoutemodel,"qoutemodel")
  return this.http.post(this.oneink_url + "quote/first",qoutemodel).pipe(
    retry(1),
    catchError(this.handleError)
  )
}
underwritting_question()
{
  var oneink_program_model=JSON.parse(localStorage.getItem('oneink_program_model'));
  return this.http.post(this.oneink_url + "program/meta/question",{'programVersionId':oneink_program_model['id']}).pipe(map(function (response) {
    return response;
}));
}
underwritting_answer(ans_model)
{


  return this.http.post(this.oneink_url + "quote/question/answer",ans_model).pipe(map(function (response) {
    return response;
}));
}
orderThirdPartyValidation()
{


  return this.http.post(this.oneink_url + "quote/validation/thirdParty/order",{'quoteId':localStorage.getItem('oneink_qouteId')}).pipe(map(function (response) {
    return response;
}));
}
validateQuote()
{


  return this.http.get(this.oneink_url + "quote/validation/"+Number(localStorage.getItem('oneink_qouteId'))).pipe(map(function (response) {
    return response;
}));
}
RejectDriver(model)
{
  return this.http.post(this.oneink_url + "quote/driver/undisclosedDriver/toRejectedDriver",model).pipe(map(function (response) {
    return response;
}));
}

CreateUndisclosedDriver(driver_data)
{
 
  var model:any=
  {
    'quoteId':localStorage.getItem('oneink_qouteId'),
    'driver':driver_data,
  };
  return this.http.post(this.oneink_url + "quote/driver",model).pipe(map(function (response) {
    return response;
}));
}

CreateExcludeDriver(driver_data)
{
  return this.http.post(this.oneink_url + "quote/driver/excludedDriver",driver_data).pipe(map(function (response) {
    return response;
}));
}
EditExcludeDriver(driver_data)
{
  return this.http.post(this.oneink_url + "quote/driver/excludedDriver/first",driver_data).pipe(map(function (response) {
    return response;
}));
}

LinkExcludeDriver(link_model)
{
  return this.http.post(this.oneink_url + "quote/driver/undisclosedDriver",link_model).pipe(map(function (response) {
    return response;
}));
}
LinkIncludeDriver(link_model)
{
  return this.http.post(this.oneink_url + "quote/driver/undisclosedDriver/include",link_model).pipe(map(function (response) {
    return response;
}));
}
DeleteExcludeDriver(delete_model)
{
  return this.http.post(this.oneink_url + "quote/driver/excludedDriver/delete",delete_model).pipe(map(function (response) {
    return response;
}));
}

GetPaymentAmount()
{
  var payment_model=
  {
    'quoteId' :localStorage.getItem('oneink_qouteId')
  }
  return this.http.post(this.oneink_url + "quote/payments",payment_model).pipe(map(function (response) {
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
// alert(errorMessage)
console.log(errorMessage)
    return throwError(errorMessage);
 }
}
