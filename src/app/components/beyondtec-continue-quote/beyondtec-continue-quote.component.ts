import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { BeyontecService } from '../../commons/services/beyontec/beyontec.service';
import { CommonService } from '../../commons/services/common/common.service';
import { HomepageService } from '../../commons/services/homepage/homepage.service';
import * as moment from 'moment';

@Component({
  selector: 'app-beyondtec-continue-quote',
  templateUrl: './beyondtec-continue-quote.component.html',
  styleUrls: ['./beyondtec-continue-quote.component.css']
})
export class BeyondtecContinueQuoteComponent implements OnInit {
  dataparams;
  getaquote;
  driver;
  newdriver;
  token;
  loading : boolean = false;
  application_dropdown : any = [

    {
      "key" : "QN",
      "value": "Quote Number"
    },
    {
      "key" : 'AN',
      "value": "Application Number"
    }
  ];
  dropArr : any;
  umbiList
  umpdList
  pipList
  pd
  bi
  counties
  selected_county
  countiesLength

  constructor(public api_common: CommonService,public router1: ActivatedRoute,public router:Router,public formBuilder :FormBuilder,public api_form: BeyontecService, public api_page: HomepageService, ) { }

  ngOnInit(): void {
    this.router1.params.subscribe(function(params){
      localStorage.setItem('params', JSON.stringify(params));
      console.log('params',params);
     });
    //  console.log('params222',localStorage.getItem('params'));
     this.dataparams = JSON.parse(localStorage.getItem('params'));
   
    
      // console.log('this.dataparams54555445',this.dataparams);
     this.getaquote = this.formBuilder.group({
      "email" : ['',[Validators.required,Validators.email]],
      "state" : ['',[Validators.required]],
      "quoteId" : ['',[Validators.required]],
      "applicationNoType" : ['',[Validators.required]]
      });

      if(this.dataparams.state){
        this.getaquote.get('state').setValue(this.dataparams.state)
      }
      if(this.dataparams.email){
        this.getaquote.get('email').setValue(this.dataparams.email)
      }
      if(this.dataparams.quoteId){
        this.getaquote.get('quoteId').setValue(this.dataparams.quoteId)
        console.log(this.dataparams.quoteId.charAt(0))
        if(this.dataparams.quoteId.charAt(0) == 'Q'){
          this.getaquote.get('applicationNoType').setValue('QN')
        }else{
          this.getaquote.get('applicationNoType').setValue('AN')
        }
      }
     

      this.getDropDown();
        // if(this.getaquote.value && this.getaquote.value != 'undefined'){
        //   console.log('this.dataparams',this.dataparams.email);
        //   this.getaquote.controls.email.setValue(this.dataparams['email']);
        //   this.getaquote.controls.state.setValue(this.dataparams['state']);
        //   this.getaquote.controls.quoteId.setValue(this.dataparams['quoteId']);
        // }
  }

 
  getDropDown(){
    this.api_common.getTocken().subscribe((data: {}) => {
      // console.log(data, 'generateToken');
      let dataReq = {
        "token": data['token'],
        "companyProductCd": "PTXNSA"
      }
      // console.log(this.zipdata);
      this.api_common.getDropdown(dataReq).subscribe((dropArr: {}) => {
        // let dropArr = dataDrop
        console.log(dropArr, 'dropArr')
        if(dropArr){
          this.umbiList = [];
          Object.keys(dropArr['umbi'][0]).forEach(key => {
            this.umbiList.push({ key: key, value: dropArr['umbi'][0][key] });
          });
        //   // console.log(this.umbiList);

          this.umpdList = [];
          Object.keys(dropArr['umpd'][0]).forEach(key => {
            this.umpdList.push({ key: key, value: dropArr['umpd'][0][key] });
          });

          this.pipList = [];
          Object.keys(dropArr['pip'][0]).forEach(key => {
            this.pipList.push({ key: key, value: dropArr['pip'][0][key] });
          });


          this.pd = [];
          Object.keys(dropArr['propertyDamage'][0]).forEach(key => {
            this.pd.push({ key: key, value: dropArr['propertyDamage'][0][key] });
          });

          this.bi = [];
          Object.keys(dropArr['bodilyInjury'][0]).forEach(key => {
            this.bi.push({ key: key, value: dropArr['bodilyInjury'][0][key] });
          });
        }

        
      });
    });
  }



