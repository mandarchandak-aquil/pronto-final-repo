import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter, ViewChild ,NgZone,ElementRef} from '@angular/core';
import { ProductService } from '../../commons/services/product/product.service';
 import { FormsModule, ReactiveFormsModule } from '@angular/forms';
 import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import {AfterViewInit} from '@angular/core';
import { MapsAPILoader } from '@agm/core';
@Component({
  selector: 'app-modal-get-a-quote',
  templateUrl: './modal-get-a-quote.component.html',
  styleUrls: ['./modal-get-a-quote.component.css']
})
export class ModalGetAQuoteComponent implements OnInit {
@ViewChild('search') searchElementRef: ElementRef;

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
 @ViewChild(ToastContainerDirective, { static: true })
  toastContainer: ToastContainerDirective;

  constructor(public api_product : ProductService,private formBuilder: FormBuilder, private toastrService: ToastrService,private ngZone: NgZone,private mapsAPILoader: MapsAPILoader) { }

  ngOnInit(): void {
      this.motorcycle = this.formBuilder.group({
      first_name: ['',[Validators.required ,Validators.minLength(2),Validators.maxLength(10)]],
      last_name: ['', [Validators.required,Validators.minLength(2)]],
      email: ['', [Validators.required,Validators.email]],
      phone: ['', [Validators.required ,Validators.minLength(10),Validators.maxLength(10)]],
      unit: [''],
      addresss: ['', Validators.required],
      city: ['', Validators.required],
       state: ['', Validators.required],
        zipcode: ['',[ Validators.required,Validators.minLength(5),Validators.maxLength(5)]],     
    });

    this.toastrService.overlayContainer = this.toastContainer;

  }

ValidateEmail(event){
console.log('val',event);
    var datass = {
    "email" : event
    }
   /*this.api_product.ValidateEmail(datass).subscribe((data: {}) => {
         if(data['status'] == 'invalid'){
         this.emailerr = true ;
         }else{
         this.emailerr = false;
         }
   });*/
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

  onClick() {
    this.toastrService.success('Successfully Done');
  }

onSubmit(){

  console.log('product',this.product);
  console.log('current_state',this.api_product.product);
  var data = this.motorcycle.value;

  this.dataReqss ={
  "product_type" : this.product,
  "first_name" : data.first_name,
   "last_name" : data.last_name,
    "email" : data.email,
    "phone" : data.phone,
   "addresss" : data.addresss,
    "city" : data.city,
     "state" : data.state,
      "zipcode" : data.zipcode,
      "product_state":this.api_product.product
  }
   this.api_product.Getaquote(this.dataReqss).subscribe((data: {}) => {
   if(data['status_code'] == 200){
       this.motorcycle.reset();

   }
   });
  }
  

}
