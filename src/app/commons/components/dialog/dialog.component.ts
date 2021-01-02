import {Component, Input, OnInit, ViewChild, ElementRef} from '@angular/core';


import {DialogButtonModel} from './dialog-button.model';

@Component({
  selector: 'error-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  @ViewChild('error_dialog') error_dialog: ElementRef<HTMLElement>;
  // [x: string]: any;
  @Input()
  error_msg: any;
  // @Input()
  // cancelButton: DialogButtonModel;
  // @Input()
  // confirmButton: DialogButtonModel;
  // confirmationData: boolean;

  constructor() {
  }

  ngOnInit() {
  
    // this.confirmationData = true;
  }
ngOnChanges()
{
  console.log(this.error_msg,"one_ink_error cghhh")
  if(this.error_msg!='' && this.error_msg!=null && this.error_msg!=undefined)
  {
    console.log(this.error_msg,"one_ink_error");
    let el: HTMLElement = this.error_dialog.nativeElement;
    el.click();
  }
}
clean()
{
  console.log(this.error_msg,"one_ink_error clean")
  this.error_msg='';
}
 
  
}
