import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard02-policy-details-payment-history',
  templateUrl: './dashboard02-policy-details-payment-history.component.html',
  styleUrls: ['./dashboard02-policy-details-payment-history.component.css']
})
export class Dashboard02PolicyDetailsPaymentHistoryComponent implements OnInit {
  loading : boolean =true;
  policy;
  constructor() { }

  ngOnInit(): void {
    $(".cst_mCst_scroll_Desk").mCustomScrollbar({
      theme:"dark"
    });
    
    if(localStorage.getItem('policyDetailList')!= undefined || localStorage.getItem('policyDetailList')!= null)
    { 
      this.policy = JSON.parse(localStorage.getItem('policyDetailList'));
      this.loading = false;
    }
    
  }

}
