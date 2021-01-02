import {ValidatorFn, Validators} from '@angular/forms';

export const vinNumberValidator: ValidatorFn = Validators.pattern(/^[0-9A-Za-z]{17}$/);
