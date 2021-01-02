
import { toArray } from 'rxjs/operators';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { qouteproService } from '../../../commons/services/qoute-pro/qoute-pro.service';
import { QuoteProFormService } from '../quote-pro-form.service';
import { JsonApiService } from '@quotepro/aq3';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { MalihuScrollbarService } from 'ngx-malihu-scrollbar';

@Component({
  selector: 'pro-sidebar',
  templateUrl: './pro-sidebar.component.html',
  styleUrls: ['./pro-sidebar.component.css']
})
export class ProSidebarComponent implements OnInit {
 
sessionData:any='';
location_data:any=[];
coverages:any=[];
path:string='';

constructor(private mScrollbarService: MalihuScrollbarService,
  private activeroute:ActivatedRoute,public router: Router,private route: ActivatedRoute, private aq3:JsonApiService,public FormService:QuoteProFormService,private fb: FormBuilder,private qouteproService:qouteproService) {
    
  	
  this.activeroute.url.subscribe((url)=>
    {

      console.log('url',url[0]['path'])
      this.path=url[0]['path'];
    })

}
ngAfterViewInit() {
  this.mScrollbarService.initScrollbar('#myElementId', { axis: 'y', theme: 'dark-thick', scrollButtons: { enable: true } });
}
  ngOnInit(): void {
    //console.log(this.location_data.length,"beforengOnInit")
    //this.initSidebar();
  this.qouteproService.sidebar_change.subscribe(result => {
    console.log("sidebar update");
  this.initSidebar();
  });
}
initSidebar()
{
  
  this.sessionData='';
  this.location_data=[];
 this.sessionData=JSON.parse( sessionStorage.getItem('dataV3'));
if(this.sessionData!='' || this.sessionData!=undefined )
{
  this.location_data=Array.of(this.sessionData['location'])
  var quote:any= this.sessionData['coverageBundle'];
  this.aq3.getJson('Coverage', 'Index')
  .subscribe(result => {
  this.qouteproService.updateSession();
     if(this.path=='quotation')
     {
      this.updateBundle(result['form']);
     }
    
  });
}
console.log(this.sessionData,"ngOnInit")
  
  }
  updateBundle(form){
  
    var bundle:any={
      "selectedBundle":form['selectedBundle'],
      "commonCoverages":form['commonCoverages'],
      "vehicleCoverages": form['vehicleCoverages'],
      "effectiveDate":moment(new Date(form['effectiveDate'])).format('MM/DD/YYYY') ,
      "policyTerm": form['policyTerm']
  }
 // console.log(bundle,"bundle")
    this.aq3.postJson('Coverage', 'SelectBundle', bundle)
      .subscribe(result => 
        {
          console.log(result,"Coverage")
          this.coverages=Array.of(result['form']);
          this.qouteproService.updateSession();
        }
        
      )
  }
  ngOnChanges()
  {
    
    // this.sessionData=JSON.parse( sessionStorage.getItem('dataV3'));
    // if(this.sessionData!='' || this.sessionData!=undefined )
    // {
    //   this.location_data=Array.of(this.sessionData['location'])
    // }
    // console.log(this.sessionData,"ngOnInit")
  }
  go_to_location()
  {

  }
  edit_driver(i)
  {
    this.router.navigate(['/quote-pro/additional-driver',{index:i}]);
  }
  add_driver()
  {
    this.router.navigate(['/beyontec/03-a']);
  }
  edit_vehicle(i)
  {
    this.router.navigate(['/quote-pro/additional-vehicle', { index: i }]);
  }
  add_vehicle()
  {
    this.router.navigate(['/beyontec/02-a']);
  }
}

















