import {ValidatorFn, Validators} from '@angular/forms';

export const texasQuoteNumberValidator: ValidatorFn = Validators.pattern(/^[Q]\d{9}$|^[Q][X]\d{9}$/);
