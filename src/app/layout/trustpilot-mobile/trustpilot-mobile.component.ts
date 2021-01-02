import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'pronto-trustpilot-mobile',
  templateUrl: './trustpilot-mobile.component.html'
})
export class TrustpilotMobileComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    const trustpilotRef = document.getElementById('trustpilot');
    if(trustpilotRef){
      window['Trustpilot'].loadFromElement(trustpilotRef);
    }
    
  }
}