  submit(){
    this.loading = true;
    console.log('this.getaquote',);
    // this.api_common.getTocken().subscribe((data: {}) => {
      // this.token = data['token'];
      var inp =  this.getaquote.value;
       inp = {
        "email" :  inp.email,
        "state" : inp.state,
        "quoteId" : inp.quoteId,
        // "token" : data['token']
      }
      let beyontech_drivers = [];
      let beyontec_coverage = {};
      let beyontech_vehicles = [];
      console.log('inp',inp);
      this.api_form.requestedMyquote(inp).subscribe((data: {}) => {
      // this.loading = false;
      

      beyontec_coverage = {
        bi: data['primaryDriver']['coverages']['bi'] ? data['primaryDriver']['coverages']['bi'] : 0,
        pd: data['primaryDriver']['coverages']['pd'] ? data['primaryDriver']['coverages']['pd'] : 0,
        pip: data['primaryDriver']['coverages']['pip'] ? data['primaryDriver']['coverages']['pip'] : 0,
        rqEffDt: data['primaryDriver']['requests']['rqEffDt'],
        umbi: data['primaryDriver']['coverages']['umbi'] ? data['primaryDriver']['coverages']['umbi'] : 0,
        umpd: data['primaryDriver']['coverages']['umpd'] ? data['primaryDriver']['coverages']['umpd'] : 0,
      }
      localStorage.setItem("beyontec_coverage", JSON.stringify(beyontec_coverage));
      // beyontech_nusr

      console.log(data, "requested quote");

      // this.api_common.getTocken().subscribe((dataT: {}) => {
        let dataReqHdr = {
          // "token": dataT['token'],
          "dlNo": data['primaryDriver']['licenseNum'],
          "companyProductCd" : "PTXNSA"
        }
        this.api_form.getHrd(dataReqHdr).subscribe((data1: {}) => {
          // console.log(data1, 'data1');
          
          localStorage.setItem("hrddata", JSON.stringify(data1));

          data1['vehicles']['vins'].forEach(element => {
            // console.log(element)
            beyontech_vehicles.push({
              equipment_amount: "",
              equipment_amount_redio: null,
              from_api: true,
              include: false,
              lienholder: [],
              make: element['make'],
              model: element['model'],
              ownership: "false",
              primary_use: "",
              rental_reimbus: "",
              road_side_assistance: null,
              symbol: element['symbol'],
              towing_labour: "",
              type_of_coverage: "",
              vinNo: element['vinNo'],
              year: element['year'],

            });

          });

          // beyontech_drivers.push(data1['drivers']['named']);
          // data1['drivers']['additional'].forEach(element => {
          //   beyontech_drivers.push(element);
          // });
          localStorage.setItem("beyontech_vehicles_a", JSON.stringify(beyontech_vehicles));
          // localStorage.setItem("beyontech_drivers_a", JSON.stringify(beyontech_drivers));
          // hdr =data1;
        });
      // }); 

      if (data != '') {
        beyontech_drivers.push({
          aptNumber: data['primaryDriver']['aptNumber'],
          city: data['primaryDriver']['city'],
          countryLicense: data['primaryDriver']['countryLicense'],
          county: data['primaryDriver']['county'],
          dob: data['primaryDriver']['dob'],
          driver_from_api: true,
          driver_include: true,
          email: data['primaryDriver']['email'],
          employer: "",
          firstName: data['primaryDriver']['firstName'],
          isAnytickets: data['primaryDriver']['violationsArray'].length > 0 ? "Yes" : 'No',
          isExcluded: false,
          isMale: data['primaryDriver']['isMale'],
          isMarried: data['primaryDriver']['isMarried'],
          isPrimaryDriver: true,
          isdrivingLicence: "",
          lastName: data['primaryDriver']['lastName'],
          licenseNum: data['primaryDriver']['licenseNum'],
          licenseType: data['primaryDriver']['licenseType'] ? data['primaryDriver']['licenseType'] : '',
          middleName: data['primaryDriver']['middleName'],
          mobilePhone: data['primaryDriver']['mobilePhone'],
          occupation: data['primaryDriver']['occupation'],
          phone1: data['primaryDriver']['phoneNumber'].split("-")[0],
          phone2: data['primaryDriver']['phoneNumber'].split("-")[1],
          phone3: data['primaryDriver']['phoneNumber'].split("-")[2],
          phoneNumber: data['primaryDriver']['phoneNumber'],
          relationship: data['primaryDriver']['relationship'],
          sr22: data['primaryDriver']['sr22'],
          state: data['primaryDriver']['state'] ? data['primaryDriver']['state'] : '',
          stateLicense: data['primaryDriver']['stateLicense'] ? data['primaryDriver']['stateLicense'] : '',
          street: data['primaryDriver']['street'] ? data['primaryDriver']['street'] : '',
          suffix: "",
          unit: "",
          violationsArray: data['primaryDriver']['violationsArray'] ? data['primaryDriver']['violationsArray'] : [] ,
          workPhone: "",
          yearsLicensed: "",
          zip: data['primaryDriver']['zip']
        })

        data['additionalDrivers'].forEach(element => {
          beyontech_drivers.push({
            aptNumber: element['aptNumber'] ? element['aptNumber'] : '',
            city: element['city'] ? element['city'] : '',
            countryLicense: element['countryLicense'] ? element['countryLicense'] : '',
            county: element['county'] ? element['county'] : '',
            dob: element['dob'] ? element['dob'] : '',
            driver_from_api: true,
            driver_include: element['isExcluded'] ? false : true,
            email: element['email'] ? element['email'] : '',
            employer: "",
            firstName: element['firstName'],
            isAnytickets: element['violationsArray'].length > 0 ? "Yes" : 'No',
            isExcluded: element['isExcluded'],
            isMale: element['isMale'] ? element['isMale'] : '',
            isMarried: element['isMarried'] ? element['isMarried'] : '',
            isPrimaryDriver: false,
            isdrivingLicence: "",
            lastName: element['lastName'],
            licenseNum: element['licenseNum'] ? element['licenseNum'] : '',
            licenseType: element['licenseType'] ? element['licenseType'] : '',
            middleName: element['middleName'] ? element['middleName'] : '',
            mobilePhone: "",
            occupation: "",
            phone1: "",
            phone2: "",
            phone3: "",
            phoneNumber: "",
            relationship: element['relationship'] ? element['relationship'] : '',
            sr22: element['sr22'] ? element['sr22'] : '',
            state: element['state'] ? element['state'] : '',
            stateLicense: element['stateLicense'] ? element['stateLicense'] : '',
            street: element['street'] ? element['street'] : '',
            suffix: "",
            unit: "",
            violationsArray: element['violationsArray'] ? element['violationsArray'] : [] ,
            workPhone: "",
            yearsLicensed: "",
            zip: element['zip'] ? element['zip'] : ''
          });
        });

        console.log(beyontech_drivers, 'beyontech_drivers')
        localStorage.setItem("beyontech_drivers", JSON.stringify(beyontech_drivers));
      }

    
      let vehicle_list = JSON.parse(localStorage.getItem("beyontech_vehicles_a"));
      
  // console.log(vehicle_list, "vehicle_list");
   
      if(vehicle_list){
        for(let i=0; i < data['vehicles'].length; i++){
          console.log(data['vehicles'][i]['vin'], "vehicle list");
          const index = vehicle_list.findIndex(el => el.vinNo === data['vehicles'][i]['vin']);
          console.log(index, 'index vehicle list')
          if(index != null){
            vehicle_list[index] = {
              equipment_amount: data['vehicles'][i]['eqAmount'],
              equipment_amount_redio: data['vehicles'][i]['requests']['custEquipment'] ? 'Yes' : 'No',
              from_api: true,
              include: true,
              lienholder: [],
              make: data['vehicles'][i]['make'],
              model: data['vehicles'][i]['model'],
              ownership: "false",
              primary_use: "Commute (to work or school)",
              rental_reimbus: data['vehicles'][i]['requests']['rentReimbursement'],
              road_side_assistance: data['vehicles'][i]['requests']['rsa'] ? 'Yes' : 'No',
              symbol: data['vehicles'][i]['subModel'],
              towing_labour: data['vehicles'][i]['requests']['towingAndLabor'],
              type_of_coverage: data['vehicles'][i]['requests']['collDeductible'],
              vinNo: data['vehicles'][i]['vin'],
              year: data['vehicles'][i]['year'],
            }
          }else{
            vehicle_list.push({
              equipment_amount: data['vehicles'][i]['eqAmount'],
              equipment_amount_redio: data['vehicles'][i]['requests']['custEquipment'] ? 'Yes' : 'No',
              from_api: true,
              include: true,
              lienholder: [],
              make: data['vehicles'][i]['make'],
              model: data['vehicles'][i]['model'],
              ownership: "false",
              primary_use: "Commute (to work or school)",
              rental_reimbus: data['vehicles'][i]['requests']['rentReimbursement'],
              road_side_assistance: data['vehicles'][i]['requests']['rsa'] ? 'Yes' : 'No',
              symbol: data['vehicles'][i]['subModel'],
              towing_labour: data['vehicles'][i]['requests']['towingAndLabor'],
              type_of_coverage: data['vehicles'][i]['requests']['collDeductible'],
              vinNo: data['vehicles'][i]['vin'],
              year: data['vehicles'][i]['year'],
            })
          }
        }
        
        localStorage.setItem("beyontech_vehicles", JSON.stringify(vehicle_list));
      }else{
        vehicle_list = [];
        console.log(222)
        for(let i=0; i < data['vehicles'].length; i++){

          console.log(data['vehicles'][i], 'element of vehicle list')
          let a = {
            equipment_amount: data['vehicles'][i]['eqAmount'],
            equipment_amount_redio: data['vehicles'][i]['requests']['custEquipment'] ? 'Yes' : 'No',
            from_api: true,
            include: true,
            lienholder: [],
            make: data['vehicles'][i]['make'],
            model: data['vehicles'][i]['model'],
            ownership: "false",
            primary_use: "Commute (to work or school)",
            rental_reimbus: data['vehicles'][i]['requests']['rentReimbursement'],
            road_side_assistance: data['vehicles'][i]['requests']['rsa'] ? 'Yes' : 'No',
            symbol: data['vehicles'][i]['subModel'],
            towing_labour: data['vehicles'][i]['requests']['towingAndLabor'],
            type_of_coverage: data['vehicles'][i]['requests']['collDeductible'],
            vinNo: data['vehicles'][i]['vin'],
            year: data['vehicles'][i]['year'],
          };


          vehicle_list.push(a);

         }
         
         localStorage.setItem("beyontech_vehicles", JSON.stringify(vehicle_list));

      }
     

      let dataReqCounty = {
        "zip": data['primaryDriver']['zip']
      }
      this.api_page.getCountyLookup(dataReqCounty).subscribe((data: {}) => {
        if (data['exists']) {
          this.counties = data;
       
          this.countiesLength = data['counties'].length;

          // localStorage.setItem('counties', JSON.stringify(data));
          console.log(this.counties, 'counties');

          // console.log(data['counties'].length, "counties length");

          if (data['counties'].length == 1) {
            this.selected_county = data['counties'][0];
            // this.getPzcmap();
          }

        }
      });
      console.log(vehicle_list, "vehicle_list");

      this.api_form.minutesQuote(data).subscribe((dataMinutesQuote: {}) => {
        
        console.log(dataMinutesQuote, "dataMinutesQuote")
        // console.log(dataMinutesQuote['quote'], "dataMinutesQuote['quote']")
        let dataReqCounty = {
          "zip": data['primaryDriver']['zip']
        }
        
        if (dataMinutesQuote['quote']) {
              if( dataMinutesQuote['quote']['programs']['expanded'] != null || dataMinutesQuote['quote']['programs']['limited'] != null){
            

            if(localStorage.getItem("beyontech_drivers") && localStorage.getItem("beyontech_vehicles") && beyontec_coverage){


              this.api_page.getCountyLookup(dataReqCounty).subscribe((dataC: {}) => {
                if (dataC['exists']) {
                  this.counties = dataC;
               
                  this.countiesLength = dataC['counties'].length;
        
                  // localStorage.setItem('counties', JSON.stringify(dataC));
                  console.log(this.counties, 'counties');
        
                  // console.log(dataC['counties'].length, "counties length");
        
                  if (dataC['counties'].length == 1) {
                    this.selected_county = dataC['counties'][0];
                  }
                  this.getPzcmap(data['primaryDriver']['zip'], dataC['counties'][0], dataC['counties']);
        
                }
              });


              // localStorage.removeItem("beyontech_vehicles_a");
              localStorage.setItem('isMinQuote',"1");
              localStorage.setItem("beyontec_minutesQuote", JSON.stringify(dataMinutesQuote['quote']));
              // this.loading = false;
              // this.router.navigate(['beyontec/05']);
            }
            
          }
          // else{
          //   this.loading = false;
          //   document.getElementById('openModalButtonSomethingWrong').click();
          //   localStorage.clear();
          
          // }
        }
        // else{
        //   this.loading = false;
        //   document.getElementById('openModalButtonSomethingWrong').click();
        //   localStorage.clear();
        // } 
      
      })


// console.log(data['vehicles'], 'index')

  // for(let i=0; i < data['vehicles'].length; i++){

  //   const index = qqqq.findIndex(el => el.vinNo === data['vehicles'][i]['vin']);
  //   console.log(index, 'index')
   
  //   // const index = beyontech_vehicles.indexOf(el => el.vinNo === '2T1KR32E33C139624');
  //   // console.log(index);
  //   if(index){
  //     qqqq[index] = {
  //       equipment_amount: data['vehicles'][i]['eqAmount'],
  //       equipment_amount_redio: data['vehicles'][i]['requests']['custEquipment'] ? 'Yes' : 'No',
  //       from_api: true,
  //       include: true,
  //       lienholder: [],
  //       make: data['vehicles'][i]['make'],
  //       model: data['vehicles'][i]['model'],
  //       ownership: "false",
  //       primary_use: "Commute (to work or school)",
  //       rental_reimbus: data['vehicles'][i]['requests']['rentReimbursement'],
  //       road_side_assistance: data['vehicles'][i]['requests']['rsa'] ? 'Yes' : 'No',
  //       symbol: data['vehicles'][i]['subModel'],
  //       towing_labour: data['vehicles'][i]['requests']['towingAndLabor'],
  //       type_of_coverage: data['vehicles'][i]['requests']['collDeductible'],
  //       vinNo: data['vehicles'][i]['vin'],
  //       year: data['vehicles'][i]['year'],
  //     }
  //   }
  // }

      
      
      // console.log(beyontech_vehicles, "beyontech_vehicles");
      // console.log(beyontec_coverage, "beyontec_coverage");
      // this.api_common.getTocken().subscribe((dataT: {}) => {
      //     let dataMinut = data;
      //     dataMinut['token'] = dataT['token'];
      //     console.log(dataMinut, 'dataMinut Request');
      //   this.api_form.minutesQuote(dataMinut).subscribe((dataMinutResp: {}) => {
      //     console.log(dataMinutResp, 'data Minut Responce');
      //     // localStorage.setItem('isMinQuote',"1");
      //     // localStorage.setItem("beyontec_minutesQuote", JSON.stringify(dataMinutResp['quote']));
      //   });
      // });

      
















      // console.log(hdr, 'hdr');
      // if(hdr){
      //   this.loading = false;
      // }
      // if( data != 'INVALID REQUEST'){

      //   console.log(data);
      //   let replica = data;
      //   replica['quoteNo'] = '';
        
      //   localStorage.setItem("beyontec_minutesQuote", JSON.stringify(data));
      //   let drivers = [];
      //   drivers.push(data['primaryDriver']);
      //   if(data['additionalDrivers'].length > 0){
      //   for(let i = 0;i<=data['additionalDrivers'].length;i++){
          
      //     drivers.push(data['additionalDrivers'][i]);
      //   }
      // }
      //   console.log('drivers',drivers);
      //     this.driver = drivers;
      //    this.newdriver = [];
      //    console.log("ata['additionalDrivers'].length",this.driver.length,this.driver);
      //     for(let k=0;k<=this.driver.length;k++){
           
      //       if(this.driver[k]['firstName'] != 'undefined' && this.driver[k]['firstName'] != ''){
      //       this.newdriver[k] =  {
      //         "isdrivingLicence": "",
      //         "unit": "",
      //         "firstName": this.driver[k]['firstName'],
      //         "middleName": this.driver[k]['middleName'],
      //         "lastName": this.driver[k]['lastName'],
      //         "email": "vaidya.rushikesh9@gmail.com",
      //         "phone1": "911",
      //         "phone2": "111",
      //         "phone3": "1111",
      //         "phoneNumber": "",
      //         "dob": "07/07/1991",
      //         "isMale": "false",
      //         "isMarried": "S",
      //         "relationship": "I",
      //         "licenseType": "",
      //         "stateLicense": "",
      //         "countryLicense": "",
      //         "licenseNum": "42731631",
      //         "sr22": "",
      //         "zip": "78541",
      //         "county": "CAMERON",
      //         "yearsLicensed": "",
      //         "suffix": "",
      //         "street": "1815 W CHAPIN ST APT 2233D",
      //         "aptNumber": "",
      //         "city": "",
      //         "state": "",
      //         "occupation": "",
      //         "employer": "",
      //         "mobilePhone": "",
      //         "workPhone": "",
      //         "isAnytickets": "No",
      //         "violationsArray": [
                
      //         ],
      //         "isPrimaryDriver": true,
      //         "isExcluded": false,
      //         "driver_include": true,
      //         "driver_from_api": true
      //       }
      //     }
      //     }
      //     console.log('newdriver', this.newdriver);
      //     console.log('drivers',this.driver);
      //     localStorage.setItem("beyontech_drivers",JSON.stringify(this.driver));
      //     localStorage.setItem("beyontech_vehicles",JSON.stringify(data['vehicles']));
      //     let coverage = {
      //       "pip":   this.driver[0]['coverages']['pip'],
      //       "umpd":   this.driver[0]['coverages']['umpd'],
      //       "umbi":   this.driver[0]['coverages']['umbi'],
      //       "pd":   this.driver[0]['coverages']['pd'],
      //       "bi":   this.driver[0]['coverages']['bi'],
      //       "rqEffDt" :  this.driver[0]['requests']['rqEffDt']
      //     }
      //     localStorage.setItem('beyontec_coverage',JSON.stringify(coverage));
      //     let dataReq = {
      //       "token": this.token,
      //       "dlNo":  this.driver[0]['licenseNum'],
      //       "companyProductCd" : "PTXNSA"
      //     }
      //     replica['token'] = this.token,
      //     console.log('replica',replica);
      //     this.api_form.minutesQuote(replica).subscribe((data1: {}) => {
      //       localStorage.setItem('isMinQuote',"1");
      //       localStorage.setItem("beyontec_minutesQuote", JSON.stringify(data1['quote']));

      // this.api_form.getHrd(dataReq).subscribe((data1: {}) => {
      //   localStorage.setItem("beyontech_nusr", "false");

      //   localStorage.setItem("hrddata", JSON.stringify(data1))
      //   console.log(data1['drivers']['named']);
      //   let reqData1 = {
      //     "token":  this.token,
      //     "streetName": data1['drivers']['named']['address'],
      //     "deliveryLine1": "",
      //     "deliveryLine2": "",
      //     "city": this.dataparams['city'],
      //     "state": this.dataparams['state'],
      //     "zip": this.driver[0]['zip']
      //   }
      //   console.log('reqData1',reqData1);
      //     this.api_form.intelligentsearch(reqData1).subscribe((d0: {}) => {
      //       console.log(d0, "intelligentsearch");
      //       if (d0['result'] == 1) {
  
      //         localStorage.setItem("beyontec_intelligentsearch", JSON.stringify(d0['wsCorrectAddressList'][0]));
      //         //this.route.navigate(['/beyontec/05']);
      //       }
      //     })
      //   })
      // })
      // }else{
      //   console.log('outttttsssss',data);
      // }
      
    });
  // });
  }


  getPzcmap(zip, county, countyList) {

    let dataReq1 = {
      "zipcode": zip,
      "county": county
    }

    this.api_page.getPzcmap(dataReq1).subscribe((dataPZC: {}) => {
      console.log(dataPZC, 'getPzcmap');
      let isexists = dataPZC[0]['Exists'];
      // this.loading = true;
      // console.log(isexists, 'getPzcmap exists');
      //console.log(productName, 'getPzcmap productName');
      if (isexists) {

        let productName = dataPZC[0]['productName'];

        // console.log(dataPZC[0], 'getPzcmap productName');


        let inputData = {
          zipcode: zip,
          insurancetype: 'Auto',
          county: this.counties['counties'][0],
          countyList: countyList,
          productName: productName
        }
        // console.log(inputData, 'inputData');
        localStorage.setItem('insuranceFor', JSON.stringify(inputData));

        if (productName == 'PTXNSA') {
            this.loading = false;
            this.router.navigate(['beyontec/05']);
        }
        // else if (productName == 'QuotePro') {
        //   this.router.navigate(['/quote-pro/05']);
        // } 
        // else {
        //   alert('We Do Not Offer Insurance in Your Area')
        // }


      } 
    });

  }


}
