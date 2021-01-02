import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import { BeyontecFormService } from '../beyontec-form.service';

@Component({
  selector: 'app-beyontec05',
  templateUrl: './beyontec05.component.html',
  styleUrls: ['./beyontec05.component.css']
})
export class Beyontec05Component implements OnInit {

  minQuote: any;
  driver: any;
  driverName: any;
  json_coverage: any;
  json_vehicle: any;
  paymentPrograms: any;
  expandedLength: number;
  limitedLength: number;
  json_driver : any;
  PAYMENT_TYPES = {
    '6MthNonEFT_EXP': 'Pay by Month',
    '6MthPIF_EXP': 'Pay in Full',
    '1Mth_EXP': 'Pay in Full',
    '2Mth_EXP': 'Pay in Full',
    '3Mth_EXP': 'Pay in Full',
    '6MthPIF_LTD': 'Pay in Full',
    '6MthNonEFT_LTD': 'Pay by Month',
    '6MthEFT_EXP': 'Autopay',
    '6MthEFT_LTD': 'Autopay',
  }

  constructor(public router: Router, private renderer: Renderer2,public elementRef: ElementRef, public BeyontecFormService:BeyontecFormService,) { }

  ngOnInit(): void {

    
    this.json_coverage = JSON.parse(localStorage.getItem('beyontec_coverage'));
    if(this.json_coverage!=undefined && this.json_coverage!=null)
    {
      this.BeyontecFormService.getCoverageForm();
      this.BeyontecFormService.coverage_array$.patchValue(this.json_coverage)
    }

    this.json_vehicle = JSON.parse(localStorage.getItem('beyontech_vehicles'));
    if (!this.BeyontecFormService.vehicles_array$) {
      this.BeyontecFormService.getVehicleForm();
      this.BeyontecFormService.assignVehiclereplica(this.json_vehicle);
    }

    this.json_driver = JSON.parse(localStorage.getItem("beyontech_drivers"))
    
    if (!this.BeyontecFormService.drivers_array$) {
      this.BeyontecFormService.getDriverForm();
      this.BeyontecFormService.assignLocalToDriver(this.json_driver);
    }
    console.log(this.BeyontecFormService.drivers_array$.value, 'drivers_array')
    console.log(this.BeyontecFormService.vehicles_array$.value, 'vehicles_array')
    console.log(this.BeyontecFormService.coverage_array$.value, 'coverage_array')
    
    this.driver = JSON.parse(localStorage.getItem('beyontech_drivers'))[0];

    this.driverName = this.driver['firstName'] + " " + this.driver['lastName'];

    // console.log(this.driver);
    this.minQuote = JSON.parse(localStorage.getItem('beyontec_minutesQuote'));
    // console.log(this.minQuote);

    if (this.minQuote) {
      if (this.minQuote.programs.expanded != null) { this.expandedLength = Object.keys(this.minQuote.programs.expanded.payPlans).length; }
      else { this.expandedLength = 0; }

      if (this.minQuote.programs.limited != null) { this.limitedLength = Object.keys(this.minQuote.programs.limited.payPlans).length; }
      else { this.limitedLength = 0; }



      // console.log(this.expandedLength, " expandedLength ----------- " + this.limitedLength + " limitedLength")
      let key;
      let program;
      this.paymentPrograms = {};
      for (program of Object.keys(this.minQuote.programs || {})) {
        // console.log(program, "program");
        // console.log(this.minQuote.programs[program], "program payPlans");
        this.paymentPrograms[program] = [];

        if (this.minQuote.programs[program] != null) {
          for (key of Object.keys(this.minQuote.programs[program].payPlans || {})) {
            if (program === 'limited' || program === 'expanded') {
              const payPlan = this.minQuote.programs[program].payPlans[key];
              payPlan.name = key;
              payPlan.translateName = this.PAYMENT_TYPES[key];
              // console.log(payPlan.translateName, "payPlan.translateName")
              payPlan.pluralMonth = (key.charAt(0) === '6' && key.search('EFT') > -1) ?
                "month" : key.charAt(0) + ' months'
              payPlan.pluralMonth = key.charAt(0) === '1' ? '1 month' : payPlan.pluralMonth;
              payPlan.showMonth = payPlan.pluralMonth !== '6 months';
              if (payPlan.pluralMonth === '6 months') {
                payPlan.pluralMonth = "One-Time Payment"
              } else if (payPlan.pluralMonth === 'month') {
                payPlan.pluralMonth = "Down payment"
              }
              payPlan.monthPolicy = key.charAt(0) + ' ' + "Month";
              payPlan.monthlyPayment = (key.charAt(0) === '6' && key.search('EFT') > -1)
                ? payPlan.monthlyPayment.replace(',', '')
                : payPlan.downPayment.replace(',', '');
              payPlan.totalPremium = (key.charAt(0) === '6' && key.search('EFT') > -1)
                ? payPlan.totalPremium.replace(',', '')
                : payPlan.totalPremium.replace(',', '');
              payPlan.downPayment = (key.charAt(0) === '6' && key.search('EFT') > -1)
                ? payPlan.downPayment.replace(',', '')
                : payPlan.totalPremium.replace(',', '');
              this.paymentPrograms[program].push(payPlan);
            }
          }
        }
      }
      // console.log(this.paymentPrograms, "payPlan");
    }


    

  }



