import { Component, OnInit } from '@angular/core';
import { BeyontecService } from '../../../commons/services/beyontec/beyontec.service';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule, FormBuilder, Validators, FormArray } from '@angular/forms';
import { CommonService } from '../../../commons/services/common/common.service';
import { BeyontecFormService } from '../beyontec-form.service';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-beyontec04',
  templateUrl: './beyontec04.component.html',
  styleUrls: ['./beyontec04.component.css', '../../../commons/styles.css']
})
export class Beyontec04Component implements OnInit {

  isClicked: boolean = false;
  dropArr: any;
  umbiList: any[];
  umpdList: any[];
  pipList: any[];
  pd: any[];
  bi: any[];
  json_coverage : any;
  loading : boolean = false;
  dateToday : any;
  maxDate;
  minDate;
  bsConfig = {
    containerClass: 'theme-red',
    // minDate :new Date(Date.now()),
    // maxDate :new Date(Date.now()),
    isAnimated: true,
    adaptivePosition: true,
    showWeekNumbers: false,
    returnFocusToInput: true,
    dateInputFormat: 'MM/DD/YYYY',
  };
  datepickerModel;
  bsValue;

  // umbiList = [
  //   {id: 1, name: 'Reject'},
  //   {id: 2, name: '$30,000/$60,000'},
  // ];

  // umpdlist = [
  //   {id: 1, name: 'Reject'},
  //   {id: 2, name: '$25,000'},
  // ];

  // piplist = [
  //   {id: 1, name: 'Reject'},
  //   {id: 2, name: '$2,500'},
  // ];

  constructor(public router: Router, public api_form: BeyontecService, private formBuilder: FormBuilder, public api_common: CommonService, public BeyontecFormService: BeyontecFormService,) {

    this.BeyontecFormService.getCoverageForm();

  }

  ngOnInit(): void {
    (<any>$('[data-tooltip="tooltip"]')).tooltip();
    
    this.json_coverage = JSON.parse(localStorage.getItem("beyontec_coverage"));
    if(this.json_coverage!=undefined && this.json_coverage!=null)
    {
      this.BeyontecFormService.getCoverageForm();
      this.BeyontecFormService.coverage_array$.patchValue(this.json_coverage)
    }

    this.api_common.getTocken().subscribe((data: {}) => {
      // console.log(data, 'generateToken');
      let dataReq = {
        "token": data['token'],
        "companyProductCd": "PTXNSA"
      }
      // console.log(this.zipdata);
      this.api_common.getDropdown(dataReq).subscribe((dataDrop: {}) => {
        this.dropArr = dataDrop
        // console.log(this.dropArr);
        this.getDropdowns(this.dropArr)
      });
    });

    // var d = new Date();
    // d.setDate(d.getDate()-5);

    this.api_common.getTocken().subscribe((dataToken: {}) => {
      let reqTocken = 
      {
        "token": dataToken['token']
      }
      this.api_common.getServerDate(reqTocken).subscribe((dataTime: {}) => {
        console.log(dataTime, 'dataTime');
        this.maxDate = new Date(dataTime['date']); 
        this.maxDate.setDate(this.maxDate.getDate() + 35);
        this.minDate = new Date(dataTime['date']); 
        this.dateToday = dataTime['date'];
      });

    });
    // this.BeyontecFormService.coverage_array$.get('rqEffDt').valueChanges.subscribe((value) => {
    //   // console.log('valueChanges datepicker', value);
    //   // if(value){
    //   //   this.focusOutRqEff(value)
    //   // }
      
    // });
    

    // console.log(this.dropArr);

    this.getFullAddress();

  }


  getdate(e){
    // console.log(e, 'dob');
    if(e != null){
      var currenDate = moment(e).format("MM/DD/YYYY");
      this.BeyontecFormService.coverage_array$.get('rqEffDt').setValue(currenDate);
    }
  }

  ngAfterViewInit(){
    
  }


