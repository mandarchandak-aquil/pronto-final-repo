import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { oneInkDriverFormService } from '../oneink-driver-form.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { oneInkService } from '../../../commons/services/one-ink/one-ink.service';
import { oneInkPaymentService } from '../../../commons/services/one-ink/one-ink-payment.service';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import * as $ from 'jquery';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  @ViewChild('payment_dialog') payment_dialog: ElementRef<HTMLElement>;
  qouteId;
  paymentFormGroup:FormGroup;
  CreditcardFormGroup:FormGroup;
  enableCreditCard: boolean;
  enableBankAccount: boolean;
  unsubscribe: Subject<void>;
  sanitizedUrl: SafeResourceUrl;
  constructor(
    public oneInkDriverForm:oneInkDriverFormService,
    private readonly fb: FormBuilder,
    public oneInkService:oneInkService,
    private payment:oneInkPaymentService,
    private readonly sanitizer: DomSanitizer,
  ) {
    $.getScript('https://testportalone.processonepayments.com/Api/Api/Cdn/GenericModalV2/assets/js/PortalOne.js');
    this.unsubscribe = new Subject();
    this.getpayment()
   }

  ngOnInit(): void {
    this.qouteId=localStorage.getItem('oneink_qouteId');
    this.setUpForm();
    this.setupPayment();
  }
  getpayment()
  {
    this.oneInkService.GetPaymentAmount().pipe(takeUntil(this.unsubscribe)).subscribe(result => 
      {
      console.log(result,"GetPaymentAmount");
      this.paymentFormGroup.controls.amount.setValue(result[0].amount);
     
  });
  }
  private setUpForm() {
    this.paymentFormGroup = this.fb.group({
      amount: [{value: null, disabled: true}],
      method: ['', Validators.required]
    });
    this.CreditcardFormGroup = this.fb.group({
      amount: [{value: null, disabled: true}],
      method: ['', Validators.required]
    });
    this.paymentFormGroup.controls.method.valueChanges.pipe(takeUntil(this.unsubscribe)).subscribe(selectedMethod => {
      this.paymentMethodChanged(selectedMethod);
    });
  }
  private paymentMethodChanged(selectedMethod) {
    if (selectedMethod === 'creditCard') {
      this.enableBankAccount = false;
      this.enableCreditCard = true;
    } else {
      this.enableBankAccount = true;
      this.enableCreditCard = false;
    }
  }
  submit()
  {
    console.log(this.paymentFormGroup,"this.paymentFormGroup.value")
    this.triggerPaymentDialog();
  
  }
  setupPayment()
  {
    this.payment.createSession().pipe(takeUntil(this.unsubscribe)).subscribe(result => 
      {
        var model= {"paymentCategory":"CreditCard","confirmationDisplay":"false","sessionId":result['PortalOneSessionKey'],"operation":"saveCreditCardPayment"}
        console.log(model,"createSession");
        
  this.payment.savePaymentMethod(model).pipe(takeUntil(this.unsubscribe)).subscribe(result => 
    {
      console.log(result,"savePaymentMethod");
    
   
});
        this.createPaymentMethod(model,false);
     
     
  });
  }
  triggerPaymentDialog() {
    let el: HTMLElement = this.payment_dialog.nativeElement;
    el.click();
}

private createPaymentMethod(params, isMobile: boolean) {
 
  let src = 'https://testportalone.processonepayments.com/GenericModal/';
  if (isMobile) {
    src += 'Mobile/Index';
  }
  const paramsToAssign = Object.keys(params).map(key => {
    return key + '=' + encodeURIComponent(params[key]);
  }).join('&');
  src += '?uniq=' + new Date().getTime() + '&sessionId=' + params['sessionId'] + '#!?' + paramsToAssign;
  this.sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(src);
  console.log(src,"ssssssssssssss",this.sanitizedUrl)

}



}
