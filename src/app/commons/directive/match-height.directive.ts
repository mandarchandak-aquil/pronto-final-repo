import {   Directive, ElementRef, AfterViewChecked,
  Input, HostListener } from '@angular/core';

@Directive({
  selector: '[appMatchHeight]'
})
export class MatchHeightDirective implements AfterViewChecked {

  @Input()
  appMatchHeight: any;

  constructor(private el: ElementRef) { }

  ngAfterViewChecked() {
    // console.log('ngAfterViewChecked')
    // call our matchHeight function here later
    this.matchHeight(this.el.nativeElement, this.appMatchHeight);
  }
  @HostListener('window:resize')
  onResize() {
    // call our matchHeight function here later
    this.matchHeight(this.el.nativeElement, this.appMatchHeight);
  }

  matchHeight(parent: HTMLElement, className: string) {
    // console.log(parent + 'parent', className + " className")
    // match height logic here

    if (!parent) return;
    const children = parent.getElementsByClassName(className);

    if (!children) return;

    // reset all children height
    Array.from(children).forEach((x: HTMLElement) => {
        x.style.height = 'initial';
    })

    // gather all height
    const itemHeights = Array.from(children)
        .map(x => x.getBoundingClientRect().height);

    // find max height
    const maxHeight = itemHeights.reduce((prev, curr) => {
      // console.log(prev, 'itemHeights', curr)
        return curr > prev ? curr : prev;
    }, 0);

    

    // apply max height
    Array.from(children)
        .forEach((x: HTMLElement) => x.style.height = `${maxHeight}px`);
  }

}
