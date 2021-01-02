import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'pronto-trustpilot',
  templateUrl: './trustpilot.component.html'
})
export class TrustpilotComponent implements OnInit {
ua;
  constructor() {}

  ngOnInit() {
    

    const trustpilotRef = document.getElementById('trustpilot');
    if(trustpilotRef){
      window['Trustpilot'].loadFromElement(trustpilotRef);
    }
    
  }
}
