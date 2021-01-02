import {Directive, ElementRef, Output, EventEmitter, HostListener} from '@angular/core';

@Directive({
  selector: '[appCheckEmail]'
})
export class CheckEmailDirective {
  @Output() emailError: EventEmitter<boolean>;
  emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(private el: ElementRef) {
    this.emailError = new EventEmitter<boolean>();
  }

  @HostListener('change')
  checkError() {
    const isValid = this.emailPattern.test((this.el.nativeElement.value || '').toString());
    this.emailError.emit(!isValid);
  }

}
