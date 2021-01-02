import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-beyontec-breadcrum',
  templateUrl: './beyontec-breadcrum.component.html',
  styleUrls: ['./beyontec-breadcrum.component.css']
})
export class BeyontecBreadcrumComponent implements OnInit {
  pageTraverse;

  constructor(public router: Router,private activeroute:ActivatedRoute) { 
    this.activeroute.url.subscribe((url)=>
    {
      // console.log(url)
      this.pageTraverse=url[0]['path'];
      // console.log(this.pageTraverse)
    })

  }

  ngOnInit(): void {
    
  }



}
