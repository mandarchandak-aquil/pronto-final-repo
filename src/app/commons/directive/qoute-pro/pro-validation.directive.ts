import { Directive, ElementRef, Input, OnInit, HostListener, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import * as $ from 'jquery';
@Directive({
  
  selector: '[ProValidation]'
})

export class ProValidationDirective implements OnInit{
    @Input() error_condition: any;
   
    constructor(public el: ElementRef,private renderer: Renderer2,private sanitizer: DomSanitizer) {
       
     }
     ngOnInit()
     {
       
       
     }
     ngOnChanges()
     {
      
      //console.log(this.error_condition,'testa directive')
      
      this.changeGet();
     }
     @HostListener('keyup') onKeyUp() {
      //console.log(this.error_condition,'testa directive')
      
    this.changeGet();
    }
    changeGet()
    {
      var a= this.el.nativeElement as HTMLElement;
      a.classList.remove('has-error')
      $('#requiredvalidation'+this.error_condition['sort']+'').remove();
      
      if(this.error_condition['error']!=undefined && this.error_condition['error']['errors'].length>0 &&this.error_condition['error']['errors']!=undefined )
      {
        var child= '<div id="requiredvalidation'+this.error_condition['sort']+'" class="invalid-fld-feedback ">'+this.error_condition['error']['errors']['0']['errorMessage']+'</div>';
       $('#'+a.parentNode['id']).append(child);
       
       a.classList.add('has-error');
      }
    }


    
  
   
  
}

