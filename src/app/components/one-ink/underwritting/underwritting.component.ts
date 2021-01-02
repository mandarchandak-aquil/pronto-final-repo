import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';


import {insuredDriverMaxDOBValidator} from '../../../commons/validators/insured-driver-max-dob.validator';
import {validateMinDateOfBirth} from '../../../commons/validators/min-date-birth.validator';
import {validateBeforeCurrentDate} from '../../../commons/validators/before-current-date.validator';
import {onlyLetterAndSpacesValidator} from '../../../commons/validators/only-letter-and-spaces.validator';
import {floridaLicenseValidator} from '../../../commons/validators/florida-license.validator';
import { oneInkService } from '../../../commons/services/one-ink/one-ink.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { oneInkUnderWrittingFormService } from '../underwritting-form.service';
import { OneinkVehicleFormService } from '../oneink-vehicle-form.service';
import { oneInkDriverFormService } from '../oneink-driver-form.service';


@Component({
  selector: 'app-underwritting',
  templateUrl: './underwritting.component.html',
  styleUrls: ['./underwritting.component.css']
})
export class UnderwrittingComponent implements OnInit {
  
  @ViewChild('Undisclosed_dialog') Undisclosed_dialog: ElementRef<HTMLElement>;
  @ViewChild('FCRA_dialog') FCRA_dialog: ElementRef<HTMLElement>;
  
  underwritting_form:FormGroup;
  unsubscribe: Subject<void>;
  qouteId;
  navigateToPayment:boolean=false;

  undisclosedDriversError:boolean;
  errorExists:boolean;
  redirectToExcluded:boolean;
  undisclosedFlowDone:boolean;
  oneink_undisclosedDrivers:[];
  constructor(
    private readonly fb: FormBuilder,
    public oneInkService:oneInkService,
    public oneInkUnderWritting:oneInkUnderWrittingFormService,
    public oneInkVehicleForm:OneinkVehicleFormService,
    public oneInkDriverForm:oneInkDriverFormService
  ) 
  {
    this.unsubscribe = new Subject();
    
   }