  getFullAddress() {
    let driver = JSON.parse(localStorage.getItem("beyontech_drivers"))[0];
    let intelligentsearch = JSON.parse(localStorage.getItem("beyontec_intelligentsearch"));
    if (localStorage.getItem("beyontec_intelligentsearch") == undefined && localStorage.getItem("beyontec_intelligentsearch") == null) {

      this.api_common.getTocken().subscribe((dataTt: {}) => {
        // console.log(dataTt)


        let reqData1 = {
          "token": dataTt['token'],
          "streetName": driver.street,
          "deliveryLine1": "",
          "deliveryLine2": "",
          "city": driver.city,
          "state": driver.state,
          "zip": driver.zip
        }

        this.api_form.intelligentsearch(reqData1).subscribe((d0: {}) => {
          // console.log(d0['wsCorrectAddressList'][0], "intelligentsearch");
          if (d0['result'] == 1) {

            localStorage.setItem("beyontec_intelligentsearch", JSON.stringify(d0['wsCorrectAddressList'][0]));

          }
        })

      });

    } else {

      if (driver.zip == intelligentsearch.zip && driver.county == intelligentsearch.countyName) {

      } else {
        this.api_common.getTocken().subscribe((dataTt: {}) => {
          // console.log(dataTt)


          let reqData1 = {
            "token": dataTt['token'],
            "streetName": driver.street,
            "deliveryLine1": "",
            "deliveryLine2": "",
            "city": driver.city,
            "state": driver.state,
            "zip": driver.zip
          }

          this.api_form.intelligentsearch(reqData1).subscribe((d0: {}) => {
            // console.log(d0['wsCorrectAddressList'][0], "intelligentsearch");
            if (d0['result'] == 1) {

              localStorage.setItem("beyontec_intelligentsearch", JSON.stringify(d0['wsCorrectAddressList'][0]));

            }
          })

        });
      }

    }
  }

  getDropdowns(dropArr) {
    if (dropArr) {
      // console.log(dropArr.umbi);
      this.umbiList = [];
      Object.keys(dropArr.umbi[0]).forEach(key => {
        this.umbiList.push({ key: key, value: dropArr.umbi[0][key] });
      });
      // console.log(this.umbiList);

      this.umpdList = [];
      Object.keys(dropArr.umpd[0]).forEach(key => {
        this.umpdList.push({ key: key, value: dropArr.umpd[0][key] });
      });

      this.pipList = [];
      Object.keys(dropArr.pip[0]).forEach(key => {
        this.pipList.push({ key: key, value: dropArr.pip[0][key] });
      });


      this.pd = [];
      Object.keys(dropArr.propertyDamage[0]).forEach(key => {
        this.pd.push({ key: key, value: dropArr.propertyDamage[0][key] });
      });

      this.bi = [];
      Object.keys(dropArr.bodilyInjury[0]).forEach(key => {
        this.bi.push({ key: key, value: dropArr.bodilyInjury[0][key] });
      });

      // console.log(this.pd, this.bi)

    }

  }

  focusOutRqEff(val){
    // console.log(val)
    if(val != ''){
     
    var startDate : any = null;

    // var currenDate = moment(new Date()).format("MM/DD/YYYY");


    var currenDate = this.dateToday;

    startDate = moment(val, "MM/DD/YYYY");
    // var startDate1 = moment(this.BeyontecFormService.coverage_array$.get('rqEffDt').value, "DD/MM/YYYY").day();
    var endDate = moment(currenDate, "MM/DD/YYYY");
    // let dateDiff = endDate - startDate;
    let k = startDate.diff(endDate, 'days');
    // let l = endDate.diff(startDate, 'days')
    // console.log(currenDate, 'currenDate')
    // console.log(startDate, 'startDate')
    // console.log(endDate, 'endDate')


    console.log(k, 'dateDiff k')
    
    if(k < 36 && k > -1){
      // console.log(1111);
      // 
    }else{
      // alert(2222)
      
      document.getElementById('openModalButtonPolicyStart').click();

      this.BeyontecFormService.coverage_array$.get('rqEffDt').setValue('');
      document.getElementById('rqEffDt').focus();
      
    }

  }
  }