  selectPolicy(e, cl, bey){

    // console.log(e.target.classList, "e.target.classList")

    const hasClass = e.target.classList.contains(cl);
    // console.log(hasClass, "hasClass")
    // console.log(bey, "bey")
    // console.log(this.paymentPrograms.expanded.length, "this.paymentPrograms.expanded.length")
    // console.log(this.paymentPrograms.expanded.limited, "this.paymentPrograms.expanded.length")

    if(this.paymentPrograms.expanded.length != undefined || this.paymentPrograms.expanded.length != null){
      for(let i=0; i < this.paymentPrograms.expanded.length; i++){
        // console.log(1)
        $(".select_policy_btn_"+i).removeClass(cl);
        $(".select_policy_"+i).removeClass(cl);
        $(".beyontec_quote_"+i).addClass(cl);
      }
    }
    if(this.paymentPrograms.limited.length != undefined || this.paymentPrograms.limited.length != null){
      for(let i=0; i < this.paymentPrograms.limited.length; i++){
        $(".select_policy_btn_"+i).removeClass(cl);
        $(".select_policy_"+i).removeClass(cl);
        $(".beyontec_quote_"+i).addClass(cl);
      }
    }
    

    if(hasClass) {
      this.renderer.removeClass(e.target, cl);
      $(".beyontec_quote_"+bey).toggleClass(cl);
      $(".select_policy_"+bey).toggleClass(cl);
      // this.renderer.removeClass(e.target, 'd-none');
    } else {
      this.renderer.addClass(e.target, cl);
      $(".beyontec_quote_"+bey).toggleClass(cl);
      $(".select_policy_"+bey).toggleClass(cl);
      // this.renderer.addClass(e.target, 'd-block');
    }
  }

  selectPolicy1(e, bey){
    
    let classInput = e+"_"+bey;
    console.log(classInput, "classInput")
    document.getElementById(classInput).click();
    // 
    // console.log(cl, "cl")
    // console.log(bey, "bey")
    // // let el = this.document.getElementsByClassName('name');
    // // const hasClass = e+bey.target.classList.contains(cl);
    // const dom: HTMLElement = this.elementRef.nativeElement;
    // const elements = dom.querySelectorAll(classInput);
    // console.log(elements, "elements")


  }

  closeSelectPolicy(bey){
    $(".beyontec_quote_"+bey).toggleClass("btnCollapse");
    $(".select_policy_btn_"+bey).toggleClass("btnCollapse");
    $(".select_policy_"+bey).toggleClass("btnCollapse");
  }

  onSubmit(val){
    
    // let dataPlans = {
    //   grp : val,
    //   ids : i
    // }



    this.minQuote = JSON.parse(localStorage.getItem('beyontec_minutesQuote'));

    this.minQuote['choice'] = val;

    localStorage.setItem('beyontec_minutesQuote', JSON.stringify(this.minQuote));



    // console.log(this.minQuote, "dataPlans");
    this.router.navigate(['beyontec/06']);
  }

}
