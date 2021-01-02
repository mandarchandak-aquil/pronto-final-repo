import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { ProductService } from '../../commons/services/product/product.service';
import { HomepageService } from '../../commons/services/homepage/homepage.service';
import { SubjectCallService } from '../../commons/services/subject-call/subject-call.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-counter-section',
  templateUrl: './counter-section.component.html',
  styleUrls: ['./counter-section.component.css'],
})
export class CounterSectionComponent implements OnInit {
  
  @Input()
  page_url: any;
  id: any;
  @Output() languageChange = new EventEmitter();
  isProduct: any;
start :number;
  messages: any;
  subscription: Subscription;
 comman:any;
  masterArray0 : any[];
  masterArray1: string[];
  masterArray2 : string[];
masterArray3: number[];
count1:any = 0;
count2:any = 0;
count3:any = 0;
count4:any = 0;
scrollHit = true;
one_time_scroll_done : boolean =false;
  // @Input()
  // countTitle: any;
  // @Input()
  // countOrder: any;

  constructor(public api_product : ProductService, public api_home : HomepageService, public api_sub : SubjectCallService) { 

    this.subscription = this.api_sub.getMessage().subscribe(message => {
     
      if (message) {
        
        if(message.isUpdate == 1){
          this.getCounters();
        }

        this.messages= message;
      } else {
        this.messages = '';
      }
    });
  }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    }

  ngOnInit(): void {
  this.start  = 0;
   //this.masterArray0 = [267389,81666,63913,19229];

  //  console.log(this.page_url, 'countList')
   this.getCounters();
  }

  getScroll1(event){
   
    if(this.masterArray0){
      this.count1 = parseInt(this.masterArray0[0]) - 1000 ;
      this.count2 = parseInt(this.masterArray0[1]) - 1000;
      this.count3 = parseInt(this.masterArray0[2]) - 1000;
      this.count4 = parseInt(this.masterArray0[3]) - 1000;
      }
     
 
  var h4 = document.getElementById('home_slide_5') as HTMLElement;
  
    if(h4.getBoundingClientRect().top < 150 ){

      

      if(!this.one_time_scroll_done)
    {
      this.one_time_scroll_done=true;
     this.id = setInterval(() => { 
        
     this.countincrement();  
     this.stopinterval();
     },1);
  
    }
  }
  }
  
  stopinterval(){
  
  if(this.masterArray0 && this.count4== parseInt(this.masterArray0[3]) ){
      
    clearInterval(this.id);
    
    }
  }
  countincrement(){
  
   
    if(this.masterArray0){
      // console.log(this.count1,"this.one_time_scroll_done",this.masterArray0[0])
        if(this.count1 != parseInt(this.masterArray0[0])){
     this.count1++;
       }   
    
      if(this.count2 != parseInt(this.masterArray0[1])){
       this.count2++;
        }
  
          if(this.count3 != parseInt(this.masterArray0[2])){
          this.count3++;
          }
    if(this.count4 != parseInt(this.masterArray0[3])){
     this.count4++;
    }
  
    }
  
    
  
  
  }
  getCounters(){
    
    // console.log(isProduct, "isProduct");


      let dataReq = {
        "language_id": sessionStorage.getItem('lg')
      }
        this.api_product.CommanSection(dataReq).subscribe((data: {}) => {
            this.comman = data['comman'];
          this.masterArray0 = JSON.parse(this.comman.counter_title);
       
           // for(var i =0;i< this.masterArray0.length;i++){
           //this.masterArray3.push(Number(this.masterArray0[i]));
            //}
          this.masterArray1= JSON.parse(this.comman.counter_subtitle);
          //this.masterArray2 = JSON.parse(this.comman.counter_subtitle);
          //(<any>$(".counter")).countUp();
          //console.log(this.masterArray3,'this.masterArray3');
          //console.log(this.masterArray1,'this.masterArray1');
         
        });
   

  }
}
