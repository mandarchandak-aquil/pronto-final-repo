import { Component, AfterViewInit } from '@angular/core';
import * as AOS from 'aos';
import * as $ from 'jquery';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { transition, trigger, query, style, animate, group, animateChild } from '@angular/animations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('myAnimation', [
        transition('* => *',
            [
                query(':enter', [style({ opacity: 0 })], { optional: true }),
                query(':leave', [style({ opacity: 1 }), animate('0.3s', style({ opacity: 0 }))], { optional: true }),
                query(':enter', [style({ opacity: 0 }), animate('0.3s', style({ opacity: 1 }))], { optional: true })
            ])
    ]),
]
})
export class AppComponent {
  title = 'pronto-insurance';
  loading=true;
  routerSubscription: any;
  
  constructor(public router: Router) {
  }

  ngOnInit(){

    // scroll animate
    AOS.init(
      {
         duration: 1200,
      delay: 200,
      once: true
      
        }
  );

    // custom scrollbar
    jQuery(function($) {
      if ($(window).width() > 991) {
        $(".cst_mCst_scroll_Desk").mCustomScrollbar({
        theme:"dark"
      });
      }
    });

    // custom css 
    var css_link = $("<link>", {
        rel: "stylesheet",
        type: "text/css",
        href: "assets/css/stylesheet.css"
    });
    css_link.appendTo('head');

    if(sessionStorage.getItem('lg') == undefined || sessionStorage.getItem('lg') == null){
        sessionStorage.setItem('lg','2')
        sessionStorage.setItem('lgsrt','EN')
    }
    //counter animation
       
    this.recallJsFuntions();
    css_link.appendTo('head');
    if(sessionStorage.getItem('lg') == undefined || sessionStorage.getItem('lg') == null){
        sessionStorage.setItem('lg','2')
        sessionStorage.setItem('lgsrt','EN')
    }
  }


  ngAfterViewInit()
  {

    this.loading=false;

    // console.log(document.readyState, "document.readyState")
    document.onreadystatechange = function() { 
      if (document.readyState !== "complete") { 
          document.querySelector("body").style.visibility = "hidden"; 
          document.querySelector<HTMLElement>(".site_preloader").style.visibility = "visible"; 
          // localStorage.setItem("isLoadNitify","false");
      } else { 
          document.querySelector<HTMLElement>(".site_preloader").style.display = "none"; 
          document.querySelector("body").style.visibility = "visible"; 
          // localStorage.setItem("isLoadNitify","true");
      } 
  };


    // $(window).on("load",function(){
    //   $(".site_preloader").fadeOut("slow");
    // });
  }

  recallJsFuntions() {
    this.routerSubscription = this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe(event => {
          // console.log(event,"event1234")
            $.getScript('./assets/js/aos.js');
         
              });
  }
 
}
