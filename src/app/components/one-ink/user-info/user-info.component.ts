import { Component, OnInit, ViewChild } from '@angular/core';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';
import {FormControl, FormGroup, ReactiveFormsModule, FormsModule, FormBuilder, Validators, FormArray} from '@angular/forms';
import {onlyNumberValidator} from '../../../commons/validators/only-number.validator';
import {onlyLetterAndSpacesValidator} from '../../../commons/validators/only-letter-and-spaces.validator';
import {zipCodeValidator} from '../../../commons/validators/zip-code.validator';
import {emailValidator} from '../../../commons/validators/email.validator';
import * as moment from 'moment';
import { oneInkService } from '../../../commons/services/one-ink/one-ink.service';
import { Router } from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  userInfoFormGroup: FormGroup;
  mailingAddress: FormGroup;
  mailingAddressResponse:any;
  garageAddressResponse:any;
  state_list:any=[];
  maritalStatus = [
    {id: 1, name: 'Single'},
    {id: 2, name: 'Married'},
  ];
  unsubscribe: Subject<void>;
  constructor(private formBuilder: FormBuilder,private oneInkService:oneInkService,public router: Router,) {
    this.unsubscribe = new Subject();
   }

  ngOnInit(): void {
    this.formSetUp();
    this.getState();
   this.oneink_search();
   this.getLocalValues();
   }

  private formSetUp() {
    const lettersAndRequiredValidator = Validators.compose([
      Validators.required,
      onlyLetterAndSpacesValidator
    ]);
    this.mailingAddress = this.formBuilder.group({
      street: ['', Validators.required],
      apartment: ['', onlyNumberValidator],
      state: ['', lettersAndRequiredValidator],
      zipCode: ['', Validators.compose([
        zipCodeValidator
      ])],
      city: ['', lettersAndRequiredValidator]
    });
    this.userInfoFormGroup = this.formBuilder.group({
      firstName: ['', lettersAndRequiredValidator],
      lastName: ['', lettersAndRequiredValidator],
      phoneNumber: ['', Validators.compose([
        Validators.required,
        onlyNumberValidator,
        Validators.minLength(10),
        Validators.maxLength(10)
      ])],
      email: ['', Validators.compose([
        Validators.required,
        emailValidator
      ])],
      street: ['', Validators.required],
      apartmentNumber: [''],
      sameGaragingAddress: [true],
      city: ['', lettersAndRequiredValidator],
      state: ['', lettersAndRequiredValidator]
    });
    this.userInfoFormGroup.controls.sameGaragingAddress.valueChanges.pipe(takeUntil(this.unsubscribe)).subscribe(isSameAddress => {
      console.log(isSameAddress)
      if (isSameAddress) {
        this.userInfoFormGroup.removeControl('mailingAddress');
      } else {
        this.userInfoFormGroup.addControl('mailingAddress', this.mailingAddress);
      }

      this.userInfoFormGroup.updateValueAndValidity();
    console.log(this.userInfoFormGroup)
    });
  }
  getLocalValues()
  {
    var oneink_userInfo:any=JSON.parse(localStorage.getItem('oneink_userInfo'));
    if(oneink_userInfo!=undefined && oneink_userInfo!=null)
    {
    this.userInfoFormGroup.patchValue(oneink_userInfo);
    }
  }
  getState()
  {
    this.oneInkService.getusState().pipe(takeUntil(this.unsubscribe)).subscribe(result => 
      {
       this.state_list=result;
       var jsonToBeUsed = [];
       for (var type in result) {
        var item = {};
        item['value'] = type;
        item['name'] = result[type]['displayName'];
        jsonToBeUsed.push(item);
    }
   this.state_list=jsonToBeUsed;
  });
}

  submit()
  {
    Object.keys(this.userInfoFormGroup.controls).forEach(controlName => {
      this.userInfoFormGroup.controls[controlName].markAsTouched();
      if (this.userInfoFormGroup.controls[controlName]['controls']) {
        const innerGroupControls = (<FormGroup>this.userInfoFormGroup.controls[controlName]).controls;
        Object.keys(innerGroupControls).forEach(innerControlName => {
          innerGroupControls[innerControlName].markAsTouched();
        });
      }
    });
    console.log(this.userInfoFormGroup,"this.userInfoFormGroup")
    if (this.userInfoFormGroup.valid) {
      this.verifyGaragingAddress();
    } else {
      //this.hideLoader();
    }
 
  }
  private verifyGaragingAddress() {
      this.oneInkService.addressVerification(this.userInfoFormGroup.value).pipe(takeUntil(this.unsubscribe)).subscribe(addressResponse => 
      {
        this.garageAddressResponse = addressResponse;
        if ((addressResponse['streetName']==null && addressResponse['houseNumber']==null)) {
         // this.addressErrorModal();
         console.log(addressResponse,"addressVerification ");
          this.userInfoFormGroup.controls.street.setErrors({'incorrect': true});
          this.userInfoFormGroup.controls.street.markAsTouched();
        }
         else {
          if (!this.userInfoFormGroup.value.sameGaragingAddress) {
            this.verifyMailingAddress();
          } else {
           // this.mailingAddressResponse = this.garageAddressResponse;
           this.createQoute_prototype();
          }
        }
       console.log(addressResponse,"addressVerification inside");
    
  });
  }
  private verifyMailingAddress()
  {
    this.oneInkService.addressVerification(this.mailingAddress.value).pipe(takeUntil(this.unsubscribe)).subscribe(mailingAddressResponse => 
      {
        this.mailingAddressResponse=mailingAddressResponse;
        if ((mailingAddressResponse['streetName']==null && mailingAddressResponse['houseNumber']==null)) {
         
      
          this.mailingAddress.controls.street.setErrors({'incorrect': true});
          console.log(this.mailingAddress,"mailingAddressResponse main");
          // var a = document.getElementById('mailing_street') as HTMLElement;
          // console.log(a,"mailingAddressResponse ");
          // a.classList.remove('has-error');
          // a.classList.add('has-error');
          
          
        } else {
         // this.createQuoteAndSetAddresses();
         console.log(this.mailingAddress,"mailingAddressResponse else");
         this.createQoute_prototype();
        }
        
       console.log(mailingAddressResponse,"mailingAddressResponse inside");
    
  });
  }
  // private createQuoteAndSetAddresses() {
  //   var model1:any={
  //     programVersionId: '',
  //   effectiveDate: '',
  //   }
  // //   this.getQuoteService.createQuotePrototype(new QuotePrototypeModel({
  // //     programVersionId: Number(this.currentProgram.id),
  // //     effectiveDate: this.currentProgram.effectiveDate
  // //   }), this.currentZipCode.zipCode).subscribe((quoteId: QuoteIdModel) => {
  // //     this.setAddresses(quoteId);
  // //   }, () => this.handleSubmitError());
  // }
  oneink_search()
  {
    this.oneInkService.getSearch().pipe(takeUntil(this.unsubscribe)).subscribe(programs => 
      {
       console.log(programs,"getSearch");
        if (programs[0]['versions'] && programs[0]['versions'].length) {
          let programFound = false;
          programs[0]['versions'].forEach((option: any) => {
            if (!programFound && option.name.includes('Pro General Value')) {
             programFound = true;
             localStorage.setItem('oneink_program_model',JSON.stringify(option))
             console.log(option,"ifgetSearch");
            }
          });
        } else {
          console.log(programs[0],"elsegetSearch");
          localStorage.setItem('oneink_program_model',JSON.stringify(programs[0]))
          //this.programService.setAutoProgram(PolicyProgramModel.fromAllowedProgramModel(programs));
        }
     
  });

  }
  createQoute_prototype()
  {
    var oneink_program_model:any=JSON.parse(localStorage.getItem('oneink_program_model'));
   
     var createQuoteModel_new= {
      createQuoteModel: {
        "programVersionId": oneink_program_model['id'],
        "effectiveDate": oneink_program_model['effectiveDate']
        }
    }
    this.oneInkService.getQoutePrototype(createQuoteModel_new).pipe(takeUntil(this.unsubscribe)).subscribe(qoute => 
      {
       console.log(qoute['quoteId'],"qoute")
       this.saveAddress(qoute['quoteId']);
  });
  }
  saveAddress(id)
  {
    this.garageAddressResponse['isAddressVerificationDisabled']=false;
     var data_to_set= {
      "garageAddressModel":this.garageAddressResponse,
      "quoteId":id
    }
    this.oneInkService.saveGarageAddress(data_to_set).pipe(takeUntil(this.unsubscribe)).subscribe(garage_data_responce => 
      {
        let mailing_data:any=data_to_set;
       console.log(garage_data_responce,"garage_data_responce")
        if (!this.userInfoFormGroup.value.sameGaragingAddress) {
          this.mailingAddressResponse['isAddressVerificationDisabled']=false;
          mailing_data= {
           "mailingAddressModel":this.mailingAddressResponse,
           "quoteId":id
         }
        }
        this.oneInkService.saveMailingAddress(mailing_data).pipe(takeUntil(this.unsubscribe)).subscribe(mail_data_responce => 
          {
            console.log(mail_data_responce,"mail_data_responce");
            this.saveInfoAndNext(id);
          });
  });
  }
  saveInfoAndNext(id)
  {
    localStorage.setItem('oneink_qouteId',id);
    localStorage.setItem('oneink_userInfo',JSON.stringify(this.userInfoFormGroup.value));
    this.router.navigate(['/one-ink/primary-details']);
  }
  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}

