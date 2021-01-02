
import { ProductService } from '../../commons/services/product/product.service';
import { SubjectCallService } from '../../commons/services/subject-call/subject-call.service';
// import * as AOS from 'aos';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { ViewportScroller } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';
import * as $ from 'jquery';
import { Component, OnInit, ViewChild, ElementRef, Renderer2, Inject, HostListener } from '@angular/core';
import { CommonService } from '../../commons/services/common/common.service';
import { Router } from '@angular/router';
import { HomepageService } from '../../commons/services/homepage/homepage.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-get-a-quote',
  templateUrl: './get-a-quote.component.html',
  styleUrls: ['./get-a-quote.component.css']
})
export class GetAQuoteComponent implements OnInit {
  @ViewChild('panel', { read: ElementRef }) public panel: ElementRef<any>;
  loading : boolean =true;
  countieSelect: any;
  dataReq;
countiesLength: number;
zipcode: any = '';
countiList: any[];
insuranceName: string = "Auto";
selected_county;
counties: any = '';
zipError: boolean = false;
loading1;
  constructor(public api_common: CommonService, public api_page: HomepageService, public router: Router,public api_product : ProductService, private sanitizer: DomSanitizer, public api_sub : SubjectCallService, private vps: ViewportScroller,public route: ActivatedRoute) {
    this.route.url.subscribe(params => {
      localStorage.setItem("agent",params[0].path);
    })

  }


  ngOnInit(): void {
    localStorage.getItem("agent");
    this.loading  = false;
  }

  onlanguageChange(newValue){
    // console.log(newValue, "new language");
   
    this.api_sub.sendMessage(1);
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

}
