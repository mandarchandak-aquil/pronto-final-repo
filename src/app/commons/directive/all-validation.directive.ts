import { Directive, ElementRef, Input, OnInit, HostListener } from '@angular/core';
import { DatePipe } from '@angular/common';

@Directive({
  selector: '[ProValidation]'
})

export class ProValidationDirective implements OnInit {
  @Input() required_condition: string;
  @Input() required_value: any;
  @Input() required_validation: any;

  constructor(public el: ElementRef) {
  }
  ngOnInit() {
  }
  @HostListener('keyup') onKeyUp() {
    var a = this.el.nativeElement as HTMLElement;
    console.log(this.required_condition, "aaaa", this.required_value)
    if ((this.required_condition && this.required_value == '')) {
      a.classList.add('has-error')
    }
    else {
      a.classList.remove('has-error')
    }
  }
}
// ======================================================================================================
@Directive({
  selector: '[DobValidation]'
})

export class DobDirective {
  constructor(public el: ElementRef) {
  }
  //  @HostListener('keyup') onKeyUp() {
  //   var a= this.el.nativeElement as HTMLElement;
  //   var x = (this.el.nativeElement as HTMLInputElement).value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,2})(\d{0,4})/);
  //   (this.el.nativeElement as HTMLInputElement).value = !x[2] ? x[1] : x[1] + '/' + x[2] + (x[3] ? '/' + x[3] : '');
  @HostListener('keypress', ['$event'])
  @HostListener('keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    var a = this.el.nativeElement as HTMLElement;
    var x = (this.el.nativeElement as HTMLInputElement).value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,2})(\d{0,4})/);
    (this.el.nativeElement as HTMLInputElement).value = !x[2] ? x[1] : x[1] + '/' + x[2] + (x[3] ? '/' + x[3] : '');

    const datePipe = new DatePipe('en-US');
    let value = this.el.nativeElement.value;
    if (event.keyCode !== 8) {
      if (value.length <= 10) {
        if (value.length >= 2) {
          const day = value.substring(0, 2);
          if (day.includes('/')) {
            value = '0' + value.slice(0, 1) + value.slice(2);
          }
          if (day > 12) {
            value = '12' + value.slice(2);
          }
          if (value.substring(2, 3) !== '/') {
            value = value.slice(0, 2) + '/' + value.slice(2);
          }
          datePipe.transform(value.substring(0, 2), 'MM');
          if (value.length >= 5) {
            const month = value.substring(3, 5);
            if (month.includes('/')) {
              value = value.slice(0, 3) + '0' + value.slice(3, 5) + value.slice(5);
            }
            if (value.substring(3, 5) > 31) {
              value = value.slice(0, 3) + '31' + value.slice(5);
            }
            if (value.substring(5, 6) !== '/') {
              value = value.slice(0, 5) + '/' + value.slice(5);
            }
            datePipe.transform(value.substring(3, 5), 'dd');
            if (value.length === 10) {
              datePipe.transform(value.substring(6, 9), 'yyyy');
            }
          }
        }
      } else {
        const splitValue = value.split('/');
        let month = splitValue[0];
        let day = splitValue[1];
        let year = splitValue[2];
        if (month.length > 2) {
          month = month.slice(0, month.length - 1);
        }
        if (day.length > 2) {
          day = day.slice(0, day.length - 1);
        }
        if (year.length > 4) {
          year = year.slice(0, year.length - 1);
        }
        datePipe.transform(month, 'MM');
        datePipe.transform(day, 'dd');
        datePipe.transform(year, 'yyyy');
        value = day.concat('/', month, '/', year);
      }
    }
    this.el.nativeElement.value = value;
  }
}
// ======================================================================================================
// @Directive({
//   selector: '[emptyvalueValidationcheck]'
// })

// export class emptyvaluecheckDirective implements OnInit {
//   @Input() currentControl: any;

//   constructor(public el: ElementRef) {  }
//   ngOnInit() {  }
//   @HostListener('keyup') onKeyUp() {
//     this.checkEmptyValidationVal();
//   }
//   ngOnChanges() {
//     console.log("arg", this.currentControl['status'], this.currentControl['value']);
//     this.checkEmptyValidationVal();
//   }
//   checkEmptyValidationVal() {
//     var a = this.el.nativeElement as HTMLElement;
//     if (this.currentControl['value'] != '' || this.currentControl['value'] != null) {
//       a.classList.add('ffl-floated-force')
//     }
//     else {
//       a.classList.remove('ffl-floated-force')
//     }
//     //validation
//     a.classList.remove('has-error')
//     if (this.currentControl['status'] == "INVALID") {
//       a.classList.add('has-error');
//     }
//   }
// }
// ======================================================================================================
@Directive({
  selector: '[emptyvalueValidationcheck]'
})

export class emptyvaluecheckDirective implements OnInit {
  @Input() currentControl: any;

  constructor(public el: ElementRef) {  }
  ngOnInit() { 
    this.check_empty();
   }
  @HostListener('keyup') onKeyUp() {
    
    this.checkEmptyValidationVal();
    this.check_empty();
  }
  ngOnChanges() {
    //console.log("", this.currentControl['value']);
    this.checkEmptyValidationVal();
    this.check_empty();
  }
  check_empty()
  {
    var a = this.el.nativeElement as HTMLElement;
    a.classList.remove('ffl-floated-force');
    if (this.currentControl['value'] != '' && this.currentControl['value'] != null ) {
      a.classList.add('ffl-floated-force');
    }
  }
  checkEmptyValidationVal() {
    var a = this.el.nativeElement as HTMLElement;
   
    //validation
    a.classList.remove('has-error');
   //console.log(this.currentControl,"this.currentControl['status']")
    if ((this.currentControl['status'] == "INVALID" || this.currentControl['value']=='' || this.currentControl['value']==null) && this.currentControl['touched'] ) {
      a.classList.add('has-error');
    }
  }
}