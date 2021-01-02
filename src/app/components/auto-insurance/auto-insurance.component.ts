import { Component, OnInit, ViewChild, ElementRef, Renderer2, Inject, HostListener } from '@angular/core';
import { ProductService } from '../../commons/services/product/product.service';
import { SubjectCallService } from '../../commons/services/subject-call/subject-call.service';
// import * as AOS from 'aos';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { ViewportScroller } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';
import * as $ from 'jquery';
import { CommonService } from '../../commons/services/common/common.service';
import { Router } from '@angular/router';
import { HomepageService } from '../../commons/services/homepage/homepage.service';
@Component({
  selector: 'app-auto-insurance',
  templateUrl: './auto-insurance.component.html',
  styleUrls: ['./auto-insurance.component.css'],
  animations: [
    trigger('smoothCollapse', [
      state('initial', style({
        height:'0',
        overflow:'hidden',
        opacity:'0'
      })),
      state('final', style({
        overflow:'hidden',
        opacity:'1'
      })),
      transition('initial=>final', animate('2.5s')),
      transition('final=>initial', animate('2.5s'))
    ]),
  ]
})

export class AutoInsuranceComponent implements OnInit {
  @ViewChild('headerspc') headerspc;
  @ViewChild('panel', { read: ElementRef }) public panel: ElementRef<any>;
    ads=[];
       loading :boolean = true; 
    ads_path;
  dataReq : any;
  productArr;
  image_path;
  project_path;
  subheading : any;
  section3: any;
  section4: any;
  comprehensive;
  policy_titles;
  essentils_subtitle1;
  alternative;
  discounts_available;
  faq_question;
  faq_answer;
  essentils_title1;
  includes;
  ad_banner2;
  langid;
seciont2_description;
essential_aaditional_coverages_subpoints;
comprehensive_subtitle2;
essential_package_subtitle1;
comprehensive_includes1;
comprehensive_additional_subtitle;
alternative_package_answers;
alternative_package_answer1;
essential_addnl_coverages_subtitle4;
essential_addnl_coverages_subtitle3;
essential_addnl_coverages_subtitle2;
essential_addnl_coverages_subtitle1;
comprehensive_additional_available_coverages_subtitles1;
comprehensive_additional_available_coverages_subtitles12;
comprehensive_additional_available_coverages_subtitles13;
comprehensive_additional_available_coverages_subtitles14;
comprehensive_additional_available_coverages_subtitles15;
comprehensive_additional_available_coverages_subtitles17;
countieSelect: any;
countiesLength: number;
zipcode: any = '';
countiList: any[];
insuranceName: string = "Auto";
selected_county;
counties: any = '';
zipError: boolean = false;
loading1;
mobileapp;
  constructor(public api_common: CommonService, public api_page: HomepageService, public router: Router,public api_product : ProductService, private sanitizer: DomSanitizer, public api_sub : SubjectCallService, private vps: ViewportScroller) {}

  scroll(id) {
    this.vps.scrollToAnchor(id);
  }



 
  ngOnInit(): void {
    this.mobileapp = this.api_sub.mob;
    // if(this.mobileapp == 0){
    //   $('#headerspc').addClass('spcTpHeader');
    // }else{
    //   $('#headerspc').removeClass('spcTpHeader');
    // }
  


    this.AutoInsurance();
 
  }
 

  getErrorZip() {
    if (this.zipcode.length < 5) {
      this.zipError = true;
    } else {
      this.zipError = false;
    }
  }

  getZipEnter() {
    if (this.zipcode.length == 5) {
      this.zipError = false;
    }
  }

  wrongZip() {
    this.zipcode = ''
  }


  public onPreviousSearchPosition(): void {
    //this.panel.nativeElement.scrollTop -= 20;
    console.log('this.panel.nativeElement.scrollTop', this.panel.nativeElement.scrollTop);
  }
  submitZipCode() {
    //this.auto_zipcode
    this.loading1 = true;
    this.validateZipCode();
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

              this.router.navigate(['/beyontec/01']);
            }

          } else if (productName == 'QuotePro') {
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

    }


  }


  select_count(event) {
    console.log(event)
  }

  submitCounty() {
    this.loading1 = true;
    this.getPzcmap();
  }
