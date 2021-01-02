import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-responsive-top-header',
  templateUrl: './dashboard-responsive-top-header.component.html',
  styleUrls: ['./dashboard-responsive-top-header.component.css']
})
export class DashboardResponsiveTopHeaderComponent implements OnInit {
user;
  constructor() { }

  ngOnInit(): void {

   this.user = JSON.parse(sessionStorage.getItem('userdata'));
  //  console.log('this.user ',this.user );
  }

}
