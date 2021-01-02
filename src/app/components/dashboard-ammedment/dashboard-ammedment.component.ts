import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-ammedment',
  templateUrl: './dashboard-ammedment.component.html',
  styleUrls: ['./dashboard-ammedment.component.css']
})
export class DashboardAmmedmentComponent implements OnInit {
  loading : boolean = true;
  policy;
  ammend_vehicle;
  ammend_driver;
  isvehicle: boolean = false;
  isdriver: boolean = false;
  isdriverex: boolean = false;
  constructor() { }

  ngOnInit(): void {
    this.policy = JSON.parse(localStorage.getItem('policy'));
    if(localStorage.getItem('ammend_driver')){
      this.ammend_driver = JSON.parse(localStorage.getItem('ammend_driver'));
  
    if(this.ammend_driver.hasOwnProperty('licenseNum')){
    this.isdriver = true;
    }else{
      this.isdriver = false;
    }
    }else{
      this.isdriver = false;
    }
    if(localStorage.getItem('ammend_vehicle')){
    this.ammend_vehicle = JSON.parse(localStorage.getItem('ammend_vehicle'));
  
    if(this.ammend_vehicle.hasOwnProperty('vin')){
    this.isvehicle = true;
    }else{
      this.isvehicle = false;
    }
  }else{
    this.isvehicle = false;
  }
    console.log('this.policy',this.policy.vehicles);
    this.loading = false
  }

}