  onSubmit() {

    // (<FormArray>this.BeyontecFormService.coverage_array$.controls['coverage_array']).get('pd').setValue(this.pd[0].key);
    // (<FormArray>this.BeyontecFormService.coverage_array$.controls['coverage_array']).get('bi').setValue(this.bi[0].key);
    this.BeyontecFormService.coverage_array$.get('pd').setValue(this.pd[0].key)
    this.BeyontecFormService.coverage_array$.get('bi').setValue(this.bi[0].key)

    if (this.BeyontecFormService.coverage_array$.get('umbi').value == "") {
      this.BeyontecFormService.coverage_array$.get('umbi').setValue(0)
    }
    if (this.BeyontecFormService.coverage_array$.get('umpd').value == "") {
      this.BeyontecFormService.coverage_array$.get('umpd').setValue(0)
    }
    if (this.BeyontecFormService.coverage_array$.get('pip').value == "") {
      this.BeyontecFormService.coverage_array$.get('pip').setValue(0)
    }
    // console.log();

    // console.log(<FormArray>this.BeyontecFormService.coverage_array$.value);
    localStorage.setItem("beyontec_coverage", JSON.stringify(<FormArray>this.BeyontecFormService.coverage_array$.value));



    this.getMinuteQuote();

  }

  getMinuteQuote() {
    this.loading = true;

    let insuranceFor = JSON.parse(localStorage.getItem("insuranceFor"));
    let driver = JSON.parse(localStorage.getItem("beyontech_drivers"));
    let vehicles = JSON.parse(localStorage.getItem("beyontech_vehicles"));
    let coverage = JSON.parse(localStorage.getItem("beyontec_coverage"));
    let intelligentsearch = JSON.parse(localStorage.getItem("beyontec_intelligentsearch"));

    this.api_common.getTocken().subscribe((dataT: {}) => {
      // console.log(dataT)

      let additionalDriver = [];
      let vehicleList = [];

      for (let i = 1; i < driver.length; i++) {

        let a = {
          "id": "ysusxllapls0p",
          "driverStatus": "N",
          "firstName": driver[i].firstName,
          "middleName": driver[i].middleName,
          "lastName": driver[i].lastName,
          "email": "",
          "phoneNumber": "",
          "dob": driver[i].dob,
          "isMale": driver[i].isMale,
          "isMarried": driver[i].isMarried,
          "relationship": driver[i].relationship,
          "licenseNum": driver[i].licenseNum,
          "isExcluded": !driver[i].driver_include,
          "licenseType": "T",
          "stateLicense": "TX",
          "yearsLicensed": 0,
          "sr22": false,
          "is2ndNamedInsured": true,
          "discounts": {
            "goodStudent": "2"
          },
          "violationsArray": driver[i].violationsArray,
          "texasDriverLicense": true
        }

        additionalDriver.push(a);

      }

      for (let j = 0; j < vehicles.length; j++) {
        // if(vehicles[j].include){

        // console.log(vehicles[j].include);
        if (vehicles[j].include) {


          let b = {
            "vin": vehicles[j].vinNo,
            "year": vehicles[j].year,
            "make": vehicles[j].make,
            "model": vehicles[j].model,
            "subModel": vehicles[j].symbol,
            "vehDrivenMiles": false,
            "vehTon": false,
            "trim": "",
            "bisUse": false,
            "vehInspection": false,
            "eqAmount": vehicles[j].equipment_amount,
            "requests": {
              "compDeductible": vehicles[j].type_of_coverage,
              "collDeductible": vehicles[j].type_of_coverage,
              "rentReimbursement": vehicles[j].rental_reimbus ? vehicles[j].rental_reimbus : 0,
              "towingAndLabor": vehicles[j].towing_labour ? vehicles[j].towing_labour : 0,
              "custEquipment": vehicles[j].equipment_amount_redio == "Yes" ? true : false,
              "rsa": vehicles[j].road_side_assistance == "Yes" ? true : false
            },
            "garageInfo": {
              "zip": insuranceFor['zipcode'],
              "street": "",
              "aptNumber": 0,
              "city": "",
              "county": insuranceFor['county'],
              "unit": ""
            }
          }

          // let a = {
          //   "vin": vehicles[j].vinNo,
          //   "year": vehicles[j].year,
          //   "make": vehicles[j].make,
          //   "model": vehicles[j].model,
          //   "subModel": vehicles[j].symbol,
          //   "vehDrivenMiles": false,
          //   "vehTon": false,
          //   "trim": "",
          //   "bisUse": false,
          //   "vehInspection": false,
          //   "eqAmount": "",
          //   "requests": {
          //     "compDeductible": 1000,
          //     "collDeductible": 1000,
          //     "rentReimbursement": 0,
          //     "towingAndLabor": 0,
          //     "custEquipment": true,
          //     "rsa": false
          //   },
          //   "garageInfo": {
          //     "zip": insuranceFor['zipcode'],
          //     "street": "",
          //     "aptNumber": 0,
          //     "city": "",
          //     "county": insuranceFor['county'],
          //     "unit": ""
          //   }
          // }

          vehicleList.push(b);
        }

        // }

        // console.log(vehicleList)
      }


      let reqData = {
        "productState": "TX",
        "requestType": "QQ",
        "companyProductCd": "PTXNSA",
        "source": "WebApp",
        "agentId": "PI001",
        "quoteNo": null,
        "primaryDriver": {
          "id": "glaowpxlzslwpq",
          "firstName": driver[0].firstName,
          "middleName": driver[0].middleName,
          "lastName": driver[0].lastName,
          "email": driver[0].email,
          "phoneNumber": driver[0].phone1 + driver[0].phone2 + driver[0].phone3,
          "zip": driver[0].zip,
          "county": driver[0].county,
          "state": "",
          "city": "",
          "street": "",
          "dob": driver[0].dob,
          "licenseNum": driver[0].licenseNum,
          "isMale": driver[0].isMale == 'Male' ? true : false,
          "isMarried": driver[0].isMarried == 'Single' ? 'S' : 'M',
          "relationship": "I",
          "licenseType": "T",
          "stateLicense": "TX",
          "yearsLicensed": null,
          "sr22": false,
          "coverages": {
            "umbi": coverage.umbi,
            "umpd": coverage.umpd,
            "pip": coverage.pip,
            "bi": coverage.bi,
            "pd": coverage.pd,
            "med": "0"
          },
          "violationsArray": driver[0].violationsArray,
          "discounts": {
            "lbEndorsement": false,
            "pdEndorsement": false
          },
          "requests": {
            "paymentPlan": "eft",
            "downPayment": "16.67",
            "rqEffDt": coverage.rqEffDt,
            "medicalPayment": "0"
          }
        },
        "additionalDrivers": additionalDriver,
        "vehicles": vehicleList
      }

      let reqData1 = 
      {
        "token": dataT['token'],
      "productState": "TX",
      "requestType": "QQ",
      "companyProductCd": insuranceFor['productName'],
      "source": "WebApp",
      "agentId": "PI001",
      "quoteNo": null,
      "primaryDriver": {
        "id": "glaowpxlzslwpq",
        "firstName": driver[0].firstName,
        "middleName": driver[0].middleName,
        "lastName": driver[0].lastName,
        "email": driver[0].email,
        "phoneNumber": driver[0].phone1 + driver[0].phone2 + driver[0].phone3,
        "zip": insuranceFor['zipcode'], //driver[0].zip,
        "county": driver[0].county,
        "state": "",
        "city": "",
        "street": "",
        "dob": driver[0].dob,
        "licenseNum": driver[0].licenseNum,
        "isMale": driver[0].isMale,
        "isMarried": driver[0].isMarried,
        "relationship": "I",
        "licenseType": "T",
        "stateLicense": "TX",
        "yearsLicensed": null,
        "sr22": false,
        "coverages": {
          "umbi": coverage.umbi,
          "umpd": coverage.umpd,
          "pip": coverage.pip,
          "bi": coverage.bi,
          "pd": coverage.pd,
          "med": "0"
        },
        "violationsArray": driver[0].violationsArray,
        "discounts": {
          "lbEndorsement": false,
          "pdEndorsement": false
        },
        "requests": {
          "paymentPlan": "eft",
          "downPayment": "16.67",
          "rqEffDt": coverage.rqEffDt,
          "medicalPayment": "0"
        }
      },
      "additionalDrivers": additionalDriver,
      "vehicles": vehicleList
    }
    

      // localStorage.setItem("minute_request", JSON.stringify(reqData0));
      // console.log(JSON.stringify(reqData1), "reqData reqData reqData");

      // let bypassurl = "https://stableapi.prontoinsurance.com/premiumrater/services/generate?token=" + dataT['token']
      // this.api_form.minutesQuotebypass(reqData1, bypassurl).subscribe((dataMinutesQuote: {}) => {
        this.api_form.minutesQuote(reqData1).subscribe((dataMinutesQuote: {}) => {
        
        // console.log(dataMinutesQuote, "dataMinutesQuote")
        // console.log(dataMinutesQuote['quote'], "dataMinutesQuote['quote']")

        if (dataMinutesQuote['quote']) {
          // console.log(1111111111)
          localStorage.setItem('isMinQuote',"1");
          localStorage.setItem("beyontec_minutesQuote", JSON.stringify(dataMinutesQuote['quote']));

          // console.log(dataMinutesQuote['quote']['programs']['expanded'], "expanded", dataMinutesQuote['quote']['programs']['limited'], 'limited')

          if( dataMinutesQuote['quote']['programs']['expanded'] != null || dataMinutesQuote['quote']['programs']['limited'] != null){
            this.loading = false;
            this.router.navigate(['beyontec/05']);
          }else{
            this.loading = false;
            document.getElementById('openModalButtonSomethingWrong').click();
            localStorage.clear();
            // alert('We apologize but we can not provide you insurance at this time. Please call 1-(888)388-6523 to get further detail')
            // 
          }
        }else{
          this.loading = false;
          document.getElementById('openModalButtonSomethingWrong').click();
          localStorage.clear();
        } 
        // else {
        //   // console.log(22222222222)
        //   let miQuote = {
        //     "productQuoteId": "Q001377227",
        //     "productName": "PTXNSA",
        //     "programs": {
        //       "expanded": {
        //         "payPlans": {
        //           "6MthEFT_EXP": {
        //             "downPayment": "103.00",
        //             "downPct": "16.67",
        //             "monthlyPayment": "101.00",
        //             "numPayment": "5",
        //             "totalPremium": "612.00",
        //             "error": null,
        //             "policyFee": null,
        //             "ccFee": null,
        //             "sr22Fee": null,
        //             "atpfFee": "2.00",
        //             "rsaFee": "0.00"
        //           },
        //           "6MthNonEFT_EXP": {
        //             "downPayment": "106.00",
        //             "downPct": "16.67",
        //             "monthlyPayment": "106.00",
        //             "numPayment": "5",
        //             "totalPremium": "640.00",
        //             "error": null,
        //             "policyFee": null,
        //             "ccFee": null,
        //             "sr22Fee": null,
        //             "atpfFee": "2.00",
        //             "rsaFee": "0.00"
        //           },
        //           "6MthPIF_EXP": {
        //             "downPayment": "608.00",
        //             "downPct": "100.0",
        //             "monthlyPayment": null,
        //             "numPayment": "1",
        //             "totalPremium": "612.00",
        //             "error": null,
        //             "policyFee": null,
        //             "ccFee": null,
        //             "sr22Fee": null,
        //             "atpfFee": "2.00",
        //             "rsaFee": "0.00"
        //           },
        //           "1Mth_EXP": {
        //             "downPayment": "101.00",
        //             "downPct": "100.0",
        //             "monthlyPayment": null,
        //             "numPayment": "1",
        //             "totalPremium": "101.00",
        //             "error": null,
        //             "policyFee": null,
        //             "ccFee": null,
        //             "sr22Fee": null,
        //             "atpfFee": null,
        //             "rsaFee": null
        //           },
        //           "2Mth_EXP": {
        //             "downPayment": "192.00",
        //             "downPct": "100.0",
        //             "monthlyPayment": null,
        //             "numPayment": "1",
        //             "totalPremium": "192.00",
        //             "error": null,
        //             "policyFee": null,
        //             "ccFee": null,
        //             "sr22Fee": null,
        //             "atpfFee": null,
        //             "rsaFee": null
        //           },
        //           "3Mth_EXP": {
        //             "downPayment": "286.00",
        //             "downPct": "100.0",
        //             "monthlyPayment": null,
        //             "numPayment": "1",
        //             "totalPremium": "288.00",
        //             "error": null,
        //             "policyFee": null,
        //             "ccFee": null,
        //             "sr22Fee": null,
        //             "atpfFee": null,
        //             "rsaFee": null
        //           }
        //         }
        //       },
        //       "limited": null
        //     }
        //   }
        //   localStorage.setItem("beyontec_minutesQuote", JSON.stringify(miQuote));
        // }


        // if(localStorage.setItem("beyontec_minutesQuote")){
        //   this.loading = true;
        //   this.router.navigate(['beyontec/05']);
        // }
        

      })

    })
  }


  goToFaq(){
    this.router.navigate(['']);
  }

}
