import {ValidatorFn, Validators} from '@angular/forms';

export const phoneNumberValidator: ValidatorFn = Validators.pattern(/^([0-9]{3})[-]([0-9]{3})[-]([0-9]{4})$/);