  ngOnInit(): void {
    this.qouteId=localStorage.getItem('oneink_qouteId');
    this.oneInkService.underwritting_question().pipe(takeUntil(this.unsubscribe)).subscribe(result => 
      {
      console.log(result,"underwritting_question");
       this.oneInkUnderWritting.getUnderWrittingForm();
       this.oneInkUnderWritting.assignLocalToQuastions(result);
       
       this.redirectToExcluded = this.hasCompAndColl();
       var json_underwritting_local = JSON.parse(localStorage.getItem('oneink_underwritting'));
       if(json_underwritting_local!=undefined && json_underwritting_local!=null)
       {
       this.oneInkUnderWritting.underwritting_array$.get('question').patchValue(json_underwritting_local);
       }
     
  });
  
  }
  submit()
  {
    localStorage.setItem('oneink_underwritting',JSON.stringify(this.oneInkUnderWritting.underwritting_array$.get('question').value))
   var total_api_call=0;
  var show_question_model=[];
    this.oneInkUnderWritting.underwritting_array$.get('question').value.forEach(element => {
    
      var ans_model:any={
        "quoteId":this.qouteId,
      "questionId":element['questionId'],
      "answers":{
        "answer": element['value'],
       // "note": element['extraInformation'],
        "targetGuid": localStorage.getItem('oneink_guid'),
        
        // "additionalNotesAnswers": [
        //   {
        //     "questionNoteId":0,
        //     "notes": element['extraInformation'],
            
        //   }
        // ]
      }
    
      }
      if(element['extraInformation']!='')
      {
        ans_model['answers']['note']=element['extraInformation'];
        // ans_model['answers']['additionalNotesAnswers']=  {
        //   "questionNoteId":0,
        //   "notes": element['extraInformation'],
          
        // }  
      }
      console.log(ans_model,"ans_model")
      this.oneInkService.underwritting_answer(ans_model).pipe(takeUntil(this.unsubscribe)).subscribe(result => 
        {
        console.log(result,"ans");
        },
         () => {

          console.log("1 subscribe")
          
        }, () => {
          total_api_call++;
          if(total_api_call== this.oneInkUnderWritting.underwritting_array$.get('question').value.length)
          {
           
            this.verifyAndNavigateToPayment();
          }

          
        });

    });
  
  }
  private verifyAndNavigateToPayment() {
     this.oneInkService.error_msg='';
    // this.underWritingsService.setUserUnderwritingComments(this.underwritingForm.controls.extraInformation.value);
    // this.underWritingsService.setUserUnderwritings(this.underwritingForm.controls.underwritings.value);
    this.oneInkService.orderThirdPartyValidation(
    ).subscribe(() => {
      console.log('orderThirdPartyValidation');
      this.quoteValidation();
    }, errorResponse => {
      console.log(errorResponse,'errorResponse');
      // this.hideLoader();
      // if (errorResponse.error.errors) {
      //   console.log(errorResponse,'orderThirdPartyValidation-iferrorResponse');
      //   const errorsToShow = errorResponse.error.errors.length && errorResponse.error.errors[0]
      //     ? errorResponse.error.errors[0].message
      //     : [];
      //   this.errorMessage = errorsToShow.split('\n');
      //   this.errorMessage.pop();
      //   this.showQuoteErrorsDialog();
      // } else {
      //   console.log(errorResponse,'orderThirdPartyValidation-elseerrorResponse');
      //   this.handleSubmitError();
      // }
    });
  }
  private quoteValidation() {
    this.oneInkService.validateQuote(
    ).subscribe((errorTree) => {
      console.log(errorTree,'quoteValidation');
      
      this.undisclosedDriversError = false;
      this.errorExists = false;
   //   const errorTreeDTO = ErrorTreeNodeModel.toDTO(errorTree);
      this.checkQuoteError(errorTree);
      console.log(this.errorExists,'this.errorExists',localStorage.getItem('undisclosedFlowDone'));
      if (!this.errorExists) {
        var undisclosedFlowDone=localStorage.getItem('undisclosedFlowDone')
        if (undisclosedFlowDone!=undefined && undisclosedFlowDone!=null && undisclosedFlowDone!='yes' &&  this.redirectToExcluded) {
          console.log(this.redirectToExcluded,'redirectToExcluded');
        } else {
          this.triggerFCRADialog();
          console.log('showFCRADialog');
         // this.showFCRADialog();
        }
      }
      // if (!this.errorExists) {
      //   if (!this.undisclosedFlowDone && this.redirectToExcluded) {
      //     this.stateService.go('undisclosed.undisclosedDriversList');
      //   } else {
      //     console.log('showFCRADialog');
      //     this.showFCRADialog();
      //   }
      // }
    }, error => {
      console.log(error,'quoteValidation errorTree');
     // this.displayError(error.message);
    });
  }
  private checkQuoteError(errorTree) {
    if (errorTree && typeof errorTree === 'object' && !this.errorExists) {
      const errorTreeKeysArray = Object.keys(errorTree);
      console.log(errorTreeKeysArray,"keykeykey")
      for (const key of errorTreeKeysArray) {
        
        if (key === 'undisclosedDrivers') {
          this.undisclosedDriversError = true;
          console.log(this.undisclosedDriversError, "ifffffthis.undisclosedDriversError",)
        } else {
          if (this.errorExists) {
            break;
          } else if (key === 'errors' && errorTree[key] && errorTree[key][0]) {
            this.errorExists = true;
            this.displayError(errorTree[key][0].message);
            break;
          } else if (errorTree[key]) {
            this.checkQuoteError(errorTree[key]);
          }
        }
      }
      console.log(this.undisclosedDriversError,"this.undisclosedDriversError",)
      if (this.undisclosedDriversError && !this.errorExists) {
        this.handleIncludedDriversError();
        this.errorExists = true;
      }
    }
  }
  private displayError(errorMessage: string) {
    
    console.log(errorMessage.includes('Undisclosed driver'),"Undisclosed driver")
    if (errorMessage.includes('Undisclosed driver')) {
      this.handleIncludedDriversError();
    } else {
      console.log(errorMessage,"---- Undisclosed driver else")
    
    this.oneInkService.error_msg=errorMessage;
  
      // this.showSupportMessage = errorMessage === 'Provided answer is not acceptable for this product version.';
      // this.showExcludedDriverMessage = errorMessage === 'Count of excluded drivers exceeds the maximum number allowed on a policy';
      // this.showSR22FR44Message =
      //   errorMessage === 'Drivers requiring an SR22 filing are unacceptable' ||
      //   errorMessage === 'Driver(s) requiring an FR-44 filing are unacceptable';
      // this.errorMessage[0] = errorMessage;
      // this.showQuoteErrorsDialog();
    }
  }
  private handleIncludedDriversError() {
    this.oneInkService.qouteSnapsot().subscribe(quoteSnapshot => {
      
      this.oneink_undisclosedDrivers=quoteSnapshot['undisclosedDrivers'];
      console.log(quoteSnapshot,"quoteSnapshot")
      localStorage.setItem('oneink_undisclosedDrivers',JSON.stringify(quoteSnapshot['undisclosedDrivers']));
      localStorage.setItem('oneink_excludedDrivers',JSON.stringify(quoteSnapshot['excludedDrivers']))
      localStorage.setItem('oneink_includedDrivers',JSON.stringify(quoteSnapshot['includedDrivers']))
      this.triggerUndisclosedDialog();
       // this.undisclosedDrivers = quoteSnapshot.undisclosedDrivers;
      //this.undisclosedDriversErrorDialog();
    });
  }
  hasCompAndColl(): boolean {
    const currentVehicles = this.oneInkVehicleForm.vehicle_array$.get('vehicle').value;
    let hasCompAndColl = false;
    currentVehicles.forEach((vehicle) => {
      let hasComprehensive = false;
      let hasCollision = false;
      // vehicle.vehicleCoverages.forEach((coverage) => {
        // if (coverage.type === 'coll') {
          if (vehicle.vehicleCoverages.collision) {
          hasCollision = true;
        } 
        // if (coverage.type === 'comp') {
        else if (vehicle.vehicleCoverages.comprehensive) {
          hasComprehensive = true;
        }
        if (hasComprehensive && hasCollision) {
          hasCompAndColl = true;
        }
      });
     
    // });
    return hasCompAndColl;
  }
  triggerUndisclosedDialog() {
    let el: HTMLElement = this.Undisclosed_dialog.nativeElement;
    el.click();
}
triggerFCRADialog() {
  let el: HTMLElement = this.FCRA_dialog.nativeElement;
  el.click();
}
get_underwriting_value(index)
{
  var underwriting_value= (<FormArray>this.oneInkUnderWritting.underwritting_array$.controls['question']).at(index).value;
 
  if((underwriting_value['noteIsRequiredIfYes'] &&  underwriting_value['value']=== true)
  || (underwriting_value['noteIsRequiredIfNo'] && underwriting_value['value'] === false))
  {
    console.log(underwriting_value,"val")
    const onlyLettersAndSpacesRequiredValidator = Validators.compose([
      Validators.required,
      onlyLetterAndSpacesValidator
    ]);
    (<FormArray>this.oneInkUnderWritting.underwritting_array$.controls['question']).at(index).get('extraInformation').setValidators(Validators.compose([
      Validators.required,
      onlyLettersAndSpacesRequiredValidator
    ]));
     }
  else
  {
    (<FormArray>this.oneInkUnderWritting.underwritting_array$.controls['question']).at(index).get('extraInformation').clearValidators();
  }
  (<FormArray>this.oneInkUnderWritting.underwritting_array$.controls['question']).at(index).get('extraInformation').updateValueAndValidity();

}
  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
