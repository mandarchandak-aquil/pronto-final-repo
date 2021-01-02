import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard02-policy-details-paymentplans',
  templateUrl: './dashboard02-policy-details-paymentplans.component.html',
  styleUrls: ['./dashboard02-policy-details-paymentplans.component.css']
})
export class Dashboard02PolicyDetailsPaymentplansComponent implements OnInit {
  loading : boolean =true;
  constructor() { }

  ngOnInit(): void {
    $(".cst_mCst_scroll_Desk").mCustomScrollbar({
      theme:"dark"
    });
  }

}
