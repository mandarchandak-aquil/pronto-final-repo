import {ValidatorFn, Validators} from '@angular/forms';

export const creditCardCvvValidator: ValidatorFn =  Validators.pattern(/^[0-9]{3,4}$/);
