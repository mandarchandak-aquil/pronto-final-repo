import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'oneink-stepper',
  templateUrl: './oneink-stepper.component.html',
  styleUrls: ['./oneink-stepper.component.scss']
})
export class OneinkStepperComponent implements OnInit {
  path:any;
  constructor(public router: Router,private activeroute:ActivatedRoute) { 
    this.activeroute.url.subscribe((url)=>
    {

 this.path=url[0]['path'];
 
    })
  }

  ngOnInit(): void {
  }
  gotopage(link)
  {
    console.log(link);
    console.log(this.path);
    this.router.navigate([link]);
  }
}
