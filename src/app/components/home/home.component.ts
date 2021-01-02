import { DOCUMENT } from '@angular/common';

import { Component, OnInit, ViewChild, ElementRef, Renderer2, Inject, HostListener } from '@angular/core';
import { HomepageService } from '../../commons/services/homepage/homepage.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { SubjectCallService } from '../../commons/services/subject-call/subject-call.service';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { CommonService } from '../../commons/services/common/common.service';
import { SlickCarouselComponent } from "ngx-slick-carousel";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  host: {
    "(window:resize)": "onWindowResize($event)"
  }
})
export class HomeComponent implements OnInit {
  @ViewChild("slickModal") slickModal: SlickCarouselComponent;
  @ViewChild("slickModal1") slickModal1: SlickCarouselComponent;
  
  @ViewChild('videoPlayer') videoplayer: ElementRef;
  @ViewChild('panel', { read: ElementRef }) public panel: ElementRef<any>;


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    // this.updateSlidesToShow(window.innerWidth);
    // console.log("Window Resize");
    // // this.ngOnInit();
    // // window.location.reload();

    // this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
    //   this.router.navigate(['/']);
    // });

  }
  buy_online_been_here;
  innerWidth: any = null;
  loading: boolean = true;
  loading1: boolean = false;
  dataReq: any;
  width: number = window.innerWidth;
  pageArr: any = [];
  notification;
  notificationarray: any = [];
  protectItemImage: string[];
  protectItemHeading: string[];
  protectItemSubHeading: string[];
  img_base: string = '';
  slides: any = [];
  mob_slides1: any = [];
  mob_slides2: any = [];
  tailortext;
  slidearray: any = [];
  safeSrc: SafeResourceUrl;
  slideConfig = {
    "slidesToShow": 4,
    "slidesToScroll": 4,
    "dots": true,
    "infinite": true,
    'autoplay': false,
    'speed': 1000,
    'autoplaySpeed': 1000,
    'centerPadding': '0',
    'useTransform': true,
    'cssEase': 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',
  };
  slideConfig_Mob = {
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "dots": true,
    "infinite": false,
    'autoplay': false,
    'speed': 500,
    'autoplaySpeed': 1000,
    'centerPadding': '0',
    'useTransform': true,
    'cssEase': 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',
  };
  sliderNotify = this.notificationarray;

  sliderNotifyConfig;
  countieSelect: any;
  countiesLength: number;
  zipcode: any = '';
  countiList: any[];
  insuranceName: string = "Auto";
  selected_county;
  maritalStatus: any = [
    { id: 1, name: 'Single' },
    { id: 2, name: 'Married' },
  ];
  counties: any = '';
  zipError: boolean = false;

  constructor(public api_common: CommonService, public api_page: HomepageService, private sanitizer: DomSanitizer, public api_sub: SubjectCallService, private renderer: Renderer2, public router: Router) {
  }

  ngOnInit(): void {

this.countiesLength = 0;
    this.innerWidth = window.innerWidth;
    console.log(this.innerWidth, 'innerWidth');

    if (this.width <= 767) {

      var lastScrollTop = 0;
      $(window).scroll(function (event) {
        var st = $(this).scrollTop();

        var height = $(window).scrollTop();
        console.log(height, 'height')

        if (st > lastScrollTop) {

          if (height < 500) {
            this.document.body.classList.add('scroll-up');
            this.document.body.classList.remove('scroll-down');
            // this.document.body.classList.remove('scroll-up');
          } else {
            this.document.body.classList.add('scroll-down');
            this.document.body.classList.remove('scroll-up');
          }
          // downscroll code
          // console.log(11111)
        } else {
          this.document.body.classList.add('scroll-up');
          this.document.body.classList.remove('scroll-down');
          // upscroll code
          // console.log(222222)
        }
        lastScrollTop = st;
      });
    }


    this.getContent();
    this.geticons();
    this.getnotificationbox();
    //this.videoplayer.nativeElement.play();

  }


  // ngAfterContentInit() {
  //   // this.loading = false;
  //   // console.log(11111111)
  //   if(this.protectItemHeading && this.protectItemSubHeading && this.pageArr.prod_img_title && this.pageArr.prod_img && this.pageArr.prod_img_url && this.slides){
  //       this.loading = false;
  //   }
  // }

  getErrorZip() {
    // console.log(this.zipcode.length, 'getErrorZip this.zipcode.length')
    if (this.zipcode.length < 5 && this.zipcode.length > 0 ) {
      this.zipError = true;
      this.countiesLength = 0;
    } else {
      this.zipError = false;
    }
  }

  getZipEnter() {
    // console.log(this.zipcode.length, 'getZipEnter this.zipcode.length')
    if (this.zipcode.length > 4) {
      this.zipError = false;
    }else{
      this.countiesLength = 0;
    }
  }

  wrongZip() {
    this.zipcode = '';
    this.countiesLength = 0;
  }


  public onPreviousSearchPosition(): void {
    //this.panel.nativeElement.scrollTop -= 20;
    console.log('this.panel.nativeElement.scrollTop', this.panel.nativeElement.scrollTop);
  }


  notificationclose() {
    var count: number;

    count = this.pageArr.notification_box_delay * (this.notificationarray.length);
    // nsole.log('ok', this.pageArr.notification_box_delay, this.notificationarray.length);
    // coconsole.log('delay', count);
    setTimeout(() => {
      document.getElementById("close_notification").click();
    }, count);

  }

  getContent() {
    this.mob_slides1 = []
    this.mob_slides2 = []

    this.dataReq = {
      "language_id": sessionStorage.getItem('lg'),
    }
    // console.log(this.zipdata);

    this.api_page.getProduct(this.dataReq).subscribe((data: {}) => {
      // console.log(data);
      this.img_base = data['project_path'];

      this.pageArr = data['homepage'];
      if (this.pageArr) {
        this.tailortext = this.sanitizer.bypassSecurityTrustHtml(this.pageArr.Tailormade_text);
        this.sliderNotifyConfig = {
          'arrows': false,
          'dots': true,
          'infinite': false,
          'slidesToShow': 1,
          'slidesToScroll': 1,
          'autoplay': true,
          'speed': 10,
          'autoplaySpeed': 99999,
        };
      
        sessionStorage.setItem('page_title', data['homepage'].page_title);
        sessionStorage.setItem('meta_title', data['homepage'].meta_title);
        sessionStorage.setItem('meta_desc', data['homepage'].meta_desc);
        sessionStorage.setItem('meta_keywords', data['homepage'].meta_keywords);
        sessionStorage.setItem('canonical_rel', data['homepage'].canonical_rel);
        sessionStorage.setItem('canonical_tag', data['homepage'].canonical_tag);
        sessionStorage.setItem('meta_robots', data['homepage'].meta_robots);

        this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + this.pageArr.video + "?autoplay=1&loop=1&rel=0&showinfo=0&mute=1");



        this.protectItemImage = JSON.parse(this.pageArr.Protecting_item_image);
        this.protectItemHeading = JSON.parse(this.pageArr.Protecting_item_heading);
        this.protectItemSubHeading = JSON.parse(this.pageArr.protecting_item_subheading);
        this.pageArr.prod_img_title = JSON.parse(this.pageArr.prod_img_title);
        this.pageArr.prod_img = JSON.parse(this.pageArr.prod_img);
        this.pageArr.prod_img_url = JSON.parse(this.pageArr.prod_img_url);
         this.buy_online_been_here = JSON.parse(this.pageArr.buy_online_been_here);
        this.slides = [];
        for (var i = 0; i < this.pageArr.prod_img.length; i++) {
          this.slides.push({ 'name': this.pageArr.prod_img_title[i], 'img': this.img_base + this.pageArr.prod_img[i], 'url': this.pageArr.prod_img_url[i] });
            if(i < this.pageArr.prod_img.length/2 ){
              this.mob_slides1.push({ 'name': this.pageArr.prod_img_title[i], 'img': this.img_base + this.pageArr.prod_img[i], 'url': this.pageArr.prod_img_url[i] });

            }else{
              this.mob_slides2.push({ 'name': this.pageArr.prod_img_title[i], 'img': this.img_base + this.pageArr.prod_img[i], 'url': this.pageArr.prod_img_url[i] });

            }
     
        }
        
        console.log('this.mob_slides1',this.mob_slides1,this.mob_slides1.length,'this.mob_slides2',this.mob_slides2,this.mob_slides2.length);

        // setTimeout(() => {
        //     this.loading = false;
        // }, 1500);
        if (this.protectItemImage && this.protectItemHeading && this.protectItemSubHeading && this.pageArr.prod_img_title && this.pageArr.prod_img && this.pageArr.prod_img_url && this.slides) {
          this.loading = false;
        }


      }
    });
  }
  onWindowResize(event) {
    this.width = event.target.innerWidth;
    console.log('width', this.width);

  }



  geticons() {

    this.dataReq = {
      "language_id": sessionStorage.getItem('lg'),
    }

    this.api_page.getslider(this.dataReq).subscribe((data: {}) => {

      if (data['status'] == "success") {
        //this.slides = data['products'];
      }

    });
  }


  getnotificationbox() {
    this.dataReq = {
      "language_id": sessionStorage.getItem('lg'),
    }
    this.notificationarray = [];
    this.sliderNotify = [];
    this.api_page.getnotificationbox(this.dataReq).subscribe((data: {}) => {
      var noti = data['notification'];
      if (data['status'] == 'success') {
        //console.log('notification',data['notification'].notificaions );
        var notification = JSON.parse(noti.notificaions);
        var notificationurl = JSON.parse(noti.notifications_url);
        console.log('notification', notification[0]);
        for (var i = 0; i < notification.length; i++) {
          if (notification[i] != null) {
            this.notificationarray.push({ 'text': notification[i], 'id': i + 1, 'url': notificationurl[i] });
          }
        }
        this.sliderNotify = this.notificationarray;
        var count: number;
        // count = this.pageArr.notification_box_delay * (this.notificationarray.length - 1);
        console.log(count);

        this.sliderNotifyConfig = {
          'arrows': false,
          'dots': true,
          'infinite': false,
          'slidesToShow': 1,
          'slidesToScroll': 1,
          'autoplay': true,
          'speed': 10,
          'autoplaySpeed': this.pageArr.notification_box_delay,
        };
        this.notificationclose();
      }
    });

  }


  onlanguageChange(newValue) {
    this.getContent();
    this.geticons();
    this.getnotificationbox();
    
    //this.slickModal.initSlick();
    this.api_sub.sendMessage(1);
    //this.slickModal.unslick();

  
  }
  auto() {
    this.renderer.addClass(document.body, 'openZipcode_Modal');
  }
  removeauto() {
    this.renderer.removeClass(document.body, 'openZipcode_Modal');
  }


  submitZipCode() {
    //this.auto_zipcode
    if(this.zipcode.length >= 5){
      this.loading1 = true;
      this.validateZipCode();
    }else{
      this.zipError = true;
    }
    
  }
  validateZipCode() {
    this.api_page.getStatebyzipcode(this.zipcode).subscribe((state: {}) => {
      console.log(state, "state by zip");
      if (state[0] === 'fl') {
        this.flpzValidation();
      }
      else if (state[0] === 'tx') {
        this.api_common.getTocken().subscribe((data: {}) => {
          console.log(data, 'generateTocken');
          this.getCounty();
        });
      } else {
        document.getElementById('openModalButtonSomethingWrong').click();
      }

    });
  }

  private flpzValidation() {
    var data: any = {
      "flpzmap": [
        {
          "blockedStatus": "Y",
          "Exists": true,
          "productName": "Pro General Auto"
        },
        {
          "blockedStatus": "Y",
          "Exists": true,
          "productName": "Pro General Choice"
        },
        {
          "blockedStatus": "N",
          "Exists": true,
          "productName": "Pro General Value"
        }
      ]
    };
    const filteredFlpzMapInformation = data.flpzmap.filter((flpzMapInformation: any) => {
      console.log(flpzMapInformation, "flpzMapInformation");
      return flpzMapInformation.productName === "Pro General Value"
        && flpzMapInformation.Exists
        && flpzMapInformation.blockedStatus === "N";
    });

    console.log(filteredFlpzMapInformation, "filteredFlpzMapInformation")
    if (filteredFlpzMapInformation) {
      this.setZipCodeAndContinue();
    } else {
      alert('we are not provide for this Area');
    }

  }
  private setZipCodeAndContinue() {
    document.getElementById("modalClose").click();
    this.renderer.removeClass(document.body, 'openZipcode_Modal');
    this.router.navigate(['/one-ink/user-info']);
  }

  getCounty() {
    if (this.zipcode) {

      this.countieSelect = '';
      this.api_common.getTocken().subscribe((data: {}) => {

        this.dataReq = {
          "zip": this.zipcode,
          "token": data['token']
        }

        console.log(this.dataReq, 'dataReq');
        this.api_page.getCountyLookup(this.dataReq).subscribe((data: {}) => {
          console.log(data, "getCountyLookup")
          this.loading1 = false;
          if (data['exists']) {
            this.counties = data;
         
            this.countiesLength = data['counties'].length;

            // localStorage.setItem('counties', JSON.stringify(data));
            // console.log(this.counties, 'counties');

            console.log(data['counties'].length, "counties length");

            if (data['counties'].length == 1) {

              this.selected_county = data['counties'][0];
              this.getPzcmap();
            }

          } else {
            // alert(data['messageId']);

            alert('We Do Not Offer Insurance in Your Area');
            this.zipcode = '';
          }
        });
        // console.log(data, 'generateTocken');
        // this.getCounty(data['token']);
      });
    }

  }

  getPzcmap() {

    let dataReq1 = {
      "zipcode": this.zipcode,
      "county": this.selected_county
    }

    var objCounties = {};
    for (var i = 0; i < this.counties['counties'].length; ++i) {
      objCounties[i] = this.counties['counties'][i];
    }

    // this.countiList = [];
    // Object.keys(objCounties['stateLicensed'][0]).forEach(key => {
    //   this.stateList.push({ key: key, value: dataDrop['stateLicensed'][0][key] });
    // });

    let inputData = {
      zipcode: this.zipcode,
      insurancetype: this.insuranceName,
      county: this.selected_county,
      countyList: objCounties
    }
    // console.log(inputData, 'inputData');
    localStorage.setItem('insuranceFor', JSON.stringify(inputData));
    localStorage.setItem('isMinQuote', "0");

    console.log(dataReq1, 'getPzcmap dataReq1');

    if (this.insuranceName == "Auto") {

      this.api_page.getPzcmap(dataReq1).subscribe((dataPZC: {}) => {
        console.log(dataPZC, 'getPzcmap');
        let isexists = dataPZC[0]['Exists'];
        this.loading1 = true;
        // console.log(isexists, 'getPzcmap exists');
        //console.log(productName, 'getPzcmap productName');
        if (isexists) {

          let productName = dataPZC[0]['productName'];

          // console.log(dataPZC[0], 'getPzcmap productName');


          let inputData = {
            zipcode: this.zipcode,
            insurancetype: this.insuranceName,
            county: this.counties['counties'][0],
            countyList: objCounties,
            productName: productName
          }
          // console.log(inputData, 'inputData');
          localStorage.setItem('insuranceFor', JSON.stringify(inputData));

          if (productName == 'PTXNSA') {

            let localDriver = JSON.parse(localStorage.getItem("insuranceFor"));

            if (localDriver['insurancetype'] == this.zipcode && localDriver['insurancetype'] == this.insuranceName) {
              
              document.getElementById("modalClose").click();
              this.renderer.removeClass(document.body, 'openZipcode_Modal');
              this.router.navigate(['/beyontec/01']);
            } else {
              localStorage.removeItem('beyontec_minutesQuote');
              localStorage.removeItem('beyontech_vehicles');
              localStorage.removeItem('beyontec_intelligentsearch');
              localStorage.removeItem('beyontech_drivers');
              localStorage.removeItem('hrddata');
              localStorage.removeItem('beyontec_coverage');
              localStorage.removeItem('agreement');
              localStorage.removeItem('beyontec_questionnaire');
              localStorage.removeItem('discounts');
              localStorage.removeItem('beyontech_payStatement');
              localStorage.removeItem('beyontec_fullQuote');

              document.getElementById("modalClose").click();
              this.renderer.removeClass(document.body, 'openZipcode_Modal');

              this.router.navigate(['/beyontec/01']);
            }

          } else if (productName == 'QuotePro') {
            document.getElementById("modalClose").click();
            this.renderer.removeClass(document.body, 'openZipcode_Modal');
            this.router.navigate(['/quote-pro/01']);
          } else {
            alert('We Do Not Offer Insurance in Your Area')
          }

          // this.counties = data;
          // localStorage.setItem('counties', JSON.stringify(data));
          // console.log(this.counties, 'counties');
          // this.getPzcmap(token, zipcode, this.counties['counties']);
        } else {
          localStorage.removeItem('beyontec_minutesQuote');
          localStorage.removeItem('beyontech_vehicles');
          localStorage.removeItem('beyontec_intelligentsearch');
          localStorage.removeItem('beyontech_drivers');
          localStorage.removeItem('hrddata');
          localStorage.removeItem('beyontec_coverage');
          localStorage.removeItem('agreement');
          localStorage.removeItem('beyontec_questionnaire');
          localStorage.removeItem('discounts');
          localStorage.removeItem('beyontech_payStatement');
          localStorage.removeItem('beyontec_fullQuote');
          // localStorage.removeItem('discounts');
          // localStorage.removeItem('discounts');

        }
      });


    } else {
      localStorage.removeItem('beyontec_minutesQuote');
      localStorage.removeItem('beyontech_vehicles');
      localStorage.removeItem('beyontec_intelligentsearch');
      localStorage.removeItem('beyontech_drivers');
      localStorage.removeItem('hrddata');
      localStorage.removeItem('beyontec_coverage');
      localStorage.removeItem('agreement');
      localStorage.removeItem('beyontec_questionnaire');
      localStorage.removeItem('discounts');
      localStorage.removeItem('beyontech_payStatement');
      localStorage.removeItem('beyontec_fullQuote');

    }


  }


  select_count(event) {
    console.log(event)
  }

  submitCounty() {
    this.loading1 = true;
    this.getPzcmap();
  }
}
