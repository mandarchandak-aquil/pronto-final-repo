import {ValidatorFn, Validators} from '@angular/forms';

export const bankAccountNumberValidator: ValidatorFn = Validators.pattern(/^[0-9]{4,17}$/);
