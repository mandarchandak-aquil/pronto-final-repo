import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { qouteproService } from '../../../commons/services/qoute-pro/qoute-pro.service';
import { QuoteProFormService } from '../quote-pro-form.service';
import { JsonApiService } from '@quotepro/aq3';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-quote-purchase',
  templateUrl: './quote-purchase.component.html',
  styleUrls: ['./quote-purchase.component.css']
})
export class QuotePurchaseComponent implements OnInit {
form_data:any;
form_fields:any='';
form_view_data:any;
purchase_data:any;
purchase_form:any;
  constructor(private activeroute:ActivatedRoute,public router: Router,private route: ActivatedRoute, private aq3:JsonApiService,public FormService:QuoteProFormService,private fb: FormBuilder,private qouteproService:qouteproService) {
    


  }


  ngOnInit(): void {
    this.purchase_form=  this.fb.group({
      "aba":[''],
      "account":[''],
      "accountHolder": [''],
      "accountHolderZip": [''],
      "accuracyAgreement": [''],
      "billingAddress": ['55 VARELA CT'],
      "billingCity": ['CHICAGO'],
      "cardExp": ['04/2022'],
      "cardHolder": [''],
      "cardHolderZip":[''],
      "cardNumber": ['4111111111111111'],
      "cvc": ['123'],
      "electronicSignatureAgreement": [''],
      "ghettoSign": [''],
      "iouFirstName":[''],
      "iouLastName": [''],
      "iouPurchaseOrder": [''],
      "kioskConfirmationCode": [''],
      "kioskPaymentCode": [''],
      "paymentAmount": [''],
      "paymentType": [''],
      "privacyTermsAgreement": [false],
      "cardYear":[''],
      "cardMonth":['']
      
      });
    
     // this.retrieveDocuments();
  this.aq3.getJson("Purchase", "Results")

    .subscribe(result => {
      console.log(JSON.stringify(result),"Purchase")
     if(result['errors'])
     {
       alert(result['errors'][0]);
     
 this.router.navigate(['quote-pro/thanks']);
       
     }
      this.form_data=result['form']
      console.log(result,"result");
      this.purchase_data=Array.of(this.carrier());
      this.qouteproService.updateSession();
      this.selectPaymentType();
     
      
      //this.submit();
    })


  }
  
selectPaymentType() {
  this.aq3.getJson("Purchase", "PaymentDetail", {fullpay: true})
    .subscribe(result => {
    console.log(result,"selectPaymentType");
    this.form_data=result['form'];
    this.form_view_data=result['viewdata'];
    this.form_fields=result['fields'];
   
    this.purchase_form.patchValue(result['form']);
      this.qouteproService.updateSession();
    })
};
  
submit(){
var a:any={
  aba: null,
account: null,
accountHolder: "pavan jadhav",
accountHolderZip: null,
accuracyAgreement: false,
billingAddress: "55 VARELA CT",
billingCity: null,
cardExp: '04/2022',
cardHolder: "nilisha mane",
cardHolderZip: "TX",
cardNumber: "4111 1111 1111 1111",
cvc: '123',
electronicSignatureAgreement: false,
ghettoSign: false,
iouFirstName: null,
iouLastName: null,
iouPurchaseOrder: null,
kioskConfirmationCode: null,
kioskPaymentCode: null,
paymentAmount: 730,
paymentType: 0,
privacyTermsAgreement: false,
}
var date=new Date()
date.setMonth((this.purchase_form.get('cardMonth').value-1))
date.setFullYear(this.purchase_form.get('cardYear').value)
this.purchase_form.get('cardExp').setValue(date);
console.log(this.purchase_form.value,"purchase_form")
  this.aq3.postJson("Purchase", "PaymentDetail", this.purchase_form.value)
    .subscribe(response => {
      if(response['errors'])
      {
alert(response['errors'][0])
this.router.navigate(['quote-pro/thanks']);
      }
console.log(response,"response")

      this.qouteproService.updateSession();
      this.retrieveDocuments();
    })


}

retrieveDocuments() {
  this.aq3.getJson("Document", "Retrieve")
    .subscribe(response => {
      console.log(response,"retrieveDocuments")
      //this.qouteproService.updateSession();
  })
}

carrier() {
  return (
    this.form_data.carriers.find(c => c.selected && c.basePremium > 0)
  )
};

}
