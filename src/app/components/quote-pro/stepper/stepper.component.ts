import { Component, OnInit } from '@angular/core';
import {  Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'pro-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class StepperComponent implements OnInit {
path:string='';
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
    this.router.navigate([link]);
  }
}
