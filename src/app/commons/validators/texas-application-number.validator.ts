import {ValidatorFn, Validators} from '@angular/forms';

export const texasApplicationNumberValidator: ValidatorFn = Validators.pattern(/^[A]\d{9}$|^[A][X]\d{9}$/);
