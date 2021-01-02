import {ValidatorFn, Validators} from '@angular/forms';

export const creditCardNumberValidator: ValidatorFn = Validators.pattern(/^([0-9]{15,16})$/);
