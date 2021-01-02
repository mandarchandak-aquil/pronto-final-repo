import { Component, OnInit,ChangeDetectorRef,Input, ViewChild ,NgZone,ElementRef } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { NgbDateStruct, NgbCalendar, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import {Injectable} from '@angular/core';
import {NgbDateAdapter, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { MapsAPILoader } from '@agm/core';
 import { FormsModule } from '@angular/forms';
 import { ProductService } from '../../commons/services/product/product.service';
 import {  FormBuilder, Validators } from '@angular/forms';
 import { SubjectCallService } from '../../commons/services/subject-call/subject-call.service';

@Component({
  selector: 'app-claim-florida',
  templateUrl: './claim-florida.component.html',
  styleUrls: ['./claim-florida.component.css']
})
export class ClaimFloridaComponent implements OnInit {
  @ViewChild('search') searchElementRef: ElementRef;
  loading : boolean = true;
  florida: FormGroup;
  emailerr: boolean  = false;
  dataReq;
  showModalBox : boolean = false;
  state : any;
  address;
   web_site;
   
   name;
  zip_code;
  longitude;
  latitude;
  zoom;
  lang;
  displaySuggestions:any=[];
  flag1 : boolean = false;
  address_sub_text:any='';
    constructor(public api_sub : SubjectCallService,private formBuilder: FormBuilder,public api_product : ProductService,private ngZone: NgZone,private mapsAPILoader: MapsAPILoader,private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    let lng  =    sessionStorage.getItem('lg');
    if( lng == '2'){
      this.lang = 'EN';
    }else if(lng == '3'){
      this.lang = 'SP';
    }
    this.florida = this.formBuilder.group({
                         loss_information: this.formBuilder.group({ 
                         month: [null,[Validators.required]],
                         day: [null,[Validators.required]],
                         year: [null,[Validators.required]],
                         time: ['',[Validators.required]],
                         time_period: ['AM',[Validators.required]],
                         location: [''],
                          city: [''],
                          state: [''],
                          zip_code: [''],
                             description: ['',[Validators.required]],
                              police_agency: [''],
                             police_complaint_number: [''],
                        }),
                        reported_by: this.formBuilder.group({ 
                         reported_by: ['',[Validators.required]],
                         first_name: ['',[Validators.required]],
                          last_name: ['',[Validators.required]],
                          address: [''],
                          city: [''],
                          state: [''],
                          zip_code: [''],
                          email: ['',[Validators.email]],
                         phone: ['',[Validators.required]]
                        }),
                        insured_information: this.formBuilder.group({ 
                         policy_number: ['',[Validators.required]],
                         relation_to_insured: [''],
                         dob: [''],
                          first_name: ['',[Validators.required]],
                          last_name: [''],
                          driver_license : [''],
                           address : ['',[Validators.required]],
                           city : [''],
                           state : [''],
                           zip_code : [''],
                           email  : ['',[Validators.email]],
                           contact  : ['',[Validators.required]],
                           was_party_injured  : [''],
                           injuries  : [''],
                         vehicle_still_drivable: [''],
                          vehicle_location: [''],
                          vehicle_damage: [''],
                          year  : ['',[Validators.required]],
                          make  : ['',[Validators.required]],
                          model  : ['',[Validators.required]],
                          vin  : [''],
                          plate_no  : [''],
                        }),
                          third_party_information: this.formBuilder.group({ 
                         first_name: [''], 
                         last_name: [''], 
                         dob: [''], 
                         address: [''], 
                          city: [''], 
                           state: [''], 
                           zip_code: [''], 
                          contact : [''], 
                           driver_license : [''], 
                           insurance_company  : [''], 
                            policy_number: [''], 
                            claim_number: [''], 
                            party_injured: [''], 
                            injuries: [''], 
                            vehicle_damage: [''], 
                            vin_or_plate: [''], 
                            year: [''], 
                            make: [''], 
                            model: [''], 
                        }),

                        state : "Florida"
           });
           this.loading = false;
  }
  onSubmit(){
  this.dataReq = this.florida.value;
 
     this.api_product.Claimsubmit(this.dataReq).subscribe((data: {}) => {
     if(data['status_code'] == 200){
      this.showModalBox = true;
     this.florida.reset(); 
     
     }
     });
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
      console.log(this.displaySuggestions,"sujjest")
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
   console.log(predictions,"sujjest")
       this.displaySuggestions=predictions;
   };
 
   // change the string inside the input property as you wish and get the predicted list stored in a variable
   const service = new google.maps.places.AutocompleteService();
   var request = {
    input: this.florida.get('insured_information.address').value,
    componentRestrictions: {country: 'USA'},
};
   service.getPlacePredictions(request, displaySuggestions);
 }
 selectAddress(item)
 {
   this.displaySuggestions=[];
   //this.addressText='';
   this.florida.get('insured_information.address').setValue(item['structured_formatting'].main_text);
   this.address_sub_text=item['structured_formatting'].secondary_text;
                  
 // console.log('item',item['structured_formatting'])
 }
 onlanguageChange(newValue){
  if(newValue == 2){
    this.lang = 'EN';
  }else if(newValue == 3){
    this.lang = 'SP';
  }
 console.log('newValue',newValue,this.lang);
     this.api_sub.sendMessage(1);
   }
ValidateEmail(email) { 
  //var email = this.texas.get('insured_information.email').value;
  console.log('email',email);
  this.api_product.ValidateEmail(email).subscribe((data: {}) => {
    if(data['status']== 'valid'){
      this.emailerr = false;
    }else{
      this.emailerr = true;
    }

  });
  }
closesocial(){
  this.showModalBox = false;
}

  model: NgbDateStruct;
  date: { year: number, month: number };
  @ViewChild('dp') dp: NgbDatepicker;

  selectMM = [
    {id: 1, month: '01'},
    {id: 2, month: '02'},
    {id: 3, month: '03'},
    {id: 4, month: '04'},
    {id: 5, month: '05'},
    {id: 6, month: '06'},
    {id: 7, month: '07'},
    {id: 8, month: '08'},
    {id: 9, month: '09'},
    {id: 10, month: '10'},
    {id: 11, month: '11'},
    {id: 12, month: '12'},
  ];

  selectDD = [
    {id: 1, date: '01'},
    {id: 2, date: '02'},
    {id: 3, date: '03'},
    {id: 4, date: '04'},
    {id: 5, date: '05'},
    {id: 6, date: '06'},
    {id: 7, date: '07'},
    {id: 8, date: '08'},
    {id: 9, date: '09'},
    {id: 10, date: '10'},
    {id: 11, date: '11'},
    {id: 12, date: '12'},
    {id: 13, date: '13'},
    {id: 14, date: '14'},
    {id: 15, date: '15'},
    {id: 16, date: '16'},
    {id: 17, date: '17'},
    {id: 18, date: '18'},
    {id: 19, date: '19'},
    {id: 20, date: '20'},
    {id: 21, date: '21'},
    {id: 22, date: '22'},
    {id: 23, date: '23'},
    {id: 24, date: '24'},
    {id: 25, date: '25'},
    {id: 26, date: '26'},
    {id: 27, date: '27'},
    {id: 28, date: '28'},
    {id: 29, date: '29'},
    {id: 30, date: '30'},
    {id: 31, date: '31'},
  ];

  selectState = [
    {id: 1, state: 'Texas'},
    {id: 2, state: 'Alabama'},
    {id: 3, state: 'Alaska'},
    {id: 4, state: 'Arizona'},
    {id: 5, state: 'Arkansas'},
    {id: 6, state: 'California'},
    {id: 7, state: 'Colorado'},
    {id: 8, state: 'Conneticut'},
    {id: 9, state: 'Delaware'},
    {id: 10, state: 'District of Columbia'},
    {id: 11, state: 'Florida'},
    {id: 12, state: 'Georgia'},
    {id: 13, state: 'Hawaii'},
    {id: 14, state: 'Idaho'},
  ];

  reportedBy = [
    {id: 1, report: 'Policyholder/Listed driver'},
    {id: 2, report: 'I was involved in an incident with a Pronto insured'},
    {id: 3, report: 'I was a pedestrian'},
    {id: 4, report: 'I am an Insurance agent/Representative'},
    {id: 5, report: 'I am a medical provider'},
    {id: 6, report: 'I am from an attorney’s office'},
    {id: 7, report: 'Other'}
  ];

  relationshiptoInsured = [
    {id: 1, relationship: 'Insured'},
    {id: 2, relationship: 'Driver on Policy'},
    {id: 3, relationship: 'Family Member'},
    {id: 4, relationship: 'Friend'}
  ];



}

@Injectable()
export class CustomAdapter extends NgbDateAdapter<string> {
  readonly DELIMITER = '-';
  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        month : parseInt(date[1], 10),
        day : parseInt(date[0], 10),
        year : parseInt(date[2], 10)
      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
  }
}
@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
  readonly DELIMITER = '/';
  parse(value: string): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        month : parseInt(date[1], 10),
        day : parseInt(date[0], 10),
        year : parseInt(date[2], 10)
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date ? date.month + this.DELIMITER + date.day + this.DELIMITER + date.year : '';
  }
  
}