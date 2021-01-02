import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter, ViewChild ,NgZone,ElementRef} from '@angular/core';
import { ProductService } from '../../commons/services/product/product.service';
 import { FormsModule, ReactiveFormsModule } from '@angular/forms';
 import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import {AfterViewInit} from '@angular/core';

import { MapsAPILoader } from '@agm/core';
import { Location } from '@angular/common';
//import {} from "googlemaps";
@Component({
  selector: 'app-modal-get-a-quote',
  templateUrl: './modal-get-a-quote.component.html',
  styleUrls: ['./modal-get-a-quote.component.css']
})
export class ModalGetAQuoteComponent implements OnInit {
@ViewChild('search') searchElementRef: ElementRef;
socialdeactivate : boolean  = false;
socialdeactivate2: boolean  = false;
   motorcycle: FormGroup;
   dataReqss: any;
@Input()
  product: any;
state : any;
 address;
  web_site;
  emailerr;
  name;
 zip_code;
 longitude;
 latitude;
 zoom;

 displaySuggestions:any=[];
   flag1 : boolean = false;
   address_sub_text:any='';
 @ViewChild(ToastContainerDirective, { static: true })
  toastContainer: ToastContainerDirective;

  constructor(public api_product : ProductService,private formBuilder: FormBuilder, private toastrService: ToastrService,private ngZone: NgZone,private mapsAPILoader: MapsAPILoader,private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
      this.motorcycle = this.formBuilder.group({
      first_name: ['',[Validators.required ,Validators.minLength(2),Validators.maxLength(10)]],
      last_name: ['', [Validators.required,Validators.minLength(2)]],
      email: ['', [Validators.required,Validators.email]],
      phone: ['', [Validators.required,Validators.minLength(10)]],
      unit: [''],
      addresss: ['', Validators.required],
      city: ['', Validators.required],
       state: ['', Validators.required],
        zipcode: ['',[ Validators.required,Validators.minLength(5),Validators.maxLength(5)]],     
    });

    // this.toastrService.overlayContainer = this.toastContainer;

  }

ValidateEmail(event){
console.log('val',event.target.value);
    if(event.target.value){

   
   this.api_product.ValidateEmail(event.target.value).subscribe((data: {}) => {
         if(data['status'] == 'invalid'){
         this.emailerr = true ;
         }else{
         this.emailerr = false;
         }
   });
}
}
findAdress(){
 this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          // some details
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          this.address = place.formatted_address;
          this.web_site = place.website;
          this.name = place.name;
          this.zip_code = place.address_components[place.address_components.length - 1].long_name;
          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
}
loadmap(e)
{
  if(e.target.value){
    this.initService();
    var service = new google.maps.places.AutocompleteService();
    service.getPlacePredictions({ input: 'USA' }, this.displaySuggestions);
   
    this.ref.detectChanges();
  }
 }
  
 initService() {
  const displaySuggestions = (predictions, status) => {
      if (status != google.maps.places.PlacesServiceStatus.OK) {
           //alert(status);
          return;
      }
  this.displaySuggestions=[];

      this.displaySuggestions=predictions;
  };

  // change the string inside the input property as you wish and get the predicted list stored in a variable
  const service = new google.maps.places.AutocompleteService();
  var request = {
    input: this.motorcycle.get('addresss').value,
    componentRestrictions: {country: 'USA'},
};
  service.getPlacePredictions(request, displaySuggestions);
}
selectAddress(item)
{
  this.displaySuggestions=[];
  //this.addressText='';
  console.log('item[structured_formatting]',item['structured_formatting'].secondary_text,);
  let addr = [];
  addr = item['structured_formatting'].secondary_text.split(',', 3);
  this.motorcycle.get('addresss').setValue(item['structured_formatting'].main_text);
  this.motorcycle.get('city').setValue(addr[0]);
  this.motorcycle.get('state').setValue(addr[1]);
  this.address_sub_text=item['structured_formatting'].secondary_text;
                 
// console.log('item',item['structured_formatting'])
}

  // onClick() {
  //   this.toastrService.success('Successfully Done');
  // }

onSubmit(){
console.log('this.api_product.product',this.api_product.product);
  var data = this.motorcycle.value;

  this.dataReqss ={
  "product_type" : this.product,
  "first_name" : data.first_name,
   "last_name" : data.last_name,
    "email" : data.email,
    "mobile_number" : data.phone,
   "addresss" : data.addresss,
    "city" : data.city,
    "phone" :data.phone, 
     "state" : data.state,
      "zipcode" : data.zipcode,
      "unit" : data.unit,
      "Insurance_type":this.product,
      "product_state" : this.api_product.product
  }
  this.motorcycle.reset();
   this.api_product.freshsales(this.dataReqss).subscribe((data: {}) => {
     //console.log("data['lead'].id",data['errors']);
    if(data['status_code'] == '200'){
      this.socialdeactivate = true;
       this.motorcycle.reset();
       let btn : HTMLElement = document.getElementById("Close") as HTMLElement;
       btn.click(); 
       let open : HTMLElement = document.getElementById("open") as HTMLElement;
       open.click(); 
       
   }
   });
   
  }
  closethank(){
    this.socialdeactivate = false;
  }
  getTrainingName(n:number){
    // button click handler
 }
  

}
