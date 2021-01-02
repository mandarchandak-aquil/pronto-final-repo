import { Component, OnInit,ChangeDetectorRef,Input, ViewChild ,NgZone,ElementRef } from '@angular/core';
 import { FormsModule, ReactiveFormsModule } from '@angular/forms';
 import { ProductService } from '../../commons/services/product/product.service';
 import { SubjectCallService } from '../../commons/services/subject-call/subject-call.service';

 import { MapsAPILoader } from '@agm/core';
 import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'app-claim-texas',
  templateUrl: './claim-texas.component.html',
  styleUrls: ['./claim-texas.component.css']
})
export class ClaimTexasComponent implements OnInit {
  @ViewChild('search') searchElementRef: ElementRef;
     texas: FormGroup;
        loading :boolean = true;  
        emailerr : boolean = false;
        showModalBox : boolean = false;
        state : any;
        address;
         web_site;
         lang;
         name;
        zip_code;
        longitude;
        latitude;
        zoom;
        displaySuggestions:any=[];
        flag1 : boolean = false;
        address_sub_text:any='';
  constructor(public api_sub : SubjectCallService,private formBuilder: FormBuilder,public api_product : ProductService,private ngZone: NgZone,private mapsAPILoader: MapsAPILoader,private ref: ChangeDetectorRef) { }
public maskTime = [/[1-9]/, /\d/,':',/\d/, /\d/]
dataReq;
  reportedBy = [
  
    {id: 1, report: 'Insured'},
    {id: 2, report: 'Insured Driver'},
    {id: 3, report: 'Claimant Driver'},
    {id: 4, report: 'Property Owner'},
    {id: 5, report: 'Other'},
  ];

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

  ngOnInit(): void {
 let lng  =    sessionStorage.getItem('lg');
    if( lng == '2'){
      this.lang = 'EN';
    }else if(lng == '3'){
      this.lang = 'SP';
    }
    console.log('this.lang',this.lang);
           this.texas = this.formBuilder.group({
                        "state" : "Texas",
                        reported_by: this.formBuilder.group({ 
                         reported_by: [null],
                         name: [''],
                         contact: ['']
                        }),
                        date_time: this.formBuilder.group({ 
                         month: [null,[Validators.required]],
                         day: [null,[Validators.required]],
                         year: ['',[Validators.required]],
                         time: ['',[Validators.required]],
                         time_period: ['PM',[Validators.required]]
                        }),
                         accident: this.formBuilder.group({ 
                         police_complaint_number: [''],
                         location: ['',[Validators.required]],
                         city: ['',[Validators.required]],
                         description: ['',[Validators.required]]
                        }),
                         witness: this.formBuilder.group({ 
                         name: [''],
                         contact: [''],
                        }),
                        insured_information: this.formBuilder.group({ 
                         policy_holder_name: [''],
                         policy_number: ['',[Validators.required]],
                         vehicle_driver: [''],
                          name_passenger1  : [''],
                         was_injured1  : [''],
                         attorney_represented1 : [''], 
                           name_passenger2  : [''],
                         was_injured2  : [''],
                         attorney_represented2 : [''],
                           name_passenger3  : [''],
                         was_injured3  : [''],
                         attorney_represented3 : [''],
                         home_address: [''], 
                         city: [''], 
                         state: [''],
                          zipcode: [''],
                         email: ['',[Validators.email]],
                         home_phone: [''],
                         cell_phone: [''],   
                         year: ['',[Validators.required,Validators.minLength(4),Validators.maxLength(4)]],
                          make: ['',[Validators.required]],
                          model: ['',[Validators.required]],
                           vin: ['',[Validators.required]],
                            is_vehicle_drivable: [''],
                            vehicle_damage : ['',[Validators.required]],
                             location : ['',[Validators.required]],
                            add_comment: [''],
                        }),
                          primary_claimant_information: this.formBuilder.group({ 
                         driver: ['',[Validators.required]], 
                           driver_was_injured  : [''],
                         driver_attorney_represented : [''],
                         passenger1: [''], 
                           was_injured1  : [''],
                         attorney_represented1 : [''],
                         passenger2: [''], 
                           was_injured2  : [''],
                         attorney_represented2 : [''],
                         passenger3: [''], 
                           was_injured3  : [''],
                         attorney_represented3 : [''],
                         home_address: ['',[Validators.required]], 
                          city: ['',[Validators.required]], 
                            zip_code: ['',[Validators.required]], 
                            email: ['',[Validators.email]], 
                             home_phone: [''],
                              cell_phone: [''], 
                              is_vehicle_drivable: [''],
                               vehicle_damages : [''],
                               location_of_vehicle : [''],
                               year: [''],
                               make: [''],
                               model: [''],
                                vin: [''],
                                licens_plate: [''],
                                colour: [''],
                                add_comment: [''],
                        }),
                         additional_claimant_information: this.formBuilder.group({ 
                         driver_name: [''],
                         party_injured: [''],
                         additional_comments: [''],
                         driver_name1: [''],
                         vin_or_license_plate : [''],
                         year : [''],
                         make : [''],
                         model : [''],
                         vehicle_damage : [''],
                          driver_name2: [''],
                         vin_or_license_plate2 : [''],
                         year2 : [''],
                         make2 : [''],
                         model2 : [''],
                         vehicle_damage2 : [''],
                        }),
           });
           this.loading = false;
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

  onSubmit(){
  this.dataReq = this.texas.value;
  console.log('form',this.texas);
  console.log('formstr',JSON.stringify(this.texas.value));
     this.api_product.Claimsubmit(this.dataReq).subscribe((data: {}) => {
     if(data['status_code'] == 200){
      this.showModalBox = true;
     this.texas.reset(); 
     }
     });
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
    input: this.texas.get('primary_claimant_information.home_address').value,
    componentRestrictions: {country: 'USA'},
};
   service.getPlacePredictions(request, displaySuggestions);
 }
 selectAddress(item)
 {
   this.displaySuggestions=[];
   //this.addressText='';
   this.texas.get('primary_claimant_information.home_address').setValue(item['structured_formatting'].main_text);
   this.address_sub_text=item['structured_formatting'].secondary_text;
                  
 // console.log('item',item['structured_formatting'])
 }

closesocial(){
  this.showModalBox = false;
}
}