AutoInsurance(){
this.langid =sessionStorage.getItem('lg');
  this.dataReq = {
      "language_id": sessionStorage.getItem('lg')
    }
     this.api_product.AutoInsurance(this.dataReq).subscribe((data: {}) => {
     
      if(data['status'] == "success"){
           this.project_path = data['project_path'];
        this.image_path = data['image_path'];
        this.productArr = data['products'];
       // this.ads = data['banners'];
        let banner = data['banners'];
        let ads23 = [];
        let banner1 :any = [];
        let ads22 :any= [];
        if(banner.length <= 1){
          ads22 = banner[0];
          ads23  = banner[0];
        }else{
      if(this.productArr.ad_banner1 == banner[0].id ){
    
         ads22 = banner[0];
      }
       if(this.productArr.ad_banner1 == banner[1].id){
      
        //this.ads.push(banner[1]);
        ads22 = banner[1];
        //this.ads = [ ...this.ads, ...banner[0]];

      }
   
  
       if(this.productArr.ad_banner2 == banner[0].id ){
         ads23 = banner[0];
      }
       if(this.productArr.ad_banner2 == banner[1].id){
         ads23 = banner[1];
      }
     
    }
      this.ads = [ ads22, ads23];
        console.log('this.ads',this.ads);
         this.ads_path = data['ads_path'];
         

        this.ad_banner2 = this.productArr.ad_banner2;
     
         sessionStorage.setItem('page_title',data['products'].page_title);
    sessionStorage.setItem('meta_title',data['products'].meta_title);
    sessionStorage.setItem('meta_desc',data['products'].meta_desc);
    sessionStorage.setItem('meta_keywords',data['products'].meta_keywords);
    sessionStorage.setItem('canonical_rel',data['products'].canonical_rel);
    sessionStorage.setItem('canonical_tag',data['products'].canonical_tag);
    sessionStorage.setItem('meta_robots',data['products'].meta_robots);      
        this.faq_question=JSON.parse(this.productArr.faq_question);
        this.faq_answer=JSON.parse(this.productArr.faq_answer);;
this.essential_package_subtitle1 = this.sanitizer.bypassSecurityTrustHtml(this.productArr.essential_package_subtitle1);
        this.policy_titles = JSON.parse(this.productArr.policy_titles);
        console.log('policy_titles',this.policy_titles);
        this.comprehensive = JSON.parse(this.productArr.comprehensive_subtitle_one);
        this.essentils_subtitle1 = JSON.parse(this.productArr.essentils_subtitle1);
        this.discounts_available = JSON.parse(this.productArr.discounts_available);
         this.alternative = JSON.parse(this.productArr.one_subtitle_alternative);
         this.includes = JSON.parse(this.productArr.includes);
         this.essential_aaditional_coverages_subpoints = JSON.parse(this.productArr.essential_aaditional_coverages_subpoints);
         console.log('subh23',this.comprehensive);
       
      
        this.subheading = this.sanitizer.bypassSecurityTrustHtml(this.productArr.subheading);
         this.seciont2_description = this.sanitizer.bypassSecurityTrustHtml(this.productArr.seciont2_description);
        this.essentils_title1 = this.sanitizer.bypassSecurityTrustHtml(this.productArr.essential_package_subtitle1);
        this.comprehensive_subtitle2 = this.sanitizer.bypassSecurityTrustHtml(this.productArr.comprehensive_subtitle2);
        this.comprehensive_includes1 = JSON.parse(this.productArr.comprehensive_includes1);
        this.comprehensive_additional_subtitle = JSON.parse(this.productArr.comprehensive_additional_subtitle);
        this.alternative_package_answer1 =JSON.parse(this.productArr.alternative_package_answer1); 
        this.alternative_package_answers = JSON.parse(this.productArr.alternative_package_answers);
        this.essential_addnl_coverages_subtitle1 = JSON.parse(this.productArr.essential_addnl_coverages_subtitle1);
        this.essential_addnl_coverages_subtitle2 = JSON.parse(this.productArr.essential_addnl_coverages_subtitle2);
        this.essential_addnl_coverages_subtitle3 = JSON.parse(this.productArr.essential_addnl_coverages_subtitle3);
        this.essential_addnl_coverages_subtitle4 = JSON.parse(this.productArr.essential_addnl_coverages_subtitle4);
        this.comprehensive_additional_available_coverages_subtitles1 = JSON.parse(this.productArr.comprehensive_additional_available_coverages_subtitles1);
        this.comprehensive_additional_available_coverages_subtitles12 = JSON.parse(this.productArr.comprehensive_additional_available_coverages_subtitles12);
        this.comprehensive_additional_available_coverages_subtitles13 = JSON.parse(this.productArr.comprehensive_additional_available_coverages_subtitles13);
        this.comprehensive_additional_available_coverages_subtitles14 = JSON.parse(this.productArr.comprehensive_additional_available_coverages_subtitles14);
        this.comprehensive_additional_available_coverages_subtitles15 = JSON.parse(this.productArr.comprehensive_additional_available_coverages_subtitles15);
        this.comprehensive_additional_available_coverages_subtitles17 = JSON.parse(this.productArr.comprehensive_additional_available_coverages_subtitles17);
        this.loading = false;
       
      }else{
        this.productArr = [];
        this.subheading = '';
        this.section3 = '';
        this.section4 = '';
        this.loading = false;
      }
    });

}
 
  onlanguageChange(newValue){
    // console.log(newValue, "new language");
    this.AutoInsurance();
    this.api_sub.sendMessage(1);
  }


  getScroll(id)
  {
    console.log($(".headerWrapMain").height()+10)
    let closureValue = $("#id"+id+"-header").offset().top - $(".headerWrapMain").height()+10
    $('html,body').animate({ scrollTop : closureValue},"slow"); 
    /*
    setTimeout(function() { 
      let closureValue = $("#id"+id+"-header").offset().top - $(".headerWrapMain").height()+10

      console.log('timeout',closureValue);
      $('html,body').animate({ scrollTop : closureValue},5000); 
    },10);
*/
    // console.log($('.cst_accord'+id+" .accord_head").height());
    // console.log($(".cst_accord"+id).offset().top);
    // var headspc = $(".headerWrapMain").height() + 10;
    // var panel = $(".cst_accord"+id).offset().top;
    // setTimeout(function() { 
    //   $('html,body').animate({ scrollTop : $(".cst_accord"+id).offset().top - 100 }, 500); 
    // }, 400);   
  }


  ngAfterViewInit()
  {
    
    document.onreadystatechange = function() { 
      if (document.readyState !== "complete") { 
          document.querySelector("body").style.visibility = "hidden"; 
          document.querySelector<HTMLElement>(".site_preloader").style.visibility = "visible"; 
      } else { 
          document.querySelector<HTMLElement>(".site_preloader").style.display = "none"; 
          document.querySelector("body").style.visibility = "visible"; 
      } 
    };


  }
// AfterContentInit()
//   {


//     console.log('ngAfterViewInit')
//     $(window).on("load",function(){
//       $(".site_preloader").fadeOut("slow");
//     });
//   }
}
