import {Directive, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {NgControl} from '@angular/forms';

import {Subscription} from 'rxjs';
import {map} from 'rxjs/operators';

@Directive({
  selector: `[appOnlyPattern1],
  [appOnlyNumerical1],
  [appOnlyAlphanumerical1],
  [appOnlyAlphanumericalWithSeparators1],
  [appOnlyAlphabetical1],
  [appOnlyAlphabeticalWithSpace1],
  [appOnlyAlphabeticalWithSeparators1]`
})
export class OnlypatternDirective implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor(
    private element: ElementRef,
    private ngControl: NgControl
  ) {}

  ngOnInit() {
    const ctrl = this.ngControl.control;
    this.subscription = ctrl.valueChanges
      .pipe(map(value => this.getRefinedValue(value || '')))
      .subscribe(value => ctrl.setValue(value, {emitEvent: false}));
   }

   ngOnDestroy() {
     this.subscription.unsubscribe();
  }

  getRefinedValue(value) {
    const element = this.element.nativeElement;

    let pattern;
    if (element.hasAttribute('appOnlyPattern')) {
      pattern = new RegExp('^' + element.getAttribute('appOnlyPattern'), 'g');
    } else if (element.hasAttribute('appOnlyNumerical')) {
      pattern = /[^0-9]/g;
    } else if (element.hasAttribute('appOnlyAlphanumerical')) {
      pattern = /[^0-9a-zA-ZÑñ]/g;
    } else if (element.hasAttribute('appOnlyAlphanumericalWithSeparators')) {
      pattern = /[^a-zA-Z0-9Ññ\s,.'-]/g;
    } else if (element.hasAttribute('appOnlyAlphabetical')) {
      pattern = /[^a-zA-ZÑñ]/g;
    } else if (element.hasAttribute('appOnlyAlphabeticalWithSpace')) {
      pattern = /[^a-zA-ZÑñ\s]/g;
    } else if (element.hasAttribute('appOnlyAlphabeticalWithSeparators')) {
      pattern = /[^a-zA-ZÑñ\s,.'-]/g;
    }

    return value.replace(pattern, '');
  }

}
