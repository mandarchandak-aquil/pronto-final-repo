import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { qouteproService } from '../../../commons/services/qoute-pro/qoute-pro.service';
import { QuoteProFormService } from '../quote-pro-form.service';
import { JsonApiService } from '@quotepro/aq3';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'ProQuotation',
  templateUrl: './quote03.component.html',
  styleUrls: ['./quote03.component.css']
})
export class ProQuotationComponent implements OnInit {
carriers:any=[];
loading:boolean=true;
constructor(public router: Router,private route: ActivatedRoute, private aq3:JsonApiService,public FormService:QuoteProFormService,private fb: FormBuilder,private qouteproService:qouteproService) {

}
  ngOnInit(): void {
    console.log(this.route.snapshot.data['qoute'],"qoute router");
   
this.startQoute();
    
     
  }
  startQoute()
  {
    this.qouteproService.startQuote()
    .subscribe(result => {
      //  if (result.errors) {
      //    console.log("errors",result.errors);
         
      //  }
      //  else
      //  {
      //    console.log("only result",JSON.stringify(result));
      //  }
       
       this.qouteproService.retrieveIncrementalResults()
       .subscribe(result => {
      this.carriers=result['carriers'];
      console.log(this.carriers,"qoute result out")
    if(this.carriers.length > 0)
    {
      console.log(this.carriers,"qoute result");
      this.loading=false;
 
    }
    else
    {
      this.startQoute();
    }
 })
      
      
//       var id = setInterval(() => {
         
//         this.qouteproService.retrieveIncrementalResults()
//         .subscribe(result => {
//        this.carriers=result['carriers'];
      

//      if(this.carriers.length > 0)
//      {
//       console.log(this.carriers,"qoute result")
//       clearInterval(id);
//      }
//   })
//       }, 5000);
      
//       setTimeout(() => {
//         clearInterval(id);
//       }, 50000);
     
  })
  }
 
  buy_now(id)
  {
    this.aq3.postJson('Quote', 'Next', { id: id })
        .subscribe(result => {
          this.qouteproService.updateSession();
          console.log(result,'buy_now_result')
          if (result.nextUrl) {
              if (result.nextUrl.search(/thanks/i) !== -1) {
                console.log('thanks')
               // this.data.transfer = result;
                this.router.navigate(['quote-pro/thanks']);
              } else if (result.nextUrl.indexOf('Optional') > 0) {
                console.log('Optional')
                this.router.navigate(['quote-pro/underwritting']); // TODO: Implement optional controller
              } else {
                console.log('else')
               this.router.navigate(['quote-pro/underwritting']);
              }
            }
        });
      }
  //underwritting
}
